"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash, Loader2, Tag } from "lucide-react";
import Image from "next/image";
import {
  Brand,
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandLogo,
  validateBrandName,
  validateLogoFile,
} from "@/lib/brands-service";

export default function BrandManagementPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
  
  // Form state
  const [brandName, setBrandName] = useState("");
  const [brandLogo, setBrandLogo] = useState<File | null>(null);
  const [brandDarkLogo, setBrandDarkLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [darkLogoPreview, setDarkLogoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load brands
  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const fetchedBrands = await getAllBrands();
      setBrands(fetchedBrands);
    } catch (error) {
      console.error("Error loading brands:", error);
      toast({
        title: "Error",
        description: "Failed to load brands",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (file: File | null, isDarkMode = false) => {
    if (isDarkMode) {
      setBrandDarkLogo(file);
    } else {
      setBrandLogo(file);
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
          setBrandDarkLogo(null);
          setDarkLogoPreview(null);
        } else {
          setBrandLogo(null);
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

  const handleCreate = async () => {
    if (!brandName.trim()) {
      toast({
        title: "Error",
        description: "Brand name is required",
        variant: "destructive",
      });
      return;
    }

    const validation = validateBrandName(brandName.trim(), brands);
    if (validation) {
      toast({
        title: "Error",
        description: validation,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      let logoUrl: string | undefined;
      let darkModeLogoUrl: string | undefined;

      if (brandLogo) {
        logoUrl = await uploadBrandLogo(brandLogo);
      }

      if (brandDarkLogo) {
        darkModeLogoUrl = await uploadBrandLogo(brandDarkLogo);
      }

      await createBrand(brandName.trim(), logoUrl, darkModeLogoUrl);
      
      toast({
        title: "Success",
        description: `Brand "${brandName}" created successfully`,
      });

      resetForm();
      setIsCreateDialogOpen(false);
      loadBrands();
    } catch (error) {
      console.error("Error creating brand:", error);
      toast({
        title: "Error",
        description: "Failed to create brand",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedBrand || !brandName.trim()) {
      toast({
        title: "Error",
        description: "Brand name is required",
        variant: "destructive",
      });
      return;
    }

    const validation = validateBrandName(brandName.trim(), brands, selectedBrand.id);
    if (validation) {
      toast({
        title: "Error",
        description: validation,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const updates: any = { name: brandName.trim() };

      // Upload new logo if provided
      if (brandLogo) {
        updates.logo_url = await uploadBrandLogo(brandLogo);
      }

      // Upload new dark mode logo if provided
      if (brandDarkLogo) {
        updates.dark_mode_logo_url = await uploadBrandLogo(brandDarkLogo);
      }

      await updateBrand(selectedBrand.id, updates);
      
      toast({
        title: "Success",
        description: `Brand "${brandName}" updated successfully`,
      });

      resetForm();
      setIsEditDialogOpen(false);
      loadBrands();
    } catch (error) {
      console.error("Error updating brand:", error);
      toast({
        title: "Error",
        description: "Failed to update brand",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!brandToDelete) return;

    setIsDeleting(true);
    try {
      await deleteBrand(brandToDelete.id);
      
      toast({
        title: "Success",
        description: `Brand "${brandToDelete.name}" deleted successfully`,
      });

      setBrandToDelete(null);
      setIsDeleteDialogOpen(false);
      loadBrands();
    } catch (error) {
      console.error("Error deleting brand:", error);
      toast({
        title: "Error",
        description: "Failed to delete brand",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditDialog = (brand: Brand) => {
    setSelectedBrand(brand);
    setBrandName(brand.name);
    setLogoPreview(brand.logo_url || null);
    setDarkLogoPreview(brand.dark_mode_logo_url || null);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (brand: Brand) => {
    setBrandToDelete(brand);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setBrandName("");
    setBrandLogo(null);
    setBrandDarkLogo(null);
    setLogoPreview(null);
    setDarkLogoPreview(null);
    setSelectedBrand(null);
  };

  const closeCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(false);
  };

  const closeEditDialog = () => {
    resetForm();
    setIsEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Brand Management</h2>
          <p className="text-muted-foreground">
            Manage brands that can be assigned to products
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Brand
        </Button>
      </div>

      {/* Brands List */}
      <Card>
        <CardHeader>
          <CardTitle>All Brands</CardTitle>
          <CardDescription>
            {brands.length} {brands.length === 1 ? "brand" : "brands"} registered
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : brands.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Tag className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No brands yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get started by creating your first brand
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Brand
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {brands.map((brand) => (
                <Card key={brand.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {/* Brand Logo */}
                      <div className="flex items-center gap-3">
                        {brand.logo_url ? (
                          <div className="relative w-12 h-12 flex-shrink-0 rounded border bg-white dark:bg-gray-800">
                            <Image
                              src={brand.logo_url}
                              alt={brand.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 flex-shrink-0 rounded border bg-muted flex items-center justify-center">
                            <Tag className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{brand.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {brand.dark_mode_logo_url ? "With dark mode logo" : "Light mode only"}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => openEditDialog(brand)}
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-destructive hover:bg-destructive/10"
                          onClick={() => openDeleteDialog(brand)}
                        >
                          <Trash className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Brand Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Brand</DialogTitle>
            <DialogDescription>
              Create a new brand that can be assigned to products
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="create-brand-name">Brand Name</Label>
              <Input
                id="create-brand-name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name"
                disabled={isSaving}
              />
            </div>

            <div>
              <Label htmlFor="create-brand-logo">Brand Logo (Light Mode)</Label>
              <Input
                id="create-brand-logo"
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(e.target.files?.[0] || null, false)}
                disabled={isSaving}
              />
              {logoPreview && (
                <div className="mt-2 relative w-24 h-24 border rounded bg-white dark:bg-gray-800">
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="create-brand-dark-logo">Brand Logo (Dark Mode) - Optional</Label>
              <Input
                id="create-brand-dark-logo"
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(e.target.files?.[0] || null, true)}
                disabled={isSaving}
              />
              {darkLogoPreview && (
                <div className="mt-2 relative w-24 h-24 border rounded bg-gray-800">
                  <Image
                    src={darkLogoPreview}
                    alt="Dark logo preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeCreateDialog} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!brandName.trim() || isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Brand
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Brand Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
            <DialogDescription>
              Update brand information and logos
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-brand-name">Brand Name</Label>
              <Input
                id="edit-brand-name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Enter brand name"
                disabled={isSaving}
              />
            </div>

            <div>
              <Label htmlFor="edit-brand-logo">Brand Logo (Light Mode)</Label>
              <Input
                id="edit-brand-logo"
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(e.target.files?.[0] || null, false)}
                disabled={isSaving}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to keep existing logo
              </p>
              {logoPreview && (
                <div className="mt-2 relative w-24 h-24 border rounded bg-white dark:bg-gray-800">
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="edit-brand-dark-logo">Brand Logo (Dark Mode) - Optional</Label>
              <Input
                id="edit-brand-dark-logo"
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(e.target.files?.[0] || null, true)}
                disabled={isSaving}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Leave empty to keep existing dark mode logo
              </p>
              {darkLogoPreview && (
                <div className="mt-2 relative w-24 h-24 border rounded bg-gray-800">
                  <Image
                    src={darkLogoPreview}
                    alt="Dark logo preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeEditDialog} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={!brandName.trim() || isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the brand "{brandToDelete?.name}". This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Brand"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

