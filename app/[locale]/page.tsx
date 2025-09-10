import { useTranslations } from "next-intl";
import LanguageSelector from "../../components/LanguageSelector";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const nav = useTranslations("Navigation");

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">{t("title")}</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">{t("subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <LanguageSelector />
            <ThemeSwitcher />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">
                {t("vision")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("visionText")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4 text-blue-600">
                {t("mission")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t("missionText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">خدماتنا</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            <Link href="/about" className="group">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group-hover:scale-105">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="font-semibold">{nav("about")}</h3>
              </div>
            </Link>

            <Link href="/products" className="group">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group-hover:scale-105">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-semibold">{nav("products")}</h3>
              </div>
            </Link>

            <Link href="/board" className="group">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group-hover:scale-105">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="font-semibold">{nav("board")}</h3>
              </div>
            </Link>

            <Link href="/governance" className="group">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group-hover:scale-105">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="font-semibold">{nav("governance")}</h3>
              </div>
            </Link>

            <Link href="/news" className="group">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group-hover:scale-105">
                <div className="text-4xl mb-4">📰</div>
                <h3 className="font-semibold">{nav("news")}</h3>
              </div>
            </Link>

            <Link href="/contact" className="group">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center group-hover:scale-105">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-semibold">{nav("contact")}</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">تواصل معنا اليوم</h2>
          <p className="text-xl mb-8">
            نحن هنا لمساعدتك في جميع احتياجات معدات السلامة
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            {nav("contact")}
          </Link>
        </div>
      </section>
    </main>
  );
}
