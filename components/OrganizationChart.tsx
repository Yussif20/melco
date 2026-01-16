"use client";

import { useTranslations, useLocale } from "next-intl";

type Variant = "primary" | "secondary" | "tertiary" | "committee" | "default" | "leaf";

function OrgBox({
  titleKey,
  t,
  locale,
  variant = "default",
  className = "",
}: {
  titleKey: string;
  t: ReturnType<typeof useTranslations>;
  locale: string;
  variant?: Variant;
  className?: string;
}) {
  const baseStyles =
    "px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-center transition-all duration-300 border-2 hover:scale-105";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-br from-[#1F2937] to-gray-700 text-white border-gray-600 shadow-xl",
    secondary:
      "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500 shadow-lg",
    tertiary:
      "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-indigo-400 shadow-md",
    committee:
      "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 shadow-md",
    default:
      "bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-200 dark:border-gray-700 shadow-md",
    leaf:
      "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm",
  };

  const sizeClasses: Record<Variant, string> = {
    primary: "min-w-[140px] sm:min-w-[180px] lg:min-w-[220px]",
    secondary: "min-w-[130px] sm:min-w-[160px] lg:min-w-[200px]",
    tertiary: "min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]",
    committee: "min-w-[110px] sm:min-w-[140px] lg:min-w-[170px]",
    default: "min-w-[110px] sm:min-w-[140px] lg:min-w-[170px]",
    leaf: "min-w-[100px] sm:min-w-[130px] lg:min-w-[150px]",
  };

  const textKey = locale === "ar" ? `${titleKey}.ar` : `${titleKey}.en`;

  return (
    <div className={`${baseStyles} ${variants[variant]} ${sizeClasses[variant]} ${className}`}>
      <div className="font-bold text-xs sm:text-sm lg:text-base leading-tight">
        {t(textKey)}
      </div>
    </div>
  );
}

function Connector({ type, className = "" }: { type: "vertical" | "horizontal" | "t-down" | "corner-left" | "corner-right"; className?: string }) {
  const lineColor = "border-gray-300 dark:border-gray-600";

  if (type === "vertical") {
    return <div className={`w-0.5 h-6 sm:h-8 bg-gray-300 dark:bg-gray-600 mx-auto ${className}`} />;
  }

  if (type === "horizontal") {
    return <div className={`h-0.5 bg-gray-300 dark:bg-gray-600 ${className}`} />;
  }

  if (type === "t-down") {
    return (
      <div className={`relative h-6 sm:h-8 ${className}`}>
        <div className="absolute left-1/2 top-0 w-0.5 h-full bg-gray-300 dark:bg-gray-600 -translate-x-1/2" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600" />
      </div>
    );
  }

  if (type === "corner-left") {
    return (
      <div className={`relative w-8 h-8 ${className}`}>
        <div className={`absolute top-0 right-0 w-1/2 h-1/2 border-b-2 border-l-2 ${lineColor} rounded-bl-lg`} />
      </div>
    );
  }

  if (type === "corner-right") {
    return (
      <div className={`relative w-8 h-8 ${className}`}>
        <div className={`absolute top-0 left-0 w-1/2 h-1/2 border-b-2 border-r-2 ${lineColor} rounded-br-lg`} />
      </div>
    );
  }

  return null;
}

function DepartmentColumn({
  titleKey,
  children,
  t,
  locale,
}: {
  titleKey: string;
  children: string[];
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <OrgBox titleKey={titleKey} t={t} locale={locale} variant="default" />
      <Connector type="vertical" />
      <div className="flex flex-col gap-1.5 sm:gap-2">
        {children.map((child) => (
          <OrgBox key={child} titleKey={child} t={t} locale={locale} variant="leaf" />
        ))}
      </div>
    </div>
  );
}

