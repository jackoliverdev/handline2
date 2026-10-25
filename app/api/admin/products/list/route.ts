import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse } from "@/lib/server/admin-http";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const { data, error } = await supabaseAdmin
      .from("products")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("order_priority", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[products] list failed", error.message);
      return NextResponse.json({ error: "PRODUCT_READ_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ products: data ?? [] });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[products] list failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PRODUCT_READ_FAILED" }, { status: 500 });
  }
}
