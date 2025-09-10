import { useTranslations } from "next-intl";

export default function BoardPage() {
  const t = useTranslations("Board");

  // Placeholder board members data
  const boardMembers = [
    { id: 1, name: t("placeholder.name"), position: t("placeholder.position") },
    { id: 2, name: t("placeholder.name"), position: t("placeholder.position") },
    { id: 3, name: t("placeholder.name"), position: t("placeholder.position") },
    { id: 4, name: t("placeholder.name"), position: t("placeholder.position") },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {boardMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-500"
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
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {member.position}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
