"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Settings, Globe, Palette } from "lucide-react";

export default function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Theme switcher logic
  useEffect(() => {
    setIsClient(true);
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (systemDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const themeToggleHandler = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setIsAnimating(true);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, "") || "/";
    const newPath = `/${newLocale}${currentPath}`;
    router.push(newPath);
    setIsOpen(false);
  };

  if (!isClient) {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 animate-pulse"></div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-all duration-200 flex items-center justify-center ${
          isOpen ? "bg-slate-200 dark:bg-slate-600" : ""
        }`}
        aria-label={t("settings.title")}
      >
        <Settings
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-80 sm:w-76 md:w-64 min-w-64 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200 rtl:right-auto rtl:left-0">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 border-b border-slate-200 dark:border-slate-600">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                {t("settings.title")}
              </div>
            </h3>
          </div>

          <div className="p-2">
            {/* Language Selector */}
            <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {t("settings.language.title")}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings.language.description")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    locale === "en"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                  }`}
                >
                  {t("languages.english")}
                </button>
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    locale === "ar"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-500"
                  }`}
                >
                  {t("languages.arabic")}
                </button>
              </div>
            </div>

            {/* Theme Switcher */}
            <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {t("settings.theme.title")}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("settings.theme.description")}
                  </p>
                </div>
              </div>

              <button
                onClick={themeToggleHandler}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${
                  theme === "dark"
                    ? "bg-slate-800 text-slate-100"
                    : "bg-yellow-100 text-yellow-800"
                } hover:shadow-md`}
                disabled={isAnimating}
              >
                <div className="flex items-center gap-2">
                  {theme === "light" ? (
                    <Sun
                      className={`w-4 h-4 ${isAnimating ? "animate-spin" : ""}`}
                    />
                  ) : (
                    <Moon
                      className={`w-4 h-4 ${
                        isAnimating ? "animate-pulse" : ""
                      }`}
                    />
                  )}
                  <span className="text-sm font-medium">
                    {theme === "light"
                      ? t("settings.theme.lightMode")
                      : t("settings.theme.darkMode")}
                  </span>
                </div>

                <div
                  className={`w-10 h-6 rounded-full p-1 transition-all duration-300 flex-shrink-0 ${
                    theme === "dark" ? "bg-blue-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                      theme === "dark"
                        ? "translate-x-4 rtl:-translate-x-4"
                        : "translate-x-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
