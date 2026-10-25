import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import {
  deleteProductRecord,
  getProductRecord,
  productIdSchema,
  productWriteSchema,
  updateProductRecord,
} from "@/lib/server/products-admin";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = productIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const result = await getProductRecord(id.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ product: result.product });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[products] read failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PRODUCT_READ_FAILED" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = productIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = productWriteSchema.safeParse(body);
    if (!parsed.success || Object.keys(parsed.data).length === 0) {
      return invalidBody();
    }

    const result = await updateProductRecord(id.data, parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ product: result.product });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[products] update failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PRODUCT_WRITE_FAILED" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = productIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const result = await deleteProductRecord(id.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[products] delete failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PRODUCT_WRITE_FAILED" }, { status: 500 });
  }
}
