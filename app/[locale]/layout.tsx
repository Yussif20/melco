import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Tajawal } from "next/font/google";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/Cart/CartProvider";
import "../globals.css";

// English font - Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Arabic font - Tajawal
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
  variable: "--font-tajawal",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://melco-ltd.com";
  const title =
    locale === "ar"
      ? "ميلكو - معدات السلامة والحماية | المملكة العربية السعودية"
      : "MELCO - Safety Equipment & Protection | Saudi Arabia";
  const description =
    locale === "ar"
      ? "الشركة الرائدة في توفير معدات السلامة في المملكة العربية السعودية. نوفر مجموعة شاملة من معدات الحماية الشخصية عالية الجودة لجميع الصناعات."
      : "Leading provider of safety equipment in Saudi Arabia. We offer a comprehensive range of high-quality personal protective equipment for all industries.";

  return {
    title: {
      default: title,
      template: `%s | MELCO`,
    },
    description,
    keywords:
      locale === "ar"
        ? [
            "معدات السلامة",
            "معدات الحماية الشخصية",
            "السلامة المهنية",
            "المملكة العربية السعودية",
            "ميلكو",
            "الدمام",
          ]
        : [
            "safety equipment",
            "PPE",
            "personal protective equipment",
            "workplace safety",
            "Saudi Arabia",
            "MELCO",
            "Dammam",
          ],
    authors: [{ name: "MELCO" }],
    creator: "MELCO",
    publisher: "MELCO",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: siteUrl,
      title,
      description,
      siteName: "MELCO - Master Equipment",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt:
            locale === "ar"
              ? "ميلكو - معدات السلامة"
              : "MELCO - Safety Equipment",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.jpg`],
      creator: "@melcosa",
      site: "@melcosa",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const fontClass = locale === "ar" ? tajawal.variable : inter.variable;

  return (
    <html lang={locale} dir={direction} className={`light ${fontClass}`}>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
