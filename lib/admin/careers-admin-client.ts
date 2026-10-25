"use client";

import { adminFetch } from "@/lib/admin-api";
import type { CareerPost } from "@/lib/career-service";

export async function getAdminCareers(): Promise<CareerPost[]> {
  try {
    const { careers } = await adminFetch<{ careers: CareerPost[] }>("/api/admin/careers");
    return careers || [];
  } catch (error) {
    console.error("Error fetching career posts:", error);
    return [];
  }
}

export async function getAdminCareer(id: string): Promise<CareerPost> {
  try {
    const { career } = await adminFetch<{ career: CareerPost }>(`/api/admin/careers/${id}`);
    return career;
  } catch (error) {
    console.error("Error getting career post by id:", error);
    throw error;
  }
}

export async function createCareer(post: Omit<CareerPost, "id" | "created_at" | "updated_at">) {
  try {
    const { career } = await adminFetch<{ career: CareerPost }>("/api/admin/careers", {
      method: "POST",
      body: JSON.stringify(post),
    });
    return career;
  } catch (error) {
    console.error("Error creating career post:", error);
    throw error;
  }
}

export async function updateCareer(id: string, updates: Partial<CareerPost>) {
  try {
    const { career } = await adminFetch<{ career: CareerPost }>(`/api/admin/careers/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return career;
  } catch (error) {
    console.error("Error updating career post:", error);
    throw error;
  }
}

export async function deleteCareer(id: string) {
  try {
    await adminFetch<{ ok: true }>(`/api/admin/careers/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error("Error deleting career post:", error);
    throw error;
  }
}

export async function toggleCareerPublished(id: string) {
  try {
    const { career } = await adminFetch<{ career: CareerPost }>(`/api/admin/careers/${id}/toggle`, {
      method: "POST",
      body: JSON.stringify({ field: "is_published" }),
    });
    return career;
  } catch (error) {
    console.error("Error toggling career publish status:", error);
    throw error;
  }
}

export async function toggleCareerFeatured(id: string) {
  try {
    const { career } = await adminFetch<{ career: CareerPost }>(`/api/admin/careers/${id}/toggle`, {
      method: "POST",
      body: JSON.stringify({ field: "is_featured" }),
    });
    return career;
  } catch (error) {
    console.error("Error toggling career featured status:", error);
    throw error;
  }
}
