"use client";

import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface SpecificationTableProps {
  specifications: {
    temperature_rating: {
      value: number;
      standard: string;
      description?: string;
    };
    cut_resistance_level: {
      value: string;
      standard: string;
      description?: string;
    };
    abrasion_resistance?: {
      value: string;
      standard: string;
      description?: string;
    };
    puncture_resistance?: {
      value: string;
      standard: string;
      description?: string;
    };
    tear_resistance?: {
      value: string;
      standard: string;
      description?: string;
    };
    chemical_resistance?: {
      value: string;
      standard: string;
      description?: string;
    };
    impact_protection?: {
      value: string;
      standard: string;
      description?: string;
    };
    dexterity?: {
      value: string;
      standard: string;
      description?: string;
    };
    additional_specs?: Record<string, {
      value: string;
      standard?: string;
      description?: string;
    }>;
  };
}

export const SpecificationTable: React.FC<SpecificationTableProps> = ({ 
  specifications 
}) => {
  // Helper to render specification value with badge if needed
  const renderValue = (value: string | number) => {
    // For cut resistance, render with colored badge
    if (typeof value === 'string' && value.match(/^[A-F]$/)) {
      const badgeColors: Record<string, string> = {
        'A': 'bg-green-100 text-green-800 border-green-200',
        'B': 'bg-blue-100 text-blue-800 border-blue-200',
        'C': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'D': 'bg-orange-100 text-orange-800 border-orange-200',
        'E': 'bg-red-100 text-red-800 border-red-200',
        'F': 'bg-purple-100 text-purple-800 border-purple-200',
      };
      
      return (
        <Badge 
          variant="outline" 
          className={`${badgeColors[value] || ''} font-bold`}
        >
          {value}
        </Badge>
      );
    }
    
    // For temperature, add °C
    if (typeof value === 'number') {
      return <span>{value}°C</span>;
    }
    
    return value;
  };
  
  // Create an array of all specifications to display
  const allSpecs = [
    { 
      key: 'temperature_rating', 
      label: 'Temperature Rating', 
      ...specifications.temperature_rating 
    },
    { 
      key: 'cut_resistance_level', 
      label: 'Cut Resistance', 
      ...specifications.cut_resistance_level 
    },
    ...(specifications.abrasion_resistance ? [{ 
      key: 'abrasion_resistance', 
      label: 'Abrasion Resistance', 
      ...specifications.abrasion_resistance 
    }] : []),
    ...(specifications.puncture_resistance ? [{ 
      key: 'puncture_resistance', 
      label: 'Puncture Resistance', 
      ...specifications.puncture_resistance 
    }] : []),
    ...(specifications.tear_resistance ? [{ 
      key: 'tear_resistance', 
      label: 'Tear Resistance', 
      ...specifications.tear_resistance 
    }] : []),
    ...(specifications.chemical_resistance ? [{ 
      key: 'chemical_resistance', 
      label: 'Chemical Resistance', 
      ...specifications.chemical_resistance 
    }] : []),
    ...(specifications.impact_protection ? [{ 
      key: 'impact_protection', 
      label: 'Impact Protection', 
      ...specifications.impact_protection 
    }] : []),
    ...(specifications.dexterity ? [{ 
      key: 'dexterity', 
      label: 'Dexterity', 
      ...specifications.dexterity 
    }] : []),
    ...(specifications.additional_specs ? Object.entries(specifications.additional_specs).map(([key, spec]) => ({
      key,
      label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      ...spec
    })) : [])
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-brand-primary/10 dark:border-brand-primary/20">
      <Table>
        <TableHeader className="bg-light-beige dark:bg-gray-800">
          <TableRow>
            <TableHead className="w-1/3 font-bold text-brand-dark dark:text-white">Specification</TableHead>
            <TableHead className="w-1/4 font-bold text-brand-dark dark:text-white">Value</TableHead>
            <TableHead className="w-1/3 font-bold text-brand-dark dark:text-white">Testing Standard</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allSpecs.map((spec) => (
            <TableRow key={spec.key} className="border-b border-brand-primary/10 dark:border-brand-primary/20">
              <TableCell className="font-medium text-brand-dark dark:text-gray-200">
                <div className="flex items-center">
                  {spec.label}
                  {spec.description && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="ml-1 h-4 w-4 cursor-help text-brand-primary/70" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{spec.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-semibold text-brand-secondary dark:text-gray-300">
                {renderValue(spec.value)}
              </TableCell>
              <TableCell className="text-sm text-brand-secondary dark:text-gray-400">
                {spec.standard}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 