import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  careerTemplateId: process.env.NEXT_PUBLIC_EMAILJS_CAREER_TEMPLATE_ID!,
};

// Initialize EmailJS with your public key (only in browser)
if (typeof window !== "undefined") {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}

export interface EmailTemplateParams extends Record<string, unknown> {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms: string;
  cartItems: string;
  totalItems: string;
  uniqueProducts: string;
  inquiryId: string;
  submittedAt: string;
}

interface InquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptTerms?: boolean;
}

export const sendInquiryEmail = async (
  templateParams: EmailTemplateParams
): Promise<{
  success: boolean;
  inquiryId: string;
  message: string;
  estimatedResponse: string;
}> => {
  try {
    // Validate required configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
      throw new Error("EmailJS configuration is incomplete.");
    }
    if (!EMAILJS_CONFIG.publicKey) {
      throw new Error("EmailJS Public Key is missing.");
    }

    // Re-initialize EmailJS to ensure it's ready
    if (typeof window !== "undefined") {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    if (result.status === 200) {
      return {
        success: true,
        inquiryId: templateParams.inquiryId,
        message: "Inquiry submitted successfully via email",
        estimatedResponse: "1-2 business days",
      };
    } else {
      throw new Error(
        `EmailJS returned status: ${result.status} - ${
          result.text || "Unknown error"
        }`
      );
    }
  } catch (error) {
    console.error("EmailJS Error:", error);

    // Re-throw with more descriptive error
    if (error instanceof Error) {
      throw new Error(`EmailJS Error: ${error.message}`);
    } else {
      throw new Error(
        "EmailJS Error: Unknown error occurred during email sending"
      );
    }
  }
};

export const prepareEmailTemplateParams = (
  formData: InquiryForm,
  cart: {
    items: Array<{
      id: string;
      name: string;
      category: string;
      quantity: number;
    }>;
    totalItems: number;
  },
  locale: string
): EmailTemplateParams => {
  const inquiryId = `INQ_${Date.now()}`;
  const submittedAt = new Date().toLocaleString(
    locale === "ar" ? "ar-SA" : "en-US"
  );

  // Format cart items as string for EmailJS template
  const cartItemsText = cart.items
    .map((item, index) => {
      return `${index + 1}. ${item.name} (Category: ${
        item.category
      }) - Quantity: ${item.quantity}`;
    })
    .join("\n");

  return {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    message: formData.message || "No additional message provided",
    acceptTerms: formData.acceptTerms ? "Yes" : "No",
    cartItems: cartItemsText,
    totalItems: cart.totalItems.toString(),
    uniqueProducts: cart.items.length.toString(),
    inquiryId,
    submittedAt,
  };
};

// Career Application Email Function - Uses mailto (no EmailJS needed)
export const sendCareerApplicationEmail = async (
  formData: {
    fullName: string;
    email: string;
    phone: string;
    currentPosition: string;
    yearsOfExperience: string;
    education: string;
    linkedin: string;
    coverLetter: string;
  },
  locale: string
): Promise<{
  success: boolean;
  message: string;
  applicationId?: string;
}> => {
  try {
    const applicationId = `APP_${Date.now()}`;
    const submittedAt = new Date().toLocaleString(
      locale === "ar" ? "ar-SA" : "en-US"
    );

    // Prepare email content
    const hrEmail = "Info@melco-ltd.com"; // HR email address

    const emailSubject =
      locale === "ar"
        ? `طلب توظيف - ${formData.fullName} - ${applicationId}`
        : `Career Application - ${formData.fullName} - ${applicationId}`;

    const emailBody =
      locale === "ar"
        ? `السادة فريق التوظيف في ميلكو المحترمين،

أتقدم بهذا الطلب للانضمام إلى فريقكم المميز.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
معلومات الطلب
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
رقم الطلب: ${applicationId}
تاريخ التقديم: ${submittedAt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
المعلومات الشخصية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
الاسم الكامل: ${formData.fullName}
البريد الإلكتروني: ${formData.email}
رقم الهاتف: ${formData.phone}
${formData.linkedin ? `لينكد إن: ${formData.linkedin}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
المعلومات المهنية
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${
  formData.currentPosition
    ? `الوظيفة الحالية: ${formData.currentPosition}`
    : "الوظيفة الحالية: غير محدد"
}
${
  formData.yearsOfExperience
    ? `سنوات الخبرة: ${formData.yearsOfExperience}`
    : "سنوات الخبرة: غير محدد"
}
${
  formData.education
    ? `المؤهل التعليمي: ${formData.education}`
    : "المؤهل التعليمي: غير محدد"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
خطاب التقديم
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.coverLetter || "لم يتم إرفاق خطاب تقديم"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ ملاحظة هامة: يرجى إرفاق سيرتك الذاتية (CV/Resume) قبل إرسال هذا البريد.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

مع أطيب التحيات،
${formData.fullName}`
        : `Dear MELCO Hiring Team,

I am submitting my application to join your esteemed team.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPLICATION INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Application ID: ${applicationId}
Submitted At: ${submittedAt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.linkedin ? `LinkedIn: ${formData.linkedin}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROFESSIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${
  formData.currentPosition
    ? `Current Position: ${formData.currentPosition}`
    : "Current Position: Not specified"
}
${
  formData.yearsOfExperience
    ? `Years of Experience: ${formData.yearsOfExperience}`
    : "Years of Experience: Not specified"
}
${
  formData.education
    ? `Education: ${formData.education}`
    : "Education: Not specified"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COVER LETTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.coverLetter || "No cover letter provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ IMPORTANT: Please attach your CV/Resume file before sending this email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
${formData.fullName}`;

    // Create mailto link
    const mailtoLink = `mailto:${hrEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open mailto link
    if (typeof window !== "undefined") {
      window.location.href = mailtoLink;
    }

    return {
      success: true,
      message: "Email client opened successfully",
      applicationId,
    };
  } catch (error) {
    console.error("Career Application Error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: `Failed to open email client: ${error.message}`,
      };
    } else {
      return {
        success: false,
        message: "Failed to open email client. Please try again.",
      };
    }
  }
};
