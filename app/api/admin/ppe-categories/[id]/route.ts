import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import {
  deletePpeCategoryRecord,
  getPpeCategoryRecord,
  ppeCategoryIdSchema,
  updatePpeCategoryRecord,
  updatePpeCategorySchema,
} from "@/lib/server/ppe-admin";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = ppeCategoryIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const record = await getPpeCategoryRecord(id.data);
    if (!record) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ category: record.category, sections: record.sections });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[ppe] read failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PPE_READ_FAILED" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = ppeCategoryIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = updatePpeCategorySchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const result = await updatePpeCategoryRecord(id.data, parsed.data);
    if (!result) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ category: result.category, sections: result.sections });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[ppe] update failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PPE_WRITE_FAILED" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = ppeCategoryIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    await deletePpeCategoryRecord(id.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[ppe] delete failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "PPE_WRITE_FAILED" }, { status: 500 });
  }
}
