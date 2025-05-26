"use client";

import React from "react";
import { Shield, Cpu, Users, Star, Eye, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const Values = () => {
  const { t } = useLanguage();
  const values = [
    {
      title: t('about.values.safety.title'),
      description: t('about.values.safety.description'),
      icon: <Shield className="h-8 w-8 text-brand-primary" />,
    },
    {
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description'),
      icon: <Cpu className="h-8 w-8 text-brand-primary" />,
    },
    {
      title: t('about.values.customer.title'),
      description: t('about.values.customer.description'),
      icon: <Users className="h-8 w-8 text-brand-primary" />,
    },
    {
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description'),
      icon: <Star className="h-8 w-8 text-brand-primary" />,
    },
    {
      title: t('about.values.design.title'),
      description: t('about.values.design.description'),
      icon: <Eye className="h-8 w-8 text-brand-primary" />,
    },
    {
      title: t('about.values.compliance.title'),
      description: t('about.values.compliance.description'),
      icon: <Check className="h-8 w-8 text-brand-primary" />,
    },
  ];
  
  return (
    <section id="values" className="py-16 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
            {t('about.values.badge')}
          </Badge>
          <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-3">
            {t('about.values.heading')}
          </h2>
          <p className="text-base text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
            {t('about.values.description')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 + (index * 0.1),
                ease: "easeOut"
              }}
            >
              <Card 
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm h-full"
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                    className="mb-3 p-2 rounded-full bg-brand-primary/10 dark:bg-brand-primary/5"
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-brand-secondary dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 