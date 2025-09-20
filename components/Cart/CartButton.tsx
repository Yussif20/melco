"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "./CartProvider";
import { Product } from "@/types/cart";

interface CartButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}

export default function CartButton({
  product,
  className = "",
  size = "md",
  variant = "primary",
}: CartButtonProps) {
  const t = useTranslations("Cart");
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const currentQuantity = getItemQuantity(product.id);
  const isInCart = currentQuantity > 0;

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
  };

  const handleAddToCart = async () => {
    setIsUpdating(true);
    try {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    setIsUpdating(true);
    try {
      updateQuantity(product.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(currentQuantity + 1);
  };

  const handleDecrement = () => {
    const newQuantity = currentQuantity - 1;
    handleQuantityChange(newQuantity);
  };

  const handleDirectInput = (value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue >= 0 && numValue <= 999) {
      handleQuantityChange(numValue);
    }
  };

  if (!isInCart) {
    // Show "Add to Cart" button
    return (
      <button
        onClick={handleAddToCart}
        disabled={isUpdating}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
          rounded-lg font-medium transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center gap-2 min-w-32
        `}
        aria-label={`${t("addToCart")} ${product.name}`}
      >
        {isUpdating ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            {t("addToCart")}
          </>
        )}
      </button>
    );
  }

  // Show quantity selector
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Decrease button */}
      <button
        onClick={handleDecrement}
        disabled={isUpdating}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-l-lg font-bold transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center w-10
        `}
        aria-label={t("quantityButtons.decrease")}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      {/* Quantity display/input */}
      <input
        type="number"
        min="0"
        max="999"
        value={currentQuantity}
        onChange={(e) => handleDirectInput(e.target.value)}
        disabled={isUpdating}
        className={`
          ${sizeClasses[size]}
          w-16 text-center border-t border-b border-gray-300 dark:border-gray-600
          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        `}
        aria-label={`${t("quantity")} ${product.name}`}
      />

      {/* Increase button */}
      <button
        onClick={handleIncrement}
        disabled={isUpdating || currentQuantity >= 999}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-r-lg font-bold transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center w-10
        `}
        aria-label={t("quantityButtons.increase")}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
}
