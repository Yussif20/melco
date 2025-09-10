import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ProductDetailPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const t = useTranslations("Products");

  // Get the product category based on the ID
  const categories = [
    "head",
    "eyeFace",
    "hearing",
    "respiratory",
    "hand",
    "body",
    "foot",
    "gasDetectors",
  ];

  const categoryKey = categories.find((cat) => cat === params.id);

  if (!categoryKey) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">
                الرئيسية
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li>
              <Link href="/products" className="hover:text-blue-600">
                {t("title")}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-900 dark:text-white">
              {t(`categories.${categoryKey}`)}
            </li>
          </ol>
        </nav>

        {/* Product Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {t(`categories.${categoryKey}`)}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t(`categories.${categoryKey}Description`)}
          </p>
        </div>

        {/* Product Category Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">معلومات المنتج</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {t(`categories.${categoryKey}Description`)}
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>جودة عالية</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>معايير سلامة دولية</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>ضمان الجودة</span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gray-100 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-gray-400"
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
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">
              هل تحتاج لمزيد من المعلومات؟
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              تواصل معنا للحصول على استشارة مجانية ومعرفة المزيد عن منتجاتنا
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
