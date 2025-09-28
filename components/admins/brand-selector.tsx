"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Plus, X, Upload, Loader2 } from "lucide-react";
import Image from "next/image";
import { Brand, createBrand, uploadBrandLogo, validateBrandName, validateLogoFile } from "@/lib/brands-service";
import { useLanguage } from "@/lib/context/language-context";

interface BrandSelectorProps {
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
  availableBrands: Brand[];
  onNewBrand: (brand: Brand) => void;
  className?: string;
}

export function BrandSelector({ 
  selectedBrands, 
  onBrandsChange, 
  availableBrands, 
  onNewBrand,
  className = ""
}: BrandSelectorProps) {
  const { t } = useLanguage();
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogo, setNewBrandLogo] = useState<File | null>(null);
  const [newBrandDarkLogo, setNewBrandDarkLogo] = useState<File | null>(null);
  const [showNewBrandForm, setShowNewBrandForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [darkLogoPreview, setDarkLogoPreview] = useState<string | null>(null);

  const handleBrandToggle = (brandName: string, checked: boolean) => {
    if (checked) {
      onBrandsChange([...selectedBrands, brandName]);
    } else {
      onBrandsChange(selectedBrands.filter(b => b !== brandName));
    }
  };

  const handleLogoChange = (file: File | null, isDarkMode = false) => {
    if (isDarkMode) {
      setNewBrandDarkLogo(file);
    } else {
      setNewBrandLogo(file);
    }
    
    if (file) {
      const validation = validateLogoFile(file);
      if (validation) {
        toast({
          title: "Invalid logo file",
          description: validation,
          variant: "destructive",
        });
        if (isDarkMode) {
          setNewBrandDarkLogo(null);
          setDarkLogoPreview(null);
        } else {
          setNewBrandLogo(null);
          setLogoPreview(null);
        }
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isDarkMode) {
          setDarkLogoPreview(e.target?.result as string);
        } else {
          setLogoPreview(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (isDarkMode) {
        setDarkLogoPreview(null);
      } else {
        setLogoPreview(null);
      }
    }
  };

  const handleCreateBrand = async () => {
    if (!newBrandName.trim()) {
      toast({
        title: t('admin.brands.brandNameRequired'),
        description: t('admin.brands.brandNameRequired'),
        variant: "destructive",
      });
      return;
    }

    const validation = validateBrandName(newBrandName.trim(), availableBrands);
    if (validation) {
      toast({
        title: validation,
        description: validation,
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      let logoUrl: string | undefined;
      let darkModeLogoUrl: string | undefined;
      
      if (newBrandLogo) {
        logoUrl = await uploadBrandLogo(newBrandLogo);
      }
      
      if (newBrandDarkLogo) {
        darkModeLogoUrl = await uploadBrandLogo(newBrandDarkLogo);
      }

      const newBrand = await createBrand(newBrandName.trim(), logoUrl, darkModeLogoUrl);
      onNewBrand(newBrand);
      
      // Add to selected brands
      onBrandsChange([...selectedBrands, newBrand.name]);
      
      // Reset form
      setNewBrandName('');
      setNewBrandLogo(null);
      setNewBrandDarkLogo(null);
      setLogoPreview(null);
      setDarkLogoPreview(null);
      setShowNewBrandForm(false);
      
      toast({
        title: t('admin.brands.brandCreated'),
        description: `${newBrand.name} ${t('admin.brands.brandCreated')}`,
      });
    } catch (error) {
      console.error('Error creating brand:', error);
      toast({
        title: t('admin.brands.errorCreatingBrand'),
        description: error instanceof Error ? error.message : t('admin.brands.errorCreatingBrand'),
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setNewBrandName('');
    setNewBrandLogo(null);
    setNewBrandDarkLogo(null);
    setLogoPreview(null);
    setDarkLogoPreview(null);
    setShowNewBrandForm(false);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('admin.brands.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Existing Brand Selection */}
          <div>
            <Label className="text-sm font-medium">{t('admin.brands.selectBrands')}</Label>
            {availableBrands.length === 0 ? (
              <p className="text-sm text-muted-foreground mt-2">{t('admin.brands.noBrandsSelected')}</p>
            ) : (
              <div className="flex flex-wrap gap-3 mt-2">
                {availableBrands.map((brand) => (
                  <div key={brand.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.name)}
                      onCheckedChange={(checked) => handleBrandToggle(brand.name, checked as boolean)}
                    />
                    <Label 
                      htmlFor={`brand-${brand.id}`} 
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {brand.logo_url && (
                        <div className="relative w-6 h-6 flex-shrink-0">
                          <Image
                            src={brand.logo_url}
                            alt={brand.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-sm">{brand.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Brands Display */}
          {selectedBrands.length > 0 && (
            <div>
              <Label className="text-sm font-medium">{t('admin.brands.selectBrands')}</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedBrands.map((brandName) => {
                  const brand = availableBrands.find(b => b.name === brandName);
                  return (
                    <Badge key={brandName} variant="outline" className="flex items-center gap-1">
                      {brand?.logo_url && (
                        <div className="relative w-4 h-4 flex-shrink-0">
                          <Image
                            src={brand.logo_url}
                            alt={brandName}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                      {brandName}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => onBrandsChange(selectedBrands.filter(b => b !== brandName))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* New Brand Creation */}
          <div className="border-t pt-4">
            <Button
              variant="outline"
              onClick={() => setShowNewBrandForm(!showNewBrandForm)}
              disabled={isCreating}
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('admin.brands.addNewBrand')}
            </Button>

            {showNewBrandForm && (
              <div className="mt-4 p-4 border rounded-lg space-y-4 bg-muted/50">
                <div>
                  <Label htmlFor="brand-name">{t('admin.brands.brandName')}</Label>
                  <Input
                    id="brand-name"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder={t('admin.brands.brandName')}
                    disabled={isCreating}
                  />
                </div>
                
                <div>
                  <Label htmlFor="brand-logo">{t('admin.brands.brandLogo')} (Light Mode)</Label>
                  <div className="space-y-2">
                    <Input
                      id="brand-logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLogoChange(e.target.files?.[0] || null, false)}
                      disabled={isCreating}
                    />
                    {logoPreview && (
                      <div className="relative w-20 h-20 border rounded">
                        <Image
                          src={logoPreview}
                          alt="Logo preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="brand-dark-logo">{t('admin.brands.brandLogo')} (Dark Mode) - Optional</Label>
                  <div className="space-y-2">
                    <Input
                      id="brand-dark-logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleLogoChange(e.target.files?.[0] || null, true)}
                      disabled={isCreating}
                    />
                    {darkLogoPreview && (
                      <div className="relative w-20 h-20 border rounded">
                        <Image
                          src={darkLogoPreview}
                          alt="Dark logo preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateBrand}
                    disabled={!newBrandName.trim() || isCreating}
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        {t('admin.brands.createBrand')}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
