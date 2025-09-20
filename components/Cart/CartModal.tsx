"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { CartItem } from "@/types/cart";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const t = useTranslations("Cart");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);
  const [contactData, setContactData] = useState<ContactData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    phone?: string;
  }>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Allow international formats: +966123456789, 0123456789, etc.
    const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateForm = (): boolean => {
    const errors: { email?: string; phone?: string } = {};

    if (!validateEmail(contactData.email)) {
      errors.email =
        locale === "ar"
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address";
    }

    if (!validatePhone(contactData.phone)) {
      errors.phone =
        locale === "ar"
          ? "يرجى إدخال رقم هاتف صحيح"
          : "Please enter a valid phone number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setContactData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
      setShowToast(false);
      setValidationErrors({});
    }
  }, [isOpen]);

  // Handle escape key and backdrop click
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContactSubmit = async () => {
    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setCurrentStep(3);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear the cart after successful submission
    clearCart();

    // Show toast and close modal
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 3000);

    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  // Group items by category
  const itemsByCategory = cart.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex min-h-screen py-2 sm:py-4 px-2 sm:px-4 overflow-y-auto">
        <div
          className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl m-auto overflow-hidden flex flex-col border dark:border-gray-700"
          style={{
            maxHeight: "calc(100vh - 1rem)",
            minHeight: "calc(100vh - 1rem)",
          }}
          dir={isRTL ? "rtl" : "ltr"}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentStep === 1 && t("modal.orderDetails")}
              {currentStep === 2 && t("modal.sendQuotation")}
              {currentStep === 3 && t("modal.confirmationTitle")}
            </h2>
            <button
              onClick={onClose}
              className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-colors ${
                      step <= currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 transition-colors ${
                        step < currentStep
                          ? "bg-blue-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                {currentStep === 1 && t("modal.step1Label")}
                {currentStep === 2 && t("modal.step2Label")}
                {currentStep === 3 && t("modal.step3Label")}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 min-h-0">
            {/* Step 1: Order Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {cart.items.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      className="w-16 h-16 mx-auto text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6H19M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6M9 19h6"
                      />
                    </svg>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      {t("cartEmpty")}
                    </p>
                  </div>
                ) : (
                  Object.entries(itemsByCategory).map(([category, items]) => (
                    <div
                      key={category}
                      className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4 border dark:border-gray-700"
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 sm:gap-4 bg-white dark:bg-gray-700 rounded-lg p-3 sm:p-4 border dark:border-gray-600"
                          >
                            {/* Product Image - Hidden on mobile */}
                            <div className="hidden sm:block w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                {item.name}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                {item.category}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-200"
                              >
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H4"
                                  />
                                </svg>
                              </button>
                              <span className="w-8 sm:w-12 text-center font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-200"
                              >
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
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Step 2: Contact Form */}
            {currentStep === 2 && (
              <div className="max-w-lg mx-auto">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.name")}
                    </label>
                    <input
                      type="text"
                      value={contactData.name}
                      onChange={(e) =>
                        setContactData({ ...contactData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={t("modal.form.namePlaceholder")}
                      required
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.email")}
                    </label>
                    <input
                      type="email"
                      value={contactData.email}
                      onChange={(e) => {
                        setContactData({
                          ...contactData,
                          email: e.target.value,
                        });
                        // Clear validation error when user starts typing
                        if (validationErrors.email) {
                          setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                          });
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        validationErrors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent transition-all`}
                      placeholder={t("modal.form.emailPlaceholder")}
                      required
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.phone")}
                    </label>
                    <input
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => {
                        setContactData({
                          ...contactData,
                          phone: e.target.value,
                        });
                        // Clear validation error when user starts typing
                        if (validationErrors.phone) {
                          setValidationErrors({
                            ...validationErrors,
                            phone: undefined,
                          });
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        validationErrors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent transition-all`}
                      placeholder={t("modal.form.phonePlaceholder")}
                      required
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.message")}
                    </label>
                    <textarea
                      value={contactData.message}
                      onChange={(e) =>
                        setContactData({
                          ...contactData,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder={t("modal.form.messagePlaceholder")}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                      {t("modal.confirmation.title")}
                    </h3>
                  </div>
                  <p className="text-green-700 dark:text-green-300">
                    {t("modal.confirmation.description")}
                  </p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {t("modal.confirmation.orderSummary")}
                  </h4>
                  <div className="space-y-2">
                    {cart.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600 dark:text-gray-300">
                          {item.name} × {item.quantity}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                      <div className="flex justify-between font-semibold text-gray-900 dark:text-gray-100">
                        <span>{t("modal.confirmation.totalItems")}</span>
                        <span>{cart.totalItems}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    {t("modal.confirmation.contactInfo")}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                    <div>
                      <strong>{t("modal.form.name")}:</strong>{" "}
                      {contactData.name}
                    </div>
                    <div>
                      <strong>{t("modal.form.email")}:</strong>{" "}
                      {contactData.email}
                    </div>
                    <div>
                      <strong>{t("modal.form.phone")}:</strong>{" "}
                      {contactData.phone}
                    </div>
                    {contactData.message && (
                      <div>
                        <strong>{t("modal.form.message")}:</strong>{" "}
                        {contactData.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-4 sm:px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors text-sm sm:text-base"
                  >
                    {t("modal.back")}
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                {currentStep === 1 && cart.items.length > 0 && (
                  <button
                    onClick={handleNext}
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors text-sm sm:text-base"
                  >
                    {t("modal.next")}
                  </button>
                )}

                {currentStep === 2 && (
                  <button
                    onClick={handleContactSubmit}
                    disabled={
                      isSubmitting ||
                      !contactData.name ||
                      !contactData.email ||
                      !contactData.phone
                    }
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {t("modal.submit")}
                  </button>
                )}

                {currentStep === 3 && (
                  <button
                    onClick={handleFinalSubmit}
                    disabled={isSubmitting}
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm sm:text-base"
                  >
                    {isSubmitting && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {t("modal.confirm")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none">
          <div className="bg-blue-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-in fade-in zoom-in duration-300 pointer-events-auto max-w-sm mx-4">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <span className="font-semibold">{t("modal.successMessage")}</span>
          </div>
        </div>
      )}
    </>
  );
}
