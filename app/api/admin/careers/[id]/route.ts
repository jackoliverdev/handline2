import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import {
  careerIdSchema,
  careerWriteSchema,
  deleteCareerRecord,
  getCareerRecord,
  updateCareerRecord,
} from "@/lib/server/careers-admin";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = careerIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const career = await getCareerRecord(id.data);
    if (!career) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ career });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[careers] read failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "CAREER_READ_FAILED" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = careerIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = careerWriteSchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const career = await updateCareerRecord(id.data, parsed.data);
    if (!career) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ career });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[careers] update failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "CAREER_WRITE_FAILED" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = careerIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    await deleteCareerRecord(id.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[careers] delete failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "CAREER_WRITE_FAILED" }, { status: 500 });
  }
}
