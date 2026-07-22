"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/context/language-context";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const EsgCertification = () => {
  const { t } = useLanguage();
  const certifications = [
    { standard: "ISO 9001", image: "/icons/iso9001.png" },
    { standard: "ISO 14001", image: "/icons/iso14001.png" },
    { standard: "ISO 45001", image: "/icons/iso45001.png" },
  ];
  
  return (
    <section className="py-16 md:py-20 bg-green-100/90 dark:bg-green-900/30">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              {t('about.esg.certification.badge')}
            </Badge>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-brand-dark dark:text-white mb-4"
          >
            {t('about.esg.certification.title')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-brand-secondary dark:text-gray-300 mb-10"
          >
            {t('about.esg.certification.description')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {certifications.map((certification) => (
              <div key={certification.standard} className="flex flex-col items-center p-2">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border border-brand-primary/15 bg-brand-primary/10 p-3">
                  <div className="relative h-full w-full">
                    <Image
                      src={certification.image}
                      alt={`${certification.standard} certification`}
                      fill
                      className={`object-contain ${certification.standard === "ISO 14001" ? "scale-125" : ""}`}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm font-semibold text-brand-dark dark:text-white">
                  <CheckCircle className="h-4 w-4 text-brand-primary" />
                  {certification.standard}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 