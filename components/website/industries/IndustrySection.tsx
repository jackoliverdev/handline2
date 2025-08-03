"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import type { IndustrySection as IndustrySectionType } from "@/lib/industries-service";

interface IndustrySectionProps {
  section: IndustrySectionType;
  index: number;
}

export function IndustrySection({ section, index }: IndustrySectionProps) {
  const { t } = useLanguage();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3 + (index * 0.2)
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mb-12"
    >
      {/* Section Card */}
      <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-black/50 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
        {/* Section Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-gray-700/50">
          <h2 className="text-xl md:text-2xl font-bold text-brand-dark dark:text-white mb-4">
            {section.title}
          </h2>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-brand-secondary dark:text-gray-300 leading-relaxed mb-0">
              {section.description}
            </p>
          </div>
        </div>

        {/* Hazards and Solutions Grid */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Key Hazards */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
                  {t('industries.keyHazards')}
                </h3>
              </div>
              
              <div className="space-y-2">
                {section.key_hazards.map((hazard, hazardIndex) => (
                  <motion.div
                    key={hazardIndex}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 transition-all duration-300 hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-800 dark:text-red-200 leading-relaxed">
                      {hazard}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* PPE Solutions */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
                  {t('industries.ppeSolutions')}
                </h3>
              </div>
              
              <div className="space-y-2">
                {section.ppe_solutions.map((solution, solutionIndex) => (
                  <motion.div
                    key={solutionIndex}
                    variants={itemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900/30"
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
                      {solution}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 