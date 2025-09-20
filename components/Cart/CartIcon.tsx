"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import CartModal from "./CartModal";

export default function CartIcon() {
  const t = useTranslations("Cart");
  const { cart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t("cart")}
      >
        {/* Shopping Cart Icon */}
        <ShoppingCart
          className="w-6 h-6 text-gray-700 dark:text-gray-300"
          aria-hidden="true"
        />

        {/* Item Count Badge */}
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-5">
            {cart.totalItems > 99 ? "99+" : cart.totalItems}
          </span>
        )}

        {/* Screen reader text */}
        <span className="sr-only">
          {t("itemsInCart", { count: cart.totalItems })}
        </span>
      </button>

      {/* Cart Modal */}
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
