# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development commands

This is a single Next.js 15 App Router project (no monorepo). All commands are run from the repo root.

- Install dependencies (Node 18+):
  - `npm install` (preferred, as used in README)
- Run dev server (Turbopack):
  - `npm run dev`
  - Serves at `http://localhost:3000`.
- Production build:
  - `npm run build`
- Start production server (after `npm run build`):
  - `npm start`
- Lint the project with ESLint:
  - `npm run lint`

There is currently **no automated test runner or `test` script** configured. See the Testing section for the manual checklist defined in `README.md`.

## Environment & configuration

- Environment variables are provided via `.env.local` in the project root.
- EmailJS configuration (required for contact and cart inquiry flows):
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- These are consumed in the shared EmailJS helper at `lib/emailjs.ts` and by form/cart components.
- Changing these values affects **all** contact and inquiry flows (contact page, cart inquiry, etc.), so keep them consistent.

Key configuration files:
- `next.config.ts` – Next.js configuration.
- `tailwind.config.js` – Tailwind CSS theme (colors, breakpoints, etc.).
- `tsconfig.json` – TypeScript configuration.
- `middleware.ts` – i18n routing middleware that enforces locale-prefixed routes.
- `i18n/routing.ts`, `i18n/request.ts` – `next-intl`-based i18n routing and request configuration.

## High-level architecture

### App Router & routing

- The app uses the Next.js App Router under `app/`.
- All user-facing routes are nested under a dynamic `[locale]` segment: `app/[locale]/...`.
  - Examples: `app/[locale]/page.tsx` (home), `app/[locale]/products/page.tsx`, `app/[locale]/about/page.tsx`, etc.
- `middleware.ts` and the `i18n/` folder work together with `next-intl` to:
  - Detect the user language.
  - Redirect to `/en/...` or `/ar/...`.
  - Provide locale-aware routing and translations.

**When adding or modifying routes/pages:**
- Place new route segments under `app/[locale]/...` so they participate in i18n.
- Ensure any new text content is wired into the translation files (see i18n section below).

### Data & content model

The site is intentionally static and data-driven:

- `data/productsData.js`
  - Defines the full product catalog: categories, product details, and image references.
  - Drives both listing (`/products`, `/products/[category]`) and detail pages (`/products/[category]/[productName]`).
- `data/newsData.ts`
  - Static list of news items for `/news` and `/news/[id]`.
- `data/jobsData.ts`
  - Static job definitions used by the careers pages.

These data modules are the **single source of truth** for catalog, news, and career content. For non-trivial content changes (new products, categories, jobs, or news items), prefer updating these files over hardcoding content in page components.

### UI composition: components vs sections

- `components/`
  - Reusable, generic UI and domain components that appear across multiple pages.
  - Includes layout primitives such as `Header`, `Footer`, `Navigation`, `MobileNavigation`, `LanguageSelector`, and `ThemeSwitcher`.
  - Contains cart-related components in `components/Cart/` (see Cart section) and form components such as `ContactForm` and `CareerApplicationForm`.
- `sections/`
  - Page-level layout sections, primarily used on the homepage (e.g., `HeroSection`, `CompanyProfileSection`, `LocationSection`, `PartnerBrandsSection`).
  - These compose multiple `components/` primitives together into full-page sections.

When modifying the UI:
- Prefer enhancing or creating reusable building blocks in `components/`.
- Use `sections/` to orchestrate those building blocks into concrete page layouts.

### Cart system & local storage

The shopping cart is a client-side system with React Context + `localStorage`:

- `components/Cart/CartProvider.tsx`
  - Implements cart context and core cart logic (add/remove items, quantity changes, persistence).
  - Wraps the app via the root layout so all pages can access the cart.
- `components/Cart/CartButton.tsx`, `CartModal.tsx`, `CartIcon.tsx`
  - UI for toggling and displaying the cart.
- `hooks/useLocalStorage.ts`
  - Generic hook handling read/write to `localStorage` with appropriate React lifecycle integration.
