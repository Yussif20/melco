"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        suppressHydrationWarning
        style={{ display: isClient ? "block" : "none" }}
      >
        <source src="/safe.mp4" type="video/mp4" />
      </video>

      {/* Fallback background for SSR */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1F2937] to-gray-800 z-0"
        suppressHydrationWarning
        style={{ display: isClient ? "none" : "block" }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {t("hero.heading")}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
          {t("hero.subheading")}
        </p>
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-3 bg-[#1F2937] hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {t("hero.cta")}
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
