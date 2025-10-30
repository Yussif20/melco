# News Images Guide

## Image Structure for News Articles

Each news article can have:

1. **Cover Image** (Required): Main thumbnail/header image
2. **Gallery Images** (Optional): Additional images shown in the article

## Safety Jogger Partnership News - Required Images

Please add the following images to the `public/news/` directory:

### 1. Cover Image

- **Path**: `/public/news/safety-jogger-partnership-cover.jpg`
- **Purpose**: Main cover image for the news card and article header
- **Recommended Size**: 1200x630px (16:9 ratio)
- **Content Suggestion**:
  - MELCO and Safety Jogger Works logos together
  - Or professional image of Safety Jogger products
  - Or partnership handshake/signing ceremony photo

### 2. Gallery Images

#### Image 1

- **Path**: `/public/news/safety-jogger-partnership-1.jpg`
- **Recommended Size**: 1200x800px (3:2 ratio)
- **Content Suggestion**:
  - Safety Jogger footwear products showcase
  - Or workers wearing Safety Jogger boots in industrial setting

#### Image 2

- **Path**: `/public/news/safety-jogger-partnership-2.jpg`
- **Recommended Size**: 1200x800px (3:2 ratio)
- **Content Suggestion**:
  - Partnership signing ceremony or meeting
  - Or Safety Jogger products in warehouse/display

#### Image 3

- **Path**: `/public/news/safety-jogger-partnership-3.jpg`
- **Recommended Size**: 1200x800px (3:2 ratio)
- **Content Suggestion**:
  - Industrial workers in oil & gas or construction sector
  - Or Safety Jogger product details/certifications

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution (optimized for web)
- **Optimization**: Use tools like TinyPNG or Squoosh to compress
- **Max File Size**: 500KB per image (recommended)

## Future News Articles

To add new news articles, follow this structure in `data/newsData.ts`:

```typescript
{
  id: 4, // Increment ID
  translations: {
    en: {
      title: "Your English Title",
      description: "Short English description",
      category: "Category Name", // e.g., "Partnership", "Company News", "Certification"
      content: {
        intro: "Introduction paragraph in English",
        details: [
          "Detail point 1",
          "Detail point 2",
          "Detail point 3",
        ],
        quote: { // Optional
          text: "Quote text",
          author: "Person Name",
          position: "Their Position"
        }
      }
    },
    ar: {
      title: "العنوان بالعربية",
      description: "وصف قصير بالعربية",
      category: "اسم الفئة",
      content: {
        intro: "فقرة المقدمة بالعربية",
        details: [
          "النقطة الأولى",
          "النقطة الثانية",
          "النقطة الثالثة",
        ],
        quote: { // اختياري
          text: "نص الاقتباس",
          author: "اسم الشخص",
          position: "منصبه"
        }
      }
    }
  },
  date: "2025-10-30", // Format: YYYY-MM-DD
  image: "/news/your-cover-image.jpg", // Required
  images: [ // Optional - for image gallery
    "/news/your-image-1.jpg",
    "/news/your-image-2.jpg",
    "/news/your-image-3.jpg",
  ],
  featured: true, // Optional - shows as featured on homepage
  slug: "url-friendly-slug", // Optional - for SEO-friendly URLs
}
```

## Image Naming Convention

Use descriptive, lowercase names with hyphens:

- ✅ Good: `safety-jogger-partnership-cover.jpg`
- ✅ Good: `new-facility-opening-2025.jpg`
- ❌ Bad: `IMG_1234.jpg`
- ❌ Bad: `photo 1.jpg`

## Tips

1. Always optimize images before uploading
2. Use descriptive alt text in your image names
3. Keep cover images consistent in ratio (16:9 or 3:2)
4. Gallery images can have more variety but maintain quality
5. Consider dark mode - avoid pure white backgrounds if possible
