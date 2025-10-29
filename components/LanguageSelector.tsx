"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useState } from "react";

export default function LanguageSelector() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "") || "/";
    const newPath = `/${newLocale}${currentPath}`;
    router.push(newPath);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Language Button */}
      <button
        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-all duration-200 flex items-center justify-center relative group"
        aria-label={t("selectLanguage")}
      >
        <Globe className="w-4 h-4 sm:w-5 sm:h-5" />

        {/* Current Language Badge */}
        <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-blue-500 text-white text-[9px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full uppercase">
          {locale}
        </span>
      </button>

      {/* Dropdown */}
      {isHovered && (
        <div className="absolute top-full mt-2 right-0 w-36 sm:w-40 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200 rtl:right-auto rtl:left-0">
          <button
            onClick={() => handleLanguageChange("en")}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between ${
              locale === "en"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <span>{t("languages.english")}</span>
            {locale === "en" && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => handleLanguageChange("ar")}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between ${
              locale === "ar"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            <span>{t("languages.arabic")}</span>
            {locale === "ar" && (
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
