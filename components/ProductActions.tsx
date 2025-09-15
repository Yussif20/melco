"use client";

import Link from "next/link";

interface ProductActionsProps {
  category: string;
  locale: string;
  requestQuoteText: string;
  viewMoreText: string;
}

export default function ProductActions({
  category,
  locale,
  requestQuoteText,
  viewMoreText,
}: ProductActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() =>
          document
            .getElementById("contact-form")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="flex-1 bg-gradient-to-r from-[#1F2937] to-gray-800 hover:from-gray-800 hover:to-[#1F2937] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
      >
        {requestQuoteText}
      </button>
      <Link
        href={`/${locale}/products/${category}`}
        className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-center"
      >
        {viewMoreText}
      </Link>
    </div>
  );
}
