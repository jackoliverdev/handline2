import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import {
  careerIdSchema,
  careerToggleSchema,
  toggleCareerFeaturedRecord,
  toggleCareerPublishedRecord,
} from "@/lib/server/careers-admin";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = careerIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = careerToggleSchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const career =
      parsed.data.field === "is_published"
        ? await toggleCareerPublishedRecord(id.data)
        : await toggleCareerFeaturedRecord(id.data);

    if (!career) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ career });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[careers] toggle failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "CAREER_WRITE_FAILED" }, { status: 500 });
  }
}