function ManagementBranch({
  titleKey,
  departments,
  t,
  locale,
}: {
  titleKey: string;
  departments: { titleKey: string; children: string[] }[];
  t: ReturnType<typeof useTranslations>;
  locale: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <OrgBox titleKey={titleKey} t={t} locale={locale} variant="tertiary" />
      <Connector type="vertical" />

      {/* Departments with T-connector */}
      <div className="relative">
        {/* Horizontal line spanning between departments */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-gray-300 dark:bg-gray-600" style={{ width: 'calc(50% + 3rem)' }} />

        {/* Departments container */}
        <div className="flex gap-3 sm:gap-4 lg:gap-6">
          {departments.map((dept) => (
            <div key={dept.titleKey} className="flex flex-col items-center">
              <div className="w-0.5 h-4 sm:h-6 bg-gray-300 dark:bg-gray-600" />
              <DepartmentColumn
                titleKey={dept.titleKey}
                children={dept.children}
                t={t}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrganizationChart() {
  const t = useTranslations("About.orgChart");
  const locale = useLocale();

  const resourcesDepts = [
    { titleKey: "hrAdmin", children: ["hr", "administration", "governmentRelations"] },
    { titleKey: "finance", children: ["accountingCompliance", "financeFPA", "treasury"] },
  ];

  const operationsDepts = [
    { titleKey: "supplyChain", children: ["procurement", "warehouse", "logistics"] },
    { titleKey: "salesBusiness", children: ["sales", "marketing", "businessDev"] },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-100 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {t("title")}
          </h2>
          <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full" />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col items-center">
          {/* Level 1: General Assembly */}
          <OrgBox titleKey="generalAssembly" t={t} locale={locale} variant="primary" />
          <Connector type="vertical" />

          {/* Level 2: Board with Committees Row */}
          <div className="flex items-center gap-0">
            {/* Left Committee */}
            <OrgBox titleKey="governanceRisk" t={t} locale={locale} variant="committee" />
            {/* Line */}
            <div className="w-8 xl:w-12 h-0.5 bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
            {/* Board */}
            <OrgBox titleKey="boardOfDirectors" t={t} locale={locale} variant="primary" />
            {/* Line */}
            <div className="w-8 xl:w-12 h-0.5 bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
            {/* Right Committees */}
            <div className="flex flex-col">
              <OrgBox titleKey="auditReview" t={t} locale={locale} variant="committee" />
              <div className="w-0.5 h-3 bg-gray-300 dark:bg-gray-600 mx-auto" />
              <OrgBox titleKey="nominationRemuneration" t={t} locale={locale} variant="committee" />
            </div>
          </div>

          <Connector type="vertical" />

          {/* Level 3: Executive Management */}
          <OrgBox titleKey="executiveManagement" t={t} locale={locale} variant="secondary" />
          <Connector type="vertical" />

          {/* Level 4: Two Main Branches with T-connector */}
          <div className="relative">
            {/* Horizontal line spanning between the two branches */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-gray-300 dark:bg-gray-600" style={{ width: 'calc(50% + 8rem)' }} />

            {/* Branches container */}
            <div className="flex justify-center gap-16 xl:gap-24 pt-0">
              {/* Resources Management Branch */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
                <ManagementBranch
                  titleKey="resourcesManagement"
                  departments={resourcesDepts}
                  t={t}
                  locale={locale}
                />
              </div>

              {/* Operations Management Branch */}
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
                <ManagementBranch
                  titleKey="operationsManagement"
                  departments={operationsDepts}
                  t={t}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:flex lg:hidden flex-col items-center overflow-x-auto pb-4">
          <div className="flex flex-col items-center min-w-[750px] px-8">
            {/* Level 1: General Assembly */}
            <OrgBox titleKey="generalAssembly" t={t} locale={locale} variant="primary" />
            <Connector type="vertical" />

            {/* Level 2: Board with Committees Row */}
            <div className="flex items-center gap-0">
              {/* Left Committee */}
              <OrgBox titleKey="governanceRisk" t={t} locale={locale} variant="committee" />
              {/* Line */}
              <div className="w-6 h-0.5 bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
              {/* Board */}
              <OrgBox titleKey="boardOfDirectors" t={t} locale={locale} variant="primary" />
              {/* Line */}
              <div className="w-6 h-0.5 bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
              {/* Right Committees */}
              <div className="flex flex-col">
                <OrgBox titleKey="auditReview" t={t} locale={locale} variant="committee" />
                <div className="w-0.5 h-2 bg-gray-300 dark:bg-gray-600 mx-auto" />
                <OrgBox titleKey="nominationRemuneration" t={t} locale={locale} variant="committee" />
              </div>
            </div>

            <Connector type="vertical" />
            <OrgBox titleKey="executiveManagement" t={t} locale={locale} variant="secondary" />
            <Connector type="vertical" />

            {/* Level 4: Two Main Branches with T-connector */}
            <div className="relative">
              {/* Horizontal line spanning between the two branches */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-gray-300 dark:bg-gray-600" style={{ width: 'calc(50% + 6rem)' }} />

              {/* Branches container */}
              <div className="flex justify-center gap-12">
                {/* Resources Management Branch */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
                  <ManagementBranch
                    titleKey="resourcesManagement"
                    departments={resourcesDepts}
                    t={t}
                    locale={locale}
                  />
                </div>

                {/* Operations Management Branch */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600" />
                  <ManagementBranch
                    titleKey="operationsManagement"
                    departments={operationsDepts}
                    t={t}
                    locale={locale}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        <div className="flex md:hidden flex-col items-center gap-3">
          {/* Top Level */}
          <OrgBox titleKey="generalAssembly" t={t} locale={locale} variant="primary" />
          <Connector type="vertical" className="h-4" />

          {/* Board Level */}
          <OrgBox titleKey="boardOfDirectors" t={t} locale={locale} variant="primary" />

          {/* Committees */}
          <div className="flex flex-wrap justify-center gap-2 my-2">
            <OrgBox titleKey="governanceRisk" t={t} locale={locale} variant="committee" />
            <OrgBox titleKey="auditReview" t={t} locale={locale} variant="committee" />
            <OrgBox titleKey="nominationRemuneration" t={t} locale={locale} variant="committee" />
          </div>

          <Connector type="vertical" className="h-4" />

          {/* Executive Management */}
          <OrgBox titleKey="executiveManagement" t={t} locale={locale} variant="secondary" />
          <Connector type="vertical" className="h-4" />

          {/* Resources & Operations Side by Side */}
          <div className="flex flex-wrap justify-center gap-3">
            <OrgBox titleKey="resourcesManagement" t={t} locale={locale} variant="tertiary" />
            <OrgBox titleKey="operationsManagement" t={t} locale={locale} variant="tertiary" />
          </div>

          <Connector type="vertical" className="h-4" />

          {/* All Departments */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
            <OrgBox titleKey="hrAdmin" t={t} locale={locale} variant="default" />
            <OrgBox titleKey="finance" t={t} locale={locale} variant="default" />
            <OrgBox titleKey="supplyChain" t={t} locale={locale} variant="default" />
            <OrgBox titleKey="salesBusiness" t={t} locale={locale} variant="default" />
          </div>

          <Connector type="vertical" className="h-4" />

          {/* Sub-departments */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-md">
            <OrgBox titleKey="hr" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="administration" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="governmentRelations" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="accountingCompliance" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="financeFPA" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="treasury" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="procurement" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="warehouse" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="logistics" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="sales" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="marketing" t={t} locale={locale} variant="leaf" />
            <OrgBox titleKey="businessDev" t={t} locale={locale} variant="leaf" />
          </div>
        </div>
      </div>
    </section>
  );
}
