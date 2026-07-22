import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "@/lib/server/admin-auth";
import {
  deleteManagedUser,
  getManagedUser,
  updateManagedUser,
} from "@/lib/server/user-admin-service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id !== "string") return res.status(400).json({ error: "Invalid user ID" });

  try {
    const actor = await requireAdmin(req.headers.authorization);

    if (req.method === "GET") {
      const user = await getManagedUser(id);
      return user ? res.status(200).json({ user }) : res.status(404).json({ error: "NOT_FOUND" });
    }

    if (req.method === "PATCH") {
      const user = await updateManagedUser(actor, id, req.body || {});
      return res.status(200).json({ success: true, user });
    }

    if (req.method === "DELETE") {
      await deleteManagedUser(actor, id);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    const status = message === "UNAUTHENTICATED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return res.status(status).json({ error: message });
  }
}
