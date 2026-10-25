import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { createIndustrySchema, insertIndustry } from "@/lib/server/industries-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const body = await request.json().catch(() => null);
    const parsed = createIndustrySchema.safeParse(body);
    if (!parsed.success) {
      return invalidBody();
    }

    const result = await insertIndustry(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ industry: result.industry });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[industries] create failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "INDUSTRY_WRITE_FAILED" }, { status: 500 });
  }
}
