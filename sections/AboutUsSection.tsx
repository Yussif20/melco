import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function AboutUsSection() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
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
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.content.paragraph1")}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("about.content.paragraph2")}
              </p>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 bg-[#1F2937] hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
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

          {/* Professional Hand Protection Image */}
          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 dark:bg-gray-700/30 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gray-200 dark:bg-gray-600/30 rounded-full blur-xl opacity-60"></div>

            {/* Main image container */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700">
              {/* Elegant border gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F2937]/10 via-transparent to-gray-600/10 rounded-2xl"></div>

              <Image
                src="/category-headers/hand.png"
                alt="Professional Hand Protection Solutions"
                fill
                className="object-cover hover:scale-105 transition-all duration-500 ease-out"
                suppressHydrationWarning
              />

              {/* Professional overlay with company branding feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent rounded-2xl"></div>

              {/* Subtle corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
