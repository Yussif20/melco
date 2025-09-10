import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              {t("vision.title")}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              {t("vision.text")}
            </p>
          </div>
        </section>

        <section>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              {t("mission.title")}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              {t("mission.text")}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
