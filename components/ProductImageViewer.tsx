"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ProductColor } from "@/types/product";

interface ProductImageViewerProps {
  product: Product;
  selectedColor?: ProductColor;
  className?: string;
  priority?: boolean;
}

export default function ProductImageViewer({
  product,
  selectedColor,
  className = "",
  priority = false,
}: ProductImageViewerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Determine which image to show
  const currentImage =
    selectedColor && !imageError ? selectedColor.image : product.defaultImage;

  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  return (
    <div className={`relative bg-white ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Product Image */}
      <Image
        src={currentImage}
        alt={`${product.name}${
          selectedColor ? ` - ${selectedColor.displayName}` : ""
        }`}
        fill
        className={`object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Error fallback indicator */}
      {imageError && selectedColor && (
        <div className="absolute top-2 right-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
          Using default image
        </div>
      )}
    </div>
  );
}
