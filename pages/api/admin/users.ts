import { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "@/lib/server/admin-auth";
import { createManagedUser, listManagedUsers } from "@/lib/server/user-admin-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const actor = await requireAdmin(req.headers.authorization);

    if (req.method === 'GET') {
      return res.status(200).json({ users: await listManagedUsers() });
    }

    if (req.method === 'POST') {
      const user = await createManagedUser(actor, req.body || {});
      return res.status(201).json({ success: true, user });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = message === 'UNAUTHENTICATED' ? 401 : message === 'FORBIDDEN' ? 403 : 500;
    console.error('Admin users API error:', message);
    return res.status(status).json({ error: message });
  }
} 