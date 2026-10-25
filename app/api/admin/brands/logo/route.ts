import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse } from "@/lib/server/admin-http";
import { uploadBrandLogoFile } from "@/lib/server/brands-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const formData = await request.formData().catch(() => null);
    const file = formData?.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "INVALID_LOGO" }, { status: 400 });
    }

    const result = await uploadBrandLogoFile(file);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ logo_url: result.logo_url });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[brands] logo route failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "LOGO_UPLOAD_FAILED" }, { status: 500 });
  }
}
