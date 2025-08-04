"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import Link from "next/link";

export const Mission = () => {
  const { t } = useLanguage();
  
  // Safely access mission points using individual translation keys with index
  const getMissionPoint = (index: number) => {
    return t(`about.mission.points.${index}`);
  };
  
  // Create an array of indices based on the number of points in the translation
  const pointIndices = [0, 1, 2, 3]; // Adjust if you add/remove points
  
  return (
    <section className="pt-4 pb-16 md:py-16 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              {t('about.mission.badge')}
            </Badge>
            
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white tracking-tight leading-tight">
              {t('about.mission.heading')}
            </h2>
            
            <div className="w-20 h-1 bg-brand-primary rounded-full"></div>
            
            <p className="text-lg text-brand-secondary dark:text-gray-300">
              {t('about.mission.description')}
            </p>
            
            <ul className="space-y-3">
              {pointIndices.map((index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="rounded-full bg-brand-primary/10 p-1 mt-0.5">
                    <Target className="h-4 w-4 text-brand-primary" />
                  </div>
                  <span className="text-brand-secondary dark:text-gray-300">
                    {getMissionPoint(index)}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                className="group border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white dark:border-brand-primary dark:text-brand-primary dark:hover:bg-brand-primary dark:hover:text-white"
                asChild
              >
                <Link href="/products" className="flex items-center gap-2">
                  {t('about.mission.cta')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Right Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-full flex items-center"
          >
            <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-2xl">
              <Image
                src="/heroimg.png"
                alt="HandLine's mission - protecting hands in industrial environments"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 rounded-full bg-brand-primary/5 blur-xl"></div>
            <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 rounded-full bg-brand-primary/10 blur-xl"></div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 md:bottom-6 md:left-6 bg-white dark:bg-black/50 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-primary/10 p-2">
                  <Target className="h-6 w-6 text-brand-primary" />
                </div>
                <div>
                  <div className="text-xs text-brand-secondary dark:text-gray-400">{t('about.mission.since')}</div>
                  <div className="text-xl font-bold text-brand-primary">{t('about.mission.year')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 