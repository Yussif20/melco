# EmailJS Integration Guide for MELCO Cart Modal

## 📧 Email Template Setup

The HTML email template (`email-template.html`) is designed to work seamlessly with your cart modal data structure. Here's how to implement it:

## 🔧 EmailJS Configuration

### 1. EmailJS Service Setup

1. Go to [EmailJS Dashboard](https://www.emailjs.com/)
2. Create a new email service (Gmail, Outlook, etc.)
3. Create a new email template
4. Copy the content from `email-template.html` into the template editor

### 2. Template Variables Mapping

Your cart modal sends the following data structure to EmailJS:

```javascript
const templateParams = {
  // Customer Information
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  message: formData.message,
  acceptTerms: formData.acceptTerms,

  // Cart Data
  cart: cart.items, // Array of {id, name, category, image, quantity}
  totalItems: cart.totalItems,
  uniqueProducts: cart.items.length,

  // System Information
  inquiryId: `INQ_${Date.now()}`,
  locale: locale,
  submittedAt: new Date().toLocaleString(),
  userAgent: navigator.userAgent,
  retryCount: retryCount,
  apiResponse: JSON.stringify(apiResponse),
};
```

### 3. Template Variable Names

Make sure your EmailJS template uses these exact variable names:

| Variable Name        | Description               | Example                                  |
| -------------------- | ------------------------- | ---------------------------------------- |
| `{{name}}`           | Customer's full name      | "Ahmed Al-Rashid"                        |
| `{{email}}`          | Customer's email          | "ahmed@company.com"                      |
| `{{phone}}`          | Customer's phone          | "+966501234567"                          |
| `{{message}}`        | Customer's message        | "Need bulk pricing for safety equipment" |
| `{{acceptTerms}}`    | Terms acceptance          | true/false                               |
| `{{cart}}`           | Array of cart items       | See cart structure below                 |
| `{{totalItems}}`     | Total quantity of items   | 15                                       |
| `{{uniqueProducts}}` | Number of unique products | 5                                        |
| `{{inquiryId}}`      | Unique inquiry ID         | "INQ_1726932123456"                      |
| `{{locale}}`         | Language preference       | "en" or "ar"                             |
| `{{submittedAt}}`    | Submission timestamp      | "9/21/2025, 3:30:45 PM"                  |
| `{{userAgent}}`      | Browser information       | "Mozilla/5.0..."                         |
| `{{retryCount}}`     | Number of retry attempts  | 0                                        |
| `{{apiResponse}}`    | API response details      | JSON string                              |

### 4. Cart Array Structure

Each item in the `{{cart}}` array contains:

```javascript
{
  id: "product-123",           // {{id}}
  name: "Safety Helmet XL",    // {{name}}
  category: "Head Protection", // {{category}}
  image: "/images/helmet.jpg", // {{image}}
  quantity: 3                  // {{quantity}}
}
```

## 🔗 Implementation in Cart Modal

### Option 1: Replace API Endpoint with EmailJS

Update your cart modal to use EmailJS instead of a custom API:

```typescript
// In your CartModal component
import emailjs from "@emailjs/browser";

const handleSubmitInquiry = async () => {
  if (!validateForm()) return;

  try {
    setIsSubmitting(true);
    setSubmitError(null);

    const templateParams = {
      // Customer Information
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      acceptTerms: formData.acceptTerms ? "Yes" : "No",

      // Cart Data
      cart: cart.items,
      totalItems: cart.totalItems,
      uniqueProducts: cart.items.length,

      // System Information
      inquiryId: `INQ_${Date.now()}`,
      locale: locale,
      submittedAt: new Date().toLocaleString(),
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : "",
      retryCount: retryCount,

      // Cart items as formatted string for simple templates
      cartItemsList: cart.items
        .map(
          (item) => `${item.name} (${item.category}) - Qty: ${item.quantity}`
        )
        .join("\n"),
    };

    // Send email via EmailJS
    const result = await emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
      templateParams,
      "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
    );

    if (result.status === 200) {
      // Success
      const mockResponse = {
        success: true,
        inquiryId: templateParams.inquiryId,
        message: "Inquiry submitted successfully via email",
        estimatedResponse: "1-2 business days",
      };
      setApiResponse(mockResponse);

      // Navigate to success step
      setAnimationStep("exiting");
      setTimeout(() => {
        setCurrentStep(3);
        setAnimationStep("entering");
        setTimeout(() => setAnimationStep("entered"), 150);
        setRetryCount(0);
      }, 150);

      // Clear cart if configured
      if (clearCartOnSuccess) {
        clearCart();
      }
    }
  } catch (error) {
    console.error("EmailJS Error:", error);
    setSubmitError(
      error instanceof Error ? error.message : "Email sending failed"
    );
    setRetryCount((prev) => prev + 1);

    // Navigate to error step
    setAnimationStep("exiting");
    setTimeout(() => {
      setCurrentStep(4);
      setAnimationStep("entering");
      setTimeout(() => setAnimationStep("entered"), 150);
    }, 150);
  } finally {
    setIsSubmitting(false);
  }
};
```

### Option 2: Use EmailJS alongside existing API

Keep your existing API and add EmailJS as a backup or notification system:

```typescript
// After successful API call
if (apiEndpoint) {
  // Your existing API call code here...

  // Also send notification email via EmailJS
  try {
    await emailjs.send(
      "YOUR_SERVICE_ID",
      "YOUR_TEMPLATE_ID",
      templateParams,
      "YOUR_PUBLIC_KEY"
    );
    console.log("Notification email sent successfully");
  } catch (emailError) {
    console.warn("Email notification failed:", emailError);
    // Don't fail the whole process if email fails
  }
}
```

## 📦 Package Installation

Install EmailJS in your project:

```bash
npm install @emailjs/browser
```

## 🔑 Environment Variables

Create environment variables for your EmailJS credentials:

```env
# .env.local
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Then use them in your component:

```typescript
const result = await emailjs.send(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  templateParams,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
);
```

## 🎨 Template Customization

### Simple Text Template Alternative

If you prefer a simpler text-based template, here's a minimal version:

```
Subject: New Product Inquiry from {{name}}

New inquiry received from MELCO website:

Customer Details:
- Name: {{name}}
- Email: {{email}}
- Phone: {{phone}}
- Language: {{locale}}
- Inquiry ID: {{inquiryId}}

Requested Products:
{{cartItemsList}}

Total Items: {{totalItems}}
Unique Products: {{uniqueProducts}}

Customer Message:
{{message}}

Terms Accepted: {{acceptTerms}}

Submitted: {{submittedAt}}
```

### Arabic Language Support

For Arabic customers, you can create a separate template or use conditional content:

```html
{{#if locale === 'ar'}}
<div dir="rtl" style="text-align: right;">
  <h2>استعلام جديد عن المنتجات</h2>
  <p><strong>الاسم:</strong> {{name}}</p>
  <p><strong>البريد الإلكتروني:</strong> {{email}}</p>
  <!-- Arabic template content -->
</div>
{{else}}
<!-- English template content -->
{{/if}}
```

## 🔍 Testing

1. **Test Template**: Use EmailJS's test feature to verify variable replacement
2. **Test Integration**: Submit a test inquiry from your cart modal
3. **Verify Receipt**: Check that emails are received with correct formatting
4. **Test Error Handling**: Simulate network failures to test retry functionality

## 📋 Checklist

- [ ] EmailJS account created
- [ ] Email service configured (Gmail/Outlook/etc.)
- [ ] Template created with HTML content
- [ ] All template variables mapped correctly
- [ ] Environment variables set
- [ ] EmailJS package installed
- [ ] Integration code implemented
- [ ] Error handling tested
- [ ] Email formatting verified
- [ ] Arabic language support (if needed)

## 🆘 Troubleshooting

### Common Issues:

1. **Template variables not replacing**: Check variable name spelling and case sensitivity
2. **Array not rendering**: Ensure you're using `{{#cart}}...{{/cart}}` for loops
3. **Email not sending**: Verify service ID, template ID, and public key
4. **CORS errors**: Make sure EmailJS public key is correctly configured

### Debug Mode:

Add this to see the exact data being sent:

```typescript
console.log("EmailJS Template Params:", templateParams);
```

This comprehensive setup will ensure your cart modal integrates seamlessly with EmailJS for professional email notifications! 🚀
