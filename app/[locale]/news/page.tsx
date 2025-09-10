import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NewsPage() {
  const t = useTranslations("News");

  // Placeholder news data
  const newsItems = [
    {
      id: 1,
      title: t("placeholder.title"),
      description: t("placeholder.description"),
      date: t("placeholder.date"),
      image: "/api/placeholder/400/200",
    },
    {
      id: 2,
      title: t("placeholder.title"),
      description: t("placeholder.description"),
      date: t("placeholder.date"),
      image: "/api/placeholder/400/200",
    },
    {
      id: 3,
      title: t("placeholder.title"),
      description: t("placeholder.description"),
      date: t("placeholder.date"),
      image: "/api/placeholder/400/200",
    },
    {
      id: 4,
      title: t("placeholder.title"),
      description: t("placeholder.description"),
      date: t("placeholder.date"),
      image: "/api/placeholder/400/200",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`} className="group">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="h-48 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {item.date}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
