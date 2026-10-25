import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { blogIdSchema, blogWriteSchema, deleteBlogRecord, getBlogRecord, updateBlogRecord } from "@/lib/server/blog-admin";

export const runtime = "nodejs";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = blogIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const blog = await getBlogRecord(id.data);
    if (!blog) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[blogs] read failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BLOG_READ_FAILED" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = blogIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = blogWriteSchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const blog = await updateBlogRecord(id.data, parsed.data);
    if (!blog) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[blogs] update failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BLOG_WRITE_FAILED" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = blogIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    await deleteBlogRecord(id.data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[blogs] delete failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BLOG_WRITE_FAILED" }, { status: 500 });
  }
}
