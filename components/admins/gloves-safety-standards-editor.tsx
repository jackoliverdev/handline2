"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Flame, Snowflake } from "lucide-react";

interface GlovesSafetyStandardsEditorProps {
  safety: any;
  setSafety: (safety: any) => void;
}

// Function to get green shading based on performance level
const getPerformanceColor = (value: number | string | null): string => {
  if (!value || value === 'X') return 'bg-gray-100 border-gray-200';
  
  const numValue = typeof value === 'string' ? parseInt(value) : value;
  
  if (numValue >= 4) return 'bg-green-600 text-white border-green-600';
  if (numValue >= 3) return 'bg-green-500 text-white border-green-500';
  if (numValue >= 2) return 'bg-green-400 text-white border-green-400';
  if (numValue >= 1) return 'bg-green-300 text-white border-green-300';
  
  // For letter grades like 'C'
  if (typeof value === 'string' && value.length === 1) {
    return 'bg-green-400 text-white border-green-400';
  }
  
  return 'bg-gray-100 border-gray-200';
};

export const GlovesSafetyStandardsEditor: React.FC<GlovesSafetyStandardsEditorProps> = ({ 
  safety, 
  setSafety 
}) => {
  return (
    <div className="space-y-6">
      {/* EN 388 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-primary" />
              <CardTitle className="text-lg">EN 388 - Mechanical Risks</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!safety.en_388?.enabled} 
                onCheckedChange={(v) => setSafety({ 
                  ...safety, 
                  en_388: { ...(safety.en_388 || {}), enabled: !!v } 
                })} 
              />
              <Label>Enabled</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm">Abrasion</Label>
              <Input 
                type="number" 
                value={safety.en_388?.abrasion ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_388: { ...(safety.en_388 || {}), abrasion: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="5"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_388?.abrasion)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Cut</Label>
              <Input 
                type="number" 
                value={safety.en_388?.cut ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_388: { ...(safety.en_388 || {}), cut: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="5"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_388?.cut)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Tear</Label>
              <Input 
                type="number" 
                value={safety.en_388?.tear ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_388: { ...(safety.en_388 || {}), tear: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="5"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_388?.tear)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Puncture</Label>
              <Input 
                type="number" 
                value={safety.en_388?.puncture ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_388: { ...(safety.en_388 || {}), puncture: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="5"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_388?.puncture)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Cut (ISO 13997)</Label>
              <Input 
                value={safety.en_388?.iso_13997 ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_388: { ...(safety.en_388 || {}), iso_13997: e.target.value || null } 
                })} 
                placeholder="A-F"
                maxLength={1}
                className={`text-center font-semibold ${getPerformanceColor(safety.en_388?.iso_13997)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Impact (EN 13594)</Label>
              <Input 
                value={safety.en_388?.impact_en_13594 ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_388: { ...(safety.en_388 || {}), impact_en_13594: e.target.value || null } 
                })} 
                placeholder="X"
                maxLength={1}
                className={`text-center font-semibold ${getPerformanceColor(safety.en_388?.impact_en_13594)}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EN 407 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-brand-primary" />
              <CardTitle className="text-lg">EN 407 - Thermal Risks</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!safety.en_407?.enabled} 
                onCheckedChange={(v) => setSafety({ 
                  ...safety, 
                  en_407: { ...(safety.en_407 || {}), enabled: !!v } 
                })} 
              />
              <Label>Enabled</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm">Contact Heat</Label>
              <Input 
                type="number" 
                value={safety.en_407?.contact_heat ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_407: { ...(safety.en_407 || {}), contact_heat: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="4"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_407?.contact_heat)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Radiant Heat</Label>
              <Input 
                type="number" 
                value={safety.en_407?.radiant_heat ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_407: { ...(safety.en_407 || {}), radiant_heat: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="4"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_407?.radiant_heat)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Convective Heat</Label>
              <Input 
                type="number" 
                value={safety.en_407?.convective_heat ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_407: { ...(safety.en_407 || {}), convective_heat: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="4"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_407?.convective_heat)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Limited Flame</Label>
              <Input 
                type="number" 
                value={safety.en_407?.limited_flame_spread ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_407: { ...(safety.en_407 || {}), limited_flame_spread: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="4"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_407?.limited_flame_spread)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Small Splashes</Label>
              <Input 
                type="number" 
                value={safety.en_407?.small_splashes_molten_metal ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_407: { ...(safety.en_407 || {}), small_splashes_molten_metal: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="4"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_407?.small_splashes_molten_metal)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Large Splashes</Label>
              <Input 
                value={safety.en_407?.large_quantities_molten_metal ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_407: { ...(safety.en_407 || {}), large_quantities_molten_metal: e.target.value || null } 
                })} 
                placeholder="X"
                maxLength={1}
                className={`text-center font-semibold ${getPerformanceColor(safety.en_407?.large_quantities_molten_metal)}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EN 511 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-brand-primary" />
              <CardTitle className="text-lg">EN 511 - Cold Protection</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!safety.en_511?.enabled} 
                onCheckedChange={(v) => setSafety({ 
                  ...safety, 
                  en_511: { ...(safety.en_511 || {}), enabled: !!v } 
                })} 
              />
              <Label>Enabled</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm">Contact Cold</Label>
              <Input 
                type="number" 
                value={safety.en_511?.contact_cold ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_511: { ...(safety.en_511 || {}), contact_cold: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="4"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_511?.contact_cold)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Convective Cold</Label>
              <Input 
                type="number" 
                value={safety.en_511?.convective_cold ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_511: { ...(safety.en_511 || {}), convective_cold: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="4"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_511?.convective_cold)}`}
              />
            </div>
            <div>
              <Label className="text-sm">Water Permeability</Label>
              <Input 
                type="number" 
                value={safety.en_511?.water_permeability ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_511: { ...(safety.en_511 || {}), water_permeability: e.target.value === '' ? null : Number(e.target.value) } 
                })} 
                min="0" 
                max="1"
                className={`text-center font-semibold ${getPerformanceColor(safety.en_511?.water_permeability)}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};