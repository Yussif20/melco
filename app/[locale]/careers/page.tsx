"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  JobType,
  JobLevel,
  jobTypes,
  jobLevels,
  jobPostings,
  formatJobDate,
} from "@/data/jobsData";

export default function CareersPage() {
  const t = useTranslations("Careers");
  const locale = useLocale() as "en" | "ar";

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<JobType | "all">("all");
  const [selectedLevel, setSelectedLevel] = useState<JobLevel | "all">("all");

  // Get unique locations and departments for filters
  const locations = useMemo(
    () => [
      ...new Set(jobPostings.map((job) => job.translations[locale].location)),
    ],
    [locale]
  );
  const departments = useMemo(
    () => [
      ...new Set(jobPostings.map((job) => job.translations[locale].department)),
    ],
    [locale]
  );

  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobPostings.filter((job) => {
      const matchesSearch = searchQuery
        ? job.translations[locale].title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          job.translations[locale].description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          job.translations[locale].department
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        : true;

      const matchesType =
        selectedType === "all" ? true : job.type === selectedType;
      const matchesLevel =
        selectedLevel === "all" ? true : job.level === selectedLevel;
      const matchesLocation =
        selectedLocation === "all"
          ? true
          : job.translations[locale].location === selectedLocation;
      const matchesDepartment =
        selectedDepartment === "all"
          ? true
          : job.translations[locale].department === selectedDepartment;

      return (
        matchesSearch &&
        matchesType &&
        matchesLevel &&
        matchesLocation &&
        matchesDepartment
      );
    });
  }, [
    searchQuery,
    selectedType,
    selectedLevel,
    selectedLocation,
    selectedDepartment,
    locale,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
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
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder={t("filters.search")}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Job Type Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedType}
                onChange={(e) =>
                  setSelectedType(e.target.value as JobType | "all")
                }
              >
                <option value="all">{t("filters.allTypes")}</option>
                {Object.entries(jobTypes).map(([type, labels]) => (
                  <option key={type} value={type}>
                    {labels[locale]}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Level Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedLevel}
                onChange={(e) =>
                  setSelectedLevel(e.target.value as JobLevel | "all")
                }
              >
                <option value="all">{t("filters.allLevels")}</option>
                {Object.entries(jobLevels).map(([level, labels]) => (
                  <option key={level} value={level}>
                    {labels[locale]}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="all">{t("filters.allLocations")}</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">{t("filters.allDepartments")}</option>
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/${locale}/careers/${job.id}`}
                className="group block"
              >
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-0 group-hover:text-blue-600 transition-colors duration-200">
                        {job.translations[locale].title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          {jobTypes[job.type][locale]}
                        </span>
                        <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                          {jobLevels[job.level][locale]}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {job.translations[locale].description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                    <div className="flex flex-col md:flex-row md:items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-0">
                        <span className="mr-4">
                          {t("jobCard.postedOn")}:{" "}
                          {formatJobDate(job.postedDate, locale)}
                        </span>
                        <span>
                          {t("jobCard.expires")}:{" "}
                          {formatJobDate(job.expiryDate, locale)}
                        </span>
                      </div>
                      <button className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors duration-200">
                        <span>{t("jobCard.viewDetails")}</span>
                        <svg
                          className="w-4 h-4 ml-1 rtl:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                {t("noJobs")}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
