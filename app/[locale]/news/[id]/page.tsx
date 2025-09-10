import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import Link from "next/link";

interface NewsDetailPageProps {
  params: {
    locale: string;
    id: string;
  };
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  const t = useTranslations("News");

  // Simple validation - in a real app, you'd fetch from an API
  const newsId = parseInt(params.id);
  if (isNaN(newsId) || newsId < 1) {
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
              <Link href="/news" className="hover:text-blue-600">
                {t("title")}
              </Link>
            </li>
            <li className="mx-2">/</li>
            <li className="text-gray-900 dark:text-white">
              {t("placeholder.title")}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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

          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                {t("placeholder.date")}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-6">
              {t("placeholder.title")}
            </h1>

            <div className="prose prose-lg dark:prose-dark max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {t("placeholder.description")}
              </p>

              <p className="mb-4">
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
                هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو
                العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها
                التطبيق.
              </p>

              <p className="mb-4">
                إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى
                زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء
                لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث
                يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم
                الموقع.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                تفاصيل إضافية
              </h3>
              <p className="mb-4">
                ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر
                للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم
                عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه
                التصميم فيظهر بشكل لا يليق.
              </p>
            </div>
          </div>
        </article>

        {/* Back to News */}
        <div className="mt-8">
          <Link
            href="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
          >
            <svg
              className="w-5 h-5 mr-2 ml-2"
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
            العودة إلى الأخبار
          </Link>
        </div>
      </div>
    </main>
  );
}
