import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/data/productsData";

export default function ProductsPage() {
  const t = useTranslations("Products");
  const locale = useLocale();

  // Map categories to their data
  const categories = [
    {
      key: "head-protection",
      name: t("categories.head"),
      description: t("categories.headShort"),
      data: productsData["head-protection"],
    },
    {
      key: "eye-and-face-protection",
      name: t("categories.eyeFace"),
      description: t("categories.eyeFaceShort"),
      data: productsData["eye-and-face-protection"],
    },
    {
      key: "hearing-protection",
      name: t("categories.hearing"),
      description: t("categories.hearingShort"),
      data: productsData["hearing-protection"],
    },
    {
      key: "respiratory-protection",
      name: t("categories.respiratory"),
      description: t("categories.respiratoryShort"),
      data: productsData["respiratory-protection"],
    },
    {
      key: "hand-protection",
      name: t("categories.hand"),
      description: t("categories.handShort"),
      data: productsData["hand-protection"],
    },
    {
      key: "foot-protection",
      name: t("categories.foot"),
      description: t("categories.footShort"),
      data: productsData["foot-protection"],
    },
    {
      key: "body-protection",
      name: t("categories.body"),
      description: t("categories.bodyShort"),
      data: productsData["body-protection"],
    },
    {
      key: "gas-detector",
      name: t("categories.gasDetectors"),
      description: t("categories.gasDetectorsShort"),
      data: productsData["gas-detector"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#1F2937] to-gray-800 dark:from-gray-900 dark:to-gray-800 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.key}
                href={`/${locale}/products/${category.key}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-105">
                  {/* Category Image Background */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={category.data.headerImage}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      suppressHydrationWarning
                    />
                    {/* Light Brand Color Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/40 to-[#1F2937]/20 group-hover:from-[#1F2937]/30 group-hover:to-[#1F2937]/10 transition-all duration-500"></div>

                    {/* Product Count Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-semibold">
                        {category.data.products.length} {t("productsCount")}
                      </div>
                    </div>

                    {/* Category Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 bg-white dark:bg-gray-800">
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                      {category.description}
                    </p>

                    {/* View Products Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#1F2937] dark:text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>{t("viewProducts")}</span>
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>

                      {/* Animated Dots */}
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#1F2937] dark:bg-blue-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-[#1F2937] dark:bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#1F2937] dark:bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </Link>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-20 text-center">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-3xl p-12 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("needHelp")}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {t("needHelpDescription")}
              </p>
              <a
                href="https://wa.me/966535852438"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
              >
                {t("contactExperts")}
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.988 14.5c-.29-.145-1.715-.848-1.98-.945-.265-.097-.458-.145-.65.146-.19.29-.747.945-.915 1.14-.168.194-.337.218-.627.073-.29-.145-1.223-.451-2.33-1.44-.861-.767-1.44-1.715-1.61-2.005-.168-.29-.018-.447.127-.592.13-.13.29-.337.435-.505.145-.168.193-.29.29-.484.097-.194.048-.364-.024-.51-.073-.145-.65-1.57-.89-2.153-.234-.563-.473-.487-.65-.497l-.555-.01c-.194 0-.51.073-.777.364-.267.29-1.02.997-1.02 2.43 0 1.432 1.04 2.815 1.186 3.01.145.194 2.05 3.13 5.07 4.266.709.244 1.262.39 1.694.499.712.18 1.36.155 1.872.094.571-.067 1.715-.7 1.958-1.377.242-.678.242-1.26.169-1.377-.072-.116-.265-.19-.555-.335zm-4.988 7.5c-4.97 0-9-4.03-9-9 0-1.59.416-3.13 1.205-4.48l-1.28-4.69 4.8 1.26A8.96 8.96 0 0112 3c4.97 0 9 4.03 9 9s-4.03 9-9 9zm0-16C6.486 6 2 10.486 2 16c0 1.657.336 3.233.95 4.68l-1.02 3.74a1 1 0 001.23 1.23l3.74-1.02A8.963 8.963 0 0012 21c5.514 0 10-4.486 10-10S17.514 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
