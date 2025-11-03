"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Waves, Droplets, FlaskConical, HardHat, Footprints, Plus, X, Layers, Ruler, Scale, FileText, FileCheck } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface FootwearSafetyStandardsEditorProps {
  language: 'en' | 'it';
  footwearStandards: any;
  setFootwearStandards: (standards: any) => void;
  footwearAttributes: any;
  setFootwearAttributes: (attributes: any) => void;
  footwearMaterialsLocales: { en: { upper: string; lining: string; sole: string; insole: string; toe_cap: string }; it: { upper: string; lining: string; sole: string; insole: string; toe_cap: string } };
  setFootwearMaterialsLocales: (materials: { en: { upper: string; lining: string; sole: string; insole: string; toe_cap: string }; it: { upper: string; lining: string; sole: string; insole: string; toe_cap: string } }) => void;
  footwearComfortFeatures: { en: string[]; it: string[] };
  setFootwearComfortFeatures: (features: { en: string[]; it: string[] }) => void;
  footwearSpecialFeatures: { en: string[]; it: string[] };
  setFootwearSpecialFeatures: (features: { en: string[]; it: string[] }) => void;
}

export const FootwearSafetyStandardsEditor: React.FC<FootwearSafetyStandardsEditorProps> = ({ 
  language,
  footwearStandards, 
  setFootwearStandards,
  footwearAttributes,
  setFootwearAttributes,
  footwearMaterialsLocales,
  setFootwearMaterialsLocales,
  footwearComfortFeatures,
  setFootwearComfortFeatures,
  footwearSpecialFeatures,
  setFootwearSpecialFeatures
}) => {
  const { t } = useLanguage();

  // Local state for input fields
  const [comfortFeatureInput, setComfortFeatureInput] = useState('');
  const [widthFitInput, setWidthFitInput] = useState('');
  const [specialFeatureInput, setSpecialFeatureInput] = useState('');
  const [en2011Input, setEn2011Input] = useState('');
  const [en2022Input, setEn2022Input] = useState('');

  const addComfortFeature = () => {
    if (comfortFeatureInput.trim()) {
      setFootwearComfortFeatures({
        ...footwearComfortFeatures,
        [language]: [...(footwearComfortFeatures[language] || []), comfortFeatureInput.trim()]
      });
      setComfortFeatureInput('');
    }
  };

  const removeComfortFeature = (index: number) => {
    setFootwearComfortFeatures({
      ...footwearComfortFeatures,
      [language]: (footwearComfortFeatures[language] || []).filter((_, i) => i !== index)
    });
  };

  const addWidthFit = () => {
    if (widthFitInput.trim()) {
      setFootwearAttributes({
        ...footwearAttributes,
        width_fit: [...(footwearAttributes.width_fit || []), widthFitInput.trim()]
      });
      setWidthFitInput('');
    }
  };

  const removeWidthFit = (index: number) => {
    setFootwearAttributes({
      ...footwearAttributes,
      width_fit: (footwearAttributes.width_fit || []).filter((_: any, i: number) => i !== index)
    });
  };

  const addSpecialFeature = () => {
    if (specialFeatureInput.trim()) {
      setFootwearSpecialFeatures({
        ...footwearSpecialFeatures,
        [language]: [...(footwearSpecialFeatures[language] || []), specialFeatureInput.trim()]
      });
      setSpecialFeatureInput('');
    }
  };

  const removeSpecialFeature = (index: number) => {
    setFootwearSpecialFeatures({
      ...footwearSpecialFeatures,
      [language]: (footwearSpecialFeatures[language] || []).filter((_, i) => i !== index)
    });
  };

  const addStandardCode2011 = () => {
    if (en2011Input.trim()) {
      setFootwearStandards({
        ...footwearStandards,
        en_iso_20345_2011: [...(footwearStandards.en_iso_20345_2011 || []), en2011Input.trim()]
      });
      setEn2011Input('');
    }
  };

  const addStandardCode2022 = () => {
    if (en2022Input.trim()) {
      setFootwearStandards({
        ...footwearStandards,
        en_iso_20345_2022: [...(footwearStandards.en_iso_20345_2022 || []), en2022Input.trim()]
      });
      setEn2022Input('');
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
      {/* Comfort Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Comfort Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add comfort feature" 
                value={comfortFeatureInput} 
                onChange={(e) => setComfortFeatureInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter' && comfortFeatureInput.trim()) { addComfortFeature(); } }} 
              />
              <Button type="button" size="sm" onClick={addComfortFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(footwearComfortFeatures[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(footwearComfortFeatures[language] || []).map((feature: string, index: number) => (
                  <Badge key={`${feature}-${index}`} variant="outline" className="flex items-center gap-1">
                    {feature}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0" 
                      onClick={() => removeComfortFeature(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Special Features */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Special Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add special feature" 
                value={specialFeatureInput} 
                onChange={(e) => setSpecialFeatureInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter' && specialFeatureInput.trim()) { addSpecialFeature(); } }} 
              />
              <Button type="button" size="sm" onClick={addSpecialFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(footwearSpecialFeatures[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(footwearSpecialFeatures[language] || []).map((feature: string, index: number) => (
                  <Badge key={`${feature}-${index}`} variant="outline" className="flex items-center gap-1">
                    {feature}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0" 
                      onClick={() => removeSpecialFeature(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
                      value={footwearMaterialsLocales[language].upper || ''} 
                      onChange={(e) => setFootwearMaterialsLocales({ ...footwearMaterialsLocales, [language]: { ...footwearMaterialsLocales[language], upper: e.target.value } })} 
                      placeholder="e.g. Leather, Synthetic"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Lining Material</Label>
                    <Input 
                      value={footwearMaterialsLocales[language].lining || ''} 
                      onChange={(e) => setFootwearMaterialsLocales({ ...footwearMaterialsLocales, [language]: { ...footwearMaterialsLocales[language], lining: e.target.value } })} 
                      placeholder="e.g. Textile, Mesh"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Sole Material</Label>
                    <Input 
                      value={footwearMaterialsLocales[language].sole || ''} 
                      onChange={(e) => setFootwearMaterialsLocales({ ...footwearMaterialsLocales, [language]: { ...footwearMaterialsLocales[language], sole: e.target.value } })} 
                      placeholder="e.g. PU, Rubber"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Insole Material</Label>
                    <Input 
                      value={footwearMaterialsLocales[language].insole || ''} 
                      onChange={(e) => setFootwearMaterialsLocales({ ...footwearMaterialsLocales, [language]: { ...footwearMaterialsLocales[language], insole: e.target.value } })} 
                      placeholder="e.g. EVA, Foam"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Toe Cap Material</Label>
                    <Input 
                      value={footwearMaterialsLocales[language].toe_cap || ''} 
                      onChange={(e) => setFootwearMaterialsLocales({ ...footwearMaterialsLocales, [language]: { ...footwearMaterialsLocales[language], toe_cap: e.target.value } })} 
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
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Add width/fit value" 
                          value={widthFitInput} 
                          onChange={(e) => setWidthFitInput(e.target.value)} 
                          onKeyDown={(e) => { if (e.key === 'Enter' && widthFitInput.trim()) { addWidthFit(); } }} 
                        />
                        <Button type="button" size="sm" onClick={addWidthFit}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {(footwearAttributes.width_fit || []).length === 0 ? (
                        <p className="text-sm text-muted-foreground">No items added.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {(footwearAttributes.width_fit || []).map((width: string, index: number) => (
                            <Badge key={`${width}-${index}`} variant="outline" className="flex items-center gap-1">
                              {width}
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-4 w-4 p-0" 
                                onClick={() => removeWidthFit(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
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
              <div className="mb-3">
                <Label className="text-sm font-medium mb-2 block">EN ISO 20345:2011</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. S3, SRC, etc." 
                    value={en2011Input} 
                    onChange={(e) => setEn2011Input(e.target.value)} 
                    onKeyDown={(e) => { if (e.key === 'Enter' && en2011Input.trim()) { addStandardCode2011(); } }} 
                  />
                  <Button type="button" size="sm" onClick={addStandardCode2011}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {(footwearStandards.en_iso_20345_2011 || []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No codes added.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(footwearStandards.en_iso_20345_2011 || []).map((code: string, index: number) => {
                    const isClass = isClassCode(code);
                    const rank = isClass ? classRank(code) : 0;
                    return (
                      <Badge 
                        key={`${code}-${index}`}
                        variant="outline" 
                        className={`flex items-center gap-1 ${isClass ? classColour(rank) : 'bg-emerald-500 text-white border-emerald-500'}`}
                      >
                        {code.toUpperCase()}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 text-white hover:text-gray-200" 
                          onClick={() => removeStandardCode('en_iso_20345_2011', index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            {/* EN ISO 20345:2022 */}
            <div>
              <div className="mb-3">
                <Label className="text-sm font-medium mb-2 block">EN ISO 20345:2022</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. S3, SRC, etc." 
                    value={en2022Input} 
                    onChange={(e) => setEn2022Input(e.target.value)} 
                    onKeyDown={(e) => { if (e.key === 'Enter' && en2022Input.trim()) { addStandardCode2022(); } }} 
                  />
                  <Button type="button" size="sm" onClick={addStandardCode2022}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {(footwearStandards.en_iso_20345_2022 || []).length === 0 ? (
                <p className="text-sm text-muted-foreground">No codes added.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(footwearStandards.en_iso_20345_2022 || []).map((code: string, index: number) => {
                    const isClass = isClassCode(code);
                    const rank = isClass ? classRank(code) : 0;
                    return (
                      <Badge 
                        key={`${code}-${index}`}
                        variant="outline" 
                        className={`flex items-center gap-1 ${isClass ? classColour(rank) : 'bg-emerald-500 text-white border-emerald-500'}`}
                      >
                        {code.toUpperCase()}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 text-white hover:text-gray-200" 
                          onClick={() => removeStandardCode('en_iso_20345_2022', index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              )}
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
                enabled: footwearAttributes.metatarsal_protection === true, 
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
                        checked={footwearAttributes.metatarsal_protection === true} 
                        onCheckedChange={(v) => setFootwearAttributes({ ...footwearAttributes, metatarsal_protection: v ? true : false })} 
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Other Standards & Certifications */}
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
                checked={!!footwearStandards.en_421} 
                onCheckedChange={(v) => setFootwearStandards({ ...footwearStandards, en_421: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 659</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Firefighters' protective footwear</p>
              </div>
              <Switch 
                checked={!!footwearStandards.en_659} 
                onCheckedChange={(v) => setFootwearStandards({ ...footwearStandards, en_659: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Food Grade</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Food contact safe</p>
              </div>
              <Switch 
                checked={!!footwearStandards.food_grade} 
                onCheckedChange={(v) => setFootwearStandards({ ...footwearStandards, food_grade: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Ionising Radiation</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against ionising radiation</p>
              </div>
              <Switch 
                checked={!!footwearStandards.ionising_radiation} 
                onCheckedChange={(v) => setFootwearStandards({ ...footwearStandards, ionising_radiation: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <Label className="text-sm font-medium">Radioactive Contamination</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against radioactive contamination</p>
              </div>
              <Switch 
                checked={!!footwearStandards.radioactive_contamination} 
                onCheckedChange={(v) => setFootwearStandards({ ...footwearStandards, radioactive_contamination: v })} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};



