import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import productsData from "@/data/productsData";
import CartButton from "@/components/Cart/CartButton";

interface CategoryPageProps {
  params: {
    category: string;
    locale: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const t = useTranslations("Products");
  const { category, locale } = params;

  // Check if category exists
  if (!productsData[category as keyof typeof productsData]) {
    notFound();
  }

  const categoryData = productsData[category as keyof typeof productsData];

  // Map category keys to translations
  const categoryTitles: Record<string, string> = {
    "head-protection": t("categories.head"),
    "eye-and-face-protection": t("categories.eyeFace"),
    "hearing-protection": t("categories.hearing"),
    "respiratory-protection": t("categories.respiratory"),
    "hand-protection": t("categories.hand"),
    "foot-protection": t("categories.foot"),
    "body-protection": t("categories.body"),
    "gas-detector": t("categories.gasDetectors"),
  };

  const categoryDescriptions: Record<string, string> = {
    "head-protection": t("categories.headDescription"),
    "eye-and-face-protection": t("categories.eyeFaceDescription"),
    "hearing-protection": t("categories.hearingDescription"),
    "respiratory-protection": t("categories.respiratoryDescription"),
    "hand-protection": t("categories.handDescription"),
    "foot-protection": t("categories.footDescription"),
    "body-protection": t("categories.bodyDescription"),
    "gas-detector": t("categories.gasDetectorsDescription"),
  };

  const categoryTitle = categoryTitles[category] || category;
  const categoryDescription = categoryDescriptions[category] || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Breadcrumb */}
      <div className="bg-white/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href={`/${locale}`}
              className="text-gray-600 dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white transition-colors"
            >
              {t("breadcrumb.home")}
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/${locale}/products`}
              className="text-gray-600 dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white transition-colors"
            >
              {t("title")}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1F2937] dark:text-white font-medium">
              {categoryTitle}
            </span>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="relative bg-gradient-to-r from-[#1F2937] to-gray-800 dark:from-gray-900 dark:to-gray-800 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={categoryData.headerImage}
            alt={categoryTitle}
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/80 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {categoryTitle}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {categoryDescription}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryData.products.map((product, index) => {
              // Create unique product ID
              const productId = `${category}-${index}`;
              const productData = {
                id: productId,
                name: product.name,
                category: categoryTitle,
                image: product.image,
                description: product.description,
              };

              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  <Link
                    href={`/${locale}/products/${category}/${encodeURIComponent(
                      product.name
                    )}`}
                    className="block"
                  >
                    <div className="relative w-full aspect-[4/3] bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100 dark:border-gray-700 group-hover:-translate-y-2 transition-transform duration-300">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain transition-transform duration-300"
                        style={{ position: "absolute" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link
                      href={`/${locale}/products/${category}/${encodeURIComponent(
                        product.name
                      )}`}
                    >
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#1F2937] dark:group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                        {product.description}
                      </p>
                    </Link>

                    {/* Cart Button and View Details */}
                    <div className="flex flex-col gap-3">
                      <CartButton
                        product={productData}
                        size="sm"
                        variant="primary"
                        className="w-full"
                      />
                      <Link
                        href={`/${locale}/products/${category}/${encodeURIComponent(
                          product.name
                        )}`}
                        className="flex items-center justify-center text-[#1F2937] dark:text-blue-400 font-semibold hover:gap-2 transition-all duration-300 text-sm"
                      >
                        <span>{t("viewDetails")}</span>
                        <svg
                          className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
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
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back to Products */}
          <div className="text-center mt-16">
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
            >
              <svg
                className="w-5 h-5 rotate-180"
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
              <span>{t("backToProducts")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
