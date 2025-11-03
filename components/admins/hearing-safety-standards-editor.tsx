"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, Mic, Settings, Shield, Droplets, Thermometer, Zap, Users, Bluetooth, Plus, X, Ear, FileText, FileCheck } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface HearingSafetyStandardsEditorProps {
  language: 'en' | 'it';
  hearingStandards: any;
  setHearingStandards: (standards: any) => void;
  hearingAttributes: any;
  setHearingAttributes: (attributes: any) => void;
  hearingCompatibleWithLocales: { en: string[]; it: string[] };
  setHearingCompatibleWithLocales: (locales: { en: string[]; it: string[] }) => void;
  hearingAccessoriesLocales: { en: string[]; it: string[] };
  setHearingAccessoriesLocales: (locales: { en: string[]; it: string[] }) => void;
  hearingComfortFeatures: { en: string[]; it: string[] };
  setHearingComfortFeatures: (features: { en: string[]; it: string[] }) => void;
  hearingOtherDetails: { en: string[]; it: string[] };
  setHearingOtherDetails: (details: { en: string[]; it: string[] }) => void;
  hearingEquipment: { en: string[]; it: string[] };
  setHearingEquipment: (equipment: { en: string[]; it: string[] }) => void;
}

export const HearingSafetyStandardsEditor: React.FC<HearingSafetyStandardsEditorProps> = ({ 
  language,
  hearingStandards, 
  setHearingStandards,
  hearingAttributes,
  setHearingAttributes,
  hearingCompatibleWithLocales,
  setHearingCompatibleWithLocales,
  hearingAccessoriesLocales,
  setHearingAccessoriesLocales,
  hearingComfortFeatures,
  setHearingComfortFeatures,
  hearingOtherDetails,
  setHearingOtherDetails,
  hearingEquipment,
  setHearingEquipment
}) => {
  const { t } = useLanguage();

  // Local state for input fields
  const [en352PartInput, setEn352PartInput] = useState('');
  const [additionalReqInput, setAdditionalReqInput] = useState('');
  const [compatibleWithInput, setCompatibleWithInput] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');
  const [comfortFeatureInput, setComfortFeatureInput] = useState('');
  const [otherDetailInput, setOtherDetailInput] = useState('');
  const [equipmentInput, setEquipmentInput] = useState('');

  const addEn352Part = () => {
    if (en352PartInput.trim()) {
      const currentParts = hearingStandards.en352?.parts || [];
      setHearingStandards({
        ...hearingStandards,
        en352: {
          ...hearingStandards.en352,
          parts: [...currentParts, en352PartInput.trim()]
        }
      });
      setEn352PartInput('');
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
    if (additionalReqInput.trim()) {
      const currentAdditional = hearingStandards.en352?.additional || [];
      setHearingStandards({
        ...hearingStandards,
        en352: {
          ...hearingStandards.en352,
          additional: [...currentAdditional, additionalReqInput.trim().toUpperCase()]
        }
      });
      setAdditionalReqInput('');
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
    if (compatibleWithInput.trim()) {
      setHearingCompatibleWithLocales({
        ...hearingCompatibleWithLocales,
        [language]: [...(hearingCompatibleWithLocales[language] || []), compatibleWithInput.trim()]
      });
      setCompatibleWithInput('');
    }
  };

  const removeCompatibleWith = (index: number) => {
    setHearingCompatibleWithLocales({
      ...hearingCompatibleWithLocales,
      [language]: (hearingCompatibleWithLocales[language] || []).filter((_, i) => i !== index)
    });
  };

  const addAccessory = () => {
    if (accessoryInput.trim()) {
      setHearingAccessoriesLocales({
        ...hearingAccessoriesLocales,
        [language]: [...(hearingAccessoriesLocales[language] || []), accessoryInput.trim()]
      });
      setAccessoryInput('');
    }
  };

  const removeAccessory = (index: number) => {
    setHearingAccessoriesLocales({
      ...hearingAccessoriesLocales,
      [language]: (hearingAccessoriesLocales[language] || []).filter((_, i) => i !== index)
    });
  };

  const addComfortFeature = () => {
    if (comfortFeatureInput.trim()) {
      setHearingComfortFeatures({
        ...hearingComfortFeatures,
        [language]: [...(hearingComfortFeatures[language] || []), comfortFeatureInput.trim()]
      });
      setComfortFeatureInput('');
    }
  };

  const removeComfortFeature = (index: number) => {
    setHearingComfortFeatures({
      ...hearingComfortFeatures,
      [language]: (hearingComfortFeatures[language] || []).filter((_, i) => i !== index)
    });
  };

  const addOtherDetail = () => {
    if (otherDetailInput.trim()) {
      setHearingOtherDetails({
        ...hearingOtherDetails,
        [language]: [...(hearingOtherDetails[language] || []), otherDetailInput.trim()]
      });
      setOtherDetailInput('');
    }
  };

  const removeOtherDetail = (index: number) => {
    setHearingOtherDetails({
      ...hearingOtherDetails,
      [language]: (hearingOtherDetails[language] || []).filter((_, i) => i !== index)
    });
  };

  const addEquipment = () => {
    if (equipmentInput.trim()) {
      setHearingEquipment({
        ...hearingEquipment,
        [language]: [...(hearingEquipment[language] || []), equipmentInput.trim()]
      });
      setEquipmentInput('');
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
                enabled: Boolean((hearingCompatibleWithLocales.en && hearingCompatibleWithLocales.en.length > 0) || (hearingCompatibleWithLocales.it && hearingCompatibleWithLocales.it.length > 0)), 
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

      {/* Mount Type */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">{language === 'it' ? 'Tipo di montaggio' : 'Mount Type'}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
              <div>
            <Label className="text-sm font-medium">{language === 'it' ? 'Tipo di montaggio' : 'Mount Type'}</Label>
            <Select 
              value={hearingAttributes.mount || ''} 
              onValueChange={(value) => setHearingAttributes({ ...hearingAttributes, mount: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder={language === 'it' ? 'Seleziona tipo di montaggio' : 'Select mount type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="headband">{language === 'it' ? 'Fascia' : 'Headband'}</SelectItem>
                <SelectItem value="helmet">{language === 'it' ? 'Casco' : 'Helmet'}</SelectItem>
                <SelectItem value="banded">{language === 'it' ? 'A fascia' : 'Banded'}</SelectItem>
                <SelectItem value="none">{language === 'it' ? 'Nessuno' : 'None'}</SelectItem>
              </SelectContent>
            </Select>
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
            {(hearingComfortFeatures[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(hearingComfortFeatures[language] || []).map((feature: string, index: number) => (
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
            {(hearingEquipment[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(hearingEquipment[language] || []).map((equipment: string, index: number) => (
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
            {(hearingOtherDetails[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(hearingOtherDetails[language] || []).map((detail: string, index: number) => (
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

      {/* Compatible With */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-primary" />
            <CardTitle className="text-lg">Compatible With</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add compatible product" 
                value={compatibleWithInput} 
                onChange={(e) => setCompatibleWithInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter' && compatibleWithInput.trim()) { addCompatibleWith(); } }} 
              />
              <Button type="button" size="sm" onClick={addCompatibleWith}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(hearingCompatibleWithLocales[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(hearingCompatibleWithLocales[language] || []).map((compatible: string, index: number) => (
                  <Badge key={`${compatible}-${index}`} variant="outline" className="flex items-center gap-1">
                    {compatible}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0" 
                      onClick={() => removeCompatibleWith(index)}
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

      {/* Accessories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Accessories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input 
                placeholder="Add accessory" 
                value={accessoryInput} 
                onChange={(e) => setAccessoryInput(e.target.value)} 
                onKeyDown={(e) => { if (e.key === 'Enter' && accessoryInput.trim()) { addAccessory(); } }} 
              />
              <Button type="button" size="sm" onClick={addAccessory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {(hearingAccessoriesLocales[language] || []).length === 0 ? (
              <p className="text-sm text-muted-foreground">No items added.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(hearingAccessoriesLocales[language] || []).map((accessory: string, index: number) => (
                  <Badge key={`${accessory}-${index}`} variant="outline" className="flex items-center gap-1">
                    {accessory}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0" 
                      onClick={() => removeAccessory(index)}
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
              <Label className="text-sm font-medium mb-2 block">EN 352 Parts</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. EN 352-1" 
                    value={en352PartInput} 
                    onChange={(e) => setEn352PartInput(e.target.value)} 
                    onKeyDown={(e) => { if (e.key === 'Enter' && en352PartInput.trim()) { addEn352Part(); } }} 
                  />
                  <Button type="button" size="sm" onClick={addEn352Part}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {(hearingStandards.en352?.parts || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No parts added.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {(hearingStandards.en352?.parts || []).map((part: string, index: number) => (
                      <Badge key={`${part}-${index}`} variant="outline" className="flex items-center gap-1 bg-brand-primary/5 border-brand-primary/20">
                        {part}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0" 
                          onClick={() => removeEn352Part(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Additional Requirements (S, V, W, E1, etc.)</Label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. S, V, W, E1" 
                    value={additionalReqInput} 
                    onChange={(e) => setAdditionalReqInput(e.target.value)} 
                    onKeyDown={(e) => { if (e.key === 'Enter' && additionalReqInput.trim()) { addAdditionalRequirement(); } }} 
                  />
                  <Button type="button" size="sm" onClick={addAdditionalRequirement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {(hearingStandards.en352?.additional || []).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No additional requirements added.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {(hearingStandards.en352?.additional || []).map((req: string, index: number) => (
                      <Badge key={`${req}-${index}`} variant="outline" className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300">
                        {req}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0" 
                          onClick={() => removeAdditionalRequirement(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
    </div>
  );
};
