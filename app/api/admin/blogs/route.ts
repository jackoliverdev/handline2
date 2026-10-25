import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server/admin-auth";
import { adminAuthErrorResponse, invalidBody } from "@/lib/server/admin-http";
import { blogWriteSchema, insertBlog, listBlogs } from "@/lib/server/blog-admin";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const blogs = await listBlogs();
    return NextResponse.json({ blogs });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[blogs] list failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BLOG_READ_FAILED" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get("authorization") || undefined);

    const body = await request.json().catch(() => null);
    const parsed = blogWriteSchema.safeParse(body);
    if (!parsed.success) return invalidBody();

    const blog = await insertBlog(parsed.data);
    return NextResponse.json({ blog });
  } catch (error) {
    const authResponse = adminAuthErrorResponse(error);
    if (authResponse) return authResponse;
    console.error("[blogs] create failed", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "BLOG_WRITE_FAILED" }, { status: 500 });
  }
}
