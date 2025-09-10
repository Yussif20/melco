import { useTranslations } from "next-intl";

export default function GovernancePage() {
  const t = useTranslations("Governance");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">
            {t("framework.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("framework.description")}
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">{t("policies.title")}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("policies.description")}
          </p>
        </section>
      </div>
    </main>
  );
}
