"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { sendInquiryEmail, prepareEmailTemplateParams } from "@/lib/emailjs";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  clearCartOnSuccess?: boolean;
  autoCloseMs?: number | null;
  groupingMode?: "category" | "flat";
  enableAnalytics?: boolean;
  requireTermsAcceptance?: boolean;
}

interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms?: boolean;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  inquiryId?: string;
  estimatedResponse?: string;
}

type InquiryErrors = Partial<Record<keyof InquiryForm, string>>;
type ModalStep = 1 | 2 | 3 | 4; // 1: Cart Review, 2: Inquiry Form, 3: Success, 4: Error

export default function CartModal({
  isOpen,
  onClose,
  clearCartOnSuccess = true,
  autoCloseMs = 3000,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  groupingMode = "category", // Reserved for Phase 3: category grouping
  enableAnalytics = true,
  requireTermsAcceptance = false,
}: CartModalProps) {
  const t = useTranslations("Cart");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  // Refs for focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalOpenTime = useRef<number | null>(null);

  const [currentStep, setCurrentStep] = useState<ModalStep>(1);
  const [formData, setFormData] = useState<InquiryForm>({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptTerms: false,
  });
  const [validationErrors, setValidationErrors] = useState<InquiryErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [animationStep, setAnimationStep] = useState<
    "entering" | "entered" | "exiting"
  >("entering");

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,18}$/;
    const digitsOnly = phone.replace(/[^\d]/g, "");
    return (
      phoneRegex.test(phone) &&
      digitsOnly.length >= 10 &&
      digitsOnly.length <= 15
    );
  };

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{2,80}$/;
    return nameRegex.test(name.trim());
  };

  // Analytics tracking utility
  const trackEvent = useCallback(
    (eventName: string, properties?: Record<string, unknown>) => {
      if (!enableAnalytics) return;

      // Implementation depends on your analytics provider (Google Analytics, Mixpanel, etc.)
      if (typeof window !== "undefined") {
        // Example for Google Analytics 4
        const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
          gtag("event", eventName, {
            ...properties,
            cart_items: cart.totalItems,
            locale: locale,
          });
        }

        // Example for custom analytics
        console.log("Analytics Event:", {
          eventName,
          ...properties,
          timestamp: new Date().toISOString(),
        });
      }
    },
    [enableAnalytics, cart.totalItems, locale]
  );

  const validateForm = (): boolean => {
    const errors: InquiryErrors = {};

    if (!validateName(formData.name)) {
      errors.name =
        locale === "ar"
          ? "يرجى إدخال اسم صحيح (2-80 حرف)"
          : "Please enter a valid name (2-80 characters)";
    }

    if (!validateEmail(formData.email)) {
      errors.email =
        locale === "ar"
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email address";
    }

    if (!validatePhone(formData.phone)) {
      errors.phone =
        locale === "ar"
          ? "يرجى إدخال رقم هاتف صحيح (10-15 رقم)"
          : "Please enter a valid phone number (10-15 digits)";
    }

    if (formData.message.length > 500) {
      errors.message =
        locale === "ar"
          ? "الرسالة يجب أن تكون أقل من 500 حرف"
          : "Message must be less than 500 characters";
    }

    if (requireTermsAcceptance && !formData.acceptTerms) {
      errors.acceptTerms =
        locale === "ar"
          ? "يجب الموافقة على الشروط والأحكام"
          : "You must accept the terms and conditions";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Focus trap utility
  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }, []);

  // Modal animation and focus management
  useEffect(() => {
    if (isOpen) {
      // Store previous focus and track modal open time
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalOpenTime.current = Date.now();

      // Show modal with animation
      setShowModal(true);
      setAnimationStep("entering");

      // Focus first element after animation
      const timer = setTimeout(() => {
        setAnimationStep("entered");
        if (firstFocusableRef.current) {
          firstFocusableRef.current.focus();
        }
      }, 150);

      return () => clearTimeout(timer);
    } else {
      // Restore previous focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      // Exit animation
      setAnimationStep("exiting");
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setValidationErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle ESC key, prevent body scroll, and setup focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", trapFocus);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, trapFocus]);

  // Auto-close timer management with cancellation
  useEffect(() => {
    if (currentStep === 3 && autoCloseMs && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseMs);

      setAutoCloseTimer(timer);

      return () => {
        clearTimeout(timer);
        setAutoCloseTimer(null);
      };
    } else {
      // Clear timer if we're not on success step
      setAutoCloseTimer((prevTimer) => {
        if (prevTimer) {
          clearTimeout(prevTimer);
        }
        return null;
      });
    }
  }, [currentStep, autoCloseMs, isOpen, onClose]);

  // Cancel auto-close timer on user interaction
  const cancelAutoClose = useCallback(() => {
    setAutoCloseTimer((prevTimer) => {
      if (prevTimer) {
        clearTimeout(prevTimer);
      }
      return null;
    });
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToInquiry = () => {
    if (cart.items.length > 0) {
      setAnimationStep("exiting");
      setTimeout(() => {
        setCurrentStep(2);
        setAnimationStep("entering");
        setTimeout(() => setAnimationStep("entered"), 150);
      }, 150);
    }
  };

  const handleBackToCart = () => {
    setAnimationStep("exiting");
    setTimeout(() => {
      setCurrentStep(1);
      setAnimationStep("entering");
      setTimeout(() => setAnimationStep("entered"), 150);
    }, 150);
  };

  const handleFormChange = (
    field: keyof InquiryForm,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmitInquiry = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Track form submission attempt
      trackEvent("inquiry_form_submit_start", {
        name: formData.name,
        email: formData.email,
        form_step: "inquiry",
        retry_count: retryCount,
      });

      // Prepare EmailJS template parameters
      const templateParams = prepareEmailTemplateParams(formData, cart, locale);

      // Send email via EmailJS
      const emailResult = await sendInquiryEmail(templateParams);
      setApiResponse(emailResult);

      // Track successful email submission
      trackEvent("inquiry_email_success", {
        inquiry_id: emailResult.inquiryId,
        retry_count: retryCount,
        total_items: cart.totalItems,
        unique_products: cart.items.length,
      });

      // Success: animate to confirmation step
      setAnimationStep("exiting");
      setTimeout(() => {
        setCurrentStep(3);
        setAnimationStep("entering");
        setTimeout(() => setAnimationStep("entered"), 150);
        setRetryCount(0); // Reset retry count on success

        // Track successful form completion
        trackEvent("inquiry_form_complete", {
          completion_step: "success",
          time_to_complete: Date.now() - (modalOpenTime.current || Date.now()),
          retry_count: retryCount,
          inquiry_id: emailResult.inquiryId,
        });
      }, 150);

      // Clear cart if configured to do so
      if (clearCartOnSuccess) {
        clearCart();
      }
    } catch (error: unknown) {
      console.error("EmailJS submission failed:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Email sending failed";
      setSubmitError(errorMessage);
      setRetryCount((prev) => prev + 1);

      // Animate to error step (step 4)
      setAnimationStep("exiting");
      setTimeout(() => {
        setCurrentStep(4);
        setAnimationStep("entering");
        setTimeout(() => setAnimationStep("entered"), 150);
      }, 150);

      // Track submission failure
      trackEvent("inquiry_submit_error", {
        error_message: errorMessage,
        error_step: "emailjs_send",
        retry_count: retryCount + 1,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      Object.keys(validationErrors).length === 0
    );
  };

  if (!showModal) return null;

  // Animation classes
  const backdropClasses = `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
    animationStep === "entering"
      ? "opacity-0"
      : animationStep === "entered"
      ? "opacity-100"
      : "opacity-0"
  }`;

  const modalClasses = `bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl border dark:border-gray-700 flex flex-col my-auto transition-all duration-300 ${
    animationStep === "entering"
      ? "opacity-0 scale-95 translate-y-4"
      : animationStep === "entered"
      ? "opacity-100 scale-100 translate-y-0"
      : "opacity-0 scale-95 translate-y-4"
  }`;

  const contentClasses = `transition-all duration-300 ${
    animationStep === "entering"
      ? "opacity-0 translate-x-4"
      : "opacity-100 translate-x-0"
  }`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={backdropClasses}
        onClick={() => {
          cancelAutoClose();
          onClose();
        }}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div
          ref={modalRef}
          className={modalClasses}
          style={{ maxHeight: "calc(100dvh - 4rem)" }}
          dir={isRTL ? "rtl" : "ltr"}
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {currentStep === 1 && (t("modal.cartReview") || "Cart Review")}
              {currentStep === 2 && (t("modal.inquiryForm") || "Inquiry Form")}
              {currentStep === 3 && (t("modal.inquirySent") || "Inquiry Sent")}
              {currentStep === 4 &&
                (t("modal.submissionError") || "Submission Error")}
            </h2>
            <button
              ref={firstFocusableRef}
              onClick={() => {
                cancelAutoClose();
                onClose();
              }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label={t("close") || "Close"}
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

          {/* Content */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-6 min-h-0 ${contentClasses}`}
          >
            {/* Step 1: Cart Review */}
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
                      {t("emptyCart") || "Your cart is empty"}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Product List */}
                    <div className="space-y-4">
                      {cart.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700"
                        >
                          {/* Product Image - Hidden on mobile */}
                          <div className="hidden sm:block w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {item.category}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
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
                                  d="M20 12H4"
                                />
                              </svg>
                            </button>
                            <span className="w-12 text-center font-semibold text-gray-900 dark:text-gray-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center justify-center transition-colors"
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

                    {/* Summary */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                          {t("totalItems") || "Total Items"}
                        </span>
                        <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {cart.totalItems}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Inquiry Form */}
            {currentStep === 2 && (
              <div className="max-w-lg mx-auto space-y-6">
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {t("modal.inquiryDescription") ||
                    "Please provide your contact information and we'll send you a quotation for the selected items."}
                </p>

                <div className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.name") || "Name"} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        validationErrors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent transition-all`}
                      placeholder={
                        t("modal.form.namePlaceholder") ||
                        "Enter your full name"
                      }
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.email") || "Email"} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        validationErrors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent transition-all`}
                      placeholder={
                        t("modal.form.emailPlaceholder") ||
                        "Enter your email address"
                      }
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.phone") || "Phone"} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleFormChange("phone", e.target.value)
                      }
                      className={`w-full px-4 py-3 rounded-xl border ${
                        validationErrors.phone
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent transition-all`}
                      placeholder={
                        t("modal.form.phonePlaceholder") ||
                        "Enter your phone number"
                      }
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      {t("modal.form.message") || "Message"} (
                      {t("optional") || "optional"})
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        handleFormChange("message", e.target.value)
                      }
                      rows={4}
                      maxLength={500}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        validationErrors.message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:border-transparent transition-all resize-none`}
                      placeholder={
                        t("modal.form.messagePlaceholder") ||
                        "Any additional requirements or questions..."
                      }
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <div className="flex justify-between mt-1">
                      <div>
                        {validationErrors.message && (
                          <p className="text-red-500 text-sm">
                            {validationErrors.message}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formData.message.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  {requireTermsAcceptance && (
                    <div className="mt-6">
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.acceptTerms || false}
                          onChange={(e) =>
                            handleFormChange("acceptTerms", e.target.checked)
                          }
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200">
                          {t("modal.form.acceptTerms") ||
                            "I agree to the terms and conditions and privacy policy"}
                        </span>
                      </label>
                      {validationErrors.acceptTerms && (
                        <p className="text-red-500 text-sm mt-1">
                          {validationErrors.acceptTerms}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {currentStep === 3 && (
              <div className="text-center py-8" onClick={cancelAutoClose}>
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {t("modal.inquirySent") || "Inquiry Sent Successfully!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t("modal.inquirySuccessMessage") ||
                    "Thank you for your inquiry. We will contact you shortly with a detailed quotation."}
                </p>
                {apiResponse?.inquiryId && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <span className="font-semibold">Inquiry ID:</span>{" "}
                      {apiResponse.inquiryId}
                    </p>
                    {apiResponse.estimatedResponse && (
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        <span className="font-semibold">
                          Estimated Response:
                        </span>{" "}
                        {apiResponse.estimatedResponse}
                      </p>
                    )}
                  </div>
                )}
                {autoCloseMs && autoCloseTimer && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("modal.autoCloseMessage") ||
                        "This window will close automatically in a few seconds."}
                    </p>
                    <button
                      onClick={cancelAutoClose}
                      className="text-sm text-blue-500 hover:text-blue-600 underline transition-colors"
                    >
                      {t("modal.cancelAutoClose") ||
                        "Click anywhere to cancel auto-close"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Error */}
            {currentStep === 4 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
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
                </div>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {t("modal.submissionError") || "Submission Failed"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t("modal.submissionErrorMessage") ||
                    "We encountered an error while submitting your inquiry. Please try again."}
                </p>
                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-700 dark:text-red-300 font-mono break-words">
                      {submitError}
                    </p>
                  </div>
                )}
                {retryCount > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {t("modal.retryAttempt") || "Retry attempt"}: {retryCount}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      // Reset to inquiry form
                      setAnimationStep("exiting");
                      setTimeout(() => {
                        setCurrentStep(2);
                        setAnimationStep("entering");
                        setTimeout(() => setAnimationStep("entered"), 150);
                      }, 150);
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {t("modal.tryAgain") || "Try Again"}
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    {t("modal.closeModal") || "Close"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {currentStep !== 3 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex-shrink-0">
              <div className="flex items-center justify-between gap-4">
                <div>
                  {currentStep === 2 && (
                    <button
                      onClick={handleBackToCart}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                    >
                      {t("modal.back") || "Back"}
                    </button>
                  )}
                </div>

                <div className="flex gap-3">
                  {currentStep === 1 && (
                    <>
                      <button
                        onClick={clearCart}
                        className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                        disabled={cart.items.length === 0}
                      >
                        {t("clearCart") || "Clear Cart"}
                      </button>
                      <button
                        ref={currentStep === 1 ? lastFocusableRef : undefined}
                        onClick={handleProceedToInquiry}
                        disabled={cart.items.length === 0}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors"
                      >
                        {t("modal.proceedToInquiry") || "Proceed to Inquiry"}
                      </button>
                    </>
                  )}

                  {currentStep === 2 && (
                    <button
                      ref={lastFocusableRef}
                      onClick={handleSubmitInquiry}
                      disabled={!isFormValid() || isSubmitting}
                      className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                    >
                      {isSubmitting && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      {t("modal.submitInquiry") || "Submit Inquiry"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
