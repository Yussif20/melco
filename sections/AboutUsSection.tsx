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
  );
}
