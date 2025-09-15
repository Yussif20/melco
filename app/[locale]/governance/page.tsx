import { useTranslations } from "next-intl";

interface PolicyCategory {
  title: string;
  description: string;
}

interface CorporateValue {
  name: string;
  description: string;
}

export default function GovernancePage() {
  const t = useTranslations("Governance");

  const frameworkPoints = [
    t("framework.point1"),
    t("framework.point2"),
    t("framework.point3"),
    t("framework.point4"),
    t("framework.point5"),
  ];

  const policyCategories = [
    {
      title: t("policies.categories.quality.title"),
      description: t("policies.categories.quality.description"),
    },
    {
      title: t("policies.categories.ethics.title"),
      description: t("policies.categories.ethics.description"),
    },
    {
      title: t("policies.categories.risk.title"),
      description: t("policies.categories.risk.description"),
    },
    {
      title: t("policies.categories.sustainability.title"),
      description: t("policies.categories.sustainability.description"),
    },
  ];

  const complianceStandards = [
    t("compliance.standards.iso9001"),
    t("compliance.standards.iso45001"),
    t("compliance.standards.ce"),
    t("compliance.standards.saso"),
    t("compliance.standards.gso"),
  ];

  const corporateValues = [
    {
      name: t("values.list.integrity.name"),
      description: t("values.list.integrity.description"),
    },
    {
      name: t("values.list.excellence.name"),
      description: t("values.list.excellence.description"),
    },
    {
      name: t("values.list.accountability.name"),
      description: t("values.list.accountability.description"),
    },
    {
      name: t("values.list.innovation.name"),
      description: t("values.list.innovation.description"),
    },
  ];

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
            {t("subtitle")}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed max-w-4xl mx-auto">
            {t("description")}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto"></div>
        </div>

        {/* Framework Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t("framework.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t("framework.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {frameworkPoints.map((point: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600 dark:text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Policies and Compliance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Policies Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t("policies.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t("policies.description")}
            </p>
            <div className="space-y-6">
              {policyCategories.map(
                (category: PolicyCategory, index: number) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Compliance Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {t("compliance.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t("compliance.description")}
            </p>
            <ul className="space-y-4">
              {complianceStandards.map((standard: string, index: number) => (
                <li key={index} className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {standard}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="relative bg-gradient-to-br from-gray-900 to-blue-900 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-400/10 rounded-full blur-2xl"></div>
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              {t("values.title")}
            </h2>
            <p className="text-gray-200 mb-12 text-center max-w-3xl mx-auto">
              {t("values.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {corporateValues.map((value: CorporateValue, index: number) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.name}
                  </h3>
                  <p className="text-gray-200">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
