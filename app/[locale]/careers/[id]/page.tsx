"use client";

import { notFound } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  jobPostings,
  jobTypes,
  jobLevels,
  formatJobDate,
  isJobExpired,
} from "@/data/jobsData";

interface Props {
  params: {
    id: string;
  };
}

export default function JobDetailPage({ params }: Props) {
  const t = useTranslations("Careers");
  const locale = useLocale() as "en" | "ar";

  // Find the job posting
  const jobId = parseInt(params.id, 10);
  const job = jobPostings.find((job) => job.id === jobId);
  if (!job || isNaN(jobId)) {
    notFound();
  }

  const isExpired = isJobExpired(job.expiryDate);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Job Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                {jobTypes[job.type][locale]}
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                {jobLevels[job.level][locale]}
              </span>
              {isExpired && (
                <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full">
                  {t("jobDetail.expired")}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {job.translations[locale].title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5 mr-2"
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
                {job.translations[locale].location}
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {job.translations[locale].department}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4 rtl:space-x-reverse">
              <span>
                {t("jobCard.postedOn")}: {formatJobDate(job.postedDate, locale)}
              </span>
              <span>
                {t("jobCard.expires")}: {formatJobDate(job.expiryDate, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {t("jobDetail.description")}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {job.translations[locale].description}
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {t("jobDetail.requirements")}
            </h2>
            <ul className="space-y-4">
              {job.translations[locale].requirements.map((req, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Responsibilities */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {t("jobDetail.responsibilities")}
            </h2>
            <ul className="space-y-4">
              {job.translations[locale].responsibilities.map((resp, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-700 dark:text-gray-300"
                >
                  <svg
                    className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-2xl font-semibold mb-6">
              {t("jobDetail.apply")}
            </h2>

            {isExpired ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-medium text-red-600 dark:text-red-400 mb-2">
                  {t("jobDetail.positionClosed")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("jobDetail.checkOther")}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {t("jobDetail.applyInstructions")}
                </p>
                <a
                  href={`mailto:${t(
                    "howToApply.email"
                  )}?subject=${encodeURIComponent(
                    `${t("jobDetail.applicationFor")} ${
                      job.translations[locale].title
                    }`
                  )}`}
                  className="block w-full py-3 px-4 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
                >
                  {t("jobDetail.applyNow")}
                </a>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                {t("jobDetail.shareJob")}
              </h3>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        window.location.href
                      )}`
                    )
                  }
                  className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  aria-label="Share on LinkedIn"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        window.location.href
                      )}&text=${encodeURIComponent(
                        `${t("jobDetail.checkOut")} ${
                          job.translations[locale].title
                        }`
                      )}`
                    )
                  }
                  className="p-2 text-blue-400 hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200"
                  aria-label="Share on Twitter"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    // You might want to add a toast notification here
                  }}
                  className="p-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Copy link"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
