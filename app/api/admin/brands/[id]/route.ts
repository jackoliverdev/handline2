import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse } from "@/lib/server/admin-http";
import { brandIdSchema, deleteBrandRecord, updateBrandRecord, updateBrandSchema } from "@/lib/server/brands-admin";

export const runtime = "nodejs";

function invalidId() {
  return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = brandIdSchema.safeParse(params.id);
    if (!id.success) return invalidId();

    const body = await request.json().catch(() => null);
    const parsed = updateBrandSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 });
    }

    const result = await updateBrandRecord(id.data, parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ brand: result.brand });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[brands] update failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BRAND_WRITE_FAILED" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = brandIdSchema.safeParse(params.id);
    if (!id.success) return invalidId();

    const result = await deleteBrandRecord(id.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[brands] delete failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BRAND_WRITE_FAILED" }, { status: 500 });
  }
}
