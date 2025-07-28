"use client";

import React from "react";
import { CalendarDays, Flag, Award, Globe, Lightbulb, Cpu, Building, Factory } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const CompanyHistory = () => {
  const { t } = useLanguage();
  const milestones = [
    {
      year: "1977",
      title: t('about.history.1977.title'),
      description: t('about.history.1977.description'),
      icon: <Flag className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "1980",
      title: t('about.history.1980.title'),
      description: t('about.history.1980.description'),
      icon: <Lightbulb className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "1996",
      title: t('about.history.1996.title'),
      description: t('about.history.1996.description'),
      icon: <Award className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "2002",
      title: t('about.history.2002.title'),
      description: t('about.history.2002.description'),
      icon: <Globe className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "2003",
      title: t('about.history.2003.title'),
      description: t('about.history.2003.description'),
      icon: <Building className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "2005",
      title: t('about.history.2005.title'),
      description: t('about.history.2005.description'),
      icon: <Factory className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "2015",
      title: t('about.history.2015.title'),
      description: t('about.history.2015.description'),
      icon: <Cpu className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "2023",
      title: t('about.history.2023.title'),
      description: t('about.history.2023.description'),
      icon: <Building className="h-8 w-8 text-brand-primary" />,
    },
    {
      year: "2025",
      title: t('about.history.2025.title'),
      description: t('about.history.2025.description'),
      icon: <Globe className="h-8 w-8 text-brand-primary" />,
    },
  ];

  return (
    <section id="our-story" className="py-16 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white tracking-tight leading-tight">
            {t('about.history.heading')}
          </h2>
          <div className="w-20 h-1 bg-brand-primary rounded-full mx-auto mt-4"></div>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative mt-10 mb-20">
          {/* Main central timeline line - thicker and more visible */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-2 bg-brand-primary z-10"
          ></motion.div>
          
          <div className="relative">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={milestone.year} 
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className={`flex ${index % 2 === 0 ? '' : 'flex-row-reverse'} ${index !== 0 ? 'mt-[-60px]' : ''} mb-4`}
                style={{ zIndex: 30 - index }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-6' : 'pl-6'}`}>
                  <Card className="bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <p className="text-sm font-bold text-brand-primary mb-1">{milestone.year}</p>
                      <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-sm text-brand-secondary dark:text-gray-300">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-2/12 flex justify-center">
                  {/* Timeline circle with icon - centered on the vertical line */}
                  <div className="z-20 relative top-6" style={{ marginLeft: "8px" }}>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                      className="w-8 h-8 rounded-full bg-white dark:bg-black/50 border-4 border-brand-primary flex items-center justify-center shadow-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          {/* Vertical timeline line - centered in the available space */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-5 top-0 bottom-0 w-2 bg-brand-primary z-0"
          ></motion.div>
          
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={milestone.year} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className={`relative ${index !== 0 ? 'mt-[-5px]' : ''} pl-12`} 
                style={{ zIndex: 20 - index }}
              >
                {/* Timeline circle - centered directly on the line */}
                <div className="absolute left-0 top-4 flex items-center justify-center z-10">
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                    style={{ marginLeft: '3px' }}
                    className="w-10 h-10 rounded-full bg-white dark:bg-black/50 border-4 border-brand-primary flex items-center justify-center shadow-lg backdrop-blur-sm"
                  >
                    <div className="w-3 h-3 rounded-full bg-brand-primary"></div>
                  </motion.div>
                </div>
                
                <Card className="bg-white dark:bg-black/50 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <p className="text-sm font-bold text-brand-primary mb-1">{milestone.year}</p>
                    <h3 className="text-base font-bold text-brand-dark dark:text-white mb-1">{milestone.title}</h3>
                    <p className="text-sm text-brand-secondary dark:text-gray-300">{milestone.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 