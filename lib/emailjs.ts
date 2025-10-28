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

// Career Application Email Function
export interface CareerApplicationParams {
  fullName: string;
  email: string;
  phone: string;
  currentPosition: string;
  yearsOfExperience: string;
  education: string;
  linkedin: string;
  coverLetter: string;
  cvFileName: string;
  cvFileData: string;
  applicationId: string;
  submittedAt: string;
}

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
  cvFile: File,
  locale: string
): Promise<{
  success: boolean;
  message: string;
  applicationId?: string;
}> => {
  try {
    // Validate required configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.careerTemplateId) {
      throw new Error("EmailJS configuration is incomplete.");
    }
    if (!EMAILJS_CONFIG.publicKey) {
      throw new Error("EmailJS Public Key is missing.");
    }

    // Re-initialize EmailJS to ensure it's ready
    if (typeof window !== "undefined") {
      emailjs.init(EMAILJS_CONFIG.publicKey);
    }

    const applicationId = `APP_${Date.now()}`;
    const submittedAt = new Date().toLocaleString(
      locale === "ar" ? "ar-SA" : "en-US"
    );

    // Convert file to base64
    const cvFileData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(cvFile);
    });

    const templateParams: CareerApplicationParams = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      currentPosition: formData.currentPosition || "Not specified",
      yearsOfExperience: formData.yearsOfExperience || "Not specified",
      education: formData.education || "Not specified",
      linkedin: formData.linkedin || "Not provided",
      coverLetter: formData.coverLetter || "No cover letter provided",
      cvFileName: cvFile.name,
      cvFileData: cvFileData,
      applicationId,
      submittedAt,
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.careerTemplateId,
      templateParams as unknown as Record<string, unknown>,
      EMAILJS_CONFIG.publicKey
    );

    if (result.status === 200) {
      return {
        success: true,
        message: "Application submitted successfully",
        applicationId,
      };
    } else {
      throw new Error(
        `EmailJS returned status: ${result.status} - ${
          result.text || "Unknown error"
        }`
      );
    }
  } catch (error) {
    console.error("Career Application EmailJS Error:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: `Failed to submit application: ${error.message}`,
      };
    } else {
      return {
        success: false,
        message: "Failed to submit application. Please try again.",
      };
    }
  }
};
