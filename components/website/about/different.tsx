"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/language-context";
import { Award, Settings, TagIcon, Recycle, Sliders, Users } from "lucide-react";

interface DifferentiatorProps {
  icon: React.ReactNode;
  title: string;
  titleAccent: string;
  description: string;
}

const Differentiator = ({ icon, title, titleAccent, description }: DifferentiatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="rounded-full bg-[#F5EFE0] dark:bg-gray-800 p-4 mb-4 shadow-sm">
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

export const Different = () => {
  const { t } = useLanguage();
  
  // Define differentiators in the specified order
  const topRow = [
    {
      key: "productQuality",
      icon: <Award className="h-8 w-8 text-brand-primary" />
    },
    {
      key: "customisation",
      icon: <Settings className="h-8 w-8 text-brand-primary" />
    },
    {
      key: "pricing",
      icon: <TagIcon className="h-8 w-8 text-brand-primary" />
    }
  ];
  
  const bottomRow = [
    {
      key: "innovation",
      icon: <Recycle className="h-8 w-8 text-brand-primary" />
    },
    {
      key: "flexibility",
      icon: <Sliders className="h-8 w-8 text-brand-primary" />
    },
    {
      key: "service",
      icon: <Users className="h-8 w-8 text-brand-primary" />
    }
  ];
  
  // Combine rows for rendering
  const allDifferentiators = [...topRow, ...bottomRow];

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
          <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
            {t('about.different.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4">
            {t('about.different.heading')}
          </h2>
          <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            {t('about.different.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {allDifferentiators.map((item, index) => (
            <Differentiator
              key={index}
              icon={item.icon}
              title={t(`about.different.${item.key}.title`)}
              titleAccent={t(`about.different.${item.key}.titleAccent`)}
              description={t(`about.different.${item.key}.description`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 