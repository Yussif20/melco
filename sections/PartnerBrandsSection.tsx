import { useTranslations } from "next-intl";
import Image from "next/image";

export default function PartnerBrandsSection() {
  const t = useTranslations("HomePage");

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("partners.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t("partners.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {/* 3M */}
          <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
            <Image
              src="/brands/3m.png"
              alt="3M"
              width={200}
              height={100}
              className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              suppressHydrationWarning
            />
          </div>

          {/* Safety Jogger */}
          <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
            <Image
              src="/brands/safety-jogger.png"
              alt="Safety Jogger"
              width={200}
              height={100}
              className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              suppressHydrationWarning
            />
          </div>

          {/* MSA */}
          <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
            <Image
              src="/brands/msa.png"
              alt="MSA"
              width={200}
              height={100}
              className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              suppressHydrationWarning
            />
          </div>

          {/* BW Technologies */}
          <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20">
            <Image
              src="/brands/Sensia.png"
              alt="Senia"
              width={200}
              height={100}
              className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              suppressHydrationWarning
            />
          </div>

          {/* Ansell */}
          <div className="group flex items-center justify-center p-8 bg-white dark:bg-white/95 rounded-xl hover:bg-gray-50 dark:hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-lg dark:hover:shadow-xl border border-gray-100 dark:border-gray-200/20 md:col-span-3 lg:col-span-1">
            <Image
              src="/brands/ansell.svg"
              alt="Ansell"
              width={200}
              height={100}
              className="h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              suppressHydrationWarning
            />
          </div>
        </div>
      </div>
    </section>
  );
}
