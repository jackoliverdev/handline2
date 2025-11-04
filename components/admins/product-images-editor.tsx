"use client";

import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Star, Image as ImageIcon, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { uploadProductImage } from "@/lib/products-service";

interface ProductImagesEditorProps {
  // Main image
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
  
  // Additional images
  image2Url: string | null;
  setImage2Url: (url: string | null) => void;
  image3Url: string | null;
  setImage3Url: (url: string | null) => void;
  image4Url: string | null;
  setImage4Url: (url: string | null) => void;
  image5Url: string | null;
  setImage5Url: (url: string | null) => void;
  
  // Product ID for uploads
  productId: string;
}

export function ProductImagesEditor({
  imageUrl,
  setImageUrl,
  image2Url,
  setImage2Url,
  image3Url,
  setImage3Url,
  image4Url,
  setImage4Url,
  image5Url,
  setImage5Url,
  productId
}: ProductImagesEditorProps) {
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get all images in order
  const allImages = [imageUrl, image2Url, image3Url, image4Url, image5Url].filter(Boolean) as string[];
  const setters = [setImageUrl, setImage2Url, setImage3Url, setImage4Url, setImage5Url];
  const urls = [imageUrl, image2Url, image3Url, image4Url, image5Url];

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    setUploading('uploading');
    try {
      const result = await uploadProductImage(productId, file);
      if (result.url) {
        // Find first empty slot and add image there
        if (!imageUrl) {
          setImageUrl(result.url);
        } else if (!image2Url) {
          setImage2Url(result.url);
        } else if (!image3Url) {
          setImage3Url(result.url);
        } else if (!image4Url) {
          setImage4Url(result.url);
        } else if (!image5Url) {
          setImage5Url(result.url);
        }
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(null);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = (index: number) => {
    setters[index](null);
  };

  const setAsMainImage = (index: number) => {
    if (index === 0) return; // Already main image
    
    const targetUrl = urls[index];
    if (targetUrl) {
      // Swap with main image
      setters[index](imageUrl);
      setImageUrl(targetUrl);
    }
  };

  const moveImageUp = (index: number) => {
    if (index <= 1) return; // Can't move main image or first additional image up
    
    // Swap with the image above
    const newUrls = [...urls];
    [newUrls[index], newUrls[index - 1]] = [newUrls[index - 1], newUrls[index]];
    
    // Update all the setters with the new order
    setImageUrl(newUrls[0]);
    setImage2Url(newUrls[1]);
    setImage3Url(newUrls[2]);
    setImage4Url(newUrls[3]);
    setImage5Url(newUrls[4]);
  };

  const moveImageDown = (index: number) => {
    if (index >= 4 || !urls[index + 1]) return; // Can't move last image or if next slot is empty
    
    // Swap with the image below
    const newUrls = [...urls];
    [newUrls[index], newUrls[index + 1]] = [newUrls[index + 1], newUrls[index]];
    
    // Update all the setters with the new order
    setImageUrl(newUrls[0]);
    setImage2Url(newUrls[1]);
    setImage3Url(newUrls[2]);
    setImage4Url(newUrls[3]);
    setImage5Url(newUrls[4]);
  };

  const ImageSlot = ({ 
    url, 
    index, 
    isMain = false,
    showReorder = false
  }: { 
    url: string | null; 
    index: number; 
    isMain?: boolean;
    showReorder?: boolean;
  }) => (
    <div className="relative group">
      <div
        className={`relative border-2 border-dashed rounded-lg overflow-hidden transition-all duration-200 hover:border-brand-primary/50 ${
          url ? 'border-solid border-gray-200 dark:border-gray-700' : 'border-gray-300 dark:border-gray-600'
        } aspect-square`}
        onClick={() => !url && fileInputRef.current?.click()}
      >
        {url ? (
          <>
            <img 
              src={url} 
              alt={`Product image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                {!isMain && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAsMainImage(index);
                    }}
                    className="bg-white/90 hover:bg-white text-gray-900"
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="bg-red-500/90 hover:bg-red-500"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Reorder buttons */}
            {showReorder && url && (
              <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveImageUp(index);
                  }}
                  disabled={index <= 1}
                  className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-gray-900"
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveImageDown(index);
                  }}
                  disabled={index >= 4 || !urls[index + 1]}
                  className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-gray-900"
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
            )}
            {isMain && (
              <Badge className="absolute top-2 left-2 bg-brand-primary text-white">
                Main
              </Badge>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            {uploading === 'uploading' ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Images
        </CardTitle>
        <CardDescription>
          Upload up to 5 images. The first image will be the main product image. Click the star to make any image the main one.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />

          {/* Main Image */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Main Image</Label>
            <div className="max-w-md">
              <ImageSlot
                url={imageUrl}
                index={0}
                isMain={true}
              />
            </div>
          </div>

          {/* Additional Images */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Additional Images</Label>
              {allImages.length < 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading === 'uploading'}
                >
                  {uploading === 'uploading' ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-primary"></div>
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Add Image
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ImageSlot url={image2Url} index={1} showReorder={true} />
              <ImageSlot url={image3Url} index={2} showReorder={true} />
              <ImageSlot url={image4Url} index={3} showReorder={true} />
              <ImageSlot url={image5Url} index={4} showReorder={true} />
            </div>
            
            {allImages.length > 1 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                💡 <strong>Tip:</strong> Use the up/down arrow buttons to reorder images. The first image will always be the main image.
              </div>
            )}
          </div>

          {/* Image Count Summary */}
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            <strong>Total Images:</strong> {allImages.length}/5
            {imageUrl && <span className="ml-2 text-brand-primary">• Main image set</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}