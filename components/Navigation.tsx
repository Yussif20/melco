"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const pathname = usePathname();

  const navigation = [
    { name: t("home"), href: `/${locale}` },
    { name: t("about"), href: `/${locale}/about` },
    { name: t("products"), href: `/${locale}/products` },
    { name: t("board"), href: `/${locale}/board` },
    { name: t("governance"), href: `/${locale}/governance` },
    { name: t("news"), href: `/${locale}/news` },
    { name: t("careers"), href: `/${locale}/careers` },
    { name: t("contact"), href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href;
  };

  return (
    <nav className="hidden md:flex items-center  gap-8">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm font-medium transition-colors duration-200 hover:text-blue-800 dark:hover:text-blue-400 ${
            isActive(item.href)
              ? "text-blue-800 dark:text-blue-400 border-b-2 border-blue-800 dark:border-blue-400 pb-1"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
