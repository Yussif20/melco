# 🚀 MELCO EmailJS Setup Instructions

Your EmailJS public key is already configured: `lmHq1sFXU1zg6kb7g`

## 📧 Step-by-Step Setup

### 1. Login to EmailJS Dashboard

- Go to [https://dashboard.emailjs.com/admin](https://dashboard.emailjs.com/admin)
- Login with your EmailJS account

### 2. Create Email Service

1. Click **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** (example: `service_abc123`)

### 3. Create Email Template

1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. **Copy and paste the entire content** from `email-template.html` into the template editor
4. **Copy the Template ID** (example: `template_xyz456`)

### 4. Update Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Replace with your actual Service ID from step 2
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123

# Replace with your actual Template ID from step 3
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz456
```

### 5. Test the Integration

1. **Start your development server:**

   ```bash
   npm run dev
   ```

2. **Test the cart modal:**

   - Add some products to cart
   - Open cart modal
   - Fill out the inquiry form
   - Submit the form

3. **Check your email** for the inquiry notification

## 🔧 Current Configuration

### Files Updated:

- ✅ **CartModal.tsx** - Now uses EmailJS instead of API
- ✅ **lib/emailjs.ts** - EmailJS integration module
- ✅ **email-template.html** - Professional email template
- ✅ **Public Key** - Already configured: `lmHq1sFXU1zg6kb7g`

### What You Need to Get:

- 📧 **Service ID** from EmailJS dashboard
- 📄 **Template ID** from EmailJS dashboard

## 🎯 Template Variables

Your email template will automatically receive these variables:

| Variable         | Description         | Example                      |
| ---------------- | ------------------- | ---------------------------- |
| `{{name}}`       | Customer name       | "Ahmed Al-Rashid"            |
| `{{email}}`      | Customer email      | "ahmed@company.com"          |
| `{{phone}}`      | Customer phone      | "+966501234567"              |
| `{{message}}`    | Customer message    | "Need bulk pricing"          |
| `{{cart}}`       | Array of cart items | Product list with quantities |
| `{{totalItems}}` | Total quantity      | 15                           |
| `{{inquiryId}}`  | Unique ID           | "INQ_1726932123456"          |
| `{{locale}}`     | Language            | "en" or "ar"                 |

## 🐛 Troubleshooting

### Common Issues:

1. **Email not sending:**

   - Check Service ID and Template ID are correct
   - Verify email service is properly configured
   - Check browser console for error messages

2. **Template variables not showing:**

   - Ensure you copied the exact HTML template
   - Check variable names match exactly (case-sensitive)

3. **CORS errors:**
   - EmailJS should work from localhost and production
   - No additional CORS setup needed

### Debug Mode:

Check the browser console for these messages:

- ✅ "Sending email via EmailJS..."
- ✅ "EmailJS Success:"
- ❌ "EmailJS Error:"

## 📱 Mobile Testing

The cart modal and EmailJS integration work on:

- ✅ Desktop browsers
- ✅ Mobile browsers
- ✅ Both English and Arabic

## 🔒 Security Notes

- ✅ Public key is safe to expose in frontend code
- ✅ Service ID and Template ID are also safe to expose
- ✅ No sensitive data is exposed
- ✅ EmailJS handles all email sending securely

## 🎉 Next Steps

1. **Get your Service ID and Template ID** from EmailJS dashboard
2. **Update `.env.local`** with your IDs
3. **Test the form** with a real submission
4. **Verify emails are received** properly formatted
5. **Deploy to production** (environment variables will work automatically)

Your cart modal is now fully integrated with EmailJS! 🚀
