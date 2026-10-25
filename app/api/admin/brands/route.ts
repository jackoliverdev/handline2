import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse } from "@/lib/server/admin-http";
import { createBrandSchema, insertBrand } from "@/lib/server/brands-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const body = await request.json().catch(() => null);
    const parsed = createBrandSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
    }

    const result = await insertBrand(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ brand: result.brand });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[brands] create failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BRAND_WRITE_FAILED" }, { status: 500 });
  }
}
