"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Plus, X, FileCheck } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface HeadSafetyStandardsEditorProps {
  language: 'en' | 'it';
  headStandards: any;
  setHeadStandards: (standards: any) => void;
  headAttributes: any;
  setHeadAttributes: (attributes: any) => void;
  headTechSpecsLocales: { en: { form_factor: string; brim_length: string; colours: string[]; additional_features: string[] }; it: { form_factor: string; brim_length: string; colours: string[]; additional_features: string[] } };
  setHeadTechSpecsLocales: (specs: { en: { form_factor: string; brim_length: string; colours: string[]; additional_features: string[] }; it: { form_factor: string; brim_length: string; colours: string[]; additional_features: string[] } }) => void;
  headComfortFeatures: { en: string[]; it: string[] };
  setHeadComfortFeatures: (features: { en: string[]; it: string[] }) => void;
  headOtherDetails: { en: string[]; it: string[] };
  setHeadOtherDetails: (details: { en: string[]; it: string[] }) => void;
  headEquipment: { en: string[]; it: string[] };
  setHeadEquipment: (equipment: { en: string[]; it: string[] }) => void;
}

export const HeadSafetyStandardsEditor: React.FC<HeadSafetyStandardsEditorProps> = ({ 
  language,
  headStandards, 
  setHeadStandards,
  headAttributes,
  setHeadAttributes,
  headTechSpecsLocales,
  setHeadTechSpecsLocales,
  headComfortFeatures,
  setHeadComfortFeatures,
  headOtherDetails,
  setHeadOtherDetails,
  headEquipment,
  setHeadEquipment
}) => {
  const { t } = useLanguage();

  // Local state for input fields
  const [comfortFeatureInput, setComfortFeatureInput] = useState('');
  const [otherDetailInput, setOtherDetailInput] = useState('');
  const [equipmentInput, setEquipmentInput] = useState('');
  const [colourInput, setColourInput] = useState('');
  const [additionalFeatureInput, setAdditionalFeatureInput] = useState('');

  const addComfortFeature = () => {
    if (comfortFeatureInput.trim()) {
      setHeadComfortFeatures({
        ...headComfortFeatures,
        [language]: [...(headComfortFeatures[language] || []), comfortFeatureInput.trim()]
      });
      setComfortFeatureInput('');
    }
  };

  const removeComfortFeature = (index: number) => {
    setHeadComfortFeatures({
      ...headComfortFeatures,
      [language]: (headComfortFeatures[language] || []).filter((_, i) => i !== index)
    });
  };

  const addOtherDetail = () => {
    if (otherDetailInput.trim()) {
      setHeadOtherDetails({
        ...headOtherDetails,
        [language]: [...(headOtherDetails[language] || []), otherDetailInput.trim()]
      });
      setOtherDetailInput('');
    }
  };

  const removeOtherDetail = (index: number) => {
    setHeadOtherDetails({
      ...headOtherDetails,
      [language]: (headOtherDetails[language] || []).filter((_, i) => i !== index)
    });
  };

  const addEquipment = () => {
    if (equipmentInput.trim()) {
      setHeadEquipment({
        ...headEquipment,
        [language]: [...(headEquipment[language] || []), equipmentInput.trim()]
      });
      setEquipmentInput('');
    }
  };

  const removeEquipment = (index: number) => {
    setHeadEquipment({
      ...headEquipment,
      [language]: (headEquipment[language] || []).filter((_, i) => i !== index)
    });
  };

  const addColour = () => {
    if (colourInput.trim()) {
      setHeadTechSpecsLocales({
        ...headTechSpecsLocales,
        [language]: {
          ...headTechSpecsLocales[language],
          colours: [...(headTechSpecsLocales[language].colours || []), colourInput.trim()]
        }
      });
      setColourInput('');
    }
  };

  const removeColour = (index: number) => {
    setHeadTechSpecsLocales({
      ...headTechSpecsLocales,
      [language]: {
        ...headTechSpecsLocales[language],
        colours: (headTechSpecsLocales[language].colours || []).filter((_, i) => i !== index)
      }
    });
  };

  const addAdditionalFeature = () => {
    if (additionalFeatureInput.trim()) {
      setHeadTechSpecsLocales({
        ...headTechSpecsLocales,
        [language]: {
          ...headTechSpecsLocales[language],
          additional_features: [...(headTechSpecsLocales[language].additional_features || []), additionalFeatureInput.trim()]
        }
      });
      setAdditionalFeatureInput('');
    }
  };

  const removeAdditionalFeature = (index: number) => {
    setHeadTechSpecsLocales({
      ...headTechSpecsLocales,
      [language]: {
        ...headTechSpecsLocales[language],
        additional_features: (headTechSpecsLocales[language].additional_features || []).filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Technical Specifications */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Technical Specifications</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Form Factor</Label>
                <Input 
                  value={headTechSpecsLocales[language].form_factor || ''} 
                  onChange={(e) => setHeadTechSpecsLocales({ 
                    ...headTechSpecsLocales, 
                    [language]: { ...headTechSpecsLocales[language], form_factor: e.target.value } 
                  })} 
                  placeholder="e.g. Full brim, Cap style"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Brim Length</Label>
                <Input 
                  value={headTechSpecsLocales[language].brim_length || ''} 
                  onChange={(e) => setHeadTechSpecsLocales({ 
                    ...headTechSpecsLocales, 
                    [language]: { ...headTechSpecsLocales[language], brim_length: e.target.value } 
                  })} 
                  placeholder="e.g. Short, Long"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium">Size Min (cm)</Label>
                  <Input 
                    type="number" 
                    value={headAttributes.size_min_cm ?? ''} 
                    onChange={(e) => setHeadAttributes({ ...headAttributes, size_min_cm: e.target.value === '' ? null : Number(e.target.value) })} 
                    placeholder="51"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Size Max (cm)</Label>
                  <Input 
                    type="number" 
                    value={headAttributes.size_max_cm ?? ''} 
                    onChange={(e) => setHeadAttributes({ ...headAttributes, size_max_cm: e.target.value === '' ? null : Number(e.target.value) })} 
                    placeholder="65"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Weight (grams)</Label>
                <Input 
                  type="number" 
                  value={headAttributes.weight_g ?? ''} 
                  onChange={(e) => setHeadAttributes({ ...headAttributes, weight_g: e.target.value === '' ? null : Number(e.target.value) })} 
                  placeholder="394"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Colours</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Add colour" 
                      value={colourInput} 
                      onChange={(e) => setColourInput(e.target.value)} 
                      onKeyDown={(e) => { if (e.key === 'Enter' && colourInput.trim()) { addColour(); } }} 
                    />
                    <Button type="button" size="sm" onClick={addColour}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {(headTechSpecsLocales[language].colours || []).length === 0 ? (
                    <p className="text-sm text-muted-foreground">No items added.</p>
                  ) : (
                  <div className="flex flex-wrap gap-2">
                      {(headTechSpecsLocales[language].colours || []).map((colour: string, index: number) => (
                        <Badge key={`${colour}-${index}`} variant="outline" className="flex items-center gap-1">
                        {colour}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0" 
                          onClick={() => removeColour(index)}
                        >
                          <X className="h-3 w-3" />
                          </Button>
                      </Badge>
                    ))}
                  </div>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-medium">Features</Label>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {/* Show existing boolean features */}
                    {headAttributes.ventilation && (
                      <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                        Ventilation
                        <button
                          type="button"
                          onClick={() => setHeadAttributes({ ...headAttributes, ventilation: false })}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {headAttributes.closed_shell && (
                      <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                        Closed Shell
                        <button
                          type="button"
                          onClick={() => setHeadAttributes({ ...headAttributes, closed_shell: false })}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {/* Show additional features array */}
                    {(headTechSpecsLocales[language].additional_features || []).map((feature: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeAdditionalFeature(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={headAttributes.ventilation === true} 
                          onCheckedChange={(v) => setHeadAttributes({ ...headAttributes, ventilation: v ? true : false })} 
                        />
                        <Label className="text-sm">Ventilation</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={headAttributes.closed_shell === true} 
                          onCheckedChange={(v) => setHeadAttributes({ ...headAttributes, closed_shell: v ? true : false })} 
                        />
                        <Label className="text-sm">Closed Shell</Label>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Input 
                        placeholder="Add additional feature" 
                        value={additionalFeatureInput} 
                        onChange={(e) => setAdditionalFeatureInput(e.target.value)} 
                        onKeyDown={(e) => { if (e.key === 'Enter' && additionalFeatureInput.trim()) { addAdditionalFeature(); } }} 
                      />
                      <Button type="button" size="sm" onClick={addAdditionalFeature}>
                        <Plus className="h-4 w-4" />
                    </Button>
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
            <FileText className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">EN Standards</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!headStandards.en397?.present} 
                onCheckedChange={(v) => setHeadStandards({ 
                  ...headStandards, 
                  en397: { 
                    ...(headStandards.en397 || {}), 
                    present: !!v, 
                    optional: headStandards.en397?.optional || { low_temperature: false, molten_metal: false } 
                  } 
                })} 
              />
              <Label className="text-sm font-medium">EN 397 - Industrial Safety Helmets</Label>
            </div>
            
            {headStandards.en397?.present && (
              <div className="ml-6 space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Low Temperature</Label>
                  <Input 
                    placeholder="e.g. -20°C or -30°C" 
                    value={headStandards.en397?.optional?.low_temperature || ''} 
                    onChange={(e) => setHeadStandards({ 
                      ...headStandards, 
                      en397: { 
                        ...(headStandards.en397 || {}), 
                        optional: { 
                          ...(headStandards.en397?.optional || {}), 
                          low_temperature: e.target.value 
                        } 
                      } 
                    })} 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">High Temperature</Label>
                  <Input 
                    placeholder="e.g. 150°C" 
                    value={headStandards.en397?.optional?.high_temperature || ''} 
                    onChange={(e) => setHeadStandards({ 
                      ...headStandards, 
                      en397: { 
                        ...(headStandards.en397 || {}), 
                        optional: { 
                          ...(headStandards.en397?.optional || {}), 
                          high_temperature: e.target.value 
                        } 
                      } 
                    })} 
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-600">Electrical Insulation</Label>
                  <Input 
                    placeholder="e.g. 440 V a.c." 
                    value={headStandards.en397?.optional?.electrical_insulation || ''} 
                    onChange={(e) => setHeadStandards({ 
                      ...headStandards, 
                      en397: { 
                        ...(headStandards.en397 || {}), 
                        optional: { 
                          ...(headStandards.en397?.optional || {}), 
                          electrical_insulation: e.target.value 
                        } 
                      } 
                    })} 
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={!!headStandards.en397?.optional?.molten_metal} 
                    onCheckedChange={(v) => setHeadStandards({ 
                      ...headStandards, 
                      en397: { 
                        ...(headStandards.en397 || {}), 
                        optional: { 
                          ...(headStandards.en397?.optional || {}), 
                          molten_metal: !!v 
                        } 
                      } 
                    })} 
                  />
                  <Label className="text-sm">Molten Metal (MM)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={!!headStandards.en397?.optional?.lateral_deformation} 
                    onCheckedChange={(v) => setHeadStandards({ 
                      ...headStandards, 
                      en397: { 
                        ...(headStandards.en397 || {}), 
                        optional: { 
                          ...(headStandards.en397?.optional || {}), 
                          lateral_deformation: !!v 
                        } 
                      } 
                    })} 
                  />
                  <Label className="text-sm">Lateral Deformation (LD)</Label>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!headStandards.en50365} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, en50365: !!v })} 
              />
              <Label className="text-sm font-medium">EN 50365 - Electrical Insulation (use EN 397 field above instead)</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!headStandards.en12492} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, en12492: !!v })} 
              />
              <Label className="text-sm font-medium">EN 12492 - Mountaineering Helmets</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox 
                checked={!!headStandards.en812} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, en812: !!v })} 
              />
              <Label className="text-sm font-medium">EN 812 - Industrial Bump Caps</Label>
            </div>
          </div>
        </CardContent>
      </Card>

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
            {(headComfortFeatures[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
            {(headComfortFeatures[language] || []).map((feature: string, index: number) => (
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

      {/* Other Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Other Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add other detail" 
                value={otherDetailInput} 
                onChange={(e) => setOtherDetailInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter' && otherDetailInput.trim()) { addOtherDetail(); } }} 
              />
              <Button type="button" size="sm" onClick={addOtherDetail}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(headOtherDetails[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
            {(headOtherDetails[language] || []).map((detail: string, index: number) => (
                  <Badge key={`${detail}-${index}`} variant="outline" className="flex items-center gap-1">
                  {detail}
                <Button
                  variant="ghost"
                  size="sm"
                      className="h-4 w-4 p-0" 
                  onClick={() => removeOtherDetail(index)}
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

      {/* Equipment */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add equipment" 
                value={equipmentInput} 
                onChange={(e) => setEquipmentInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter' && equipmentInput.trim()) { addEquipment(); } }} 
              />
              <Button type="button" size="sm" onClick={addEquipment}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(headEquipment[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
            {(headEquipment[language] || []).map((equipment: string, index: number) => (
                  <Badge key={`${equipment}-${index}`} variant="outline" className="flex items-center gap-1">
                  {equipment}
                <Button
                  variant="ghost"
                  size="sm"
                      className="h-4 w-4 p-0" 
                  onClick={() => removeEquipment(index)}
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
                checked={!!headStandards.en_421} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, en_421: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 659</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Firefighters' protective helmets</p>
              </div>
              <Switch 
                checked={!!headStandards.en_659} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, en_659: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Food Grade</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Food contact safe</p>
              </div>
              <Switch 
                checked={!!headStandards.food_grade} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, food_grade: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Ionising Radiation</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against ionising radiation</p>
              </div>
              <Switch 
                checked={!!headStandards.ionising_radiation} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, ionising_radiation: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <Label className="text-sm font-medium">Radioactive Contamination</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against radioactive contamination</p>
              </div>
              <Switch 
                checked={!!headStandards.radioactive_contamination} 
                onCheckedChange={(v) => setHeadStandards({ ...headStandards, radioactive_contamination: v })} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Head Protection Attributes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Head Protection Attributes</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These attributes will be displayed as yes/no cards on the product detail page
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { 
                key: 'lowTemp', 
                enabled: Boolean(headStandards?.en397?.optional?.low_temperature), 
                Icon: Shield,
                label: 'Low Temperature'
              },
              { 
                key: 'highTemp', 
                enabled: Boolean(headStandards?.en397?.optional?.high_temperature), 
                Icon: Shield,
                label: 'High Temperature'
              },
              { 
                key: 'electricalIns', 
                enabled: Boolean(headStandards?.en397?.optional?.electrical_insulation), 
                Icon: Shield,
                label: 'Electrical Insulation'
              },
              { 
                key: 'moltenMetal', 
                enabled: Boolean(headStandards?.en397?.optional?.molten_metal), 
                Icon: Shield,
                label: 'Molten Metal (MM)'
              },
              { 
                key: 'lateralDef', 
                enabled: Boolean(headStandards?.en397?.optional?.lateral_deformation), 
                Icon: Shield,
                label: 'Lateral Deformation (LD)'
              },
              { 
                key: 'ventilation', 
                enabled: Boolean(headAttributes?.ventilation), 
                Icon: Shield,
                label: 'Ventilation'
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
                    {item.key === 'lowTemp' && (
                      <Checkbox 
                        checked={item.enabled} 
                        onCheckedChange={(v) => {
                          setHeadStandards({ 
                            ...headStandards, 
                            en397: { 
                              ...(headStandards.en397 || {}), 
                              optional: { 
                                ...(headStandards.en397?.optional || {}), 
                                low_temperature: v ? '-30°C' : '' 
                              } 
                            } 
                          });
                        }} 
                      />
                    )}
                    {item.key === 'highTemp' && (
                      <Checkbox 
                        checked={item.enabled} 
                        onCheckedChange={(v) => {
                          setHeadStandards({ 
                            ...headStandards, 
                            en397: { 
                              ...(headStandards.en397 || {}), 
                              optional: { 
                                ...(headStandards.en397?.optional || {}), 
                                high_temperature: v ? '150°C' : '' 
                              } 
                            } 
                          });
                        }} 
                      />
                    )}
                    {item.key === 'electricalIns' && (
                      <Checkbox 
                        checked={item.enabled} 
                        onCheckedChange={(v) => {
                          setHeadStandards({ 
                            ...headStandards, 
                            en397: { 
                              ...(headStandards.en397 || {}), 
                              optional: { 
                                ...(headStandards.en397?.optional || {}), 
                                electrical_insulation: v ? '440 V a.c.' : '' 
                              } 
                            } 
                          });
                        }} 
                      />
                    )}
                    {item.key === 'moltenMetal' && (
                      <Checkbox 
                        checked={item.enabled} 
                        onCheckedChange={(v) => {
                          setHeadStandards({ 
                            ...headStandards, 
                            en397: { 
                              ...(headStandards.en397 || {}), 
                              optional: { 
                                ...(headStandards.en397?.optional || {}), 
                                molten_metal: v ? true : false 
                              } 
                            } 
                          });
                        }} 
                      />
                    )}
                    {item.key === 'lateralDef' && (
                      <Checkbox 
                        checked={item.enabled} 
                        onCheckedChange={(v) => {
                          setHeadStandards({ 
                            ...headStandards, 
                            en397: { 
                              ...(headStandards.en397 || {}), 
                              optional: { 
                                ...(headStandards.en397?.optional || {}), 
                                lateral_deformation: v ? true : false 
                              } 
                            } 
                          });
                        }} 
                      />
                    )}
                    {item.key === 'ventilation' && (
                      <Checkbox 
                        checked={item.enabled} 
                        onCheckedChange={(v) => {
                          setHeadAttributes({ ...headAttributes, ventilation: v ? true : false });
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
    </div>
  );
};
