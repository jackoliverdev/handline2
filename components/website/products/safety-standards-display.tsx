"use client";

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Flame, Snowflake, Droplets, Zap, AlertTriangle } from "lucide-react";
import { SafetyStandards, SafetyEN388, SafetyEN407, SafetyEN511 } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

interface SafetyStandardsDisplayProps {
  safety: SafetyStandards;
  className?: string;
}

// EN 388 performance levels mapping
const getEN388PerformanceLevel = (value: number | null): string => {
  if (value === null) return 'X';
  return value.toString();
};

// Performance level colour mapping
const getPerformanceLevelColour = (value: number | null, maxLevel: number = 5): string => {
  if (value === null) return 'bg-gray-100 text-gray-800 border-gray-200';
  const percentage = value / maxLevel;
  if (percentage >= 0.8) return 'bg-green-100 text-green-800 border-green-200';
  if (percentage >= 0.6) return 'bg-blue-100 text-blue-800 border-blue-200';
  if (percentage >= 0.4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  if (percentage >= 0.2) return 'bg-orange-100 text-orange-800 border-orange-200';
  return 'bg-red-100 text-red-800 border-red-200';
};

const SafetyEN388Display: React.FC<{ data: SafetyEN388 }> = ({ data }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-brand-primary/10 dark:border-brand-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="h-5 w-5 text-brand-primary" />
          EN 388 - Mechanical Risks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Abrasion */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Abrasion</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.abrasion, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.abrasion)}
            </Badge>
          </div>
          
          {/* Cut */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Cut</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.cut, 5)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.cut)}
            </Badge>
          </div>
          
          {/* Tear */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Tear</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.tear, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.tear)}
            </Badge>
          </div>
          
          {/* Puncture */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Puncture</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.puncture, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.puncture)}
            </Badge>
          </div>
        </div>
        
        {/* Additional fields if present */}
        {(data.iso_13997 || data.impact_en_13594) && (
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-brand-primary/10">
            {data.iso_13997 && (
              <div className="text-center">
                <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">ISO 13997</div>
                <Badge variant="outline" className="font-bold">{data.iso_13997}</Badge>
              </div>
            )}
            {data.impact_en_13594 && (
              <div className="text-center">
                <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Impact</div>
                <Badge variant="outline" className="font-bold">{data.impact_en_13594}</Badge>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const SafetyEN407Display: React.FC<{ data: SafetyEN407 }> = ({ data }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-brand-primary/10 dark:border-brand-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flame className="h-5 w-5 text-brand-primary" />
          EN 407 - Thermal Risks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {/* Contact Heat */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Contact Heat</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.contact_heat, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.contact_heat)}
            </Badge>
          </div>
          
          {/* Radiant Heat */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Radiant Heat</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.radiant_heat, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.radiant_heat)}
            </Badge>
          </div>
          
          {/* Convective Heat */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Convective Heat</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.convective_heat, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.convective_heat)}
            </Badge>
          </div>
          
          {/* Flame Spread */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Flame Spread</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.limited_flame_spread, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.limited_flame_spread)}
            </Badge>
          </div>
          
          {/* Small Splashes */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Small Splashes</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.small_splashes_molten_metal, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.small_splashes_molten_metal)}
            </Badge>
          </div>
          
          {/* Large Quantities */}
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Large Quantities</div>
            <Badge variant="outline" className="font-bold">
              {data.large_quantities_molten_metal || 'X'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
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
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.contact_cold, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.contact_cold)}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Convective Cold</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.convective_cold, 4)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.convective_cold)}
            </Badge>
          </div>
          
          <div className="text-center">
            <div className="mb-1 text-xs text-brand-secondary dark:text-gray-400">Water Permeability</div>
            <Badge 
              variant="outline" 
              className={`${getPerformanceLevelColour(data.water_permeability, 1)} font-bold text-lg`}
            >
              {getEN388PerformanceLevel(data.water_permeability)}
            </Badge>
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
  
  // Check if any safety standards are enabled
  const hasStandards = safety.en_388?.enabled || safety.en_407?.enabled || safety.en_511?.enabled || 
                      safety.en_421 || safety.en_659 || safety.food_grade || safety.en_iso_21420;
  
  if (!hasStandards) {
    return null;
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-brand-dark dark:text-white mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-brand-primary" />
        Safety Standards
      </h3>
      
      {/* Main EN Standards */}
      <div className="space-y-4">
        {safety.en_388?.enabled && <SafetyEN388Display data={safety.en_388} />}
        {safety.en_407?.enabled && <SafetyEN407Display data={safety.en_407} />}
        {safety.en_511?.enabled && <SafetyEN511Display data={safety.en_511} />}
      </div>
      
      {/* Additional Standards */}
      {(safety.en_421 || safety.en_659 || safety.food_grade || safety.en_iso_21420) && (
        <Card className="border-brand-primary/10 dark:border-brand-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-brand-primary" />
              Additional Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {safety.en_421 && (
                <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/10">
                  EN 421 - Ionising Radiation
                </Badge>
              )}
              {safety.en_659 && (
                <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/10">
                  EN 659 - Firefighters
                </Badge>
              )}
              {safety.food_grade && (
                <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/10">
                  Food Grade
                </Badge>
              )}
              {safety.en_iso_21420 && (
                <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/10">
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