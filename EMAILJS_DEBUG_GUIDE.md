# 🔧 EmailJS Error Debugging Guide

## 🚨 **Current Issue Analysis**

You're seeing an empty EmailJS error `{}`, which typically indicates one of these issues:

### 🔍 **Common Causes & Solutions:**

## 1. **EmailJS Service/Template Configuration**

### ✅ **Check EmailJS Dashboard:**

1. Go to https://dashboard.emailjs.com/admin
2. Verify your **Email Service** (`service_9ntu5hh`) is:

   - ✅ **Active** and not disabled
   - ✅ **Properly connected** to your email provider
   - ✅ **Test connection** passes

3. Verify your **Email Template** (`template_d1lsszp`) is:
   - ✅ **Published** (not in draft mode)
   - ✅ **Contains the correct template variables**
   - ✅ **Subject line is set**

## 2. **Template Variables Issue**

### 🔧 **Test Your Template:**

The cart modal sends these variables - make sure your template uses them:

```
{{name}} - Customer name
{{email}} - Customer email
{{phone}} - Customer phone
{{message}} - Customer message
{{cart}} - Array of products (for loops)
{{totalItems}} - Total quantity
{{inquiryId}} - Unique ID
{{locale}} - Language (en/ar)
```

### ⚠️ **Common Template Mistakes:**

- Missing `{{#cart}}...{{/cart}}` loop for products
- Typos in variable names (case-sensitive)
- Missing required variables in template

## 3. **CORS/Browser Issues**

### 🌐 **Test in Different Environments:**

```bash
# Test in development
npm run dev

# Test in production build
npm run build && npm start
```

## 4. **EmailJS Account Limits**

### 📧 **Check Your Account:**

- **Free Plan**: 200 emails/month
- **Rate Limiting**: Max emails per minute
- **Account Status**: Verify account is active

## 🔬 **Enhanced Debugging Added**

I've added comprehensive debugging to help identify the issue:

### **New Debug Output:**

When you submit the form, check the browser console for:

```
🔍 Testing EmailJS Configuration: {
  publicKey: "lmHq1sFXU1zg6kb7g",
  serviceId: "service_9ntu5hh",
  templateId: "template_d1lsszp",
  environment: "browser",
  emailjsAvailable: true
}

🔄 Sending email via EmailJS... {
  templateParamsKeys: [...array of data being sent]
}
```

### **Error Details:**

If it fails, you'll now see:

```
❌ EmailJS Error Details: {
  error: {...detailed error object},
  errorMessage: "specific error description",
  config: {...current configuration}
}
```

## 🧪 **Step-by-Step Testing**

### **1. Test Your EmailJS Setup Manually:**

Go to https://dashboard.emailjs.com/admin/templates/{your_template_id}/test

Test with these values:

```
name: Test User
email: test@example.com
phone: +1234567890
message: Test message
cart: [{"name":"Test Product","category":"Test","quantity":1}]
totalItems: 1
inquiryId: TEST_123
locale: en
```

### **2. Test in Your Application:**

1. **Start dev server:** `npm run dev`
2. **Open browser console** (F12)
3. **Add products to cart**
4. **Submit inquiry form**
5. **Check console output** for detailed error info

### **3. Common Solutions:**

#### **If Service ID Error:**

- Double-check service ID in EmailJS dashboard
- Ensure email service is connected and active

#### **If Template ID Error:**

- Verify template is published (not draft)
- Check template ID spelling

#### **If CORS Error:**

- Try clearing browser cache
- Test in incognito/private mode
- Verify public key is correct

#### **If Account Limit Error:**

- Check EmailJS dashboard for usage limits
- Verify account is in good standing

## 🔧 **Quick Fixes to Try:**

### **1. Restart Development Server:**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### **2. Clear Browser Cache:**

- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private mode

### **3. Test EmailJS Template Directly:**

Visit: https://dashboard.emailjs.com/admin/templates/template_d1lsszp/test

### **4. Verify Environment Variables:**

Check that `.env.local` contains:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_9ntu5hh
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_d1lsszp
```

## 📱 **Test the Form Now:**

1. **Start development server:** `npm run dev`
2. **Open http://localhost:3000**
3. **Navigate to any product page**
4. **Add products to cart**
5. **Open cart modal and submit inquiry**
6. **Check browser console for detailed debug information**

The enhanced debugging will now show you exactly what's happening and where the issue is occurring! 🕵️‍♂️
