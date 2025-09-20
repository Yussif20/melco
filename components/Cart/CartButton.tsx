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
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg",
  };

  // Button padding for different sizes
  const buttonPadding = {
    sm: "px-3",
    md: "px-4",
    lg: "px-6",
  };

  // Variant classes for modern gradient buttons
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 dark:text-white shadow-md hover:shadow-lg",
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
          ${buttonPadding[size]}
          ${variantClasses[variant]}
          ${className}
          rounded-xl font-semibold transition-all duration-300 transform hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
          flex items-center justify-center gap-2 min-w-32 backdrop-blur-sm
          border border-white/20 dark:border-slate-700/50
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
    <div
      className={`w-full flex items-center bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden ${className}`}
    >
      {/* Decrease button */}
      <button
        onClick={handleDecrement}
        disabled={isUpdating}
        className={`
          flex-shrink-0 w-12 h-12
          bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600
          text-gray-700 dark:text-gray-300 transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center border-r border-gray-200 dark:border-slate-600
        `}
        aria-label={t("quantityButtons.decrease")}
      >
        {isUpdating ? (
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path d="M5 12h14" />
          </svg>
        )}
      </button>

      {/* Quantity display/input */}
      <div className="flex-1 flex items-center justify-center px-4 h-12">
        <input
          type="number"
          min="0"
          max="999"
          value={currentQuantity}
          onChange={(e) => handleDirectInput(e.target.value)}
          disabled={isUpdating}
          className={`
            w-full text-center font-semibold text-gray-900 dark:text-white text-base
            bg-transparent border-none focus:outline-none focus:ring-0
            disabled:opacity-50 disabled:cursor-not-allowed
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          `}
          aria-label={`${t("quantity")} ${product.name}`}
        />
      </div>

      {/* Increase button */}
      <button
        onClick={handleIncrement}
        disabled={isUpdating || currentQuantity >= 999}
        className={`
          flex-shrink-0 w-12 h-12
          bg-gray-50 hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600
          text-gray-700 dark:text-gray-300 transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-center border-l border-gray-200 dark:border-slate-600
        `}
        aria-label={t("quantityButtons.increase")}
      >
        {isUpdating ? (
          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path d="M12 5v14m-7-7h14" />
          </svg>
        )}
      </button>
    </div>
  );
}
