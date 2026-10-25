import { NextResponse } from "next/server";

export function adminAuthErrorResponse(error: unknown): NextResponse | null {
  const message = error instanceof Error ? error.message : "";
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code ?? "")
      : "";

  if (message === "UNAUTHENTICATED" || code.startsWith("auth/")) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  if (message === "FORBIDDEN") {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  if (message === "AUTHORIZATION_LOOKUP_FAILED") {
    return NextResponse.json({ error: "AUTHORIZATION_LOOKUP_FAILED" }, { status: 500 });
  }

  return null;
}
