import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Navigation");
  const footer = useTranslations("Footer");
  const locale = useLocale();

  const quickLinks = [
    { name: t("about"), href: `/${locale}/about` },
    { name: t("products"), href: `/${locale}/products` },
    { name: t("governance"), href: `/${locale}/governance` },
    { name: t("news"), href: `/${locale}/news` },
    { name: t("careers"), href: `/${locale}/careers` },
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center md:text-start">
          {/* Company Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <Image
              src="/logo-white.png"
              alt="Melco Logo"
              width={120}
              height={40}
              className="h-12 w-auto"
              priority
              suppressHydrationWarning
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              {footer("companyDescription")}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              {/* Social Media Icons */}
              <a
                href="https://www.linkedin.com/company/melcosa/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {footer("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{footer("contact")}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <svg
                  className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0"
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
                <p className="text-gray-300 text-sm">{footer("address")}</p>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <svg
                  className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0"
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
                <a
                  href={`tel:${footer("phone")}`}
                  className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                >
                  {footer("phone")}
                </a>
              </div>
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <svg
                  className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${footer("email")}`}
                  className="text-gray-300 text-sm hover:text-white transition-colors duration-200"
                >
                  {footer("email")}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 {footer("companyDescription").split(" - ")[0]}.{" "}
              {footer("rights")}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href={`/${locale}/governance`}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {footer("privacyPolicy")}
              </Link>
              <Link
                href={`/${locale}/governance`}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                {footer("termsConditions")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
