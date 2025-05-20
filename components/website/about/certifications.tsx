"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/language-context";
import { Shield, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Certifications = () => {
  const { t } = useLanguage();
  
  const certTypes = [
    {
      key: "iso",
      icon: <Award className="h-5 w-5 text-brand-primary" />,
    },
    {
      key: "ce",
      icon: <CheckCircle className="h-5 w-5 text-brand-primary" />,
    },
    {
      key: "en",
      icon: <CheckCircle className="h-5 w-5 text-brand-primary" />,
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

        {/* Main certification statement */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-[#F5EFE0]/80 dark:bg-transparent border-brand-primary/10 dark:border-brand-primary/20 shadow-sm mb-5">
            <CardContent className="p-3 text-center flex items-center justify-center gap-3">
              <motion.div
                initial={{ rotate: -15, scale: 0.8 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Shield className="h-6 w-6 text-brand-primary" />
              </motion.div>
              <p className="text-base text-brand-dark dark:text-white">
                {t('about.certifications.mainStatement')}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Certification types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
              <Card className="bg-[#F5EFE0]/80 dark:bg-transparent border-brand-primary/10 dark:border-brand-primary/20 shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                      className="rounded-full bg-brand-primary/10 p-2"
                    >
                      {cert.icon}
                    </motion.div>
                    <div className="text-left">
                      <h3 className="text-base font-semibold text-brand-dark dark:text-white">
                        {t(`about.certifications.types.${cert.key}.title`)}
                      </h3>
                      <p className="text-xs text-brand-secondary dark:text-gray-300">
                        {t(`about.certifications.types.${cert.key}.description`)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-3 text-center"
        >
          <p className="text-xs text-brand-secondary dark:text-gray-400 italic">
            {t('about.certifications.note')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 