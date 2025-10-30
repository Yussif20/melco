import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { newsArticles, formatArticleDate } from "@/data/newsData";

export default function NewsPage() {
  const t = useTranslations("News");
  const locale = useLocale() as "en" | "ar";

  // Sort news by date (newest first)
  const sortedNews = [...newsArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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

      {/* News Articles Grid */}
      <div className="container mx-auto px-4 py-16">
        {sortedNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedNews.map((article) => {
              const content = article.translations[locale];
              return (
                <Link
                  key={article.id}
                  href={`/${locale}/news/${article.id}`}
                  className="group"
                >
                  <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={article.image}
                        alt={content.title}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-sm font-semibold bg-blue-600 text-white rounded-full">
                          {content.category}
                        </span>
                      </div>

                      {/* Featured Badge */}
                      {article.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 text-xs font-bold bg-yellow-400 text-gray-900 rounded-full flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {locale === "ar" ? "مميز" : "Featured"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Date */}
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {formatArticleDate(article.date, locale)}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {content.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-1">
                        {content.description}
                      </p>

                      {/* Read More Link */}
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                        <span>{t("readMore")}</span>
                        <svg
                          className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 rtl:rotate-180"
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
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("noNews")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
