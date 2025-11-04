"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Shield, Flame, Snowflake, Droplet, FileCheck } from "lucide-react";

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

      {/* EN 374-1 - Chemical Protection */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="h-5 w-5 text-brand-primary" />
              <CardTitle className="text-lg">EN 374-1 - Chemical Protection</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!safety.en_374_1?.enabled} 
                onCheckedChange={(v) => setSafety({ 
                  ...safety, 
                  en_374_1: { ...(safety.en_374_1 || {}), enabled: !!v } 
                })} 
              />
              <Label>Enabled</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm">Type</Label>
              <Input 
                value={safety.en_374_1?.type ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_374_1: { ...(safety.en_374_1 || {}), type: e.target.value || null } 
                })} 
                placeholder="e.g. A, B, C"
              />
            </div>
            <div>
              <Label className="text-sm">Chemicals Tested</Label>
              <Input 
                value={safety.en_374_1?.chemicals_tested ?? ''} 
                onChange={(e) => setSafety({ 
                  ...safety, 
                  en_374_1: { ...(safety.en_374_1 || {}), chemicals_tested: e.target.value || null } 
                })} 
                placeholder="e.g. AKL"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other EN Standards - Grid */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Other Standards & Certifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* EN 421 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 421</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Ionising radiation and radioactive contamination</p>
              </div>
              <Switch 
                checked={!!safety.en_421} 
                onCheckedChange={(v) => setSafety({ ...safety, en_421: v })} 
              />
            </div>

            {/* EN 374-5 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 374-5</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against micro-organisms</p>
              </div>
              <Switch 
                checked={!!safety.en_374_5} 
                onCheckedChange={(v) => setSafety({ ...safety, en_374_5: v })} 
              />
            </div>

            {/* EN 381-7 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 381-7</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Chainsaw protection</p>
              </div>
              <Switch 
                checked={!!safety.en_381_7} 
                onCheckedChange={(v) => setSafety({ ...safety, en_381_7: v })} 
              />
            </div>

            {/* EN 60903 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 60903</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Electrical insulating gloves</p>
              </div>
              <Switch 
                checked={!!safety.en_60903} 
                onCheckedChange={(v) => setSafety({ ...safety, en_60903: v })} 
              />
            </div>

            {/* EN 659 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 659</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Firefighters' protective gloves</p>
              </div>
              <Switch 
                checked={!!safety.en_659} 
                onCheckedChange={(v) => setSafety({ ...safety, en_659: v })} 
              />
            </div>

            {/* EN 1082-1 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 1082-1</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Metal mesh gloves</p>
              </div>
              <Switch 
                checked={!!safety.en_1082_1} 
                onCheckedChange={(v) => setSafety({ ...safety, en_1082_1: v })} 
              />
            </div>

            {/* EN 12477 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 12477</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protective gloves for welders</p>
              </div>
              <Switch 
                checked={!!safety.en_12477} 
                onCheckedChange={(v) => setSafety({ ...safety, en_12477: v })} 
              />
            </div>

            {/* EN 16350 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 16350</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Electrostatic properties</p>
              </div>
              <Switch 
                checked={!!safety.en_16350} 
                onCheckedChange={(v) => setSafety({ ...safety, en_16350: v })} 
              />
            </div>

            {/* EN ISO 21420 */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN ISO 21420</Label>
                <p className="text-xs text-muted-foreground mt-0.5">General requirements for gloves</p>
              </div>
              <Switch 
                checked={!!safety.en_iso_21420} 
                onCheckedChange={(v) => setSafety({ ...safety, en_iso_21420: v })} 
              />
            </div>

            {/* Food Grade */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Food Grade</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Food contact safe</p>
              </div>
              <Switch 
                checked={!!safety.food_grade} 
                onCheckedChange={(v) => setSafety({ ...safety, food_grade: v })} 
              />
            </div>

            {/* Ionising Radiation */}
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Ionising Radiation</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against ionising radiation</p>
              </div>
              <Switch 
                checked={!!safety.ionising_radiation} 
                onCheckedChange={(v) => setSafety({ ...safety, ionising_radiation: v })} 
              />
            </div>

            {/* Radioactive Contamination */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <Label className="text-sm font-medium">Radioactive Contamination</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against radioactive contamination</p>
              </div>
              <Switch 
                checked={!!safety.radioactive_contamination} 
                onCheckedChange={(v) => setSafety({ ...safety, radioactive_contamination: v })} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};