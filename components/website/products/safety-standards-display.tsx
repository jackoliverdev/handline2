"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Flame, Snowflake, Droplets, Zap, AlertTriangle, Hammer } from "lucide-react";
import { SafetyStandards, SafetyEN388, SafetyEN407, SafetyEN511 } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

interface SafetyStandardsDisplayProps {
  safety: SafetyStandards;
  className?: string;
}

// EN 388 performance levels mapping with A-F letters for higher levels
const getEN388PerformanceLevel = (value: number | string | null): string => {
  if (value === null || value === 'X') return 'X';
  if (typeof value === 'number') {
    if (value > 5) {
      // Convert to A-F for values > 5
      const letter = String.fromCharCode(65 + (value - 6)); // A=6, B=7, etc.
      return letter;
    }
    return value.toString();
  }
  return value.toString();
};

// Professional green color scheme with better shades
const getGreenPerformanceColour = (value: number | string | null, maxLevel: number = 5): string => {
  if (value === null || value === 'X' || value === '') {
    return 'bg-white border-2 border-gray-300 text-gray-900'; // White background with black text for X
  }
  
  // Handle letter grades A-F (A is best = darkest green, F is worst = lightest green)
  if (typeof value === 'string' && /^[A-F]$/.test(value)) {
    switch (value) {
      case 'A':
        return 'bg-emerald-700 text-white'; // Darkest green for best performance
      case 'B':
        return 'bg-emerald-600 text-white';
      case 'C':
        return 'bg-emerald-500 text-white';
      case 'D':
        return 'bg-emerald-400 text-white';
      case 'E':
        return 'bg-emerald-300 text-white';
      case 'F':
        return 'bg-emerald-200 text-white'; // Lightest green for worst performance
      default:
        return 'bg-gray-400 dark:bg-gray-600 text-white';
    }
  }
  
  const numValue = typeof value === 'number' ? value : parseInt(value.toString());
  if (isNaN(numValue)) {
    return 'bg-gray-400 dark:bg-gray-600 text-white';
  }
  
  // Professional green color scheme - higher levels get darker green
  switch (numValue) {
    case 1:
      return 'bg-emerald-200 text-white'; // Light professional green
    case 2:
      return 'bg-emerald-300 text-white'; 
    case 3:
      return 'bg-emerald-500 text-white'; // Medium green
    case 4:
      return 'bg-emerald-600 text-white';
    case 5:
    default:
      return 'bg-emerald-700 text-white'; // Dark professional green
  }
};

const SafetyEN388Display: React.FC<{ data: SafetyEN388 }> = ({ data }) => {
  const { t } = useLanguage();

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-3 mb-3">
        <Hammer className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">
          EN 388 - {t('productPage.mechanicalRisks')}
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.abrasion')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.abrasion)}`}
          >
            {data.abrasion || 'X'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.cut')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.cut)}`}
          >
            {getEN388PerformanceLevel(data.cut)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.tear')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.tear)}`}
          >
            {data.tear || 'X'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.puncture')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.puncture)}`}
          >
            {getEN388PerformanceLevel(data.puncture)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.cut')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.iso_13997, 5)}`}
          >
            {getEN388PerformanceLevel(data.iso_13997)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.impact')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.impact_en_13594, 5)}`}
          >
            {getEN388PerformanceLevel(data.impact_en_13594)}
          </div>
        </div>
      </div>
    </div>
  );
};

const SafetyEN407Display: React.FC<{ data: SafetyEN407 }> = ({ data }) => {
  const { t } = useLanguage();

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-3 mb-3">
        <Flame className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">
          EN 407 - {t('productPage.thermalRisks')}
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.flammability')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.limited_flame_spread, 4)}`}
          >
            {data.limited_flame_spread || 'X'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.contactHeat')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.contact_heat, 4)}`}
          >
            {data.contact_heat || 'X'}
          </div>
        </div>

        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.convectiveHeat')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.convective_heat, 4)}`}
          >
            {data.convective_heat || 'X'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.radiantHeat')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.radiant_heat, 4)}`}
          >
            {data.radiant_heat || 'X'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.smallSplashes')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.small_splashes_molten_metal, 4)}`}
          >
            {data.small_splashes_molten_metal || 'X'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.largeSplashes')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.large_quantities_molten_metal, 4)}`}
          >
            {data.large_quantities_molten_metal || 'X'}
          </div>
        </div>
      </div>
    </div>
  );
};

const SafetyEN511Display: React.FC<{ data: SafetyEN511 }> = ({ data }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-brand-primary/10 dark:border-brand-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Snowflake className="h-5 w-5 text-brand-primary" />
          EN 511 - Cold Protection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Contact Cold</div>
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border font-bold text-lg ${getGreenPerformanceColour(data.contact_cold, 4)}`}>
              {getEN388PerformanceLevel(data.contact_cold)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Convective Cold</div>
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border font-bold text-lg ${getGreenPerformanceColour(data.convective_cold, 4)}`}>
              {getEN388PerformanceLevel(data.convective_cold)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Water Permeability</div>
            <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full border font-bold text-lg ${getGreenPerformanceColour(data.water_permeability, 1)}`}>
              {getEN388PerformanceLevel(data.water_permeability)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SafetyStandardsDisplay: React.FC<SafetyStandardsDisplayProps> = ({ 
  safety, 
  className = "" 
}) => {
  const { t } = useLanguage();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Page title */}
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-6">
        {t('productPage.safetyStandards')}
      </h3>
      
      {/* Main EN Standards */}
      <div className="space-y-4">
        {safety.en_388?.enabled && <SafetyEN388Display data={safety.en_388} />}
        {safety.en_407?.enabled && <SafetyEN407Display data={safety.en_407} />}
        {safety.en_511?.enabled && <SafetyEN511Display data={safety.en_511} />}
      </div>
      
      {/* Additional Standards - Increased font size */}
      {(safety.en_421 || safety.en_659 || safety.food_grade || safety.en_iso_21420) && (
        <Card className="border-brand-primary/10 dark:border-brand-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-brand-primary" />
              <h3 className="font-medium text-brand-dark dark:text-white">
                {t('productPage.additionalStandards')}
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {safety.en_421 && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  EN 421 - Ionising Radiation
                </Badge>
              )}
              {safety.en_659 && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  EN 659 - Firefighters
                </Badge>
              )}
              {safety.food_grade && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  Food Grade
                </Badge>
              )}
              {safety.en_iso_21420 && (
                <Badge className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/10 text-sm px-3 py-1">
                  EN ISO 21420 - General Requirements
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 