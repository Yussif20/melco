"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, ProductColor } from "@/types/product";
import ColorSelector from "./ColorSelector";
import ProductImageViewer from "./ProductImageViewer";
import CartButton from "./Cart/CartButton";

interface ProductCardProps {
  product: Product;
  category: string;
  categoryTitle: string;
  locale: string;
  viewDetailsText: string;
}

export default function ProductCard({
  product,
  category,
  categoryTitle,
  locale,
  viewDetailsText,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.hasColorVariants && product.colors ? product.colors[0] : undefined
  );

  // Create cart product data
  const cartProductData = {
    id: `${product.id}-${selectedColor?.name || "default"}`,
    name: `${product.name}${
      selectedColor ? ` - ${selectedColor.displayName}` : ""
    }`,
    category: categoryTitle,
    image: selectedColor ? selectedColor.image : product.defaultImage,
    description: product.description,
    selectedColor: selectedColor,
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full">
      <Link
        href={`/${locale}/products/${category}/${encodeURIComponent(
          product.name
        )}`}
        className="block"
      >
        <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center p-4 border-b border-gray-100 dark:border-gray-700 group-hover:-translate-y-2 transition-transform duration-300">
          <ProductImageViewer
            product={product}
            selectedColor={selectedColor}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <Link
            href={`/${locale}/products/${category}/${encodeURIComponent(
              product.name
            )}`}
          >
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#1F2937] dark:group-hover:text-blue-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
              {product.description}
            </p>
          </Link>

          {/* Color Selector */}
          {product.hasColorVariants && product.colors && (
            <div className="mb-4">
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor || product.colors[0]}
                onColorChange={setSelectedColor}
                size="md"
              />
            </div>
          )}
        </div>

        {/* Cart Button and View Details - Always at bottom */}
        <div className="flex flex-col gap-3 mt-auto">
          <CartButton
            product={cartProductData}
            size="sm"
            variant="primary"
            className="w-full"
          />
          <Link
            href={`/${locale}/products/${category}/${encodeURIComponent(
              product.name
            )}`}
            className="flex items-center justify-center text-[#1F2937] dark:text-blue-400 font-semibold hover:gap-2 transition-all duration-300 text-sm"
          >
            <span>{viewDetailsText}</span>
            <svg
              className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
