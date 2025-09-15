import { useTranslations } from "next-intl";

export default function BoardPage() {
  const t = useTranslations("Board");

  const boardMembers = [
    { id: "ceo" },
    { id: "coo" },
    { id: "cto" },
    { id: "cfo" },
    { id: "director1" },
    { id: "director2" },
  ];

  const committees = [
    { id: "audit", icon: "📊" },
    { id: "compensation", icon: "💼" },
    { id: "governance", icon: "⚖️" },
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

      {/* Board Members Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                {/* Placeholder for member photo */}
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-blue-400 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                {/* Executive highlight for CEO */}
                {member.id === "ceo" && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Chairman
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {t(`members.${member.id}.name`)}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                  {t(`members.${member.id}.position`)}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                  {t(`members.${member.id}.bio`)}
                </p>

                {/* Expertise Tags */}
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold uppercase tracking-wide">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t(`members.${member.id}.expertise`)
                      .split(", ")
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Board Committees Section */}
      <div className="bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t("committees.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {committees.map((committee) => (
              <div
                key={committee.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{committee.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t(`committees.${committee.id}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {t(`committees.${committee.id}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Governance Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">{t("governance.title")}</h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t("governance.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
