# Functional Requirements Document (FRD) for Melco Website

## 1. System Overview

A bilingual (Arabic/English) corporate website for Melco (ميلكو), a Saudi safety equipment company, built with Next.js 15.5.2 featuring advanced internationalization, custom theming, and professional design optimized for B2B safety equipment market.

## 2. Technical Stack

- **Framework:** Next.js 15.5.2 with App Router
- **Styling:** Tailwind CSS 4 with custom scrollbar styling
- **Language Support:** next-intl 4.3.7 for advanced internationalization
- **Typography:** Inter (English) + Tajawal (Arabic) Google Fonts
- **Theme:** Custom dark/light mode with elegant theme switcher
- **Components:** Modern React components with TypeScript
- **Performance:** Optimized with next/image and dynamic imports

## 3. Advanced Features

### 3.1 Multilingual Excellence

- **Complete bilingual support:** Arabic (RTL) and English (LTR)
- **Advanced routing:** `/[locale]/` structure with automatic locale detection
- **Cultural adaptation:** Language-specific fonts and layouts
- **RTL optimization:** Fixed spacing issues with gap utilities
- **Translation management:** Comprehensive JSON-based translation system

### 3.2 Professional Theme System

- **Elegant theme switcher:** Desktop dual-button + mobile single-button design
- **Dark blue accents:** Consistent blue-800 color scheme for active states
- **Custom moon icon:** Dark blue moon with indicator dots
- **Persistent preferences:** localStorage with system detection fallback
- **Smooth animations:** 300ms transitions with pulse and bounce effects

### 3.3 Enhanced Navigation

- **Professional header:** Increased height (80px) with better logo spacing
- **Active link styling:** Dark blue borders and text for current page
- **Mobile optimization:** Responsive hamburger menu
- **Sticky navigation:** Backdrop blur with transparency
- **Locale-aware routing:** All links include current language prefix

### 3.4 Custom Scrollbar Design

- **Theme-aware scrollbars:** Light/dark mode automatic switching
- **Professional styling:** Gray color palette matching app design
- **Cross-browser support:** Webkit and Firefox optimized
- **Thin scrollbar utility:** Optional `.scrollbar-thin` class for containers
- **Smooth hover effects:** Enhanced user experience

## 4. Homepage Excellence

### 4.1 Cinematic Hero Section

- **Full-screen video background:** safe.mp4 with dark overlay
- **Compelling messaging:**
  - English: "Your Safety Partner at Work"
  - Arabic: "شريك السلامة في العمل"
- **Professional CTA:** Animated button with hover effects
- **Responsive design:** Adapts seamlessly across all devices

### 4.2 Premium Brand Showcase

- **Professional partner display:** 5 leading manufacturers (3M, Safety Jogger, MSA, BW Technologies, Ansell)
- **Dark mode excellence:** White/transparent cards with elegant shadows
- **Interactive effects:** Group hover animations with logo scaling
- **Brand authenticity:** Original colors preserved across themes
- **Premium glass effect:** Semi-transparent backgrounds in dark mode

### 4.3 Company Profile Integration

- **Direct PDF download:** melco-profile.pdf with professional styling
- **Compelling design:** Gradient background with document icon
- **Call-to-action optimization:** Download button with smooth animations

### 4.4 About Us Section

- **Professional statistics:** 15+ years experience, 500+ clients
- **Engaging content:** Two-paragraph company story
- **Activity showcase:** Grid gallery using company images
- **Strategic CTA:** Link to detailed about page

### 4.5 Location Intelligence

- **Interactive Google Maps:** Embedded Saudi Arabia map
- **Contact information cards:** Address, phone, email with icons
- **Business hours:** Professional schedule display
- **Responsive layout:** Side-by-side desktop, stacked mobile

## 5. Page Architecture

### 5.1 Enhanced About Page

- **Vision and mission:** Professional presentation
- **Company values:** Structured content display
- **Achievement highlights:** Key milestones and accomplishments

