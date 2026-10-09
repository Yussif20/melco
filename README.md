# MELCO Safety Equipment Website

🌐 **Live site:** [https://www.masterequiment.com/ar](https://www.masterequiment.com/ar)

A modern, bilingual e-commerce website for MELCO, a leading provider of workplace safety equipment in Saudi Arabia. Built with Next.js 15, featuring a comprehensive product catalog, shopping cart functionality, internationalization, and professional business pages.

## 🌟 Key Features

### Core Functionality

- **🌐 Bilingual Support**: Full Arabic (RTL) and English (LTR) internationalization using next-intl
- **🛒 Shopping Cart**: Advanced cart system with localStorage persistence, quantity management, and EmailJS integration
- **📦 Product Catalog**: Comprehensive safety equipment catalog with 8+ categories and detailed product pages
- **🎨 Modern Design**: Responsive, professional UI with dark mode support and smooth animations
- **📱 Mobile-First**: Fully responsive design optimized for all device sizes
- **⚡ Performance**: Built with Next.js 15 App Router and Turbopack for optimal performance
- **🎯 SEO Optimized**: Complete metadata, Open Graph tags, and structured data
- **♿ Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation

### Business Features

- **Product Inquiry System**: Cart-based inquiry system with EmailJS integration
- **Career Applications**: mailto-based application system with pre-filled email templates
- **Contact Forms**: Multiple contact forms with validation and EmailJS integration
- **WhatsApp Integration**: Direct business communication links
- **Color Selection**: Product color variants with visual selection
- **Image Optimization**: Next.js Image component for optimized loading

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm, yarn, pnpm, or bun
- Git

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

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# EmailJS Configuration (for contact and inquiry forms)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the website

## 📁 Project Structure

```
melco-next/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalized routes
│   │   ├── page.tsx             # Home page
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── about/               # About page
│   │   ├── board/               # Board of directors
│   │   ├── careers/             # Career opportunities (mailto form)
│   │   │   └── [id]/           # Individual job details
│   │   ├── contact/             # Contact page with form
│   │   ├── governance/          # Corporate governance
│   │   ├── news/                # News & updates
│   │   │   └── [id]/           # Individual news articles
│   │   └── products/            # Product catalog
│   │       ├── [category]/     # Category pages
│   │       │   └── [productName]/ # Product detail pages
│   └── globals.css              # Global styles & Tailwind
├── components/                   # Reusable UI components
│   ├── Header.tsx               # Site header with navigation
│   ├── Footer.tsx               # Site footer
│   ├── Navigation.tsx           # Desktop navigation
│   ├── MobileNavigation.tsx     # Mobile menu
│   ├── LanguageSelector.tsx     # Language switcher
│   ├── ThemeSwitcher.jsx        # Dark mode toggle
│   ├── ContactForm.tsx          # Contact form with EmailJS
│   ├── CareerApplicationForm.tsx # Career application (mailto)
│   ├── ProductCard.tsx          # Product grid item
│   ├── ProductImageViewer.tsx   # Image gallery with zoom
│   ├── ColorSelector.tsx        # Product color picker
│   ├── ProductActions.tsx       # Add to cart actions
│   └── Cart/                    # Shopping cart components
│       ├── CartProvider.tsx     # Cart context & logic
│       ├── CartButton.tsx       # Cart trigger button
│       ├── CartModal.tsx        # Cart sidebar modal
│       └── CartIcon.tsx         # Animated cart icon
├── sections/                     # Page sections/layouts
│   ├── HeroSection.tsx          # Homepage hero
│   ├── CompanyProfileSection.tsx # Company overview
│   ├── LocationSection.tsx      # Location & map
│   └── PartnerBrandsSection.tsx # Partner logos
├── data/                         # Static data & content
│   ├── productsData.js          # Product catalog (100+ items)
│   ├── newsData.ts              # News articles
│   └── jobsData.ts              # Career opportunities
├── messages/                     # Internationalization files
│   ├── en.json                  # English translations
│   └── ar.json                  # Arabic translations
├── lib/                          # Utility functions
│   └── emailjs.ts               # EmailJS integration
├── hooks/                        # Custom React hooks
│   └── useLocalStorage.ts       # LocalStorage hook
├── types/                        # TypeScript type definitions
│   ├── cart.ts                  # Cart types
│   └── product.ts               # Product types
├── public/                       # Static assets
│   ├── products/                # Product images (organized by category)
│   ├── show-products/           # Product detail images
│   ├── category-headers/        # Category banner images
│   ├── brands/                  # Partner brand logos
│   ├── icons/                   # UI icons & symbols
│   └── values/                  # Company values images
├── i18n/                        # i18n configuration
│   ├── routing.ts               # Route configuration
│   └── request.ts               # Request configuration
├── middleware.ts                # Next.js middleware (i18n)
├── tailwind.config.js           # Tailwind CSS config
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

## 🛠 Technology Stack

### Core Technologies

- **Framework**: Next.js 15 (App Router, React 19 RC)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **State Management**: React Context API
- **Data Persistence**: LocalStorage

### Key Libraries

- **next-intl**: Internationalization (i18n) with routing
- **@emailjs/browser**: Email service integration
- **React Hooks**: useState, useEffect, useContext, useTranslations, useLocale

### Development Tools

- **Turbopack**: Next.js 15 development bundler
- **ESLint**: Code linting
- **PostCSS**: CSS processing

## 🌍 Internationalization (i18n)

### Languages

- **English (en)**: Primary language, LTR layout
- **Arabic (ar)**: Full RTL support, localized content

### Features

- Automatic language detection from browser settings
- URL-based language switching (`/en/*` and `/ar/*`)
- Automatic RTL/LTR layout transformation
- Localized routes and navigation
- Translation files: `messages/en.json` and `messages/ar.json`
- Font optimization for Arabic (Noto Sans Arabic) and English (Inter)

### Translation Keys

All UI text is translated including:

- Navigation menus
- Product names and descriptions
- Form labels and validation messages
- Button text and CTAs
- Error and success messages
- Metadata (page titles and descriptions)

## 📱 Pages & Routes

### Main Pages

| Page                 | Route                                | Description                                             |
| -------------------- | ------------------------------------ | ------------------------------------------------------- |
| **Home**             | `/`                                  | Hero section, company profile, partner brands, location |
| **About**            | `/about`                             | Vision, mission, core values, company story, team       |
| **Products**         | `/products`                          | Product catalog home with all categories                |
| **Product Category** | `/products/[category]`               | Category-specific product listing                       |
| **Product Detail**   | `/products/[category]/[productName]` | Individual product page with full details               |
| **Board**            | `/board`                             | Board of directors information                          |
| **Governance**       | `/governance`                        | Corporate governance policies                           |
| **News**             | `/news`                              | Company news and industry updates (coming soon)         |
| **News Detail**      | `/news/[id]`                         | Individual news article                                 |
| **Careers**          | `/careers`                           | Career application form (mailto-based)                  |
| **Contact**          | `/contact`                           | Contact form with EmailJS integration                   |

### Product Categories

1. **Head Protection** - Hard hats, bump caps, safety helmets
2. **Eye Protection** - Safety glasses, goggles, face shields
3. **Hand Protection** - Gloves (cut-resistant, chemical, thermal)
4. **Foot Protection** - Safety boots and shoes
5. **Body Protection** - Coveralls, vests, aprons
6. **Ear Protection** - Earplugs, earmuffs
7. **Respiratory Protection** - Masks, respirators, filters
8. **Gas Detection** - Gas detectors, monitors, alarms

## 🛒 Shopping Cart System

### Features

- **Add to Cart**: Add products with quantity selection
- **Cart Persistence**: LocalStorage for cart data persistence
- **Quantity Management**: Increase/decrease/remove items
- **Real-time Updates**: Live cart count and total
- **Product Details**: Name, category, quantity, image
- **Inquiry Submission**: Send cart via EmailJS to company email
- **Responsive Modal**: Slide-out cart drawer on all devices

### Cart Workflow

1. User browses products and adds items to cart
2. Cart persists across sessions via localStorage
3. User reviews cart and adjusts quantities
4. User fills inquiry form (name, email, phone, message)
5. Form data + cart items sent via EmailJS
6. Company receives formatted inquiry email
7. Success message displayed to user

### EmailJS Integration

- **Service**: Configured EmailJS service
- **Template**: Custom email template with cart items
- **Data Sent**: User info, cart items, inquiry ID, timestamp
- **Format**: Professional email with item details and quantities

## 📧 Contact & Inquiry System

### Contact Form (Contact Page)

- User details: Name, email, phone
- Message field for inquiries
- Terms acceptance checkbox
- EmailJS integration for delivery
- Success/error feedback

### Career Application (Careers Page)

- **Personal Info**: Full name, email, phone, LinkedIn
- **Professional Info**: Current position, experience, education
- **Cover Letter**: Optional message
- **CV Instructions**: Step-by-step guide for attachment
- **Submission**: mailto-based with pre-filled email template
- **Bilingual**: Full support for English and Arabic applications

### Product Inquiry

- Cart-based inquiry system
- Add multiple products to cart
- Submit inquiry with cart contents
- Automated email to company

## 🎨 Design System

### Colors

- **Primary**: Blue (`#3B82F6`)
- **Secondary**: Gray shades
- **Accents**: Green (success), Red (error), Yellow (warning)
- **Dark Mode**: Full dark theme support

### Typography

- **English**: Inter (Google Font)
- **Arabic**: Noto Sans Arabic (Google Font)
- **Sizes**: Responsive text scaling
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Components

- **Buttons**: Primary, secondary, outline variants
- **Forms**: Consistent input styling with validation
- **Cards**: Product cards, news cards, info cards
- **Modals**: Cart modal, image viewer
- **Navigation**: Desktop menu, mobile drawer
- **Icons**: SVG icons for UI elements

### Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` file:

```env
# EmailJS Configuration (Required for contact forms)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

### EmailJS Setup

1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Create email service (Gmail, Outlook, etc.)
3. Create email template with variables:
   - `{{name}}`, `{{email}}`, `{{phone}}`, `{{message}}`
   - `{{cartItems}}`, `{{totalItems}}`, `{{inquiryId}}`
4. Get Public Key, Service ID, and Template ID
5. Add to `.env.local`

### Customization Options

#### Update Company Information

- **Contact Details**: Edit `messages/en.json` and `messages/ar.json`
- **Location**: Update `LocationSection.tsx`
- **Social Media**: Modify footer links in `Footer.tsx`

#### Modify Products

- **Add/Edit Products**: Update `data/productsData.js`
- **Product Images**: Add images to `public/products/` and `public/show-products/`
- **Categories**: Add new categories in `productsData.js`

#### Change Branding

- **Colors**: Update `tailwind.config.js`
- **Logo**: Replace logo in `components/Logo.tsx`
- **Fonts**: Modify font imports in `app/[locale]/layout.tsx`
- **Favicon**: Replace files in `public/`

#### Update Content

- **Translations**: Edit `messages/en.json` and `messages/ar.json`
- **About Page**: Modify `app/[locale]/about/page.tsx`
- **Homepage**: Update sections in `sections/` directory

## 📞 Contact Information

- **WhatsApp**: [+966 50 670 6962](https://wa.me/966506706962)
- **Phone**: [+966 50 670 6962](tel:+966506706962)
- **Email**: [Info@melco-ltd.com](mailto:Info@melco-ltd.com)
- **Location**: Aldammam, Eastern Province, Saudi Arabia
- **LinkedIn**: [MELCO Company Profile](https://www.linkedin.com/company/melco-ksa)

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### Build for Production

```bash
npm run build
npm start
```

### Other Platforms

- **Netlify**: Supports Next.js with adapter
- **Railway**: One-click deployment
- **DigitalOcean**: App Platform support
- **AWS Amplify**: Full Next.js support

## 📊 Performance Optimization

### Implemented Optimizations

- ✅ Next.js Image component for optimized images
- ✅ Dynamic imports for code splitting
- ✅ LocalStorage for cart persistence (no server calls)
- ✅ Turbopack for faster development builds
- ✅ Static page generation where possible
- ✅ Lazy loading for images and components
- ✅ Minified CSS and JavaScript in production

### Best Practices

- Use Next.js `<Image>` component for all images
- Implement proper image sizes and formats (WebP, AVIF)
- Use `loading="lazy"` for below-fold content
- Minimize client-side JavaScript
- Use server components where possible

## 🧪 Testing

### Manual Testing Checklist

- [ ] Test all routes in both languages
- [ ] Verify cart functionality (add, update, remove)
- [ ] Test contact form submission
- [ ] Test career application flow
- [ ] Verify WhatsApp links work
- [ ] Check mobile responsiveness
- [ ] Test dark mode toggle
- [ ] Verify EmailJS integration
- [ ] Test language switching
- [ ] Check product image viewer

### Browser Testing

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This project is proprietary and confidential. All rights reserved by MELCO Ltd. © 2025

Unauthorized copying, modification, or distribution of this software is strictly prohibited.

## 🤝 Development

### Branching Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Production hotfixes

### Code Standards

- Follow TypeScript strict mode
- Use ESLint configuration
- Write meaningful commit messages
- Test on both locales before committing
- Ensure mobile responsiveness
- Maintain accessibility standards

### Commit Message Format

```
type(scope): subject

body

footer
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Example**:

```
feat(cart): add quantity update functionality

- Add increment/decrement buttons
- Update cart total in real-time
- Persist changes to localStorage

Closes #123
```

## 📚 Documentation

### Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Documentation](https://react.dev/)

### Project Documentation

- **Component Documentation**: See individual component files
- **Type Definitions**: Check `types/` directory
- **i18n Structure**: Review `messages/` directory
- **API Integration**: See `lib/emailjs.ts`

## 🐛 Troubleshooting

### Common Issues

**Cart not persisting**

- Check localStorage is enabled in browser
- Verify cart provider is wrapping the app
- Check browser console for errors

**EmailJS not working**

- Verify environment variables are set
- Check EmailJS service is active
- Verify template ID matches
- Check browser console for API errors

**Language switching issues**

- Clear browser cache
- Check middleware.ts configuration
- Verify translation files are complete

**Images not loading**

- Verify image paths are correct
- Check public folder structure
- Use Next.js Image component

**Build errors**

- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall
- Check for TypeScript errors: `npm run build`

## 💬 Support

For technical support or questions:

- **Email**: [Info@melco-ltd.com](mailto:Info@melco-ltd.com)
- **WhatsApp**: [+966 50 670 6962](https://wa.me/966506706962)

---

**Built with ❤️ for MELCO - Protecting Saudi Arabia's Workforce**
