"use client";

import { useLanguage } from "@/lib/context/language-context";
import { Sun, Droplets, Wind, FlaskConical, Bug, Zap, Shield, Radio, Eye } from "lucide-react";

interface ClothingEnvironmentProps {
  environment_pictograms: any;
  className?: string;
}

export function ClothingEnvironment({ 
  environment_pictograms, 
  className = "" 
}: ClothingEnvironmentProps) {
  const { t } = useLanguage();

  const pictogramConfig = [
    // First row - existing options
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
    // New row - clothing-specific options
    {
      key: 'electrical_risks',
      icon: Shield,
      title: t('productPage.electricalRisks'),
      description: `${t('productPage.suitableFor')} ${t('productPage.electricalRisks').toLowerCase()}`,
      enabled: environment_pictograms.electrical_risks,
    },
    {
      key: 'radiation',
      icon: Radio,
      title: t('productPage.radiation'),
      description: `${t('productPage.suitableFor')} ${t('productPage.radiation').toLowerCase()}`,
      enabled: environment_pictograms.radiation,
    },
    {
      key: 'low_visibility',
      icon: Eye,
      title: t('productPage.lowVisibility'),
      description: `${t('productPage.suitableFor')} ${t('productPage.lowVisibility').toLowerCase()}`,
      enabled: environment_pictograms.low_visibility,
    },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4">
        {t('productPage.workEnvironmentSuitability')}
      </h3>
      
      {/* First row - existing 6 options */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pictogramConfig.slice(0, 6).map((pictogram) => {
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

      {/* Second row - new clothing-specific options */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {pictogramConfig.slice(6, 9).map((pictogram) => {
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
