# MELCO Safety Equipment Website

A modern, bilingual website for MELCO, a leading provider of safety equipment in Saudi Arabia. Built with Next.js 15, featuring comprehensive product catalogs, internationalization, and professional business pages.

## 🌟 Features

- **Bilingual Support**: Full Arabic and English internationalization using next-intl
- **Modern Design**: Responsive, professional design with dark mode support
- **Product Catalog**: Comprehensive safety equipment catalog with categorized products
- **Business Pages**: About us, governance, board members, careers, news, and contact
- **Interactive Elements**: Contact forms, WhatsApp integration, and smooth animations
- **Performance Optimized**: Built with Next.js 15 and Turbopack for fast development and production builds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Yussif20/melco.git
cd melco-next
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
melco-next/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   │   ├── about/         # About page
│   │   ├── products/      # Product catalog
│   │   ├── contact/       # Contact page
│   │   └── ...           # Other pages
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ContactForm.tsx
│   ├── Navigation.tsx
│   └── ...
├── sections/              # Page sections
│   ├── HeroSection.tsx
│   ├── LocationSection.tsx
│   └── ...
├── data/                  # Static data
│   ├── productsData.js
│   ├── newsData.ts
│   └── ...
├── messages/              # Internationalization
│   ├── en.json           # English translations
│   └── ar.json           # Arabic translations
├── public/                # Static assets
│   ├── products/         # Product images
│   ├── icons/           # UI icons
│   └── ...
└── i18n/                 # i18n configuration
```

## 🛠 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Images**: Next.js Image optimization
- **Development**: Turbopack (Next.js 15)

## 🌍 Internationalization

The website supports both Arabic (RTL) and English (LTR) languages:

- Translation files: `messages/en.json` and `messages/ar.json`
- Automatic RTL/LTR layout switching
- Localized routing: `/en/products` and `/ar/products`
- Font optimization for both languages

## 📱 Pages Overview

### Public Pages

- **Home**: Hero section, company profile, location info
- **About**: Vision, mission, values, company story
- **Products**: Safety equipment catalog with categories
- **Board**: Board of directors and governance
- **Governance**: Corporate governance and compliance
- **News**: Company news and industry updates
- **Careers**: Job listings and application forms
- **Contact**: Contact form and business information

### Product Features

- **Product Categories**: Head, eye, hand, foot, body, respiratory protection, gas detectors
- **Product Details**: Individual product pages with specifications
- **WhatsApp Integration**: Direct contact for inquiries
- **Quote Requests**: Contact forms for pricing

## 🎨 Design Features

- **Professional Theme**: Gray and blue color scheme
- **Dark Mode**: System-based dark mode support
- **Responsive**: Mobile-first responsive design
- **Animations**: Smooth hover effects and transitions
- **Accessibility**: ARIA labels and keyboard navigation

## 🔧 Configuration

### Environment Variables

No environment variables required for basic functionality.

### Customization

- **Colors**: Update Tailwind config for brand colors
- **Content**: Modify translation files for text content
- **Products**: Update `data/productsData.js` for product catalog
- **Styling**: Customize components in `components/` directory

## 📞 Contact Integration

- **WhatsApp**: Direct links to business WhatsApp (+966 53 585 2438)
- **Email**: info@melco-ltd.com
- **Phone**: +966 55 365 3329
- **Location**: Aldammam, Eastern Province, Saudi Arabia

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically with each push

### Other Platforms

The project can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📄 License

This project is proprietary and confidential. All rights reserved by MELCO.

## 🤝 Contributing

This is a private project for MELCO. For internal development:

1. Create feature branches from `main`
2. Follow TypeScript and ESLint guidelines
3. Test on both Arabic and English locales
4. Ensure responsive design works on all devices
5. Submit pull requests for review

## 📞 Support

For technical support or questions about this project, contact the development team.
