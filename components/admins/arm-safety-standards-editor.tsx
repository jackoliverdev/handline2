"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Ruler, Move, Snowflake, Droplet, FileCheck, Sun, Wind, FlaskConical, Bug, Zap } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { EnvironmentPictograms } from "@/lib/products-service";

interface ArmSafetyStandardsEditorProps {
  language: 'en' | 'it';
  safety: any;
  setSafety: (safety: any) => void;
  armAttributes: any;
  setArmAttributes: (attributes: any) => void;
  materialsLocales: { en: string[]; it: string[] };
  setMaterialsLocales: (locales: { en: string[]; it: string[] }) => void;
  environmentPictograms: EnvironmentPictograms;
  onEnvironmentChange: (environmentPictograms: EnvironmentPictograms) => void;
}

export const ArmSafetyStandardsEditor: React.FC<ArmSafetyStandardsEditorProps> = ({ 
  language,
  safety, 
  setSafety,
  armAttributes,
  setArmAttributes,
  materialsLocales,
  setMaterialsLocales,
  environmentPictograms,
  onEnvironmentChange
}) => {
  const { t } = useLanguage();

  // Helper function for performance color coding (same as gloves)
  const getPerformanceColor = (value: number | string | null): string => {
    if (!value || value === 'X') return 'bg-gray-100 border-gray-200';
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    if (numValue >= 4) return 'bg-green-600 text-white border-green-600';
    if (numValue >= 3) return 'bg-green-500 text-white border-green-500';
    if (numValue >= 2) return 'bg-green-400 text-white border-green-400';
    if (numValue >= 1) return 'bg-green-300 text-white border-green-300';
    if (typeof value === 'string' && value.length === 1) { // For letter grades like 'C'
      return 'bg-green-400 text-white border-green-400';
    }
    return 'bg-gray-100 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Length - Arm Protection Specific */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Arm Protection Length</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-w-md">
            <Label className="text-sm font-medium">Length (cm)</Label>
            <Input 
              type="number" 
              value={armAttributes.length_cm ?? ''} 
              onChange={(e) => setArmAttributes({ ...armAttributes, length_cm: e.target.value === '' ? null : Number(e.target.value) })} 
              placeholder="40"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">Length of the arm sleeve in centimetres</p>
          </div>
        </CardContent>
      </Card>

      {/* EN Standards */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">EN Standards</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* EN 388 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox 
                  checked={safety?.en_388?.enabled || false} 
                  onCheckedChange={(checked) => setSafety({ 
                    ...safety, 
                    en_388: { 
                      ...safety?.en_388, 
                      enabled: !!checked 
                    } 
                  })} 
                />
                <Label className="text-sm font-medium">EN 388 - Mechanical Risks</Label>
              </div>
              
              {safety?.en_388?.enabled && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-6">
                  <div>
                    <Label className="text-xs text-gray-600">Abrasion</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_388?.abrasion ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_388: { 
                          ...safety?.en_388, 
                          abrasion: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_388?.abrasion)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Cut (Coupe)</Label>
                    <Input 
                      value={safety?.en_388?.cut || ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_388: { 
                          ...safety?.en_388, 
                          cut: e.target.value || null 
                        } 
                      })}
                      placeholder="X"
                      className={`text-center ${getPerformanceColor(safety?.en_388?.cut)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Tear</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_388?.tear ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_388: { 
                          ...safety?.en_388, 
                          tear: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_388?.tear)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Puncture</Label>
                    <Input 
                      value={safety?.en_388?.puncture || ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_388: { 
                          ...safety?.en_388, 
                          puncture: e.target.value || null 
                        } 
                      })}
                      placeholder="X"
                      className={`text-center ${getPerformanceColor(safety?.en_388?.puncture)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Cut (ISO 13997)</Label>
                    <Input 
                      value={safety?.en_388?.iso_13997 || ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_388: { 
                          ...safety?.en_388, 
                          iso_13997: e.target.value || null 
                        } 
                      })}
                      placeholder="C"
                      className={`text-center ${getPerformanceColor(safety?.en_388?.iso_13997)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Impact (EN 13594)</Label>
                    <Input 
                      value={safety?.en_388?.impact_en_13594 || ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_388: { 
                          ...safety?.en_388, 
                          impact_en_13594: e.target.value || null 
                        } 
                      })}
                      placeholder="P"
                      className={`text-center ${getPerformanceColor(safety?.en_388?.impact_en_13594)}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* EN 407 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox 
                  checked={safety?.en_407?.enabled || false} 
                  onCheckedChange={(checked) => setSafety({ 
                    ...safety, 
                    en_407: { 
                      ...safety?.en_407, 
                      enabled: !!checked 
                    } 
                  })} 
                />
                <Label className="text-sm font-medium">EN 407 - Thermal Risks</Label>
              </div>
              
              {safety?.en_407?.enabled && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ml-6">
                  <div>
                    <Label className="text-xs text-gray-600">Flammability (Limited Flame Spread)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_407?.limited_flame_spread ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_407: { 
                          ...safety?.en_407, 
                          limited_flame_spread: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_407?.limited_flame_spread)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Contact Heat</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_407?.contact_heat ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_407: { 
                          ...safety?.en_407, 
                          contact_heat: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_407?.contact_heat)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Convective Heat</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_407?.convective_heat ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_407: { 
                          ...safety?.en_407, 
                          convective_heat: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_407?.convective_heat)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Radiant Heat</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_407?.radiant_heat ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_407: { 
                          ...safety?.en_407, 
                          radiant_heat: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_407?.radiant_heat)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Small Splashes (Molten Metal)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_407?.small_splashes_molten_metal ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_407: { 
                          ...safety?.en_407, 
                          small_splashes_molten_metal: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_407?.small_splashes_molten_metal)}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Large Splashes (Molten Metal)</Label>
                    <Input 
                      type="number" 
                      min="0" 
                      max="4" 
                      value={safety?.en_407?.large_quantities_molten_metal ?? ''} 
                      onChange={(e) => setSafety({ 
                        ...safety, 
                        en_407: { 
                          ...safety?.en_407, 
                          large_quantities_molten_metal: e.target.value === '' ? null : parseInt(e.target.value) 
                        } 
                      })}
                      className={`text-center ${getPerformanceColor(safety?.en_407?.large_quantities_molten_metal)}`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* EN ISO 21420 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Checkbox 
                  checked={safety?.en_iso_21420?.enabled || false} 
                  onCheckedChange={(checked) => setSafety({ 
                    ...safety, 
                    en_iso_21420: { 
                      ...safety?.en_iso_21420, 
                      enabled: !!checked 
                    } 
                  })} 
                />
                <Label className="text-sm font-medium">EN ISO 21420 - General Requirements</Label>
              </div>
              
              {safety?.en_iso_21420?.enabled && (
                <div className="ml-6">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-green-800 dark:text-green-200">
                      General requirements for protective gloves and arm protection
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EN 511 - Cold Protection */}
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

      {/* Other EN Standards */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Other Standards & Certifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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

      {/* Arm Attributes */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Move className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Arm Protection Attributes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Thumb Loop</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Checkbox 
                    checked={armAttributes.thumb_loop === true} 
                    onCheckedChange={(checked) => setArmAttributes({ 
                      ...armAttributes, 
                      thumb_loop: checked ? true : false 
                    })} 
                  />
                  <span className="text-sm text-gray-600">Has thumb loop for enhanced grip</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Closure Type</Label>
                <Select 
                  value={armAttributes.closure || ''} 
                  onValueChange={(value) => setArmAttributes({ ...armAttributes, closure: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={language === 'it' ? 'Seleziona tipo di chiusura' : 'Select closure type'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="velcro">{language === 'it' ? 'Velcro' : 'Velcro'}</SelectItem>
                    <SelectItem value="elastic">{language === 'it' ? 'Elastico' : 'Elastic'}</SelectItem>
                    <SelectItem value="none">{language === 'it' ? 'Nessuno' : 'None'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Environment Suitability */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Work Environment Suitability</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configure which work environments this arm protection is suitable for
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { 
                key: 'dry' as const, 
                icon: Sun, 
                label: 'Dry Conditions',
                description: 'Suitable for dry conditions'
              },
              { 
                key: 'wet' as const, 
                icon: Droplet, 
                label: 'Wet Conditions',
                description: 'Suitable for wet conditions'
              },
              { 
                key: 'dust' as const, 
                icon: Wind, 
                label: 'Dusty Conditions',
                description: 'Suitable for dusty conditions'
              },
              { 
                key: 'chemical' as const, 
                icon: FlaskConical, 
                label: 'Chemical Exposure',
                description: 'Suitable for chemical exposure'
              },
              { 
                key: 'biological' as const, 
                icon: Bug, 
                label: 'Biological Hazards',
                description: 'Suitable for biological hazards'
              },
              { 
                key: 'oily_grease' as const, 
                icon: Zap, 
                label: 'Oily / Greasy',
                description: 'Suitable for oily / greasy'
              },
            ].map((item) => {
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
                      onCheckedChange={(checked) => onEnvironmentChange({
                        ...environmentPictograms,
                        [item.key]: checked
                      })}
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
    </div>
  );
};
