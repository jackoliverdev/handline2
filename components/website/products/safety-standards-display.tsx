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
  hideTitle?: boolean;
}

// EN 388 performance levels mapping with A-F letters for higher levels
const getEN388PerformanceLevel = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === 'X' || value === '') return 'X';
  if (typeof value === 'number') {
    if (value > 5) {
      // Convert to A-F for values > 5
      const letter = String.fromCharCode(65 + (value - 6)); // A=6, B=7, etc.
      return letter;
    }
    return value.toString();
  }
  return String(value);
};

// Professional green color scheme with better shades
const getGreenPerformanceColour = (value: number | string | null | undefined, maxLevel: number = 5): string => {
  if (value === null || value === undefined || value === 'X' || value === '') {
    return 'bg-white border-2 border-gray-300 text-gray-900'; // White background with black text for X
  }
  
  // Handle letter grades A-F for EN388 ISO 13997: F is highest protection (darkest), A is lowest (lightest)
  if (typeof value === 'string' && /^[A-F]$/.test(value)) {
    switch (value) {
      case 'A':
        return 'bg-emerald-200 text-white';
      case 'B':
        return 'bg-emerald-300 text-white';
      case 'C':
        return 'bg-emerald-400 text-white';
      case 'D':
        return 'bg-emerald-500 text-white';
      case 'E':
        return 'bg-emerald-600 text-white';
      case 'F':
        return 'bg-emerald-700 text-white'; // Darkest green for highest performance
      default:
        return 'bg-gray-400 dark:bg-gray-600 text-white';
    }
  }
  
  const numValue = typeof value === 'number' ? value : parseInt(String(value));
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
  
  // Handle both iso_13997 and iso_cut naming conventions
  const isoCut = data.iso_13997 || (data as any).iso_cut || null;

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
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(isoCut, 5)}`}
          >
            {getEN388PerformanceLevel(isoCut)}
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
    <div className="group relative overflow-hidden rounded-lg border bg-white dark:bg-black/50 shadow-sm transition-all duration-300 hover:shadow-md border-brand-primary/10 dark:border-brand-primary/20 backdrop-blur-sm p-4">
      <div className="flex items-center gap-3 mb-3">
        <Snowflake className="h-5 w-5 text-brand-primary" />
        <h3 className="font-medium text-brand-dark dark:text-white">
          EN 511 - {t('productPage.coldProtection')}
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.convectiveCold')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.convective_cold, 4)}`}
          >
            {getEN388PerformanceLevel(data.convective_cold)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.contactCold')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.contact_cold, 4)}`}
          >
            {getEN388PerformanceLevel(data.contact_cold)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xs text-brand-secondary dark:text-gray-400 mb-1">{t('productPage.waterPermeability')}</div>
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold text-sm ${getGreenPerformanceColour(data.water_permeability, 1)}`}
          >
            {getEN388PerformanceLevel(data.water_permeability)}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SafetyStandardsDisplay: React.FC<SafetyStandardsDisplayProps> = ({ 
  safety, 
  className = "",
  hideTitle = false
}) => {
  const { t } = useLanguage();
  
  // Handle both en_388 and en388 naming conventions in database
  const en388Data = (safety as any).en_388 || (safety as any).en388;
  const en407Data = (safety as any).en_407 || (safety as any).en407;
  const en511Data = (safety as any).en_511 || (safety as any).en511;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Page title */}
      {!hideTitle && (
        <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-6">
          {t('productPage.safetyStandards')}
        </h3>
      )}
      
      {/* Main EN Standards */}
      <div className="space-y-4">
        {en388Data?.enabled && <SafetyEN388Display data={en388Data} />}
        {en407Data?.enabled && <SafetyEN407Display data={en407Data} />}
        {en511Data?.enabled && <SafetyEN511Display data={en511Data} />}
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