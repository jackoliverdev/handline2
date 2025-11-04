"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import { Shield, Cloud, Award, Tag } from "lucide-react";

interface DesignPrincipleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DesignPrinciple = ({ icon, title, description }: DesignPrincipleProps) => {
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
        {title}
      </h3>
      <p className="text-sm text-brand-secondary dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
};

export const DesignPrinciples = () => {
  const { t } = useLanguage();
  
  const principles = [
    {
      key: "protection",
      icon: <Shield className="h-8 w-8 text-brand-primary" />
    },
    {
      key: "comfort",
      icon: <Cloud className="h-8 w-8 text-brand-primary" />
    },
    {
      key: "quality",
      icon: <Award className="h-8 w-8 text-brand-primary" />
    },
    {
      key: "affordability",
      icon: <Tag className="h-8 w-8 text-brand-primary" />
    }
  ];

  return (
    <section className="py-16 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4">
            {t('productsDesignPrinciples.title')}
          </h2>
        </motion.div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-4 gap-x-8 gap-y-12">
          {principles.map((principle, index) => (
            <DesignPrinciple
              key={index}
              icon={principle.icon}
              title={t(`productsDesignPrinciples.${principle.key}.title`)}
              description={t(`productsDesignPrinciples.${principle.key}.description`)}
            />
          ))}
        </div>

        {/* Mobile: compact stacked cards with left-aligned icon */}
        <div className="md:hidden space-y-3">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/50 p-3 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white dark:bg-black/40 p-2 shadow-sm border border-gray-100 dark:border-gray-700/50">
                  {principle.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-brand-dark dark:text-white mb-0.5">
                    {t(`productsDesignPrinciples.${principle.key}.title`)}
                  </h3>
                  <p className="text-xs text-brand-secondary dark:text-gray-300 leading-relaxed">
                    {t(`productsDesignPrinciples.${principle.key}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 