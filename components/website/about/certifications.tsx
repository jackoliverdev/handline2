"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/language-context";
import { Shield, CheckCircle, Leaf, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Certifications = () => {
  const { t } = useLanguage();
  
  const certTypes = [
    {
      key: "quality",
      icon: <Image src="/icons/iso-9001.png" alt="ISO 9001" width={24} height={24} className="text-brand-primary" />,
    },
    {
      key: "compliance",
      icon: <CheckCircle className="h-6 w-6 text-brand-primary" />,
    },
  ];
  
  return (
    <section className="pt-10 pb-24 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-5"
        >
          <Badge className="mb-1 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
            {t('about.certifications.badge')}
          </Badge>
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-2">
            {t('about.certifications.heading')}
          </h2>
        </motion.div>

        {/* Certification types - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {certTypes.map((cert, index) => (
            <motion.div
              key={cert.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + (index * 0.1),
                ease: "easeOut"
              }}
            >
              <Card className="bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      className="rounded-full bg-brand-primary/10 p-3"
                    >
                      {cert.icon}
                    </motion.div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-1">
                        {t(`about.certifications.types.${cert.key}.title`)}
                      </h3>
                      <p className="text-sm text-brand-secondary dark:text-gray-300">
                        {t(`about.certifications.types.${cert.key}.description`)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Environmental Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="rounded-full bg-green-100 dark:bg-green-900/20 p-2"
                  >
                    <Leaf className="h-5 w-5 text-green-600" />
                  </motion.div>
                  <div className="text-left">
                    <h3 className="text-base font-semibold text-brand-dark dark:text-white mb-1">
                      {t('about.certifications.environmental.title')}
                    </h3>
                    <p className="text-sm text-brand-secondary dark:text-gray-300">
                      {t('about.certifications.environmental.description')}
                    </p>
                  </div>
                </div>
                <Link 
                  href="/about/esg"
                  className="group flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  <span className="text-sm font-medium">{t('about.certifications.environmental.learnMore')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-4 text-center"
        >
          <p className="text-xs text-brand-secondary dark:text-gray-400 italic">
            {t('about.certifications.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 