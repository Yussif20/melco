import { useTranslations } from "next-intl";

export default function LocationSection() {
  const t = useTranslations("HomePage");

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("location.title")}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.344651120651!2d50.1378779!3d26.4123523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fb0068995fc3%3A0x83e2590e8fa8601a!2sMELCO-%20MASTER%20EQUIPMENT!5e0!3m2!1sar!2ssa!4v1760555904702!5m2!1sar!2ssa"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>

          {/* Location Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#1F2937] dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t("location.address.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("location.address.details")}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#1F2937] dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t("location.contact.title")}
                  </h3>
                  <a
                    href={`tel:${t("location.contact.phone")}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-[#1F2937] dark:hover:text-white transition-colors duration-200 block"
                    dir="ltr"
                  >
                    {t("location.contact.phone")}
                  </a>
                  <a
                    href={`mailto:${t("location.contact.email")}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-[#1F2937] dark:hover:text-white transition-colors duration-200"
                  >
                    {t("location.contact.email")}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#1F2937] dark:text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t("location.hours.title")}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("location.hours.weekdays")}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {t("location.hours.weekend")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
