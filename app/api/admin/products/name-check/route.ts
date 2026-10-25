import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { isProductNameTaken, productNameQuerySchema } from "@/lib/server/products-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const name = productNameQuerySchema.safeParse(new URL(request.url).searchParams.get("name"));
    if (!name.success) return invalidBody();

    const taken = await isProductNameTaken(name.data);
    return NextResponse.json({ taken });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[products] name check failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PRODUCT_READ_FAILED" }, { status: 500 });
  }
}
