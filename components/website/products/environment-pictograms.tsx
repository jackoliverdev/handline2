"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Droplets, 
  Wind, 
  Sun, 
  FlaskConical, 
  Bug, 
  Zap 
} from "lucide-react";
import { EnvironmentPictograms } from "@/lib/products-service";
import { useLanguage } from "@/lib/context/language-context";

interface EnvironmentPictogramsDisplayProps {
  environment: EnvironmentPictograms;
  className?: string;
}

interface EnvironmentItem {
  key: keyof EnvironmentPictograms;
  icon: React.ReactNode;
  label: string;
  description: string;
}

export const EnvironmentPictogramsDisplay: React.FC<EnvironmentPictogramsDisplayProps> = ({ 
  environment, 
  className = "" 
}) => {
  const { t } = useLanguage();
  
  // Environment conditions mapping
  const environmentItems: EnvironmentItem[] = [
    {
      key: 'dry',
      icon: <Sun className="h-5 w-5" />,
      label: 'Dry Conditions',
      description: 'Suitable for dry work environments'
    },
    {
      key: 'wet',
      icon: <Droplets className="h-5 w-5" />,
      label: 'Wet Conditions',
      description: 'Suitable for wet work environments'
    },
    {
      key: 'dust',
      icon: <Wind className="h-5 w-5" />,
      label: 'Dusty Conditions',
      description: 'Suitable for dusty work environments'
    },
    {
      key: 'chemical',
      icon: <FlaskConical className="h-5 w-5" />,
      label: 'Chemical Exposure',
      description: 'Suitable for chemical work environments'
    },
    {
      key: 'biological',
      icon: <Bug className="h-5 w-5" />,
      label: 'Biological Hazards',
      description: 'Suitable for biological work environments'
    },
    {
      key: 'oily_grease',
      icon: <Zap className="h-5 w-5" />,
      label: 'Oily/Greasy',
      description: 'Suitable for oily/greasy work environments'
    }
  ];
  
  // Check if any environment conditions are specified
  const hasEnvironmentData = environmentItems.some(item => environment[item.key] !== undefined);
  
  if (!hasEnvironmentData) {
    return null;
  }
  
  // Filter to show defined conditions
  const definedConditions = environmentItems.filter(item => environment[item.key] !== undefined);
  
  return (
    <Card className={`border-brand-primary/10 dark:border-brand-primary/20 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sun className="h-5 w-5 text-brand-primary" />
          Work Environment Suitability
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {definedConditions.map((item) => {
            const isSupported = environment[item.key];
            
            return (
              <div 
                key={item.key}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                  ${isSupported 
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                    : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                  }
                `}
              >
                <div 
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full
                    ${isSupported 
                      ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-400'
                    }
                  `}
                >
                  {item.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`
                      text-sm font-medium
                      ${isSupported 
                        ? 'text-green-800 dark:text-green-300' 
                        : 'text-red-800 dark:text-red-300'
                      }
                    `}>
                      {item.label}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`
                        text-xs border-0
                        ${isSupported 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/50 dark:text-green-300' 
                          : 'bg-red-100 text-red-800 dark:bg-red-800/50 dark:text-red-300'
                        }
                      `}
                    >
                      {isSupported ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <p className={`
                    text-xs leading-tight
                    ${isSupported 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                    }
                  `}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}; 