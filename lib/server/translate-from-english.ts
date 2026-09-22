import OpenAI from 'openai';
import { LANGUAGE_META, type Language } from '@/lib/i18n/config';

export class TranslateFromEnglishError extends Error {
  constructor(
    public readonly code: 'EMPTY_SOURCE' | 'SHAPE_MISMATCH' | 'MODEL_FAILED',
    message: string
  ) {
    super(message);
    this.name = 'TranslateFromEnglishError';
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function sanitizeSource(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim() ? value : undefined;
  }

  if (Array.isArray(value)) {
    if (value.every((item) => typeof item === 'string')) {
      const next = value.filter((item) => item.trim());
      return next.length ? next : undefined;
    }

    if (value.every((item) => isRecord(item) || item == null)) {
      const next = value.map((item) => {
        const cleaned = isRecord(item) ? sanitizeSource(item) : undefined;
        return isRecord(cleaned) ? cleaned : {};
      });
      return next.some((item) => Object.keys(item).length > 0) ? next : undefined;
    }

    return undefined;
  }

  if (isRecord(value)) {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value)) {
      const cleaned = sanitizeSource(child);
      if (cleaned !== undefined) next[key] = cleaned;
    }
    return Object.keys(next).length ? next : undefined;
  }

  return undefined;
}

function shapesMatch(source: unknown, translated: unknown): boolean {
  if (typeof source === 'string') return typeof translated === 'string';

  if (Array.isArray(source)) {
    if (!Array.isArray(translated) || translated.length !== source.length) return false;
    return source.every((item, index) => shapesMatch(item, translated[index]));
  }

  if (isRecord(source)) {
    if (!isRecord(translated)) return false;
    const sourceKeys = Object.keys(source).sort();
    const translatedKeys = Object.keys(translated).sort();
    if (sourceKeys.length !== translatedKeys.length) return false;
    if (sourceKeys.some((key, index) => key !== translatedKeys[index])) return false;
    return sourceKeys.every((key) => shapesMatch(source[key], translated[key]));
  }

  return false;
}

function buildSystemPrompt(targetLanguage: Exclude<Language, 'en'>): string {
  const nativeName = LANGUAGE_META[targetLanguage].nativeName;
  return [
    'You are translating product and content copy for Hand Line, a B2B Italian manufacturer of industrial PPE (safety gloves and related protection).',
    'The source is English with British spelling. Translate into ' + nativeName + '.',
    'Keep Markdown, line breaks, product codes/SKUs, EN/ISO standards, URLs, emails, units and numbers unchanged.',
    'Translate descriptive names (for example Ear Plugs) but do not invent extra copy.',
    'Empty stays empty. Return a JSON object with the same keys and array lengths as the input.',
    'Professional B2B tone, similar length to the source.',
  ].join(' ');
}

function parseJsonObject(text: string | null | undefined): unknown {
  if (!text?.trim()) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end <= start) return undefined;
    try {
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      return undefined;
    }
  }
}

async function requestTranslation(
  client: OpenAI,
  model: string,
  targetLanguage: Exclude<Language, 'en'>,
  source: Record<string, unknown>
): Promise<unknown> {
  const completion = await client.chat.completions.create({
    model,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: buildSystemPrompt(targetLanguage) },
      {
        role: 'user',
        content: 'Translate this JSON object. Return JSON only.\n' + JSON.stringify(source),
      },
    ],
  });

  return parseJsonObject(completion.choices[0]?.message?.content);
}

export async function translateFromEnglish(
  targetLanguage: Exclude<Language, 'en'>,
  source: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORGANIZATION,
    project: process.env.OPENAI_PROJECT,
    timeout: 50_000,
  });

  const model = process.env.OPENAI_MODEL || 'gpt-5.6';

  let translated: unknown;
  try {
    translated = await requestTranslation(client, model, targetLanguage, source);
  } catch {
    throw new TranslateFromEnglishError('MODEL_FAILED', 'Model request failed');
  }

  if (!isRecord(translated) || !shapesMatch(source, translated)) {
    try {
      translated = await requestTranslation(client, model, targetLanguage, source);
    } catch {
      throw new TranslateFromEnglishError('MODEL_FAILED', 'Model request failed');
    }
  }

  if (!isRecord(translated) || !shapesMatch(source, translated)) {
    throw new TranslateFromEnglishError('SHAPE_MISMATCH', 'Translated JSON did not match the source shape');
  }

  return translated;
}
