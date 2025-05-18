"use client";

import React from "react";
import { Shield, Cpu, Users, Star, Eye, Check, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/context/language-context";

interface Value {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const MissionValues = () => {
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
    <section id="mission-values" className="py-16 bg-[#F5EFE0]/80 dark:bg-transparent">
      <div className="container">
        {/* Mission Statement */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              {t('about.mission.badge')}
            </Badge>
            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-3">
              {t('about.mission.heading')}
            </h2>
          </div>
          <Card className="bg-[#F5EFE0]/80 dark:bg-transparent border-brand-primary/10 dark:border-brand-primary/20 shadow-sm max-w-4xl mx-auto">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-brand-primary/10 dark:bg-brand-primary/5">
                  <Target className="h-10 w-10 text-brand-primary" />
                </div>
              </div>
              <p className="text-lg text-brand-secondary dark:text-gray-300 italic mb-3">
                {t('about.mission.statement')}
              </p>
              <p className="text-sm text-brand-secondary dark:text-gray-300 max-w-3xl mx-auto">
                {t('about.mission.description')}
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Values */}
        <div>
          <div className="text-center mb-8">
            <Badge className="mb-2 bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              {t('about.values.badge')}
            </Badge>
            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-3">
              {t('about.values.heading')}
            </h2>
            <p className="text-base text-brand-secondary dark:text-gray-300 max-w-2xl mx-auto">
              {t('about.values.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden rounded-lg border bg-[#F5EFE0]/80 dark:bg-transparent shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm dark:backdrop-blur-none"
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="mb-3 p-2 rounded-full bg-brand-primary/10 dark:bg-brand-primary/5">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-1">
                    {value.title}
                  </h3>
                  <p className="text-sm text-brand-secondary dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 