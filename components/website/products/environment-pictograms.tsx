"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sun, 
  Droplets, 
  Wind, 
  FlaskConical, 
  Bug, 
  Zap
} from "lucide-react";
import { EnvironmentPictograms } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

interface EnvironmentPictogramsDisplayProps {
  environment_pictograms: EnvironmentPictograms;
  className?: string;
}

interface EnvironmentItem {
  key: keyof EnvironmentPictograms;
  icon: React.ReactNode;
  label: string;
  description: string;
}

export function EnvironmentPictogramsDisplay({ 
  environment_pictograms, 
  className = "" 
}: EnvironmentPictogramsDisplayProps) {
  const { t } = useLanguage();

  const pictogramConfig = [
    {
      key: 'dry',
      icon: Sun,
      title: t('productPage.dryConditions'),
      description: `${t('productPage.suitableFor')} ${t('productPage.dryConditions').toLowerCase()}`,
      enabled: environment_pictograms.dry,
    },
    {
      key: 'wet',
      icon: Droplets,
      title: t('productPage.wetConditions'),
      description: `${t('productPage.suitableFor')} ${t('productPage.wetConditions').toLowerCase()}`,
      enabled: environment_pictograms.wet,
    },
    {
      key: 'dust',
      icon: Wind,
      title: t('productPage.dustyConditions'),
      description: `${t('productPage.suitableFor')} ${t('productPage.dustyConditions').toLowerCase()}`,
      enabled: environment_pictograms.dust,
    },
    {
      key: 'chemical',
      icon: FlaskConical,
      title: t('productPage.chemicalExposure'),
      description: `${t('productPage.suitableFor')} ${t('productPage.chemicalExposure').toLowerCase()}`,
      enabled: environment_pictograms.chemical,
    },
    {
      key: 'biological',
      icon: Bug,
      title: t('productPage.biologicalHazards'),
      description: `${t('productPage.suitableFor')} ${t('productPage.biologicalHazards').toLowerCase()}`,
      enabled: environment_pictograms.biological,
    },
    {
      key: 'oily_grease',
      icon: Zap,
      title: t('productPage.oilyGreasy'),
      description: `${t('productPage.suitableFor')} ${t('productPage.oilyGreasy').toLowerCase()}`,
      enabled: environment_pictograms.oily_grease,
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">
        {t('productPage.workEnvironmentSuitability')}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pictogramConfig.map((pictogram) => {
          const IconComponent = pictogram.icon;
          const isEnabled = pictogram.enabled;
          
          return (
            <div
              key={pictogram.key}
              className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-3 ${
                isEnabled
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <IconComponent 
                    className={`h-4 w-4 ${
                      isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`} 
                  />
                  <h4 className={`font-medium text-sm ${
                    isEnabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                  }`}>
                    {pictogram.title}
                  </h4>
                </div>
                <div className={`text-sm font-bold ${
                  isEnabled ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                }`}>
                  {isEnabled ? t('productPage.yes') : t('productPage.no')}
                </div>
              </div>
              
              <p className={`text-xs ${
                isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {pictogram.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 