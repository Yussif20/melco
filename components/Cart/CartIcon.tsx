"use client";

import { useTranslations, useLocale } from "next-intl";
import { useCart } from "./CartProvider";
import Link from "next/link";

export default function CartIcon() {
  const t = useTranslations("Cart");
  const locale = useLocale();
  const { cart } = useCart();

  return (
    <Link
      href={`/${locale}/cart`}
      className="relative flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={t("cart")}
    >
      {/* Shopping Cart Icon */}
      <svg
        className="w-6 h-6 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M9 19h6"
        />
      </svg>

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
    </Link>
  );
}
