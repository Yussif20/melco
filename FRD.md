# Functional Requirements Document (FRD) for Melco Website

## 1. System Overview

A bilingual (Arabic/English) corporate website for Melco (ميلكو), a Saudi safety equipment company, built with Next.js and focusing on high SEO performance and responsive design.

## 2. Technical Stack

- **Framework:** Next.js (Latest version)
- **Styling:** Tailwind CSS
- **Language Support:** Next-i18next
- **Theme:** Dark/Light mode using next-themes
- **SEO:** Next.js built-in SEO capabilities + next-sitemap

## 3. Core Features

### 3.1 Multilingual Support

- Complete Arabic and English versions
- RTL support for Arabic
- Language switcher component
- URL structure: `/ar/*` for Arabic, `/en/*` for English

### 3.2 Theme Support

- Light/Dark mode toggle
- Persistent theme preference
- System theme detection
- Main brand color (gray-800) integration

### 3.3 Navigation

- Responsive navigation bar
- Mobile hamburger menu
- Breadcrumbs for improved navigation
- Footer with social media links and essential information

## 4. Page Structure

### 4.1 Homepage

- Hero section with company vision
- Featured products section
- Quick access to key sections
- Latest news section
- Contact CTA

### 4.2 About Us (من نحن)

- Company overview
- Vision and mission statements
- Company values
- Key achievements

### 4.3 Products (المنتجات)

- Categorized product display:
  - Head Protection
  - Eye and Face Protection
  - Hearing Protection
  - Respiratory Protection
  - Hand Protection
  - Body Protection
  - Foot Protection
  - Gas Detectors
- Search functionality
- Product filtering system
- Individual product pages with detailed information

### 4.4 Board of Directors (مجلس الادارة)

- Board members profiles
- Organizational structure
- Leadership team information

### 4.5 Governance (الحوكمة)

- Corporate governance framework
- Policies and procedures
- Compliance information

### 4.6 News (الأخبار)

- News grid layout
- Article pages
- News filtering/categorization
- Share functionality

### 4.7 Contact Us (تواصل معنا)

- Contact form with:
  - Name
  - Email
  - Subject
  - Message
- Location map
- Direct contact information
- Social media links

## 5. Technical Requirements

### 5.1 SEO Implementation

- Meta tags optimization
- Structured data
- XML sitemap
- Robots.txt
- Open Graph tags
- Twitter cards

### 5.2 Performance Optimization

- Image optimization using next/image
- Code splitting
- Lazy loading
- Static page generation where possible
- Dynamic imports for heavy components

### 5.3 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
  - Large Desktop: > 1280px

### 5.4 Security

- Form validation
- CSRF protection
- Rate limiting for contact form
- Security headers

## 6. Development Phases

- **Phase 1:** Setup and Structure

  - Project initialization
  - Environment setup
  - Routing structure
  - Multilingual setup
  - Theme implementation

- **Phase 2:** Core Components

  - Layout components
  - Navigation
  - Footer
  - Common UI components

- **Phase 3:** Page Development

  - Homepage
  - About Us
  - Products section with search
  - Other content pages

- **Phase 4:** Features and Integration

  - Contact form
  - Social media links
  - SEO implementation
  - Performance optimization

- **Phase 5:** Testing and Deployment
  - Cross-browser testing
  - Responsive design testing
  - Performance testing
  - Deployment
