"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import LanguageSelector from "./LanguageSelector";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={`/${locale}`}>
              <Logo className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeSwitcher />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}
