import { useTranslations } from "next-intl";
import Link from "next/link";

export default function ProductsPage() {
  const t = useTranslations("Products");

  const categories = [
    { key: "head", icon: "🪖" },
    { key: "eyeFace", icon: "🥽" },
    { key: "hearing", icon: "🎧" },
    { key: "respiratory", icon: "😷" },
    { key: "hand", icon: "🧤" },
    { key: "body", icon: "🦺" },
    { key: "foot", icon: "👢" },
    { key: "gasDetectors", icon: "📊" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.key}
            href={`/products/${category.key}`}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="text-center">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`categories.${category.key}`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(`categories.${category.key}Description`)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
