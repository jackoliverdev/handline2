import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { createPpeCategoryRecord, createPpeCategorySchema } from "@/lib/server/ppe-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const body = await request.json().catch(() => null);
    const parsed = createPpeCategorySchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const result = await createPpeCategoryRecord(parsed.data);
    return NextResponse.json({ category: result.category });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[ppe] create failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PPE_WRITE_FAILED" }, { status: 500 });
  }
}
