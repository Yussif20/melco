import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter, Tajawal } from "next/font/google";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/Cart/CartProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.masterequiment.com";
  const title =
    locale === "ar"
      ? "ميلكو - ملتزمون بالجودة، معروفون بالثقة"
      : "MELCO - Driven by Quality, Defined by Trust";
  const description =
    locale === "ar"
      ? "ملتزمون بالجودة، معروفون بالثقة. نوفر مجموعة شاملة من معدات السلامة والحماية الشخصية عالية الجودة لجميع الصناعات في المملكة العربية السعودية."
      : "Driven by Quality, Defined by Trust. We offer a comprehensive range of high-quality safety equipment and personal protective equipment for all industries in Saudi Arabia.";

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
            "معدات الوقاية",
            "الجودة",
            "الثقة",
          ]
        : [
            "safety equipment",
            "PPE",
            "personal protective equipment",
            "workplace safety",
            "Saudi Arabia",
            "MELCO",
            "Dammam",
            "quality",
            "trust",
            "protection equipment",
          ],
    authors: [{ name: "MELCO" }],
    creator: "MELCO",
    publisher: "MELCO",
    applicationName: "MELCO - Master Equipment",
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
          url: `logo.png`,
          width: 1200,
          height: 630,
          alt:
            locale === "ar"
              ? "ميلكو - ملتزمون بالجودة، معروفون بالثقة"
              : "MELCO - Driven by Quality, Defined by Trust",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/logo.png`],
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
      icon: [
        { url: "/favicon1.ico", sizes: "any" },
        { url: "/logo.png", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
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
              <WhatsAppButton locale={locale} />
            </div>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
