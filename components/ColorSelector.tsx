"use client";

import { useState } from "react";
import { ProductColor } from "@/types/product";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor;
  onColorChange: (color: ProductColor) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
  size = "md",
  className = "",
}: ColorSelectorProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Size variants
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const containerClasses = {
    sm: "gap-1",
    md: "gap-2",
    lg: "gap-3",
  };

  const handleColorSelect = async (color: ProductColor) => {
    if (color.name === selectedColor.name) return;

    setIsLoading(true);

    // Preload the image before switching
    const img = new Image();
    img.onload = () => {
      onColorChange(color);
      setIsLoading(false);
    };
    img.onerror = () => {
      // If image fails to load, still switch (will fallback to default)
      onColorChange(color);
      setIsLoading(false);
    };
    img.src = color.image;
  };

  return (
    <div
      className={`flex items-center justify-center ${containerClasses[size]} ${className}`}
    >
      {colors.map((color) => (
        <button
          key={color.name}
          onClick={() => handleColorSelect(color)}
          disabled={isLoading}
          className={`
            ${sizeClasses[size]}
            rounded-full
            border-2
            transition-all
            duration-200
            hover:scale-110
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:ring-offset-2
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${
              selectedColor.name === color.name
                ? "border-white shadow-lg ring-2 ring-gray-400"
                : "border-gray-300 hover:border-gray-400"
            }
          `}
          style={{
            backgroundColor: color.colorCode,
            boxShadow:
              selectedColor.name === color.name
                ? `0 0 0 1px ${color.colorCode}, 0 0 8px rgba(0,0,0,0.3)`
                : `0 0 0 1px ${color.colorCode}`,
          }}
          title={color.displayName}
          aria-label={`Select ${color.displayName} color`}
        >
          {/* White inner border for better visibility on light colors */}
          <div
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: color.colorCode,
              border:
                color.colorCode === "#F8FAFC" ? "1px solid #e5e7eb" : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
