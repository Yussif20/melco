"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        {isClient && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/safe.mp4" type="video/mp4" />
          </video>
        )}

        {/* Fallback background for SSR */}
        {!isClient && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-800 z-0"></div>
        )}

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
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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

      {/* Partner Brands Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("partners.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("partners.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {/* 3M */}
            <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
              <Image
                src="/brands/3m.png"
                alt="3M"
                width={160}
                height={80}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                suppressHydrationWarning
              />
            </div>

            {/* Safety Jogger */}
            <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
              <Image
                src="/brands/safety-jogger.png"
                alt="Safety Jogger"
                width={160}
                height={80}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                suppressHydrationWarning
              />
            </div>

            {/* MSA */}
            <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
              <Image
                src="/brands/msa.png"
                alt="MSA"
                width={160}
                height={80}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                suppressHydrationWarning
              />
            </div>

            {/* BW Technologies */}
            <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
              <Image
                src="/brands/bw-technologies.svg"
                alt="BW Technologies"
                width={160}
                height={80}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                suppressHydrationWarning
              />
            </div>

            {/* Ansell */}
            <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20 md:col-span-3 lg:col-span-1">
              <Image
                src="/brands/ansell.svg"
                alt="Ansell"
                width={160}
                height={80}
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Profile Download Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <svg
                className="w-16 h-16 mx-auto mb-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("profile.title")}
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t("profile.description")}
            </p>

            <a
              href="/melco-profile.pdf"
              download="Melco-Company-Profile.pdf"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t("profile.downloadButton")}
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("about.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("about.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {t("about.stats.experience")}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("about.stats.experienceLabel")}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {t("about.stats.clients")}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t("about.stats.clientsLabel")}
                  </p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("about.content.paragraph1")}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("about.content.paragraph2")}
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  {t("about.learnMore")}
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Activity Photos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/about-title.png"
                    alt="Company Activity"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    suppressHydrationWarning
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/vision-title.jpg"
                    alt="Safety Equipment"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/products/head.png"
                    alt="Head Protection"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    suppressHydrationWarning
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/products/foot.png"
                    alt="Safety Products"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Location Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("location.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("location.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875840.1796856397!2d41.82148359999999!3d24.066157699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e7b33fe7952a41%3A0x5960504bc21ab69b!2sSaudi%20Arabia!5e0!3m2!1sen!2s!4v1703158800000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>

            {/* Location Info */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t("location.address.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("location.address.details")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t("location.contact.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("location.contact.phone")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("location.contact.email")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t("location.hours.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("location.hours.weekdays")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t("location.hours.weekend")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
