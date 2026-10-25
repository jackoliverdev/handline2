"use client";

import { getAuth } from "firebase/auth";

export class AdminApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.code = code;
  }
}

type AdminFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: HeadersInit;
};

/**
 * Authenticated fetch for admin server routes.
 * Later admin areas should call this instead of the Supabase anon client.
 */
export async function adminFetch<T>(path: string, options: AdminFetchOptions = {}): Promise<T> {
  const user = getAuth().currentUser;
  if (!user) {
    throw new AdminApiError(401, "UNAUTHENTICATED", "Please sign in again.");
  }

  const token = await user.getIdToken();
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${token}`);

  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, { ...options, headers });
  const payload = (await response.json().catch(() => null)) as ({ error?: string } & T) | null;

  if (!response.ok) {
    const code =
      payload && typeof payload.error === "string" && payload.error.length > 0
        ? payload.error
        : "REQUEST_FAILED";
    throw new AdminApiError(response.status, code, "The request could not be completed. Try again.");
  }

  return payload as T;
}
