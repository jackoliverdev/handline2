import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "@/lib/firebase-admin";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' });

  try { initializeFirebaseAdmin(); } catch (e) { return res.status(500).json({ success: false, message: 'Firebase Admin init failed' }); }

  // Authorise admin caller
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const token = authHeader.split('Bearer ')[1];
    const decoded = await admin.auth().verifyIdToken(token);
    if (decoded.email !== 'jackoliverdev@gmail.com') return res.status(403).json({ success: false, message: 'Forbidden' });
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  const { email, password, displayName, role = 'user', status = 'active', preferences } = req.body || {};
  console.log('[admin/create-user] payload', { email, displayName, role, status, preferences });
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });

  try {
    // 1) Create Firebase user
    const userRecord = await admin.auth().createUser({ email, password, displayName: displayName || undefined, disabled: status === 'suspended' });
    console.log('[admin/create-user] firebase user created', { uid: userRecord.uid });
    // 2) Set custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role });

    // 3) Insert into Supabase users with role/status
    const { data, error } = await supabase.from('users').insert([{
      firebase_uid: userRecord.uid,
      email,
      display_name: displayName || null,
      role,
      status,
      dark_mode: preferences?.dark_mode ?? false,
      notifications: preferences?.notifications ?? true,
      marketing_emails: preferences?.marketing_emails ?? false
    }]).select().single();
    if (error) {
      console.error('[admin/create-user] supabase insert error', error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
    console.log('[admin/create-user] supabase insert result', { id: data.id, role: data.role, status: data.status });

    // Defensive: enforce role/status explicitly in case a table default overwrote values
    if ((data.role ?? 'user') !== role || (data.status ?? 'active') !== status) {
      const { data: fixed, error: fixErr } = await supabase
        .from('users')
        .update({ role, status })
        .eq('firebase_uid', userRecord.uid)
        .select()
        .single();
      if (!fixErr) {
        console.log('[admin/create-user] post-insert role/status enforced', { role: fixed.role, status: fixed.status });
        return res.status(200).json({ success: true, data: { uid: userRecord.uid, profile: fixed } });
      }
      console.error('[admin/create-user] post-insert enforcement failed');
    }

    return res.status(200).json({ success: true, data: { uid: userRecord.uid, profile: data } });
  } catch (e: any) {
    return res.status(500).json({ success: false, message: e?.message || 'Failed to create user' });
  }
}


