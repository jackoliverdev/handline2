"use client";

import { adminFetch } from "@/lib/admin-api";
import { adminUploadFile } from "@/lib/admin/upload-client";
import type { BlogPost } from "@/lib/blog-service";

export async function getAdminBlogs(): Promise<{ data: BlogPost[] | null; count: number | null }> {
  try {
    const { blogs } = await adminFetch<{ blogs: BlogPost[] }>("/api/admin/blogs");
    return { data: blogs ?? null, count: null };
  } catch (error) {
    console.error("Error in getAdminBlogs:", error);
    throw error;
  }
}

export async function getAdminBlog(id: string): Promise<BlogPost> {
  try {
    const { blog } = await adminFetch<{ blog: BlogPost }>(`/api/admin/blogs/${id}`);
    return blog;
  } catch (error) {
    console.error("Error getting blog post:", error);
    throw error;
  }
}

export async function createBlog(blogData: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  try {
    const { blog } = await adminFetch<{ blog: BlogPost }>("/api/admin/blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
    });
    return blog;
  } catch (error) {
    console.error("Error in createBlog:", error);
    throw error;
  }
}

export async function updateBlog(id: string, updates: Partial<BlogPost>) {
  try {
    const { blog } = await adminFetch<{ blog: BlogPost }>(`/api/admin/blogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return blog;
  } catch (error) {
    console.error("Error in updateBlog:", error);
    throw error;
  }
}

export async function deleteBlog(id: string) {
  try {
    await adminFetch<{ ok: true }>(`/api/admin/blogs/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error("Error in deleteBlog:", error);
    throw error;
  }
}

export async function toggleBlogPublished(id: string): Promise<BlogPost & { is_published: boolean }> {
  try {
    const { blog } = await adminFetch<{ blog: BlogPost & { is_published: boolean } }>(`/api/admin/blogs/${id}/toggle`, {
      method: "POST",
      body: JSON.stringify({ field: "is_published" }),
    });
    return blog;
  } catch (error) {
    console.error("Error toggling blog published status:", error);
    throw error;
  }
}

export async function toggleBlogFeatured(id: string): Promise<BlogPost & { is_featured: boolean }> {
  try {
    const { blog } = await adminFetch<{ blog: BlogPost & { is_featured: boolean } }>(`/api/admin/blogs/${id}/toggle`, {
      method: "POST",
      body: JSON.stringify({ field: "is_featured" }),
    });
    return blog;
  } catch (error) {
    console.error("Error toggling blog featured status:", error);
    throw error;
  }
}

export async function uploadBlogCoverImage(blogId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!blogId) {
      throw new Error("Blog ID is required for image upload");
    }
    const ext = file.name.split(".").pop();
    const url = await adminUploadFile("blog-covers", `${blogId}/${Date.now()}.${ext}`, file);
    return { url };
  } catch (error) {
    console.error("Error uploading blog cover image:", error);
    return { url: null };
  }
}

export async function uploadBlogExtraImage(blogId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!blogId) {
      throw new Error("Blog ID is required for image upload");
    }
    const ext = file.name.split(".").pop();
    const url = await adminUploadFile(
      "blog-covers",
      `${blogId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`,
      file
    );
    return { url };
  } catch (error) {
    console.error("Error uploading blog extra image:", error);
    return { url: null };
  }
}
