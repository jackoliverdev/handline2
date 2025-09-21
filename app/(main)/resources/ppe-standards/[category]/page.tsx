import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { ENResourceBreadcrumb } from '@/components/website/resources/en-resource/breadcrumb';
import { ENResourceCategoryHero } from '@/components/website/resources/en-resource/category-hero';
import { ENResourceSectionsBlocks } from '@/components/website/resources/en-resource/sections-blocks';
import { ENResourceFooterCTA } from '@/components/website/resources/en-resource/footer-cta';
import { getService } from '@/lib/ppe-standards/service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Params { params: { category: string } }

export default async function CategoryPage({ params }: Params) {
  const lang = (cookies().get('language')?.value as 'en' | 'it') || 'en';
  const svc = getService();
  const category = await svc.getCategory(params.category, lang);
  if (!category) return notFound();
  const sections = await svc.getSectionsByCategory(params.category, lang);
  return (
    <main className="flex flex-col min-h-[100dvh] bg-brand-light dark:bg-background pt-11">
      {/* Breadcrumb bar (mirrors Product detail) */}
      <div className="bg-brand-light dark:bg-background border-b border-brand-primary/10 dark:border-brand-primary/20">
        <div className="container py-2">
          <ENResourceBreadcrumb category={{ ...category, title: category.titleLocales?.[lang] || category.title }} />
        </div>
      </div>
      <ENResourceCategoryHero category={{ ...category, title: category.titleLocales?.[lang] || category.title, summary: category.summaryLocales?.[lang] || category.summary }} />
      <ENResourceSectionsBlocks sections={sections} />
      <ENResourceFooterCTA />
    </main>
  );
}


