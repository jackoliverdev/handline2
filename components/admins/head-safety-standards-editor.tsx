"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, FileText, Plus, X } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface HeadSafetyStandardsEditorProps {
  headStandards: any;
  setHeadStandards: (standards: any) => void;
  headAttributes: any;
  setHeadAttributes: (attributes: any) => void;
  headComfortFeatures: { en: string[]; it: string[] };
  setHeadComfortFeatures: (features: { en: string[]; it: string[] }) => void;
  headOtherDetails: { en: string[]; it: string[] };
  setHeadOtherDetails: (details: { en: string[]; it: string[] }) => void;
  headEquipment: { en: string[]; it: string[] };
  setHeadEquipment: (equipment: { en: string[]; it: string[] }) => void;
}

export const HeadSafetyStandardsEditor: React.FC<HeadSafetyStandardsEditorProps> = ({ 
  headStandards, 
  setHeadStandards,
  headAttributes,
  setHeadAttributes,
  headComfortFeatures,
  setHeadComfortFeatures,
  headOtherDetails,
  setHeadOtherDetails,
  headEquipment,
  setHeadEquipment
}) => {
  const { t, language } = useLanguage();

  const addComfortFeature = () => {
    const newFeature = prompt('Enter comfort feature:');
    if (newFeature?.trim()) {
      setHeadComfortFeatures({
        ...headComfortFeatures,
        [language]: [...(headComfortFeatures[language] || []), newFeature.trim()]
      });
    }
  };

  const removeComfortFeature = (index: number) => {
    setHeadComfortFeatures({
      ...headComfortFeatures,
      [language]: (headComfortFeatures[language] || []).filter((_, i) => i !== index)
    });
  };

  const addOtherDetail = () => {
    const newDetail = prompt('Enter other detail:');
    if (newDetail?.trim()) {
      setHeadOtherDetails({
        ...headOtherDetails,
        [language]: [...(headOtherDetails[language] || []), newDetail.trim()]
      });
    }
  };

  const removeOtherDetail = (index: number) => {
    setHeadOtherDetails({
      ...headOtherDetails,
      [language]: (headOtherDetails[language] || []).filter((_, i) => i !== index)
    });
  };

  const addEquipment = () => {
    const newEquipment = prompt('Enter equipment:');
    if (newEquipment?.trim()) {
      setHeadEquipment({
        ...headEquipment,
        [language]: [...(headEquipment[language] || []), newEquipment.trim()]
      });
    }
  };

  const removeEquipment = (index: number) => {
    setHeadEquipment({
      ...headEquipment,
      [language]: (headEquipment[language] || []).filter((_, i) => i !== index)
    });
  };

  const addColour = () => {
    const newColour = prompt('Enter colour:');
    if (newColour?.trim()) {
      setHeadAttributes({
        ...headAttributes,
        colours: [...(headAttributes.colours || []), newColour.trim()]
      });
    }
  };

  const removeColour = (index: number) => {
    setHeadAttributes({
      ...headAttributes,
      colours: (headAttributes.colours || []).filter((_: any, i: number) => i !== index)
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
                  value={headAttributes.form_factor || ''} 
                  onChange={(e) => setHeadAttributes({ ...headAttributes, form_factor: e.target.value })} 
                  placeholder="e.g. Full brim, Cap style"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Brim Length</Label>
                <Input 
                  value={headAttributes.brim_length || ''} 
                  onChange={(e) => setHeadAttributes({ ...headAttributes, brim_length: e.target.value })} 
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
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {(headAttributes.colours || []).map((colour: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                        {colour}
                        <button
                          type="button"
                          onClick={() => removeColour(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addColour}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Colour
                  </Button>
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
                    {(headAttributes.features || []).map((feature: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                        {feature}
                        <button
                          type="button"
                          onClick={() => setHeadAttributes({
                            ...headAttributes,
                            features: (headAttributes.features || []).filter((_: any, i: number) => i !== index)
                          })}
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
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      const newFeature = prompt('Enter additional feature:');
                      if (newFeature?.trim()) {
                        setHeadAttributes({
                          ...headAttributes,
                          features: [...(headAttributes.features || []), newFeature.trim()]
                        });
                      }
                    }}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Additional Feature
                    </Button>
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
              <div className="ml-6 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={!!headStandards.en397?.optional?.low_temperature} 
                    onCheckedChange={(v) => setHeadStandards({ 
                      ...headStandards, 
                      en397: { 
                        ...(headStandards.en397 || {}), 
                        optional: { 
                          ...(headStandards.en397?.optional || {}), 
                          low_temperature: !!v 
                        } 
                      } 
                    })} 
                  />
                  <Label className="text-sm">Low Temperature (-30°C)</Label>
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
              <Label className="text-sm font-medium">EN 50365 - Electrical Insulation</Label>
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
          <div className="space-y-3">
            {(headComfortFeatures[language] || []).map((feature: string, index: number) => (
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
            {(headOtherDetails[language] || []).map((detail: string, index: number) => (
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
            {(headEquipment[language] || []).map((equipment: string, index: number) => (
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

      {/* Attributes Preview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Attributes Preview</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These attributes will be displayed as badges on the product detail page based on your settings above
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label className="text-sm font-medium">Current Attributes:</Label>
            <div className="flex flex-wrap gap-2">
              {/* Temperature from EN 397 optional */}
              {headStandards?.en397?.optional?.low_temperature && (
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  {headStandards.en397.optional.low_temperature}
                </Badge>
              )}
              
              {/* Molten Metal from EN 397 optional */}
              {headStandards?.en397?.optional?.molten_metal && (
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  MM
                </Badge>
              )}
              
              {/* Lateral Deformation from EN 397 optional */}
              {headStandards?.en397?.optional?.lateral_deformation && (
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  LD
                </Badge>
              )}
              
              {/* Ventilation from attributes */}
              {headAttributes?.ventilation && (
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  Ventilation
                </Badge>
              )}
              
              {/* Closed Shell from attributes */}
              {headAttributes?.closed_shell && (
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  Closed Shell
                </Badge>
              )}
              
              {/* Additional Features from attributes */}
              {(headAttributes?.features || []).map((feature: string, index: number) => (
                <Badge key={index} variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  {feature}
                </Badge>
              ))}
              
              {/* Brim Length from attributes */}
              {headAttributes?.brim_length === 'short' && (
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  Short Brim
                </Badge>
              )}
              {headAttributes?.brim_length === 'long' && (
                <Badge variant="outline" className="bg-brand-primary/5 border-brand-primary/20">
                  Long Brim
                </Badge>
              )}
              
              {/* Show message if no attributes */}
              {!headStandards?.en397?.optional?.low_temperature && 
               !headStandards?.en397?.optional?.molten_metal && 
               !headStandards?.en397?.optional?.lateral_deformation && 
               !headAttributes?.ventilation && 
               !headAttributes?.closed_shell && 
               (!headAttributes?.features || headAttributes.features.length === 0) && 
               headAttributes?.brim_length !== 'short' && 
               headAttributes?.brim_length !== 'long' && (
                <span className="text-sm text-gray-500 italic">No attributes will be displayed</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
