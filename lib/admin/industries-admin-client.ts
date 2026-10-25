"use client";

import { adminFetch } from "@/lib/admin-api";
import { adminUploadFile } from "@/lib/admin/upload-client";
import type { Industry } from "@/lib/industries-service";

export async function createIndustry(industryData: Omit<Industry, "id" | "created_at" | "updated_at">) {
  try {
    const result = await adminFetch<{ industry: Industry }>("/api/admin/industries", {
      method: "POST",
      body: JSON.stringify(industryData),
    });
    return result.industry;
  } catch (error) {
    console.error("Error in createIndustry:", error);
    throw error;
  }
}

export async function updateIndustry(id: string, updates: Partial<Industry>) {
  try {
    const result = await adminFetch<{ industry: Industry }>(`/api/admin/industries/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return result.industry;
  } catch (error) {
    console.error("Error in updateIndustry:", error);
    throw error;
  }
}

export async function deleteIndustry(id: string) {
  try {
    await adminFetch<{ ok: true }>(`/api/admin/industries/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error("Error in deleteIndustry:", error);
    throw error;
  }
}

export async function uploadIndustryImage(industryId: string, file: File): Promise<{ url: string | null }> {
  try {
    if (!industryId) {
      throw new Error("Industry ID is required for image upload");
    }

    const fileExt = file.name.split(".").pop();
    const url = await adminUploadFile("industries", `${industryId}/${Date.now()}.${fileExt}`, file);
    return { url };
  } catch (error) {
    console.error("Error uploading industry image:", error);
    return { url: null };
  }
}
