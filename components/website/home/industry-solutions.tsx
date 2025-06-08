"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Shield, Factory } from "lucide-react";
import { getAllIndustries, Industry } from "@/lib/industries-service";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + (i * 0.1),
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

export const IndustrySolutions = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  useEffect(() => {
    const loadIndustries = async () => {
      try {
        const { data } = await getAllIndustries(language);
        // Take only the first 4 industries for display
        setIndustries(data.slice(0, 4));
      } catch (error) {
        console.error("Error loading industries:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadIndustries();
  }, [language]);
  
  // Get the first paragraph of the description for a summary
  const getShortDescription = (industry: Industry) => {
    // If content is available, use that for a better summary
    if (industry.content) {
      // Extract the first paragraph after a heading or the first paragraph overall
      const contentParagraphs = industry.content.split('\n\n');
      // Look for the first paragraph that's not a heading
      for (const paragraph of contentParagraphs) {
        if (!paragraph.startsWith('#') && paragraph.trim().length > 0) {
          return paragraph.length > 100 
            ? paragraph.substring(0, 100) + '...' 
            : paragraph;
        }
      }
    }
    
    // Fall back to description if content is not available
    const firstParagraph = industry.description.split('\n\n')[0];
    return firstParagraph.length > 100 
      ? firstParagraph.substring(0, 100) + '...' 
      : firstParagraph;
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="pt-12 pb-12 md:pt-16 md:pb-16 bg-brand-light dark:bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="flex flex-col items-center">
            <Link href="/industries" className="inline-block transition-transform duration-300 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center rounded-full bg-white/80 dark:bg-black/60 px-3 py-1 text-xs sm:text-sm border border-brand-primary backdrop-blur-sm cursor-pointer"
              >
                <Factory className="mr-1.5 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4 text-brand-primary" />
                <span className="text-brand-dark dark:text-white font-medium font-heading">
                  {t('industrySolutions.badge')}
                </span>
              </motion.div>
            </Link>
            <div className="inline-flex items-center justify-center mb-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-brand-primary rounded-full mr-3"
              ></motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white font-heading">
                {t('industrySolutions.title')}
              </h2>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "2.5rem" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 w-10 bg-brand-primary rounded-full ml-3"
              ></motion.div>
            </div>
            <motion.p 
              variants={itemVariants}
              className="max-w-5xl text-lg text-brand-secondary dark:text-gray-300 mx-auto"
            >
              {t('industrySolutions.detailedDescription')}
            </motion.p>
          </div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center min-h-[300px]"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
          </motion.div>
        ) : industries.length === 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-16 border border-brand-primary/10 dark:border-brand-primary/20 rounded-xl bg-white/50 dark:bg-gray-800/30"
          >
            <p className="text-lg text-brand-secondary dark:text-gray-300">{t('industrySolutions.noIndustries')}</p>
          </motion.div>
        ) : (
          <div 
            ref={scrollContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {industries.map((industry, index) => (
              <motion.div 
                key={industry.id}
                custom={index}
                variants={cardVariants}
              >
                <Link href={`/industries/${industry.slug}`}>
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-black/50 rounded-2xl backdrop-blur-sm shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      {industry.image_url ? (
                        <motion.div
                          initial={{ scale: 1.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                        >
                          <Image
                            src={industry.image_url}
                            alt={industry.industry_name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </motion.div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                          <Shield className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-300" />
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                        className="absolute bottom-4 left-4 right-4"
                      >
                        <h3 className="text-xl font-bold text-white mb-1 font-heading group-hover:text-white transition-colors duration-200">{industry.industry_name}</h3>
                      </motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                    >
                      <CardContent className="p-5">
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {getShortDescription(industry)}
                        </p>
                        <div className="flex items-center text-brand-primary font-medium group-hover:text-brand-primary/90 transition-colors duration-300">
                          <span className="relative">
                            {t('industrySolutions.learnMore')}
                            <span className="absolute left-0 -bottom-[2px] h-[1px] w-0 bg-brand-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                          </span>
                          <motion.div
                            whileHover={{ x: 3, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.div>
                        </div>
                      </CardContent>
                    </motion.div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}; 