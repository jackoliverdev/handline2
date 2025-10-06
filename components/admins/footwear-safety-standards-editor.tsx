"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Waves, Droplets, FlaskConical, HardHat, Footprints, Plus, X, Layers, Ruler, Scale, FileText } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface FootwearSafetyStandardsEditorProps {
  footwearStandards: any;
  setFootwearStandards: (standards: any) => void;
  footwearAttributes: any;
  setFootwearAttributes: (attributes: any) => void;
  footwearComfortFeatures: { en: string[]; it: string[] };
  setFootwearComfortFeatures: (features: { en: string[]; it: string[] }) => void;
}

export const FootwearSafetyStandardsEditor: React.FC<FootwearSafetyStandardsEditorProps> = ({ 
  footwearStandards, 
  setFootwearStandards,
  footwearAttributes,
  setFootwearAttributes,
  footwearComfortFeatures,
  setFootwearComfortFeatures
}) => {
  const { t, language } = useLanguage();

  const addComfortFeature = () => {
    const newFeature = prompt('Enter comfort feature:');
    if (newFeature?.trim()) {
      setFootwearComfortFeatures({
        ...footwearComfortFeatures,
        [language]: [...(footwearComfortFeatures[language] || []), newFeature.trim()]
      });
    }
  };

  const removeComfortFeature = (index: number) => {
    setFootwearComfortFeatures({
      ...footwearComfortFeatures,
      [language]: (footwearComfortFeatures[language] || []).filter((_, i) => i !== index)
    });
  };

  const addWidthFit = () => {
    const newWidth = prompt('Enter width/fit value:');
    if (newWidth?.trim()) {
      setFootwearAttributes({
        ...footwearAttributes,
        width_fit: [...(footwearAttributes.width_fit || []), newWidth.trim()]
      });
    }
  };

  const removeWidthFit = (index: number) => {
    setFootwearAttributes({
      ...footwearAttributes,
      width_fit: (footwearAttributes.width_fit || []).filter((_: any, i: number) => i !== index)
    });
  };

  const addSpecialFeature = () => {
    const newFeature = prompt('Enter special feature:');
    if (newFeature?.trim()) {
      setFootwearAttributes({
        ...footwearAttributes,
        special: [...(footwearAttributes.special || []), newFeature.trim()]
      });
    }
  };

  const removeSpecialFeature = (index: number) => {
    setFootwearAttributes({
      ...footwearAttributes,
      special: (footwearAttributes.special || []).filter((_: any, i: number) => i !== index)
    });
  };

  const addStandardCode = (standard: 'en_iso_20345_2011' | 'en_iso_20345_2022') => {
    const newCode = prompt(`Enter ${standard} code:`);
    if (newCode?.trim()) {
      setFootwearStandards({
        ...footwearStandards,
        [standard]: [...(footwearStandards[standard] || []), newCode.trim()]
      });
    }
  };

  const removeStandardCode = (standard: 'en_iso_20345_2011' | 'en_iso_20345_2022', index: number) => {
    setFootwearStandards({
      ...footwearStandards,
      [standard]: (footwearStandards[standard] || []).filter((_: any, i: number) => i !== index)
    });
  };

  // Helper functions for class detection and color coding
  const isClassCode = (code: string) => /^S(?:B|[1-7]L?|[1-7]P?L?)$/i.test(code);
  const classRank = (code: string): number => {
    const c = code.toUpperCase();
    const table: Record<string, number> = {
      SB: 1, S1: 2, S1P: 3, S2: 3, S3: 4, S3L: 5, S4: 3, S5: 4, S6: 5, S7: 6, S7L: 7,
    };
    return table[c] ?? 1;
  };
  const classColour = (rank: number): string => {
    switch (rank) {
      case 1: return "bg-emerald-200 text-white";
      case 2: return "bg-emerald-300 text-white";
      case 3: return "bg-emerald-400 text-white";
      case 4: return "bg-emerald-500 text-white";
      case 5: return "bg-emerald-600 text-white";
      case 6: return "bg-emerald-700 text-white";
      default: return "bg-emerald-800 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Technical Specifications */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Technical Specifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Materials Breakdown</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label className="text-xs text-gray-600">Upper Material</Label>
                    <Input 
                      value={footwearAttributes.upper_material || ''} 
                      onChange={(e) => setFootwearAttributes({ ...footwearAttributes, upper_material: e.target.value })} 
                      placeholder="e.g. Leather, Synthetic"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Lining Material</Label>
                    <Input 
                      value={footwearAttributes.lining_material || ''} 
                      onChange={(e) => setFootwearAttributes({ ...footwearAttributes, lining_material: e.target.value })} 
                      placeholder="e.g. Textile, Mesh"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Sole Material</Label>
                    <Input 
                      value={footwearAttributes.sole_material || ''} 
                      onChange={(e) => setFootwearAttributes({ ...footwearAttributes, sole_material: e.target.value })} 
                      placeholder="e.g. PU, Rubber"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Insole Material</Label>
                    <Input 
                      value={footwearAttributes.insole_material || ''} 
                      onChange={(e) => setFootwearAttributes({ ...footwearAttributes, insole_material: e.target.value })} 
                      placeholder="e.g. EVA, Foam"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Toe Cap Material</Label>
                    <Input 
                      value={footwearAttributes.toe_cap || ''} 
                      onChange={(e) => setFootwearAttributes({ ...footwearAttributes, toe_cap: e.target.value })} 
                      placeholder="e.g. Steel, Composite"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Size & Fit</Label>
                <div className="space-y-3 mt-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-600">Size Min</Label>
                      <Input 
                        type="number" 
                        value={footwearAttributes.size_min ?? ''} 
                        onChange={(e) => setFootwearAttributes({ ...footwearAttributes, size_min: e.target.value === '' ? null : Number(e.target.value) })} 
                        placeholder="36"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Size Max</Label>
                      <Input 
                        type="number" 
                        value={footwearAttributes.size_max ?? ''} 
                        onChange={(e) => setFootwearAttributes({ ...footwearAttributes, size_max: e.target.value === '' ? null : Number(e.target.value) })} 
                        placeholder="45"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Width/Fit</Label>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {(footwearAttributes.width_fit || []).map((width: string, index: number) => (
                          <Badge key={index} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                            {width}
                            <button
                              type="button"
                              onClick={() => removeWidthFit(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={addWidthFit}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Width/Fit
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Gender</Label>
                    <Input 
                      value={footwearAttributes.gender || ''} 
                      onChange={(e) => setFootwearAttributes({ ...footwearAttributes, gender: e.target.value })} 
                      placeholder="e.g. Unisex, Men, Women"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-600">Weight (grams)</Label>
                      <Input 
                        type="number" 
                        value={footwearAttributes.weight_grams ?? ''} 
                        onChange={(e) => setFootwearAttributes({ ...footwearAttributes, weight_grams: e.target.value === '' ? null : Number(e.target.value) })} 
                        placeholder="800"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">Ref Size</Label>
                      <Input 
                        type="number" 
                        value={footwearAttributes.weight_ref_size ?? ''} 
                        onChange={(e) => setFootwearAttributes({ ...footwearAttributes, weight_ref_size: e.target.value === '' ? null : Number(e.target.value) })} 
                        placeholder="42"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EN Standards */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Footprints className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">EN Standards</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* EN ISO 20345:2011 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">EN ISO 20345:2011</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addStandardCode('en_iso_20345_2011')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Code
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(footwearStandards.en_iso_20345_2011 || []).map((code: string, index: number) => {
                  const isClass = isClassCode(code);
                  const rank = isClass ? classRank(code) : 0;
                  return (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={`${isClass ? classColour(rank) : 'bg-emerald-500 text-white border-emerald-500'}`}
                    >
                      {code.toUpperCase()}
                      <button
                        type="button"
                        onClick={() => removeStandardCode('en_iso_20345_2011', index)}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
                {(footwearStandards.en_iso_20345_2011 || []).length === 0 && (
                  <span className="text-sm text-gray-500 italic">No codes added</span>
                )}
              </div>
            </div>

            {/* EN ISO 20345:2022 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">EN ISO 20345:2022</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addStandardCode('en_iso_20345_2022')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Code
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(footwearStandards.en_iso_20345_2022 || []).map((code: string, index: number) => {
                  const isClass = isClassCode(code);
                  const rank = isClass ? classRank(code) : 0;
                  return (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className={`${isClass ? classColour(rank) : 'bg-emerald-500 text-white border-emerald-500'}`}
                    >
                      {code.toUpperCase()}
                      <button
                        type="button"
                        onClick={() => removeStandardCode('en_iso_20345_2022', index)}
                        className="ml-2 text-white hover:text-gray-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })}
                {(footwearStandards.en_iso_20345_2022 || []).length === 0 && (
                  <span className="text-sm text-gray-500 italic">No codes added</span>
                )}
              </div>
            </div>

            {/* Slip Resistance */}
            <div>
              <Label className="text-sm font-medium">Slip Resistance</Label>
              <Input 
                value={footwearStandards.slip_resistance || ''} 
                onChange={(e) => setFootwearStandards({ ...footwearStandards, slip_resistance: e.target.value })} 
                placeholder="e.g. SRC, SR"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footwear Attributes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Footwear Attributes</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These attributes will be displayed as yes/no cards on the product detail page
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { 
                key: 'metal_free', 
                enabled: footwearAttributes.metal_free === true, 
                Icon: Shield,
                label: 'Metal Free'
              },
              { 
                key: 'esd', 
                enabled: footwearAttributes.esd === true, 
                Icon: Zap,
                label: 'ESD'
              },
              { 
                key: 'slip_resistance', 
                enabled: Boolean(footwearStandards.slip_resistance), 
                Icon: Waves,
                label: 'Slip Resistance'
              },
              { 
                key: 'water_resistance', 
                enabled: footwearAttributes.water_resistance === true, 
                Icon: Droplets,
                label: 'Water Resistance'
              },
              { 
                key: 'chemical_resistance', 
                enabled: footwearAttributes.chemical_resistance === true, 
                Icon: FlaskConical,
                label: 'Chemical Exposure'
              },
              { 
                key: 'metatarsal_protection', 
                enabled: Boolean(footwearAttributes.special && Array.isArray(footwearAttributes.special) && footwearAttributes.special.includes('metatarsal_protection')), 
                Icon: HardHat,
                label: 'Metatarsal Protection'
              },
            ].map((item) => {
              const { Icon } = item;
              return (
                <div
                  key={item.key}
                  className={`group relative overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm p-3 ${
                    item.enabled
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${item.enabled ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                      <h4 className={`font-medium text-sm ${item.enabled ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>{item.label}</h4>
                    </div>
                    <div className={`text-sm font-bold ${item.enabled ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                      {item.enabled ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div className="mt-2">
                    {item.key === 'metal_free' && (
                      <Checkbox 
                        checked={footwearAttributes.metal_free === true} 
                        onCheckedChange={(v) => setFootwearAttributes({ ...footwearAttributes, metal_free: v ? true : false })} 
                      />
                    )}
                    {item.key === 'esd' && (
                      <Checkbox 
                        checked={footwearAttributes.esd === true} 
                        onCheckedChange={(v) => setFootwearAttributes({ ...footwearAttributes, esd: v ? true : false })} 
                      />
                    )}
                    {item.key === 'water_resistance' && (
                      <Checkbox 
                        checked={footwearAttributes.water_resistance === true} 
                        onCheckedChange={(v) => setFootwearAttributes({ ...footwearAttributes, water_resistance: v ? true : false })} 
                      />
                    )}
                    {item.key === 'chemical_resistance' && (
                      <Checkbox 
                        checked={footwearAttributes.chemical_resistance === true} 
                        onCheckedChange={(v) => setFootwearAttributes({ ...footwearAttributes, chemical_resistance: v ? true : false })} 
                      />
                    )}
                    {item.key === 'metatarsal_protection' && (
                      <Checkbox 
                        checked={Boolean(footwearAttributes.special && Array.isArray(footwearAttributes.special) && footwearAttributes.special.includes('metatarsal_protection'))} 
                        onCheckedChange={(v) => {
                          const special = footwearAttributes.special || [];
                          if (v) {
                            if (!special.includes('metatarsal_protection')) {
                              setFootwearAttributes({ ...footwearAttributes, special: [...special, 'metatarsal_protection'] });
                            }
                          } else {
                            setFootwearAttributes({ ...footwearAttributes, special: special.filter((s: string) => s !== 'metatarsal_protection') });
                          }
                        }} 
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Special Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Special Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(footwearAttributes.special || []).map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 flex-1">
                  {feature}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpecialFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addSpecialFeature}>
              <Plus className="h-4 w-4 mr-2" />
              Add Special Feature
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comfort Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Comfort Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(footwearComfortFeatures[language] || []).map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 flex-1">
                  {feature}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeComfortFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addComfortFeature}>
              <Plus className="h-4 w-4 mr-2" />
              Add Comfort Feature
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
