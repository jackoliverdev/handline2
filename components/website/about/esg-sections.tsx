"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import { Leaf, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface ESGSectionProps {
  sectionKey: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  reverse?: boolean;
}

const ESGSection = ({ sectionKey, icon, iconBg, iconColor, reverse = false }: ESGSectionProps) => {
  const { t } = useLanguage();
  
  // Safely access ESG points using individual translation keys with index
  const getESGPoint = (index: number) => {
    return t(`about.esg.${sectionKey}.points.${index}`);
  };
  
  // Helper function to convert icon color to bullet point background color
  const getBulletColor = (sectionKey: string) => {
    switch (sectionKey) {
      case 'environmental':
        return 'bg-green-600 dark:bg-green-400';
      case 'social':
        return 'bg-blue-600 dark:bg-blue-400';
      case 'governance':
        return 'bg-purple-600 dark:bg-purple-400';
      default:
        return 'bg-gray-600 dark:bg-gray-400';
    }
  };
  
  // Define number of points for each section
  const getPointIndices = (section: string) => {
    switch (section) {
      case 'environmental':
        return [0, 1, 2, 3]; // 4 points
      case 'social':
        return [0, 1, 2]; // 3 points
      case 'governance':
        return [0, 1, 2]; // 3 points
      default:
        return [];
    }
  };
  
  const pointIndices = getPointIndices(sectionKey);
  
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: reverse ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`space-y-4 ${reverse ? 'lg:order-2' : ''}`}
      >
        <Badge className={`w-fit ${iconBg} ${iconColor} border-current/20`}>
          {t(`about.esg.${sectionKey}.badge`)}
        </Badge>
        
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-brand-dark dark:text-white">
          {t(`about.esg.${sectionKey}.title`)}
        </h2>
        
        <p className="text-base text-brand-secondary dark:text-gray-300">
          {t(`about.esg.${sectionKey}.description`)}
        </p>
        
        <ul className="space-y-3">
          {pointIndices.map((index) => (
            <li key={index} className="flex items-start gap-2">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getBulletColor(sectionKey)}`}></div>
              <span className="text-sm text-brand-secondary dark:text-gray-300">
                {getESGPoint(index)}
              </span>
            </li>
          ))}
        </ul>
        
        {/* Only show closing text for environmental section */}
        {sectionKey === 'environmental' && (
          <p className="text-sm italic text-brand-secondary dark:text-gray-400 pt-2">
            {t(`about.esg.${sectionKey}.closing`)}
          </p>
        )}
      </motion.div>
      
      {/* Icon */}
      <motion.div 
        initial={{ opacity: 0, x: reverse ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`flex justify-center ${reverse ? 'lg:order-1' : ''}`}
      >
        <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${iconBg} flex items-center justify-center`}>
          <div className={`text-8xl md:text-9xl ${iconColor}`}>
            {icon}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const EsgSections = () => {
  const sections = [
    {
      key: 'environmental',
      icon: <Leaf size={80} />,
      iconBg: 'bg-green-200 dark:bg-green-800/50',
      iconColor: 'text-green-600 dark:text-green-400',
      reverse: false
    },
    {
      key: 'social',
      icon: <Users size={80} />,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      reverse: true
    },
    {
      key: 'governance',
      icon: <Shield size={80} />,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      reverse: false
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-green-100/90 dark:bg-green-900/30">
      <div className="container px-4 md:px-6">
        <div className="space-y-16 md:space-y-20">
          {sections.map((section, index) => (
            <ESGSection
              key={section.key}
              sectionKey={section.key}
              icon={section.icon}
              iconBg={section.iconBg}
              iconColor={section.iconColor}
              reverse={section.reverse}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 