- `types/cart.ts`, `types/product.ts`
  - Shared TypeScript types for cart items and products.

Cart behavior:
- Items are added from product detail and catalog views.
- Cart state is persisted to `localStorage` so it survives reloads and sessions.
- The cart is used as the source of truth when sending product inquiries via EmailJS.

When touching cart-related functionality:
- Ensure `CartProvider` continues to wrap all routes that need cart access.
- Keep `types/cart.ts` aligned with any shape changes to cart items.
- Be careful with breaking changes to `useLocalStorage` as it may be used beyond the cart.

### Email & inquiry flows (EmailJS)

Email-related behavior is centralized around EmailJS:

- `lib/emailjs.ts`
  - Encapsulates EmailJS integration (public key, service ID, template ID).
  - Called by contact and inquiry components.
- `components/ContactForm.tsx`
  - Contact page form submits via EmailJS.
- `components/CareerApplicationForm.tsx`
  - Generates a `mailto:`-based application with pre-filled body; does **not** use EmailJS but is part of the broader "inquiry" flows.
- Cart inquiry
  - Cart contents plus user contact information are sent via EmailJS to the business.

If you change EmailJS templates or payload structure:
- Update `lib/emailjs.ts` first.
- Then update any template variables in the EmailJS dashboard to match.
- Verify forms on `/contact` and cart inquiry flows still work end-to-end.

### Internationalization (next-intl)

The project is fully bilingual (English and Arabic):

- Translation files: `messages/en.json`, `messages/ar.json`.
- `next-intl` is used for translations, locale detection, and routing.
- Layout and components rely on hooks like `useTranslations` and `useLocale` (see respective components and layouts for usage).

When adding/changing text:
- Add keys to **both** `messages/en.json` and `messages/ar.json`.
- Avoid hardcoded user-facing strings in components; use translation keys instead.
- Verify that any new routes or pages behave correctly in both `/en` and `/ar`.

### Design system & theming

- Styling is handled via Tailwind CSS 4 with global styles in `app/[locale]/globals.css`.
- Color palette, typography, and breakpoints are defined in `tailwind.config.js` and documented in `README.md`.
- `ThemeSwitcher.jsx` controls light/dark mode.
- Shared visual primitives (buttons, cards, forms, etc.) live in `components/` and are reused across pages.

When adjusting design:
- Prefer centralized changes in Tailwind config or shared components rather than ad-hoc styles.

## Testing

There is **no automated test suite** configured (no Jest/Vitest/Playwright/Cypress config, and no `npm test` script).

The `README.md` defines a **manual testing checklist**, including:
- Verifying all routes in both languages.
- Cart add/update/remove behavior and persistence.
- Contact form, career application flow, WhatsApp links.
- Mobile responsiveness and dark mode.
- EmailJS integration and language switching.

When making non-trivial changes, follow that checklist as a baseline for regression testing until an automated test harness is introduced.

## Git workflow & commit conventions

From `README.md`:

- Branching strategy:
  - `main` – Production-ready code.
  - `develop` – Integration branch.
  - `feature/*` – New features.
  - `bugfix/*` – Bug fixes.
  - `hotfix/*` – Production hotfixes.
- Commit message format:
  - `type(scope): subject` (e.g., `feat(cart): add quantity update functionality`).
  - Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

Warp agents should respect this branching model and commit style when preparing patches or suggested commits.

## Project-specific guidance for Warp agents

- Always treat **Arabic and English locales equally**:
  - When adding new UI or pages, update both translation files and verify layout in both directions (LTR + RTL).
- Preserve the separation of concerns:
  - Data lives in `data/`, translations in `messages/`, reusable UI in `components/`, and high-level layouts in `sections/`.
- Be cautious with breaking changes to cart, EmailJS, or i18n:
  - These are core business flows; validate them manually after related code edits.
- When in doubt about behavior, consult `README.md` for detailed functional descriptions of pages, flows, and configuration before making significant architectural changes.