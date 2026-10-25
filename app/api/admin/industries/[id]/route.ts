import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import {
  deleteIndustryRecord,
  industryIdSchema,
  updateIndustryRecord,
  updateIndustrySchema,
} from "@/lib/server/industries-admin";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = industryIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = updateIndustrySchema.safeParse(body);
    if (!parsed.success) {
      return invalidBody();
    }

    const result = await updateIndustryRecord(id.data, parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ industry: result.industry });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[industries] update failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "INDUSTRY_WRITE_FAILED" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = industryIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const result = await deleteIndustryRecord(id.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[industries] delete failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "INDUSTRY_WRITE_FAILED" }, { status: 500 });
  }
}
