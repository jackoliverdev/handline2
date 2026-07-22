import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  return res.status(410).json({
    success: false,
    message: "This endpoint has been retired. Use POST /api/admin/users/:id/reset-password.",
  });
}


