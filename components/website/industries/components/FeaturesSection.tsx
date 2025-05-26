"use client";

import { motion } from 'framer-motion';
import { useLanguage } from "@/lib/context/language-context";
import { Shield, CheckCircle, Star, Zap, Award, Target } from 'lucide-react';
import type { Industry } from '@/lib/industries-service';

interface FeaturesSectionProps {
  industry: Industry;
}

// Icon mapping for different feature types
const getFeatureIcon = (index: number) => {
  const icons = [Shield, CheckCircle, Star, Zap, Award, Target];
  return icons[index % icons.length];
};

export function FeaturesSection({ industry }: FeaturesSectionProps) {
  const { t, language } = useLanguage();
  
  // Get localized features
  const features = industry.features || [];
  
  if (!features || features.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="pt-8 pb-16 bg-gradient-to-br from-brand-primary/5 via-transparent to-orange-500/5"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center mb-4 rounded-full bg-gradient-to-r from-brand-primary/10 to-orange-500/10 px-6 py-2 text-sm border border-brand-primary/20 backdrop-blur-sm"
          >
            <Star className="mr-2 h-4 w-4 text-brand-primary" />
            <span className="text-brand-dark dark:text-white font-medium">
              {t('industries.keyFeatures')}
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-4">
            {t('industries.features.title')}
          </h2>
          <p className="text-lg text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            {t('industries.features.description').replace('{industry}', industry.industry_name)}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-4 gap-4"
        >
          {features.map((feature, index) => {
            const IconComponent = getFeatureIcon(index);
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl bg-white dark:bg-black/50 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative p-4 space-y-3">
                  {/* Icon and Text - Now Inline */}
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-brand-primary/10 to-orange-500/10 border border-brand-primary/20 group-hover:from-brand-primary/20 group-hover:to-orange-500/20 transition-all duration-300 flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-brand-primary" />
                    </div>
                    
                    {/* Feature Text */}
                    <div className="flex-1">
                      <p className="text-sm text-brand-dark dark:text-white font-medium leading-relaxed group-hover:text-brand-primary transition-colors duration-300">
                        {feature}
                      </p>
                    </div>
                  </div>
                  
                  {/* Bottom Border Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Info */}
        {features.length > 6 && (
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center rounded-full bg-white dark:bg-black/50 px-6 py-3 text-sm border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm shadow-lg">
              <Award className="mr-2 h-4 w-4 text-brand-primary" />
              <span className="text-brand-dark dark:text-white font-medium">
                {t('industries.features.count').replace('{count}', features.length.toString())}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
} 