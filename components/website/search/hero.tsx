"use client";

import React from "react";
import { Search, Filter, TrendingUp, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

interface SearchHeroProps {
  query: string;
  totalResults: number;
  isLoading: boolean;
}

export const SearchHero = ({ query, totalResults, isLoading }: SearchHeroProps) => {
  const { t } = useLanguage();

  // Format results count for display
  const formatResultsCount = (count: number) => {
    if (count === 0) return "0";
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };

  const stats = [
    { 
      value: isLoading ? "..." : formatResultsCount(totalResults), 
      label: t("search.hero.stats.results") 
    },
    { 
      value: "6", 
      label: t("search.hero.stats.categories") 
    },
    { 
      value: "2", 
      label: t("search.hero.stats.languages") 
    },
    { 
      value: "24/7", 
      label: t("search.hero.stats.availability") 
    },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-light dark:bg-background pt-28 pb-6 md:pt-32 md:pb-16">
      {/* Decorative Elements */}
      <div className="absolute -top-32 -right-32 h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10"></div>
      <div className="absolute -bottom-32 -left-32 h-[250px] w-[250px] md:h-[400px] md:w-[400px] rounded-full bg-brand-primary/10 blur-3xl dark:bg-brand-primary/5"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={SPRING_CONFIG}
            className="mb-4 md:mb-6"
          >
            <div className="inline-flex items-center rounded-full border border-brand-primary px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm backdrop-blur-sm">
              <Search className="mr-1.5 h-3 w-3 md:h-4 md:w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium">
                {t("search.hero.badge")}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.1 }}
            className="relative mb-4 md:mb-6"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-brand-dark dark:text-white font-heading">
              {query ? (
                <>
                  {t("search.hero.headingWithQuery")} <span className="text-brand-primary">"{query}"</span>
                </>
              ) : (
                <>
                  {t("search.hero.heading")} <span className="text-brand-primary">{t("search.hero.headingAccent")}</span>
                </>
              )}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.2 }}
            className="mb-6 md:mb-10"
          >
            <p className="max-w-2xl text-base md:text-lg text-brand-secondary dark:text-gray-300">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("search.hero.searching")}
                </span>
              ) : query ? (
                totalResults > 0 ? (
                  t("search.hero.descriptionWithResults")
                    .replace('{count}', totalResults.toString())
                    .replace('{query}', query)
                ) : (
                  t("search.hero.descriptionNoResults").replace('{query}', query)
                )
              ) : (
                t("search.hero.description")
              )}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SPRING_CONFIG, delay: 0.3 }}
            className="mx-auto mb-6 md:mb-10 grid max-w-xl grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-bold text-brand-primary font-heading flex items-center gap-1">
                  {stat.value}
                  {isLoading && stat.label === t("search.hero.stats.results") && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                </div>
                <div className="mt-0.5 md:mt-1 text-xs md:text-sm text-brand-secondary dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Search Tips */}
          {query && totalResults === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_CONFIG, delay: 0.4 }}
              className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 md:p-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold text-brand-dark dark:text-white mb-2">
                    {t("search.hero.tips.title")}
                  </h3>
                  <ul className="text-sm text-brand-secondary dark:text-gray-300 space-y-1">
                    <li>• {t("search.hero.tips.checkSpelling")}</li>
                    <li>• {t("search.hero.tips.tryKeywords")}</li>
                    <li>• {t("search.hero.tips.useSynonyms")}</li>
                    <li>• {t("search.hero.tips.browseCategories")}</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}; 