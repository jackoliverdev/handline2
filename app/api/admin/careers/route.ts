import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { careerWriteSchema, insertCareer, listCareers } from "@/lib/server/careers-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const careers = await listCareers();
    return NextResponse.json({ careers });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[careers] list failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "CAREER_READ_FAILED" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const body = await request.json().catch(() => null);
    const parsed = careerWriteSchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const career = await insertCareer(parsed.data);
    return NextResponse.json({ career });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[careers] create failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "CAREER_WRITE_FAILED" }, { status: 500 });
  }
}
