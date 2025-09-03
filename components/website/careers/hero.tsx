"use client";

import React from "react";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import Image from "next/image";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface CareersHeroProps {
  language: string;
}

export function CareersHero({ language }: CareersHeroProps) {
  const { t } = useLanguage();

  return (
    <div className="relative mb-6 sm:mb-16 md:mb-32 bg-[#F5EFE0] dark:bg-background">
      {/* Background section with slanted edge (matching About hero) */}
      <section
        className="relative pt-28 md:pt-32 pb-56 md:pb-48 lg:pb-40 bg-[#F5EFE0] dark:bg-background overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <Image
            src="/images/career_bckgr.jpg"
            alt="Careers background - Hand Line"
            fill
            className="object-cover object-center"
            style={{ objectPosition: "25% 65%" }}
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Stable slanted bottom overlay (prevents initial paint flicker) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-48 lg:h-56 bg-[#F5EFE0] dark:bg-background transform-gpu"
          style={{
            WebkitClipPath: "polygon(0% 40%, 100% 70%, 100% 100%, 0% 100%)",
            clipPath: "polygon(0% 40%, 100% 70%, 100% 100%, 0% 100%)",
            willChange: "clip-path",
          }}
        />

        <div className="container mx-auto px-6 relative max-w-7xl">
          <div className="flex flex-col lg:grid lg:grid-cols-3 items-center gap-6">
            {/* Text Content */}
            <div className="flex flex-col space-y-4 mb-8 sm:mb-0 w-full lg:col-span-2">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={SPRING_CONFIG}
              >
                <div className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-brand-primary backdrop-blur-sm">
                  <Users className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-brand-primary" />
                  <span className="text-brand-dark dark:text-white font-medium font-heading">
                    {t('careers.hero.badge')}
                  </span>
                </div>
              </motion.div>

              {/* Heading with accent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.1 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight font-heading">
                  <span className="text-white drop-shadow-md">{t('careers.hero.titleStart')} </span>
                  <span className="text-brand-primary drop-shadow-md">{t('careers.hero.titleAccent')}</span>
                </h1>
              </motion.div>

              {/* Description paragraphs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.2 }}
              >
                <p className="max-w-3xl text-base md:text-lg text-white/90 drop-shadow-sm">
                  {t('careers.hero.description1')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING_CONFIG, delay: 0.25 }}
              >
                <p className="max-w-3xl text-base md:text-lg text-white/90 drop-shadow-sm">
                  {t('careers.hero.description2')}
                </p>
              </motion.div>
              {/* No buttons in header as per feedback */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}