"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import SettingsDropdown from "./SettingsDropdown";
import LanguageSelector from "./LanguageSelector";
import CartIcon from "./Cart/CartIcon";

export default function Header() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20 py-3 sm:py-4 px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <CartIcon />
            <LanguageSelector />
            <SettingsDropdown />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
