import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "@/lib/server/admin-auth";
import { sendManagedPasswordReset } from "@/lib/server/user-admin-service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { id } = req.query;
  if (typeof id !== "string") return res.status(400).json({ error: "Invalid user ID" });

  try {
    const actor = await requireAdmin(req.headers.authorization);
    await sendManagedPasswordReset(actor, id);
    return res.status(200).json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message === "UNAUTHENTICATED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return res.status(status).json({ error: message });
  }
}
