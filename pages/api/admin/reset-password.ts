import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "@/lib/firebase-admin";
import { Resend } from "resend";

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

  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    // Generate password reset link via Admin SDK
    const actionCodeSettings = {
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000/login",
      handleCodeInApp: false,
    } as any;
    const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

    // If Resend is configured, email the link; otherwise return it
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "Hand Line Website <noreply@mail.handlineco.com>",
        to: [email],
        subject: "Reset your Hand Line account password",
        html: `<p>Hello,</p><p>Click the button below to reset your password:</p><p><a href="${link}" style="display:inline-block;padding:10px 16px;background:#F28C38;color:#fff;text-decoration:none;border-radius:6px">Reset Password</a></p><p>If the button does not work, copy and paste this URL:</p><p>${link}</p>`
      });
    }

    return res.status(200).json({ success: true, link });
  } catch (error: any) {
    console.error("Error generating/sending reset link:", error);
    return res.status(500).json({ success: false, message: error?.message || "Failed to send password reset" });
  }
}


