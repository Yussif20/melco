"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

interface ContactFormProps {
  productName?: string;
}

export default function ContactForm({ productName }: ContactFormProps) {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    message: "",
    product: productName || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      amount: "",
      message: "",
      product: productName || "",
    });

    setIsSubmitting(false);
    alert(t("form.successMessage"));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            {t("form.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={t("form.namePlaceholder")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#1F2937] dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            {t("form.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={t("form.emailPlaceholder")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#1F2937] dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
            dir="ltr"
          />
        </div>
      </div>

      {/* Phone Field */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("form.phone")}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder={t("form.phonePlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#1F2937] dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
          dir="ltr"
        />
      </div>

      {/* Amount Field */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("form.amount", { default: "Amount" })}
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="1"
          value={formData.amount}
          onChange={handleChange}
          required
          placeholder={t("form.amountPlaceholder", {
            default: "Enter quantity",
          })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#1F2937] dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      {/* Product Field (if productName is provided) */}
      {productName && (
        <div>
          <label
            htmlFor="product"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            {t("form.product")}
          </label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            readOnly
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white cursor-not-allowed"
            dir={isRTL ? "rtl" : "ltr"}
          />
        </div>
      )}

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {t("form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder={t("form.messagePlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#1F2937] dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
          dir={isRTL ? "rtl" : "ltr"}
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`group inline-flex items-center gap-3 bg-gradient-to-r from-[#1F2937] to-gray-800 hover:from-gray-800 hover:to-[#1F2937] text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            isSubmitting ? "animate-pulse" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {t("form.sending")}
            </>
          ) : (
            <>
              {t("form.send")}
              {isRTL ? (
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              )}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
