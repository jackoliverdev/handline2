"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layers, Volume2, Mic, Settings, Shield, Droplets, Thermometer, Zap, Users, Bluetooth, Plus, X, Ear, FileText, FileCheck } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface HearingSafetyStandardsEditorProps {
  hearingStandards: any;
  setHearingStandards: (standards: any) => void;
  hearingAttributes: any;
  setHearingAttributes: (attributes: any) => void;
  hearingComfortFeatures: { en: string[]; it: string[] };
  setHearingComfortFeatures: (features: { en: string[]; it: string[] }) => void;
  hearingOtherDetails: { en: string[]; it: string[] };
  setHearingOtherDetails: (details: { en: string[]; it: string[] }) => void;
  hearingEquipment: { en: string[]; it: string[] };
  setHearingEquipment: (equipment: { en: string[]; it: string[] }) => void;
}

export const HearingSafetyStandardsEditor: React.FC<HearingSafetyStandardsEditorProps> = ({ 
  hearingStandards, 
  setHearingStandards,
  hearingAttributes,
  setHearingAttributes,
  hearingComfortFeatures,
  setHearingComfortFeatures,
  hearingOtherDetails,
  setHearingOtherDetails,
  hearingEquipment,
  setHearingEquipment
}) => {
  const { t, language } = useLanguage();

  const addMaterial = () => {
    const newMaterial = prompt('Enter material:');
    if (newMaterial?.trim()) {
      const currentMaterials = hearingAttributes.materials || [];
      setHearingAttributes({
        ...hearingAttributes,
        materials: [...currentMaterials, newMaterial.trim()]
      });
    }
  };

  const removeMaterial = (index: number) => {
    const currentMaterials = hearingAttributes.materials || [];
    setHearingAttributes({
      ...hearingAttributes,
      materials: currentMaterials.filter((_: any, i: number) => i !== index)
    });
  };

  const addEn352Part = () => {
    const newPart = prompt('Enter EN 352 part (e.g., EN 352-1):');
    if (newPart?.trim()) {
      const currentParts = hearingStandards.en352?.parts || [];
      setHearingStandards({
        ...hearingStandards,
        en352: {
          ...hearingStandards.en352,
          parts: [...currentParts, newPart.trim()]
        }
      });
    }
  };

  const removeEn352Part = (index: number) => {
    const currentParts = hearingStandards.en352?.parts || [];
    setHearingStandards({
      ...hearingStandards,
      en352: {
        ...hearingStandards.en352,
        parts: currentParts.filter((_: any, i: number) => i !== index)
      }
    });
  };

  const addAdditionalRequirement = () => {
    const newRequirement = prompt('Enter additional requirement code (e.g., S, V, W, E1):');
    if (newRequirement?.trim()) {
      const currentAdditional = hearingStandards.en352?.additional || [];
      setHearingStandards({
        ...hearingStandards,
        en352: {
          ...hearingStandards.en352,
          additional: [...currentAdditional, newRequirement.trim().toUpperCase()]
        }
      });
    }
  };

  const removeAdditionalRequirement = (index: number) => {
    const currentAdditional = hearingStandards.en352?.additional || [];
    setHearingStandards({
      ...hearingStandards,
      en352: {
        ...hearingStandards.en352,
        additional: currentAdditional.filter((_: any, i: number) => i !== index)
      }
    });
  };

  const addCompatibleWith = () => {
    const newCompatible = prompt('Enter compatible product:');
    if (newCompatible?.trim()) {
      const currentCompatible = hearingAttributes.compatible_with || [];
      setHearingAttributes({
        ...hearingAttributes,
        compatible_with: [...currentCompatible, newCompatible.trim()]
      });
    }
  };

  const removeCompatibleWith = (index: number) => {
    const currentCompatible = hearingAttributes.compatible_with || [];
    setHearingAttributes({
      ...hearingAttributes,
      compatible_with: currentCompatible.filter((_: any, i: number) => i !== index)
    });
  };

  const addAccessory = () => {
    const newAccessory = prompt('Enter accessory:');
    if (newAccessory?.trim()) {
      const currentAccessories = hearingAttributes.accessories || [];
      setHearingAttributes({
        ...hearingAttributes,
        accessories: [...currentAccessories, newAccessory.trim()]
      });
    }
  };

  const removeAccessory = (index: number) => {
    const currentAccessories = hearingAttributes.accessories || [];
    setHearingAttributes({
      ...hearingAttributes,
      accessories: currentAccessories.filter((_: any, i: number) => i !== index)
    });
  };

  const addComfortFeature = () => {
    const newFeature = prompt('Enter comfort feature:');
    if (newFeature?.trim()) {
      setHearingComfortFeatures({
        ...hearingComfortFeatures,
        [language]: [...(hearingComfortFeatures[language] || []), newFeature.trim()]
      });
    }
  };

  const removeComfortFeature = (index: number) => {
    setHearingComfortFeatures({
      ...hearingComfortFeatures,
      [language]: (hearingComfortFeatures[language] || []).filter((_, i) => i !== index)
    });
  };

  const addOtherDetail = () => {
    const newDetail = prompt('Enter other detail:');
    if (newDetail?.trim()) {
      setHearingOtherDetails({
        ...hearingOtherDetails,
        [language]: [...(hearingOtherDetails[language] || []), newDetail.trim()]
      });
    }
  };

  const removeOtherDetail = (index: number) => {
    setHearingOtherDetails({
      ...hearingOtherDetails,
      [language]: (hearingOtherDetails[language] || []).filter((_, i) => i !== index)
    });
  };

  const addEquipment = () => {
    const newEquipment = prompt('Enter equipment:');
    if (newEquipment?.trim()) {
      setHearingEquipment({
        ...hearingEquipment,
        [language]: [...(hearingEquipment[language] || []), newEquipment.trim()]
      });
    }
  };

  const removeEquipment = (index: number) => {
    setHearingEquipment({
      ...hearingEquipment,
      [language]: (hearingEquipment[language] || []).filter((_, i) => i !== index)
    });
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
                <Label className="text-sm font-medium">Materials</Label>
                <div className="space-y-3 mt-2">
                  <div className="space-y-2">
                    {(hearingAttributes.materials || []).map((material: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 flex-1">
                          {material}
                        </Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMaterial(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addMaterial}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Material
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Size & Category</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label className="text-xs text-gray-600">Size</Label>
                    <Input 
                      value={hearingAttributes.size || ''} 
                      onChange={(e) => setHearingAttributes({ ...hearingAttributes, size: e.target.value })} 
                      placeholder="e.g. M, S / M / L"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">CE Category</Label>
                    <Select 
                      value={hearingAttributes.ce_category || ''} 
                      onValueChange={(value) => setHearingAttributes({ ...hearingAttributes, ce_category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select CE Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="I">Category I</SelectItem>
                        <SelectItem value="II">Category II</SelectItem>
                        <SelectItem value="III">Category III</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* EN 352 Standards */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Ear className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">EN 352 Standards</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* SNR and H/M/L */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium">SNR (dB)</Label>
                <Input 
                  type="number" 
                  value={hearingStandards.en352?.snr_db ?? ''} 
                  onChange={(e) => setHearingStandards({ 
                    ...hearingStandards, 
                    en352: { 
                      ...hearingStandards.en352, 
                      snr_db: e.target.value === '' ? null : Number(e.target.value) 
                    } 
                  })}
                  placeholder="37"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">H / M / L (dB)</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(['h','m','l'] as const).map(k => (
                    <div key={k}>
                      <Label className="text-xs text-gray-600 uppercase">{k}</Label>
                      <Input 
                        type="number" 
                        value={hearingStandards.en352?.hml?.[k] ?? ''} 
                        onChange={(e) => setHearingStandards({ 
                          ...hearingStandards, 
                          en352: { 
                            ...hearingStandards.en352, 
                            hml: { 
                              ...(hearingStandards.en352?.hml || {}), 
                              [k]: e.target.value === '' ? null : Number(e.target.value) 
                            } 
                          } 
                        })}
                        placeholder={k === 'h' ? '36' : k === 'm' ? '35' : '34'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EN 352 Parts */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">EN 352 Parts</Label>
                <Button type="button" variant="outline" size="sm" onClick={addEn352Part}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Part
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(hearingStandards.en352?.parts || []).map((part: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                    {part}
                    <button
                      type="button"
                      onClick={() => removeEn352Part(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(hearingStandards.en352?.parts || []).length === 0 && (
                  <span className="text-sm text-gray-500 italic">No parts added</span>
                )}
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">Additional Requirements</Label>
                <Button type="button" variant="outline" size="sm" onClick={addAdditionalRequirement}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(hearingStandards.en352?.additional || []).map((req: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
                    {req}
                    <button
                      type="button"
                      onClick={() => removeAdditionalRequirement(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(hearingStandards.en352?.additional || []).length === 0 && (
                  <span className="text-sm text-gray-500 italic">No additional requirements</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hearing Attributes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Hearing Protection Attributes</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These attributes will be displayed as yes/no cards on the product detail page
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { 
                key: 'reusable', 
                enabled: hearingAttributes.reusable === true, 
                Icon: Settings,
                label: 'Reusable'
              },
              { 
                key: 'waterResistance', 
                enabled: hearingAttributes.water_resistance === true, 
                Icon: Droplets,
                label: 'Water Resistance'
              },
              { 
                key: 'extremeTemperature', 
                enabled: hearingAttributes.extreme_temperature === true, 
                Icon: Thermometer,
                label: 'Extreme Temperature'
              },
              { 
                key: 'electricalInsulation', 
                enabled: hearingAttributes.electrical_insulation === true, 
                Icon: Zap,
                label: 'Electrical Insulation'
              },
              { 
                key: 'compatibleWithOtherPPE', 
                enabled: Boolean(hearingAttributes.compatible_with && hearingAttributes.compatible_with.length > 0), 
                Icon: Users,
                label: 'Compatible with Other PPE'
              },
              { 
                key: 'bluetooth', 
                enabled: hearingAttributes.bluetooth === true, 
                Icon: Bluetooth,
                label: 'Bluetooth'
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
                    {item.key === 'reusable' && (
                      <Checkbox 
                        checked={hearingAttributes.reusable === true} 
                        onCheckedChange={(v) => setHearingAttributes({ ...hearingAttributes, reusable: v ? true : false })} 
                      />
                    )}
                    {item.key === 'waterResistance' && (
                      <Checkbox 
                        checked={hearingAttributes.water_resistance === true} 
                        onCheckedChange={(v) => setHearingAttributes({ ...hearingAttributes, water_resistance: v ? true : false })} 
                      />
                    )}
                    {item.key === 'extremeTemperature' && (
                      <Checkbox 
                        checked={hearingAttributes.extreme_temperature === true} 
                        onCheckedChange={(v) => setHearingAttributes({ ...hearingAttributes, extreme_temperature: v ? true : false })} 
                      />
                    )}
                    {item.key === 'electricalInsulation' && (
                      <Checkbox 
                        checked={hearingAttributes.electrical_insulation === true} 
                        onCheckedChange={(v) => setHearingAttributes({ ...hearingAttributes, electrical_insulation: v ? true : false })} 
                      />
                    )}
                    {item.key === 'bluetooth' && (
                      <Checkbox 
                        checked={hearingAttributes.bluetooth === true} 
                        onCheckedChange={(v) => setHearingAttributes({ ...hearingAttributes, bluetooth: v ? true : false })} 
                      />
                    )}
                    {item.key === 'compatibleWithOtherPPE' && (
                      <Checkbox 
                        checked={Boolean(hearingAttributes.compatible_with && hearingAttributes.compatible_with.length > 0)} 
                        onCheckedChange={(v) => {
                          if (v) {
                            // If enabling, ensure there's at least one compatible item
                            if (!hearingAttributes.compatible_with || hearingAttributes.compatible_with.length === 0) {
                              setHearingAttributes({ 
                                ...hearingAttributes, 
                                compatible_with: ['Compatible product'] 
                              });
                            }
                          } else {
                            // If disabling, clear the compatible_with array
                            setHearingAttributes({ 
                              ...hearingAttributes, 
                              compatible_with: [] 
                            });
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

      {/* Mount Type and Compatibility */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Mount Type & Compatibility</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Mount Type</Label>
                <Select 
                  value={hearingAttributes.mount || ''} 
                  onValueChange={(value) => setHearingAttributes({ ...hearingAttributes, mount: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select mount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="headband">Headband</SelectItem>
                    <SelectItem value="helmet">Helmet</SelectItem>
                    <SelectItem value="banded">Banded</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Compatible With</Label>
                <div className="space-y-2 mt-2">
                  {(hearingAttributes.compatible_with || []).map((compatible: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 flex-1">
                        {compatible}
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCompatibleWith(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={addCompatibleWith}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Compatible Product
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Accessories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(hearingAttributes.accessories || []).map((accessory: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 flex-1">
                  {accessory}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAccessory(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addAccessory}>
              <Plus className="h-4 w-4 mr-2" />
              Add Accessory
            </Button>
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
                checked={!!hearingStandards.en_421} 
                onCheckedChange={(v) => setHearingStandards({ ...hearingStandards, en_421: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">EN 659</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Firefighters' protective hearing protection</p>
              </div>
              <Switch 
                checked={!!hearingStandards.en_659} 
                onCheckedChange={(v) => setHearingStandards({ ...hearingStandards, en_659: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Food Grade</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Food contact safe</p>
              </div>
              <Switch 
                checked={!!hearingStandards.food_grade} 
                onCheckedChange={(v) => setHearingStandards({ ...hearingStandards, food_grade: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex-1">
                <Label className="text-sm font-medium">Ionising Radiation</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against ionising radiation</p>
              </div>
              <Switch 
                checked={!!hearingStandards.ionising_radiation} 
                onCheckedChange={(v) => setHearingStandards({ ...hearingStandards, ionising_radiation: v })} 
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <Label className="text-sm font-medium">Radioactive Contamination</Label>
                <p className="text-xs text-muted-foreground mt-0.5">Protection against radioactive contamination</p>
              </div>
              <Switch 
                checked={!!hearingStandards.radioactive_contamination} 
                onCheckedChange={(v) => setHearingStandards({ ...hearingStandards, radioactive_contamination: v })} 
              />
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
          <div className="space-y-3">
            {(hearingComfortFeatures[language] || []).map((feature: string, index: number) => (
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

      {/* Other Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Other Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(hearingOtherDetails[language] || []).map((detail: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 flex-1">
                  {detail}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOtherDetail(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addOtherDetail}>
              <Plus className="h-4 w-4 mr-2" />
              Add Other Detail
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Equipment */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Equipment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(hearingEquipment[language] || []).map((equipment: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20 flex-1">
                  {equipment}
                </Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEquipment(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addEquipment}>
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
