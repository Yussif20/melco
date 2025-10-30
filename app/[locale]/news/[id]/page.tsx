import { useTranslations, useLocale } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsArticle, formatArticleDate } from "@/data/newsData";

interface NewsDetailPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const t = useTranslations("Common");
  const locale = useLocale() as "en" | "ar";

  const newsId = parseInt(params.id);
  if (isNaN(newsId)) {
    notFound();
  }

  const article = getNewsArticle(newsId);
  if (!article) {
    notFound();
  }

  const content = article.translations[locale];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t("home")}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link
                href={`/${locale}/news`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t("news")}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-900 dark:text-white">{content.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {article.image ? (
            <div className="relative h-[400px] w-full">
              <Image
                src={article.image}
                alt={content.title}
                fill
                className="object-contain "
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          ) : (
            <div className="h-64 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <svg
                className="w-24 h-24 text-gray-500"
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
          )}

          <div className="p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatArticleDate(article.date, locale)}
              </span>
              <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full">
                {content.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              {content.title}
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {content.description}
              </p>

              <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                {content.content.intro}
              </p>

              {content.content.details.map((detail, index) => (
                <p
                  key={index}
                  className="mb-4 text-gray-700 dark:text-gray-300"
                >
                  {detail}
                </p>
              ))}

              {content.content.quote && (
                <blockquote className="border-l-4 border-blue-600 pl-4 my-6 bg-gray-50 dark:bg-gray-700/50 py-4 rounded-r">
                  <p className="text-lg italic mb-2 text-gray-800 dark:text-gray-200">
                    {content.content.quote.text}
                  </p>
                  <footer className="text-sm">
                    <strong className="text-gray-900 dark:text-white">
                      {content.content.quote.author}
                    </strong>
                    <br />
                    <span className="text-gray-600 dark:text-gray-400">
                      {content.content.quote.position}
                    </span>
                  </footer>
                </blockquote>
              )}
            </div>

            {/* Image Gallery */}
            {article.images && article.images.length > 0 && (
              <div className="mt-8 border-t pt-8 border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {locale === "ar" ? "معرض الصور" : "Image Gallery"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {article.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <Image
                        src={image}
                        alt={`${content.title} - Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Back to News */}
        <div className="mt-8">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition duration-200"
          >
            <svg
              className="w-5 h-5 mr-2 rtl:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("backToNews")}
          </Link>
        </div>
      </div>
    </div>
  );
}
