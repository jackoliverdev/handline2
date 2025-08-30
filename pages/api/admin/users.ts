import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "@/lib/firebase-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    initializeFirebaseAdmin();
  } catch (e) {
    console.error('Firebase Admin init failed:', e);
    return res.status(500).json({ error: 'Firebase Admin init failed' });
  }
  // Check if the request is from an admin
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const email = decodedToken.email;
    
    // Only allow your admin email
    if (email !== 'jackoliverdev@gmail.com') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Handle different methods
    if (req.method === 'GET') {
      // List users
      try {
        const userRecords = await admin.auth().listUsers(1000);
        return res.status(200).json({ users: userRecords.users });
      } catch (error) {
        console.error('Error listing users:', error);
        return res.status(500).json({ error: 'Error listing users' });
      }
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 