'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PPESection } from '@/lib/ppe-standards/types';

interface Props {
  categorySlug: string;
  sections: PPESection[];
}

export function ENResourceSectionsList({ categorySlug, sections }: Props) {
  return (
    <section className="container py-6 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((s, idx) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="group rounded-2xl overflow-hidden bg-white dark:bg-black/40 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link href={`/resources/en-resource-centre/${categorySlug}/${s.slug}`} className="block">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                {s.imageUrl && (
                  <Image src={s.imageUrl} alt={s.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                {!s.imageUrl && <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700" />}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
                  {s.code ? `${s.code} — ${s.title}` : s.title}
                </h3>
                {s.intro && (
                  <p className="text-sm text-brand-secondary dark:text-gray-300 mt-2 line-clamp-3">{s.intro}</p>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


