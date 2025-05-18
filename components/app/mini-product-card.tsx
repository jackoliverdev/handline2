import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash, Flame, Scissors } from "lucide-react";

interface MiniProductCardProps {
  product: {
    id: string;
    name: string;
    category?: string;
    image_url?: string | null;
    temperature_rating?: number | null;
    cut_resistance_level?: string | null;
  };
  onRemove?: (productId: string) => void;
  showRemoveButton?: boolean;
}

export const MiniProductCard: React.FC<MiniProductCardProps> = ({ 
  product, 
  onRemove,
  showRemoveButton = true
}) => {
  return (
    <div className="relative flex items-center rounded-md border bg-white/70 dark:bg-gray-900/70 p-2 shadow-sm overflow-hidden group">
      {/* Product Image */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-black dark:bg-black">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-800">
            <span className="text-xs text-gray-500">No img</span>
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="ml-3 flex-1 min-w-0">
        <h4 className="text-sm font-medium text-brand-dark dark:text-white truncate">
          {product.name}
        </h4>
        {product.category && (
          <p className="text-xs text-muted-foreground truncate">
            {product.category}
          </p>
        )}
        
        {/* Key Specifications */}
        <div className="mt-1 flex flex-wrap gap-3">
          {product.temperature_rating && (
            <div className="flex items-center text-xs text-brand-secondary dark:text-gray-300">
              <Flame className="mr-1 h-3 w-3 text-brand-primary" />
              <span>{product.temperature_rating}°C</span>
            </div>
          )}
          {product.cut_resistance_level && (
            <div className="flex items-center text-xs text-brand-secondary dark:text-gray-300">
              <Scissors className="mr-1 h-3 w-3 text-brand-primary" />
              <span>{product.cut_resistance_level}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Remove Button */}
      {showRemoveButton && onRemove && (
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 w-8 p-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => onRemove(product.id)}
        >
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      )}
    </div>
  );
}; 