import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import productsData from "@/data/productsData";
import ContactForm from "@/components/ContactForm";
import CartButton from "@/components/Cart/CartButton";

interface ProductPageProps {
  params: {
    category: string;
    productName: string;
    locale: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, productName, locale } = await params;
  const t = await getTranslations({ locale });

  const decodedProductName = decodeURIComponent(productName);

  // Check if category exists
  if (!productsData[category as keyof typeof productsData]) {
    notFound();
  }

  const categoryData = productsData[category as keyof typeof productsData];

  // Find the specific product
  const product = categoryData.products.find(
    (p) => p.name === decodedProductName
  );

  if (!product) {
    notFound();
  }

  // Generate unique product ID
  const productIndex = categoryData.products.findIndex(
    (p) => p.name === decodedProductName
  );
  const productId = `${category}-${productIndex}`;

  // Map category keys to translations
  const categoryTitles: Record<string, string> = {
    "head-protection": t("Products.categories.head"),
    "eye-and-face-protection": t("Products.categories.eyeFace"),
    "hearing-protection": t("Products.categories.hearing"),
    "respiratory-protection": t("Products.categories.respiratory"),
    "hand-protection": t("Products.categories.hand"),
    "foot-protection": t("Products.categories.foot"),
    "body-protection": t("Products.categories.body"),
    "gas-detector": t("Products.categories.gasDetectors"),
  };

  const categoryTitle = categoryTitles[category] || category;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Breadcrumb */}
      <div className="bg-white/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white transition-colors"
            >
              {t("Navigation.home")}
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/products"
              className="text-gray-600 dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white transition-colors"
            >
              {t("Products.title")}
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/products/${category}`}
              className="text-gray-600 dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white transition-colors"
            >
              {categoryTitle}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#1F2937] dark:text-white font-medium">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Product Image */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  suppressHydrationWarning
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="px-3 py-1 bg-[#1F2937]/10 dark:bg-gray-700 rounded-full">
                    {categoryTitle}
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t("Product.features")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    t("Product.feature1"),
                    t("Product.feature2"),
                    t("Product.feature3"),
                    t("Product.feature4"),
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#1F2937] dark:bg-blue-400 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Button */}
              <div className="flex flex-col items-center gap-4">
                <CartButton
                  product={{
                    id: productId,
                    name: product.name,
                    category: categoryTitles[category] || category,
                    image: product.image,
                    description: product.description,
                  }}
                  size="lg"
                  variant="primary"
                  className="min-w-48"
                />
                <Link
                  href={`/${locale}/products/${category}`}
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <svg
                    className="w-4 h-4 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                  <span>{t("Product.viewMore")}</span>
                </Link>
              </div>
              {/* WhatsApp Contact Button */}
              <div className="mt-6">
                <div className="flex justify-center">
                  <a
                    href="https://wa.me/966535852438"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <span>Chat with us on WhatsApp</span>
                    <Image
                      src="/whatsapp.svg"
                      alt="WhatsApp Icon"
                      width={24}
                      height={24}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div
            id="contact-form"
            className="bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
          >
            <div className="p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("Product.inquireAbout")}
                </h2>
              </div>
              <ContactForm productName={product.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
