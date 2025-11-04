"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

interface WorkEnvironmentSuitabilityEditorProps {
  environmentPictograms: EnvironmentPictograms;
  onEnvironmentChange: (environmentPictograms: EnvironmentPictograms) => void;
  className?: string;
  showExtendedItems?: boolean; // Show all 9 items (for clothing) or just 6 standard items
}

interface EnvironmentItem {
  key: keyof EnvironmentPictograms;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
}

export function WorkEnvironmentSuitabilityEditor({ 
  environmentPictograms, 
  onEnvironmentChange,
  className = "",
  showExtendedItems = false
}: WorkEnvironmentSuitabilityEditorProps) {
  const { t } = useLanguage();

  const allEnvironmentItems: EnvironmentItem[] = [
    {
      key: 'dry',
      icon: Sun,
      label: t('productPage.dryConditions'),
      description: t('productPage.suitableFor') + ' ' + t('productPage.dryConditions').toLowerCase(),
    },
    {
      key: 'wet',
      icon: Droplets,
      label: t('productPage.wetConditions'),
      description: t('productPage.suitableFor') + ' ' + t('productPage.wetConditions').toLowerCase(),
    },
    {
      key: 'dust',
      icon: Wind,
      label: t('productPage.dustyConditions'),
      description: t('productPage.suitableFor') + ' ' + t('productPage.dustyConditions').toLowerCase(),
    },
    {
      key: 'chemical',
      icon: FlaskConical,
      label: t('productPage.chemicalExposure'),
      description: t('productPage.suitableFor') + ' ' + t('productPage.chemicalExposure').toLowerCase(),
    },
    {
      key: 'biological',
      icon: Bug,
      label: t('productPage.biologicalHazards'),
      description: t('productPage.suitableFor') + ' ' + t('productPage.biologicalHazards').toLowerCase(),
    },
    {
      key: 'oily_grease',
      icon: Zap,
      label: t('productPage.oilyGreasy'),
      description: t('productPage.suitableFor') + ' ' + t('productPage.oilyGreasy').toLowerCase(),
    },
    {
      key: 'electrical',
      icon: Zap,
      label: 'Electrical risks',
      description: 'Suitable for electrical risks',
    },
    {
      key: 'radiation',
      icon: Sun,
      label: 'Radiation',
      description: 'Suitable for radiation',
    },
    {
      key: 'low_visibility',
      icon: Sun,
      label: 'Low visibility',
      description: 'Suitable for low visibility',
    },
  ];

  // Filter items based on whether extended items should be shown
  const environmentItems = showExtendedItems 
    ? allEnvironmentItems 
    : allEnvironmentItems.filter(item => 
        ['dry', 'wet', 'dust', 'chemical', 'biological', 'oily_grease'].includes(item.key)
      );

  const handleToggle = (key: keyof EnvironmentPictograms, enabled: boolean) => {
    onEnvironmentChange({
      ...environmentPictograms,
      [key]: enabled
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Work Environment Suitability</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Configure which work environments this product is suitable for.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {environmentItems.map((item) => {
            const IconComponent = item.icon;
            const isEnabled = environmentPictograms[item.key] || false;
            
            return (
              <div
                key={item.key}
                className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-4 ${
                  isEnabled
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconComponent 
                      className={`h-5 w-5 ${
                        isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`} 
                    />
                    <div>
                      <Label className={`font-medium text-sm ${
                        isEnabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                      }`}>
                        {item.label}
                      </Label>
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleToggle(item.key, checked)}
                    className="data-[state=checked]:bg-green-600"
                  />
                </div>
                
                <p className={`text-xs ${
                  isEnabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