### 5.2 Advanced Product Catalog

- **8 Product categories:**
  - Head Protection (حماية الرأس)
  - Eye and Face Protection (حماية العين والوجه)
  - Hearing Protection (حماية السمع)
  - Respiratory Protection (حماية التنفس)
  - Hand Protection (حماية اليدين)
  - Body Protection (حماية الجسم)
  - Foot Protection (حماية القدم)
  - Gas Detectors (كاشفات الغاز)
- **Dynamic product pages:** [id] routing for individual products
- **Professional layouts:** Grid systems with responsive design

### 5.3 Corporate Governance

- **Board of Directors:** Leadership profiles and structure
- **Governance Framework:** Policies and compliance information
- **Professional presentation:** Structured content display

### 5.4 News & Communications

- **News grid layout:** Article previews with filtering
- **Individual article pages:** [id] routing for detailed content
- **Social sharing:** Integrated sharing functionality

### 5.5 Career Opportunities

- **Job listings:** Available positions with descriptions
- **Company benefits:** Healthcare, training, growth opportunities
- **Application process:** Clear instructions and contact information

### 5.6 Enhanced Contact System

- **Professional contact form:** Name, email, subject, message fields
- **Location integration:** Interactive map with business information
- **Multiple contact methods:** Phone, email, physical address
- **Social media links:** Professional icon set with hover effects

## 6. Footer Excellence

### 6.1 Comprehensive Footer Design

- **Always white logo:** Consistent branding in footer
- **Bilingual content:** Complete Arabic/English support
- **Four-column layout:** Company info, quick links, products, contact
- **Social media integration:** Facebook, Twitter, LinkedIn with hover effects
- **Legal links:** Privacy policy and terms & conditions

## 7. Technical Excellence

### 7.1 Performance Optimization

- **Next.js Image component:** Automatic optimization and lazy loading
- **Font optimization:** next/font with display: swap
- **Code splitting:** Automatic and manual optimizations
- **Static generation:** Optimized build output

### 7.2 SEO & Accessibility

- **Meta tags:** Complete optimization for both languages
- **Semantic HTML:** Proper heading hierarchy and structure
- **Alt text:** Comprehensive image descriptions
- **ARIA labels:** Accessibility compliance

### 7.3 Responsive Design Excellence

- **Mobile-first approach:** Optimized for all screen sizes
- **Breakpoint strategy:**
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
  - Large: > 1280px
- **Touch optimization:** Mobile-friendly interactions

## 8. Quality Assurance

### 8.1 Cross-Browser Compatibility

- **Modern browsers:** Chrome, Firefox, Safari, Edge
- **Responsive testing:** All device sizes and orientations
- **RTL/LTR validation:** Proper layout in both directions

### 8.2 Performance Metrics

- **Loading optimization:** Fast initial page load
- **Image optimization:** WebP/AVIF format support
- **Bundle optimization:** Tree shaking and code splitting

## 9. Implementation Status

### ✅ **Completed Features**

- [x] Complete bilingual Next.js setup with next-intl
- [x] Professional theme system with dark blue accents
- [x] Enhanced header with proper logo spacing
- [x] Custom scrollbar design matching app theme
- [x] Cinematic homepage with video background
- [x] Premium brand showcase with dark mode excellence
- [x] About Us section with statistics and gallery
- [x] Location section with interactive map
- [x] Company profile download integration
- [x] All core pages (About, Products, Board, Governance, News, Careers, Contact)
- [x] Dynamic routing for products and news
- [x] Professional footer with bilingual support
- [x] Navigation with active link styling
- [x] RTL/LTR layout optimizations
- [x] Typography system with custom fonts

### 🎯 **Production Ready**

The Melco website is now a production-ready, professional B2B platform that effectively showcases the company's safety equipment expertise while providing an exceptional user experience across all devices and languages.
