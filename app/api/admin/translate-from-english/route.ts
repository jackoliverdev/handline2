import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-auth';
import { isLanguage } from '@/lib/i18n/config';
import {
  sanitizeSource,
  translateFromEnglish,
  TranslateFromEnglishError,
} from '@/lib/server/translate-from-english';

export const runtime = 'nodejs';
export const maxDuration = 60;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export async function POST(request: Request) {
  try {
    await requireAdmin(request.headers.get('authorization') || undefined);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'AI_NOT_CONFIGURED' }, { status: 503 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
    }

    if (!isRecord(body)) {
      return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
    }

    const targetLanguage = body.targetLanguage;
    if (!isLanguage(targetLanguage) || targetLanguage === 'en') {
      return NextResponse.json({ error: 'INVALID_LANGUAGE' }, { status: 400 });
    }

    if (!isRecord(body.source)) {
      return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
    }

    const sanitized = sanitizeSource(body.source);
    if (!isRecord(sanitized)) {
      return NextResponse.json({ error: 'EMPTY_SOURCE' }, { status: 400 });
    }

    const fields = await translateFromEnglish(targetLanguage, sanitized);
    console.info('[translate-from-english] ok', { targetLanguage, fields: Object.keys(fields) });
    return NextResponse.json({ fields });
  } catch (error) {
    if (error instanceof TranslateFromEnglishError) {
      console.error('[translate-from-english] failed', { code: error.code, message: error.message });
      if (error.code === 'EMPTY_SOURCE') {
        return NextResponse.json({ error: 'EMPTY_SOURCE' }, { status: 400 });
      }
      return NextResponse.json(
        { error: error.code === 'SHAPE_MISMATCH' ? 'TRANSLATION_SHAPE_MISMATCH' : 'TRANSLATION_FAILED' },
        { status: 502 }
      );
    }

    console.error('[translate-from-english] unexpected', error instanceof Error ? error.message : error);

    const message = error instanceof Error ? error.message : 'Internal server error';
    if (message === 'UNAUTHENTICATED') {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    if (message === 'FORBIDDEN') {
      return NextResponse.json({ error: message }, { status: 403 });
    }

    return NextResponse.json({ error: 'TRANSLATION_FAILED' }, { status: 502 });
  }
}
