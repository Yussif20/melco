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
        className="relative flex items-center p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={t("cart")}
      >
        {/* Shopping Cart Icon */}
        <ShoppingCart
          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300"
          aria-hidden="true"
        />

        {/* Item Count Badge */}
        {cart.totalItems > 0 && (
          <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-blue-600 text-white text-[10px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center min-w-[1rem] sm:min-w-5">
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
