import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const locale = useLocale();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 ${
        locale === "ar" ? "font-tajawal" : "font-inter"
      }`}
    >
      {/* Hero Section with Title */}
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
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-300">
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("form.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t("form.description")}
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-[#1F2937] to-blue-600 rounded-full"></div>
              </div>

              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                    >
                      {t("form.name")} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-6 py-5 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-[#1F2937]/20 focus:border-[#1F2937] dark:text-white transition-all duration-300 placeholder-gray-400"
                      placeholder={t("form.placeholders.name")}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                    >
                      {t("form.email")} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-6 py-5 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-[#1F2937]/20 focus:border-[#1F2937] dark:text-white transition-all duration-300 placeholder-gray-400"
                      placeholder={t("form.placeholders.email")}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    {t("form.phone")}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-6 py-5 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-[#1F2937]/20 focus:border-[#1F2937] dark:text-white transition-all duration-300 placeholder-gray-400"
                    placeholder={t("form.placeholders.phone")}
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    {t("form.subject")} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-6 py-5 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-[#1F2937]/20 focus:border-[#1F2937] dark:text-white transition-all duration-300 placeholder-gray-400"
                    placeholder={t("form.placeholders.subject")}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3"
                  >
                    {t("form.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    className="w-full px-6 py-5 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-3 focus:ring-[#1F2937]/20 focus:border-[#1F2937] dark:text-white transition-all duration-300 placeholder-gray-400 resize-none"
                    placeholder={t("form.placeholders.message")}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1F2937] to-gray-800 hover:from-gray-800 hover:to-[#1F2937] text-white font-semibold py-5 px-8 rounded-xl focus:outline-none focus:ring-3 focus:ring-[#1F2937]/20 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t("form.submit")}
                    {locale === "ar" ? (
                      // Left arrow for Arabic (RTL)
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    ) : (
                      // Right arrow for English (LTR)
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 p-10 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-300">
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("info.title")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t("info.description")}
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-[#1F2937] to-blue-600 rounded-full"></div>
              </div>

              <div className="space-y-8">
                <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/icons/email.png"
                      alt="Email"
                      width={28}
                      height={28}
                      className="object-contain"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {t("info.email.title")}
                    </h3>

                    <a
                      href={`mailto:${t("info.email.value")}`}
                      className="text-[#1F2937] dark:text-blue-400 font-semibold hover:underline"
                    >
                      {t("info.email.value")}
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/icons/phone.png"
                      alt="Phone"
                      width={28}
                      height={28}
                      className="object-contain"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {t("info.phone.title")}
                    </h3>
                    <a
                      href={`tel:${t("info.phone.value")}`}
                      className="text-[#1F2937] dark:text-blue-400 font-semibold hover:underline block"
                    >
                      +966 55 365 3329
                    </a>
                    <a
                      href="tel:+966535852438"
                      className="text-[#1F2937] dark:text-blue-400 font-semibold hover:underline block mt-1"
                    >
                      +966 53 585 2438
                    </a>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/icons/place.png"
                      alt="Location"
                      width={28}
                      height={28}
                      className="object-contain"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {t("info.office.title")}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("info.office.value")}
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-6 p-4 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/30 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 text-[#1F2937] dark:text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                      {t("info.social.title")}
                    </h3>
                    <a
                      href="https://www.linkedin.com/company/melcosa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1F2937] dark:text-blue-400 font-semibold hover:underline"
                    >
                      {t("info.social.description")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-10 p-6 bg-gradient-to-r from-[#1F2937]/5 to-blue-600/5 dark:from-gray-700/20 dark:to-gray-600/20 rounded-2xl border border-[#1F2937]/10 dark:border-gray-600/30">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  {t("info.hours.title")}
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    {useTranslations("HomePage")("location.hours.weekdays")}
                  </p>
                  <p>{useTranslations("HomePage")("location.hours.weekend")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
