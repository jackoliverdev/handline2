export const UPLOAD_BUCKETS = ["products", "technical-sheets", "ppehub", "blog-covers", "industries"] as const;

export type UploadBucket = typeof UPLOAD_BUCKETS[number];

const ID = "[A-Za-z0-9-]{1,64}";
const TS = "\\d{10,16}";
const EXT = "[A-Za-z0-9]{1,8}";

const PRODUCT_PATH = new RegExp(`^${ID}/${TS}\\.${EXT}$`);
const TECHNICAL_SHEET_ROOT = /^[A-Za-z0-9_.\- ()]{1,300}$/;
const TECHNICAL_SHEET_DOC =
  /^DOCs\/([^\\]{1,200})\/HLC_\d{8}_[A-Za-z]{0,3}_DoC_\1\.[^/\\]{1,60}$/;
const PPEHUB_PATH = new RegExp(`^${ID}/(hero|card|sections/${ID}/icon|sections/${ID})/${TS}\\.${EXT}$`);
const BLOG_COVER_PATH = new RegExp(`^${ID}/${TS}(-[A-Za-z0-9]{1,12})?\\.${EXT}$`);

const UPSERT_BUCKETS = new Set<UploadBucket>(["technical-sheets", "ppehub"]);

function containsControlCharacter(path: string): boolean {
  for (const character of path) {
    const codePoint = character.codePointAt(0) ?? 0;
    if (codePoint < 32 || codePoint === 127) return true;
  }
  return false;
}

function matchesBucket(bucket: UploadBucket, path: string): boolean {
  switch (bucket) {
    case "products":
    case "industries":
      return PRODUCT_PATH.test(path);
    case "technical-sheets":
      return TECHNICAL_SHEET_ROOT.test(path) || TECHNICAL_SHEET_DOC.test(path);
    case "ppehub":
      return PPEHUB_PATH.test(path);
    case "blog-covers":
      return BLOG_COVER_PATH.test(path);
    default:
      return false;
  }
}

export function validateUploadPath(
  bucket: UploadBucket,
  path: string,
  upsert: boolean
): { ok: true } | { ok: false; error: "INVALID_PATH" | "UPSERT_NOT_ALLOWED" } {
  if (
    path.length < 1 ||
    path.length > 400 ||
    path.includes("..") ||
    path.startsWith("/") ||
    path.includes("\\") ||
    containsControlCharacter(path) ||
    !matchesBucket(bucket, path)
  ) {
    return { ok: false, error: "INVALID_PATH" };
  }

  if (upsert && !UPSERT_BUCKETS.has(bucket)) {
    return { ok: false, error: "UPSERT_NOT_ALLOWED" };
  }

  return { ok: true };
}
