import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "@/lib/firebase-admin";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    initializeFirebaseAdmin();
  } catch (e) {
    console.error("Firebase Admin init failed:", e);
    return res.status(500).json({ success: false, message: "Firebase Admin init failed" });
  }

  // Authorise admin
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token = authHeader.split("Bearer ")[1];
    const decoded = await admin.auth().verifyIdToken(token);
    const email = decoded.email;
    if (email !== "jackoliverdev@gmail.com") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
  } catch (e) {
    console.error("Error verifying admin token", e);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const { firebaseUid, supabaseId } = req.body || {};
  if (!firebaseUid && !supabaseId) {
    return res.status(400).json({ success: false, message: "firebaseUid or supabaseId is required" });
  }

  try {
    // Delete from Supabase (users table)
    if (supabaseId) {
      const { error } = await supabase.from('users').delete().eq('id', supabaseId);
      if (error) console.warn('Supabase delete warning:', error.message);
    }

    // Delete from Firebase Auth
    if (firebaseUid) {
      await admin.auth().deleteUser(firebaseUid);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Delete user error:', error);
    return res.status(500).json({ success: false, message: error?.message || 'Failed to delete user' });
  }
}


