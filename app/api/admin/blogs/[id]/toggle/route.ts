import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { blogIdSchema, blogToggleSchema, toggleBlogFeaturedRecord, toggleBlogPublishedRecord } from "@/lib/server/blog-admin";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const id = blogIdSchema.safeParse(params.id);
    if (!id.success) return invalidBody();

    const body = await request.json().catch(() => null);
    const parsed = blogToggleSchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const blog =
      parsed.data.field === "is_published"
        ? await toggleBlogPublishedRecord(id.data)
        : await toggleBlogFeaturedRecord(id.data);

    if (!blog) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[blogs] toggle failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BLOG_WRITE_FAILED" }, { status: 500 });
  }
}
