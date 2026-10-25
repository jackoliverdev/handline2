import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { productIdSchema, productToggleSchema, toggleProductField } from "@/lib/server/products-admin";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = productIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = productToggleSchema.safeParse(body);
    if (!parsed.success) {
      return invalidBody();
    }

    const result = await toggleProductField(id.data, parsed.data.field);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ product: result.product });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[products] toggle failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PRODUCT_WRITE_FAILED" }, { status: 500 });
  }
}
