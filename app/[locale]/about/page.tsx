import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutPage() {
  const t = useTranslations("About");

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
            {t("subtitle")}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Vision */}
            <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-3xl shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-6 text-white">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("vision.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("vision.description")}
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-3xl shadow-lg transition-transform transform hover:scale-105">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mb-6 text-white">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t("mission.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("mission.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("story.title")}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {t.raw("story.content").map((paragraph: string, index: number) => (
              <p
                key={index}
                className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t("values.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("values.description")}
            </p>
          </div>
          <div className="flex flex-col w-full items-center justify-center gap-8">
            {/* Top row: three values */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
              {["quality", "innovation", "professionalism"].map((key) => (
                <div
                  key={key}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center min-h-[14rem] w-full max-w-xs"
                >
                  <Image
                    width={64}
                    height={64}
                    src={`/values/${key}.svg`}
                    alt={t(`values.list.${key}.title`)}
                    className="w-8 h-8 mb-4 object-contain"
                    loading="lazy"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    {t(`values.list.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {t(`values.list.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
            {/* Bottom row: two values, centered and narrower on large screens */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:w-[66%]">
              {["partnership", "sustainability"].map((key) => (
                <div
                  key={key}
                  className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center min-h-[14rem] w-full max-w-xs"
                >
                  <Image
                    width={64}
                    height={64}
                    src={`/values/${key}.svg`}
                    alt={t(`values.list.${key}.title`)}
                    className="w-8 h-8 mb-4 object-contain"
                    loading="lazy"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3.5 text-center">
                    {t(`values.list.${key}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {t(`values.list.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
