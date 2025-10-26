# Assets Guide for MELCO Website

## ✅ Completed

- [x] **site.webmanifest** - Created with proper configuration
- [x] **icon.svg** - Created temporary SVG icon (blue shield with checkmark)
- [x] **Metadata** - Updated with new tagline and correct URLs

## 🎨 Assets Needed

### 1. Open Graph Image (Priority: HIGH)

**File:** `public/og-image.png`
**Dimensions:** 1200 x 630 pixels
**Format:** PNG (recommended) or JPG
**Content:** Should include:

- MELCO logo
- Tagline: "Driven by Quality, Defined by Trust" (English)
- "مدفوعون بالجودة، محددون بالثقة" (Arabic)
- Professional background with safety equipment theme
- Company colors (blue #1e40af as primary)

**Usage:** Social media sharing (Facebook, LinkedIn, Twitter, WhatsApp)

---

### 2. Favicon Files

#### a. favicon.ico

**File:** `public/favicon.ico`
**Dimensions:** 32x32 pixels (multi-size recommended: 16x16, 32x32, 48x48)
**Format:** ICO
**Content:** MELCO logo or simplified brand icon

#### b. Apple Touch Icon

**File:** `public/apple-touch-icon.png`
**Dimensions:** 180 x 180 pixels
**Format:** PNG
**Content:** MELCO logo with padding (leave ~10% margin on each side)

#### c. Android/Web App Icons

**Files:**

- `public/icon-192.png` (192 x 192 pixels)
- `public/icon-512.png` (512 x 512 pixels)

**Format:** PNG with transparency
**Content:** MELCO logo centered with padding

---

### 3. Optional but Recommended

#### Structured Data

Consider adding JSON-LD schema to the layout for better SEO:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MELCO - Master Equipment",
  "alternateName": "ميلكو",
  "url": "https://www.masterequiment.com",
  "logo": "https://www.masterequiment.com/logo.png",
  "description": "Driven by Quality, Defined by Trust",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C46Q+W5R, Al Khalidiya Al Shamaliya",
    "addressLocality": "Dammam",
    "postalCode": "32232",
    "addressCountry": "SA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+966556262138",
    "contactType": "customer service",
    "areaServed": "SA",
    "availableLanguage": ["Arabic", "English"]
  }
}
```

---

## 🛠️ Tools for Creating Assets

### Online Tools (Free):

1. **Canva** - https://www.canva.com

   - Templates for OG images
   - Easy drag-and-drop interface

2. **Figma** - https://www.figma.com

   - Professional design tool
   - Export at exact dimensions

3. **RealFaviconGenerator** - https://realfavicongenerator.net

   - Upload logo, generates all favicon formats
   - Includes web manifest

4. **Favicon.io** - https://favicon.io
   - Quick favicon generator
   - Text to icon option

### AI Tools:

- **ChatGPT/DALL-E** - Generate OG image design
- **Midjourney** - Professional imagery

---

## 📝 Current Temporary Icon

A temporary blue shield icon with a checkmark is being used (`icon.svg`).
**This should be replaced with your actual brand logo/icon.**

---

## ✨ Next Steps

1. Create/upload **og-image.png** (1200x630) - Most important!
2. Create/upload favicon files (ico, png)
3. Optionally add structured data for enhanced SEO
4. Test on social media platforms (Facebook Sharing Debugger, Twitter Card Validator)

---

## 🧪 Testing Your Assets

After adding images, test them:

1. **Open Graph**: https://www.opengraph.xyz
2. **Twitter Cards**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: Share your URL and check preview
4. **Favicons**: Check in different browsers and devices

---

**Note:** The metadata is already configured and ready. Once you add the image files to the `public` folder, they will automatically work!
