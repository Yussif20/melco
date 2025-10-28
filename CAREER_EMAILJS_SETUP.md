# EmailJS Career Application Setup Guide

## Overview

The careers page now shows a professional application form that collects candidate information and CV, then sends everything via EmailJS to your company email.

## What You Need to Do

### 1. Create a New EmailJS Template

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Log in with your account
3. Go to **Email Templates** section
4. Click **Create New Template**

### 2. Template Configuration

**Template Name:** Career Application Form

**Subject:** New Career Application - {{fullName}}

**Content (Email Body):**

```
New Career Application Received

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPLICATION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Application ID: {{applicationId}}
Submitted At: {{submittedAt}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full Name: {{fullName}}
Email: {{email}}
Phone: {{phone}}
LinkedIn: {{linkedin}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROFESSIONAL INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Position: {{currentPosition}}
Years of Experience: {{yearsOfExperience}}
Education: {{education}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COVER LETTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{{coverLetter}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CV/RESUME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File Name: {{cvFileName}}
File is attached to this email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This application was submitted through the MELCO Careers page.
Please review and respond to the candidate as soon as possible.

Best regards,
MELCO Career Portal
```

### 3. Important: Enable File Attachments

⚠️ **CRITICAL STEP:**

1. In the template editor, look for the **Attachments** section
2. Click **Add Dynamic Attachment**
3. Configure:
   - **File Content:** `{{cvFileData}}`
   - **File Name:** `{{cvFileName}}`
   - **Encoding:** `base64`

This will ensure the CV file is attached to the email.

### 4. Template Variables to Include

Make sure these variables are in your template:

- `{{applicationId}}` - Unique application ID
- `{{submittedAt}}` - Submission timestamp
- `{{fullName}}` - Candidate's full name
- `{{email}}` - Candidate's email
- `{{phone}}` - Candidate's phone number
- `{{linkedin}}` - LinkedIn profile (optional)
- `{{currentPosition}}` - Current job title
- `{{yearsOfExperience}}` - Years of experience
- `{{education}}` - Educational background
- `{{coverLetter}}` - Cover letter text
- `{{cvFileName}}` - Name of the CV file
- `{{cvFileData}}` - CV file data (base64)

### 5. Save the Template

1. Click **Save** after configuring
2. Copy the **Template ID** (it looks like: `template_xxxxxxx`)
3. Update your `.env.local` file:

```bash
NEXT_PUBLIC_EMAILJS_CAREER_TEMPLATE_ID=template_xxxxxxx
```

Replace `template_xxxxxxx` with your actual template ID.

### 6. Test the Form

1. Restart your development server
2. Go to the Careers page
3. Fill out the form with test data
4. Upload a sample CV/PDF
5. Submit the form
6. Check your email inbox (the one configured in EmailJS)

## Email Settings in EmailJS

### Recipient Email

Make sure your EmailJS service is configured to send emails to:

- Your company HR email
- Or the email specified in your EmailJS service settings

### Service Configuration

1. Go to **Email Services** in EmailJS
2. Make sure your service (service_9ntu5hh) is active
3. Verify the "To Email" is set correctly

## File Size Limits

- Maximum CV file size: **5 MB**
- Allowed formats: **PDF, DOC, DOCX**
- Files are converted to base64 and attached to emails

## Troubleshooting

### Form doesn't submit

- Check browser console for errors
- Verify all environment variables are set correctly
- Make sure EmailJS service and template IDs are correct

### Email not received

- Check spam/junk folder
- Verify EmailJS service is active
- Check EmailJS dashboard for delivery logs
- Ensure template has dynamic attachment configured

### File not attached

- Make sure you added the dynamic attachment in the template
- Verify the attachment settings use `{{cvFileData}}` and `{{cvFileName}}`
- Check file size is under 5MB

## Current Form Fields

**Required Fields:**

- Full Name
- Email Address
- Phone Number
- CV/Resume Upload

**Optional Fields:**

- LinkedIn Profile
- Current Position
- Years of Experience
- Education
- Cover Letter

## Auto-reply (Optional)

You can also create an auto-reply template to send confirmation emails to applicants:

1. Create another template for applicants
2. Subject: "Application Received - MELCO Careers"
3. Send to: `{{email}}` (the applicant's email)
4. Thank them and let them know you'll be in touch

---

## Summary

✅ Created career application form with professional UI
✅ Form collects all necessary information
✅ CV upload with validation (5MB, PDF/DOC/DOCX only)
✅ Bilingual support (English/Arabic)
✅ EmailJS integration ready

**Next Step:** Create the EmailJS template and add the template ID to your .env.local file!
