"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { Rocket, Globe, Star } from "lucide-react";

interface ReasonProps {
  icon: React.ReactNode;
  title: string;
  titleAccent: string;
  description: string;
}

const Reason = ({ icon, title, titleAccent, description }: ReasonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="rounded-full bg-white dark:bg-black/50 p-4 mb-4 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">
        {title} <span className="text-brand-primary">{titleAccent}</span>
      </h3>
      <p className="text-sm text-brand-secondary dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
};

export function WhyJoin() {
  const { t } = useLanguage();

  const reasons = [
    {
      key: "opportunity",
      icon: <Rocket className="h-8 w-8 text-brand-primary" />,
    },
    {
      key: "international",
      icon: <Globe className="h-8 w-8 text-brand-primary" />,
    },
    {
      key: "greatPlace",
      icon: <Star className="h-8 w-8 text-brand-primary" />,
    },
  ];

  return (
    <section className="py-16 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-black/50 dark:via-gray-900/50 dark:to-black/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 md:p-10 backdrop-blur-sm shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(white,transparent_70%)]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative text-center mb-10"
          >
            <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              {t("careers.whyJoin.badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4">
              {t("careers.whyJoin.title")}
            </h2>
            <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-3xl mx-auto">
              {t("careers.whyJoin.description")}
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {reasons.map((item, index) => (
              <Reason
                key={index}
                icon={item.icon}
                title={t(`careers.whyJoin.items.${item.key}.title`)}
                titleAccent={t(`careers.whyJoin.items.${item.key}.titleAccent`)}
                description={t(`careers.whyJoin.items.${item.key}.description`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


