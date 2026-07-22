import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdmin } from "@/lib/server/admin-auth";
import { getManagedUser } from "@/lib/server/user-admin-service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  if (!id) return res.status(400).json({ error: 'Missing id' });

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await requireAdmin(req.headers.authorization);
    const user = await getManagedUser(id);
    return res.status(200).json({ data: user });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load user';
    const status = message === 'UNAUTHENTICATED' ? 401 : message === 'FORBIDDEN' ? 403 : 500;
    return res.status(status).json({ error: message });
  }
}


