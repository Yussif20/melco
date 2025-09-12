"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const tProducts = useTranslations("Products");
  const locale = useLocale();
  const pathname = usePathname();
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const navigation = [
    { name: t("home"), href: `/${locale}` },
    { name: t("about"), href: `/${locale}/about` },
    { name: t("products"), href: `/${locale}/products`, hasDropdown: true },
    { name: t("board"), href: `/${locale}/board` },
    { name: t("governance"), href: `/${locale}/governance` },
    { name: t("news"), href: `/${locale}/news` },
    { name: t("careers"), href: `/${locale}/careers` },
    { name: t("contact"), href: `/${locale}/contact` },
  ];

  const productCategories = [
    {
      key: "head",
      name: tProducts("categories.head"),
      description: tProducts("categories.headDescription"),
      image: "/category-headers/head.png",
      href: `/${locale}/products/head-protection`,
    },
    {
      key: "eyeFace",
      name: tProducts("categories.eyeFace"),
      description: tProducts("categories.eyeFaceDescription"),
      image: "/category-headers/eye.png",
      href: `/${locale}/products/eye-protection`,
    },
    {
      key: "hearing",
      name: tProducts("categories.hearing"),
      description: tProducts("categories.hearingDescription"),
      image: "/category-headers/hear.jpg",
      href: `/${locale}/products/hearing-protection`,
    },
    {
      key: "respiratory",
      name: tProducts("categories.respiratory"),
      description: tProducts("categories.respiratoryDescription"),
      image: "/category-headers/resp.jpg",
      href: `/${locale}/products/respiratory-protection`,
    },
    {
      key: "hand",
      name: tProducts("categories.hand"),
      description: tProducts("categories.handDescription"),
      image: "/category-headers/hand.png",
      href: `/${locale}/products/hand-protection`,
    },
    {
      key: "body",
      name: tProducts("categories.body"),
      description: tProducts("categories.bodyDescription"),
      image: "/category-headers/body.jpg",
      href: `/${locale}/products/body-protection`,
    },
    {
      key: "foot",
      name: tProducts("categories.foot"),
      description: tProducts("categories.footDescription"),
      image: "/category-headers/foot.png",
      href: `/${locale}/products/foot-protection`,
    },
    {
      key: "gasDetectors",
      name: tProducts("categories.gasDetectors"),
      description: tProducts("categories.gasDetectorsDescription"),
      image: "/category-headers/gas.jpg",
      href: `/${locale}/products/gas-detectors`,
    },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href;
  };

  return (
    <nav className="hidden md:flex items-center gap-8 relative">
      {navigation.map((item) => (
        <div key={item.href} className="relative">
          {item.hasDropdown ? (
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-800 dark:hover:text-blue-400 flex items-center gap-1 ${
                  isActive(item.href)
                    ? "text-blue-800 dark:text-blue-400 border-b-2 border-blue-800 dark:border-blue-400 pb-1"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Link>

              {/* Products Dropdown */}
              {isProductsOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {tProducts("title")}
                      </h3>
                      <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {productCategories.map((category) => (
                        <Link
                          key={category.key}
                          href={category.href}
                          className="group p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                        >
                          <div className="w-20 h-20 mx-auto mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <Image
                              src={category.image}
                              alt={category.name}
                              width={80}
                              height={80}
                              className="object-cover group-hover:scale-110 transition-transform duration-200 w-full h-full"
                              suppressHydrationWarning
                            />
                          </div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {category.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">
                            {category.description}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        href={`/${locale}/products`}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                      >
                        <span>{tProducts("viewAll")}</span>
                        <svg
                          className="w-4 h-4"
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
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-blue-800 dark:hover:text-blue-400 ${
                isActive(item.href)
                  ? "text-blue-800 dark:text-blue-400 border-b-2 border-blue-800 dark:border-blue-400 pb-1"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
