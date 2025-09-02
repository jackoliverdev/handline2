"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export function CareersDetailCTA({ onApply }: { onApply: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-white dark:from-black/50 dark:via-gray-900/50 dark:to-black/50 border border-gray-100 dark:border-gray-700/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(white,transparent_70%)]" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-primary/10 to-brand-primary/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-brand-primary/10 to-brand-primary/10 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative text-center max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center mb-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-primary/10 px-4 py-2 text-sm border border-brand-primary/20 backdrop-blur-sm">
          <Users className="mr-2 h-4 w-4 text-brand-primary" />
          <span className="text-brand-dark dark:text-white font-medium">
            {t('careers.post.readyToJoinBadge')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-brand-dark dark:text-white mb-4 leading-relaxed">
          {t('careers.post.readyToJoin')}
        </h3>

        {/* Description (equality statement) */}
        <p className="text-brand-secondary dark:text-gray-300 mb-6 max-w-5xl mx-auto">
          {t('careers.equalityStatement')}
        </p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Button 
            size="lg" 
            className="bg-brand-primary hover:bg-brand-primary/90 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl transform px-8"
            onClick={onApply}
          >
            {t('careers.post.applyNow')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}


