import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/about-title.png"
            alt="About Melco"
            fill
            className="object-cover"
            priority
            suppressHydrationWarning
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t("title")}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              {t("subtitle")}
            </p>
            <p className="text-lg text-blue-200 leading-relaxed max-w-3xl mx-auto">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("vision.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("vision.text")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {t("mission.title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("mission.text")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("values.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="/values/Professionalism.png"
                  alt="Quality"
                  width={40}
                  height={40}
                  className="object-contain"
                  suppressHydrationWarning
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t("values.quality.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("values.quality.description")}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="/values/innovation.png"
                  alt="Innovation"
                  width={40}
                  height={40}
                  className="object-contain"
                  suppressHydrationWarning
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t("values.innovation.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("values.innovation.description")}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="/values/Professionalism.png"
                  alt="Professionalism"
                  width={40}
                  height={40}
                  className="object-contain"
                  suppressHydrationWarning
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t("values.professionalism.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("values.professionalism.description")}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="/values/partnership.png"
                  alt="Partnership"
                  width={40}
                  height={40}
                  className="object-contain"
                  suppressHydrationWarning
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t("values.partnership.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("values.partnership.description")}
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="/values/sustainability.png"
                  alt="Sustainability"
                  width={40}
                  height={40}
                  className="object-contain"
                  suppressHydrationWarning
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t("values.sustainability.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t("values.sustainability.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
