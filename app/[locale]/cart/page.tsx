"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/Cart/CartProvider";
import ContactForm from "@/components/ContactForm";

export default function CartPage() {
  const t = useTranslations("Cart");
  const locale = useLocale();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  // State for bulk operations
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isClearing, setIsClearing] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    // Add a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    clearCart();
    setIsClearing(false);
  };

  const handleSelectAll = () => {
    if (selectedItems.length === cart.items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.items.map((item) => item.id));
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRemoveSelected = () => {
    selectedItems.forEach((itemId) => removeFromCart(itemId));
    setSelectedItems([]);
  };

  // Group items by category
  const itemsByCategory = cart.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof cart.items>);

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full opacity-10 animate-pulse"></div>
                <svg
                  className="w-32 h-32 mx-auto text-slate-400 dark:text-slate-500 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M9 19h6"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              {t("cartEmpty")}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-md mx-auto leading-relaxed">
              {t("cartEmptyDescription")}
            </p>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {t("continueShopping")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-20">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl px-6 py-3 mb-6 shadow-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              Shopping Cart
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-6">
            {t("cart")}
          </h1>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-lg text-slate-700 dark:text-slate-200 font-medium">
                {t("summary.itemCount", { count: cart.totalItems })}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-lg text-slate-700 dark:text-slate-200 font-medium">
                {t("summary.uniqueProducts", {
                  count: Object.keys(itemsByCategory).length,
                })}{" "}
                Categories
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden">
              <div className="p-8">
                {/* Cart Header with Bulk Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {cart.totalItems}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      Items in Cart
                    </h2>
                  </div>

                  {/* Bulk Actions */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {cart.items.length > 1 && (
                      <>
                        <button
                          onClick={handleSelectAll}
                          className="text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                        >
                          {selectedItems.length === cart.items.length
                            ? "Deselect All"
                            : t("bulkActions.selectAll")}
                        </button>

                        {selectedItems.length > 0 && (
                          <button
                            onClick={handleRemoveSelected}
                            className="text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-2 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md border border-red-200 dark:border-red-800"
                          >
                            Remove Selected ({selectedItems.length})
                          </button>
                        )}
                      </>
                    )}

                    <button
                      onClick={handleClearCart}
                      disabled={isClearing}
                      className="text-sm bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-red-300 disabled:to-red-400 text-white px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl disabled:shadow-sm"
                    >
                      {isClearing && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {t("bulkActions.clearAll")}
                    </button>
                  </div>
                </div>

                {/* Items grouped by category */}
                <div className="space-y-10">
                  {Object.entries(itemsByCategory).map(([category, items]) => (
                    <div key={category} className="space-y-6">
                      {/* Category Header */}
                      <div className="flex items-center gap-4 pb-4 border-b-2 border-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                            {category}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                            {items.length}{" "}
                            {items.length === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>

                      {/* Category Items */}
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className={`group relative flex items-center gap-6 p-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${
                              selectedItems.includes(item.id)
                                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-300 dark:border-blue-600 shadow-lg"
                                : "bg-slate-50 dark:bg-slate-700/50 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-lg"
                            }`}
                          >
                            {/* Selection Checkbox */}
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                                className="w-5 h-5 text-blue-600 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                              />
                              {selectedItems.includes(item.id) && (
                                <div className="absolute inset-0 bg-blue-500 rounded-lg flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Product Image */}
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-contain rounded-2xl relative z-10 group-hover:scale-110 transition-transform duration-300"
                                sizes="96px"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-grow min-w-0">
                              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2 text-lg">
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg text-sm font-medium">
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
                                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
                                    />
                                  </svg>
                                  {item.category}
                                </span>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <div className="flex items-center bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl overflow-hidden shadow-sm">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="w-10 h-10 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 flex items-center justify-center transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
                                  aria-label={t("quantityButtons.decrease")}
                                >
                                  <svg
                                    className="w-4 h-4 font-bold"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M20 12H4"
                                    />
                                  </svg>
                                </button>

                                <span className="w-14 text-center font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 py-2">
                                  {item.quantity}
                                </span>

                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="w-10 h-10 bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 flex items-center justify-center transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
                                  aria-label={t("quantityButtons.increase")}
                                >
                                  <svg
                                    className="w-4 h-4 font-bold"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                  </svg>
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md border border-red-200 dark:border-red-800"
                                aria-label={t("remove")}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden sticky top-24">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    {t("inquireAboutCart")}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Get detailed pricing and product information for your
                    selected items
                  </p>
                </div>
                <ContactForm productName="" cartItems={cart.items} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
