"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Layers, Ruler, Move, Plus, X, FileText } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

interface ArmSafetyStandardsEditorProps {
  safety: any;
  setSafety: (safety: any) => void;
  armAttributes: any;
  setArmAttributes: (attributes: any) => void;
}

export const ArmSafetyStandardsEditor: React.FC<ArmSafetyStandardsEditorProps> = ({ 
  safety, 
  setSafety,
  armAttributes,
  setArmAttributes
}) => {
  const { t, language } = useLanguage();

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

  const addMaterial = () => {
    const newMaterial = prompt('Enter material:');
    if (newMaterial?.trim()) {
      const currentMaterials = armAttributes.materials || [];
      setArmAttributes({
        ...armAttributes,
        materials: [...currentMaterials, newMaterial.trim()]
      });
    }
  };

  const removeMaterial = (index: number) => {
    const currentMaterials = armAttributes.materials || [];
    setArmAttributes({
      ...armAttributes,
      materials: currentMaterials.filter((_: any, i: number) => i !== index)
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
                    {(armAttributes.materials || []).map((material: string, index: number) => (
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
                <Label className="text-sm font-medium">Size & Dimensions</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label className="text-xs text-gray-600">Size</Label>
                    <Input 
                      value={armAttributes.size || ''} 
                      onChange={(e) => setArmAttributes({ ...armAttributes, size: e.target.value })} 
                      placeholder="e.g. M / L, S / M / L"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Length (cm)</Label>
                    <Input 
                      type="number" 
                      value={armAttributes.length_cm ?? ''} 
                      onChange={(e) => setArmAttributes({ ...armAttributes, length_cm: e.target.value === '' ? null : Number(e.target.value) })} 
                      placeholder="40"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">CE Category</Label>
                    <Select 
                      value={armAttributes.ce_category || ''} 
                      onValueChange={(value) => setArmAttributes({ ...armAttributes, ce_category: value })}
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
                    <SelectValue placeholder="Select closure type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="velcro">Velcro</SelectItem>
                    <SelectItem value="elastic">Elastic</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attributes Preview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Attributes Preview</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            These attributes will be displayed on the product detail page
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {armAttributes.thumb_loop && (
              <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200">
                Thumb Loop
              </Badge>
            )}
            {armAttributes.closure && (
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">
                {armAttributes.closure.charAt(0).toUpperCase() + armAttributes.closure.slice(1)} Closure
              </Badge>
            )}
            {safety?.en_388?.enabled && (
              <Badge variant="outline" className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200">
                EN 388
              </Badge>
            )}
            {safety?.en_iso_21420?.enabled && (
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200">
                EN ISO 21420
              </Badge>
            )}
            {(!armAttributes.thumb_loop && !armAttributes.closure && !safety?.en_388?.enabled && !safety?.en_iso_21420?.enabled) && (
              <span className="text-sm text-gray-500 italic">No attributes will be displayed</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
