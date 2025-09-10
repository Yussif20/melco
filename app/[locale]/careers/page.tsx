import { useTranslations } from "next-intl";

export default function CareersPage() {
  const t = useTranslations("Careers");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-400 mb-6">
          {t("subtitle")}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Current Openings */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6">الوظائف المتاحة</h3>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">💼</div>
            <h4 className="text-xl font-medium mb-2">{t("noOpenings")}</h4>
            <p className="text-gray-600 dark:text-gray-400">
              {t("checkLater")}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6">{t("benefits.title")}</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">{t("benefits.healthcare")}</h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">{t("benefits.training")}</h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">{t("benefits.growth")}</h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">{t("benefits.environment")}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Apply */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-semibold mb-4">
            {t("howToApply.title")}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {t("howToApply.description")}
          </p>
          <div className="flex items-center justify-center gap-3">
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
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href={`mailto:${t("howToApply.email")}`}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {t("howToApply.email")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
