# Eco App (Multikart Storefront)

A **Multikart-inspired e-commerce storefront** built with **Next.js 16**, **React 19**, and **Material UI**. It demonstrates a production-style product details experience: sticky header, mega menus, variant gallery, purchase panel, tabs, related products slider, sticky add-to-cart bar, and full mobile/tablet responsive layout.

The app uses **dummy product data** (no real backend yet). Home (`/`) and `/product/gym-coords-set` both render the same default product page.

---

## Table of contents

1. [What this project is for](#what-this-project-is-for)
2. [Tech stack](#tech-stack)
3. [Requirements](#requirements)
4. [Installation](#installation)
5. [How to run](#how-to-run)
6. [Environment variables](#environment-variables)
7. [Project structure](#project-structure)
8. [Features](#features)
9. [Responsive breakpoints](#responsive-breakpoints)
10. [Styling approach](#styling-approach)
11. [Data & services](#data--services)
12. [State management](#state-management)
13. [How to add a product](#how-to-add-a-product)
14. [Scripts reference](#scripts-reference)
15. [Troubleshooting](#troubleshooting)

---

## What this project is for

| Goal | Description |
|------|-------------|
| **UI reference** | Recreate Multikart-style layout, typography, and interactions in a modern Next.js app |
| **Product page** | Full product details flow: gallery, variants, cart actions, tabs, related products |
| **Responsive UX** | Desktop mega menus, mobile drawer nav, scaled fonts/images on tablet and phone |
| **Foundation** | Clean folder structure ready to plug in a real API, CMS, or payment provider later |

**Brand theme:** primary color `#ec8951`, font **Montserrat**, max layout width **1400px**.

---

## Tech stack

### Core framework

| Library | Version | Purpose |
|---------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.3.8 | App Router, SSR/SSG, routing, `next/image`, `next/font`, metadata |
| [React](https://react.dev/) | 19.2.8 | UI components and client interactivity |
| [TypeScript](https://www.typescriptlang.org/) | ^5 | Type-safe models, props, and services |

### UI & styling

| Library | Version | Purpose |
|---------|---------|---------|
| [Material UI (MUI)](https://mui.com/) | ^9.4.0 | Theme, `Box`, `Drawer`, `CssBaseline`, layout primitives |
| [@mui/material-nextjs](https://mui.com/material-ui/guides/nextjs/) | ^9.4.0 | App Router cache provider for MUI + Next.js |
| [@emotion/react](https://emotion.sh/) + [@emotion/styled](https://emotion.sh/) | ^11.14 | CSS-in-JS engine used by MUI |
| [Remix Icon](https://remixicon.com/) | ^4.9.1 | Icon font (`ri-*` classes) for nav, cart, social, etc. |
| Custom CSS | — | Multikart-matched styles in `styles/` and `app/globals.css` |

### Sliders & RTL

| Library | Version | Purpose |
|---------|---------|---------|
| [Swiper](https://swiperjs.com/) | ^14.3.0 | Related products carousel |
| [stylis](https://github.com/thysultan/stylis) + [stylis-plugin-rtl](https://github.com/styled-components/stylis-plugin-rtl) | ^4.4 / ^2.1 | RTL layout support when direction is Arabic |

### Dev tools

| Library | Version | Purpose |
|---------|---------|---------|
| [ESLint](https://eslint.org/) | ^9 | Linting |
| [eslint-config-next](https://nextjs.org/docs/app/api-reference/config/eslint) | 16.3.8 | Next.js ESLint rules |
| [@types/node](https://www.npmjs.com/package/@types/node), [@types/react](https://www.npmjs.com/package/@types/react) | ^20 / ^19 | TypeScript definitions |

---

## Requirements

Before you start, install:

- **Node.js** 20.x or newer (LTS recommended)
- **npm** 10+ (comes with Node.js)

Check versions:

```bash
node -v
npm -v
```

---

## Installation

1. **Clone or open** the project folder:

   ```bash
   cd d:\eco-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   This reads `package.json` and installs all libraries listed in [Tech stack](#tech-stack).

3. **Optional:** create a `.env.local` file if you need a custom site URL (see [Environment variables](#environment-variables)).

---

## How to run

### Development (hot reload)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

| URL | Page |
|-----|------|
| `/` | Home — default product (`gym-coords-set`) |
| `/product/gym-coords-set` | Same product via dynamic route |
| `/product/[any-slug]` | Falls back to default dummy product if slug not found |

### Production build

```bash
npm run build
npm start
```

`npm run build` compiles TypeScript, optimizes assets, and generates static/dynamic routes.  
`npm start` serves the production build on port **3000** by default.

### Lint

```bash
npm run lint
```

Runs ESLint with Next.js rules.

---

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | No | `http://localhost:3000` | Base URL used in SEO metadata |

Example `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Project structure

```
eco-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (font, providers, StoreShell)
│   ├── page.tsx                  # Home → product page
│   ├── globals.css               # Global CSS, header, breadcrumbs, imports
│   ├── viewport.ts               # Viewport meta config
│   └── product/[slug]/page.tsx   # Dynamic product route + metadata
│
├── components/
│   ├── layout/                   # Site chrome
│   │   ├── site-header.tsx       # Top bar + sticky main nav
│   │   ├── header.tsx            # Logo, desktop nav, icons, hamburger
│   │   ├── top-bar.tsx           # Phone, language, currency
│   │   ├── mobile-nav-drawer.tsx # Slide-in menu for mobile/tablet
│   │   ├── nav-mega-panel.tsx    # Collection / Product mega menus
│   │   ├── footer.tsx            # Footer columns + sub-footer
│   │   ├── footer-newsletter.tsx # Newsletter form + social links
│   │   ├── sticky-cart-bar.tsx   # Desktop sticky add-to-cart bar
│   │   ├── scroll-to-top.tsx     # Back-to-top button
│   │   ├── theme-settings.tsx    # RTL customize drawer
│   │   └── store-shell.tsx       # Wraps all pages (header + main + footer)
│   │
│   ├── product/                  # Product page sections
│   │   ├── product-page-client.tsx
│   │   ├── product-gallery.tsx
│   │   ├── product-details.tsx
│   │   ├── product-purchase-panel.tsx
│   │   ├── product-tabs.tsx
│   │   ├── related-products.tsx
│   │   ├── basic-product-card.tsx
│   │   └── page-title-banner.tsx
│   │
│   └── shared/ui/                # Reusable UI (AppContainer, AppImage, AppSlider, …)
│
├── features/                     # Domain logic (data, context, models)
│   ├── product/
│   │   ├── data/dummy-product.data.ts
│   │   ├── models/product.model.ts
│   │   ├── context/product-view-context.tsx
│   │   └── utils/
│   ├── cart/
│   │   ├── context/cart-provider.tsx
│   │   └── models/cart.model.ts
│   └── layout/
│       └── data/header.data.ts, footer.data.ts
│
├── api/
│   ├── services/product.service.ts   # Data access layer (dummy for now)
│   └── actions/product.actions.ts    # Server actions (if used)
│
├── core/
│   ├── constants/app.constants.ts    # Theme colors, layout, slugs
│   ├── hooks/                        # Sticky header, gallery height, etc.
│   ├── providers/                    # AppProviders, DirectionProvider
│   ├── seo/                          # Metadata helpers
│   └── theme/                        # MUI theme + RTL cache
│
├── styles/                       # Feature-specific CSS
│   ├── product-page.css
│   ├── sticky-bottom-cart.css
│   ├── mobile-nav.css
│   ├── responsive.css
│   ├── footer.css
│   └── …
│
├── public/images/                # Static images (products, brand, mega menu, payments)
│
├── package.json                  # Dependencies and scripts
├── next.config.ts                # Next.js config (images, SVG)
├── tsconfig.json                 # TypeScript paths (@/* alias)
└── README.md                     # This file
```

### Path alias

Imports use `@/` → project root:

```ts
import { productService } from "@/api/services/product.service";
```

---

## Features

### Layout & navigation

- **Top bar** — welcome message, phone, language (EN/FR), currency (USD/INR/GBP/EUR)
- **Main header** — logo, desktop nav links, search/wishlist/cart/account icons
- **Mega menus** — Collection and Product dropdowns with product cards (desktop only, ≥1200px)
- **Mobile drawer** — hamburger menu with accordion sub-links (tablet/mobile, <1200px)
- **Sticky header** — main nav sticks on scroll after top bar leaves view (desktop only)
- **Footer** — four columns, newsletter, social icons, payment badges, animated link underlines
- **Theme settings** — RTL toggle via right-side “CUSTOMIZE” tab
- **Scroll to top** — floating button with offset when sticky cart is visible

### Product page

- **Breadcrumb banner** — page title + trail
- **3-column layout (desktop)** — gallery | details | purchase form
- **Image gallery** — main image + thumbnails, variant hover preview, height-synced thumbs
- **Product details** — title, rating, price, delivery links, specs, offers
- **Purchase panel** — color swatches, quantity, Add to Cart / Buy Now, wishlist/compare/share
- **Tabs** — Description, Review, Q&A
- **Related products** — Swiper slider with product cards
- **Sticky add-to-cart bar** — floating bar at bottom when purchase panel scrolls out of view (desktop ≥1200px only)

### Cart & variants

- **Cart context** — in-memory cart; badge count on header icon
- **Product view context** — selected variant, quantity, hover preview for gallery

### SEO & performance

- Dynamic metadata per product slug
- `next/image` for optimized images (AVIF/WebP)
- `next/font` for Montserrat (no layout shift)
- Image prefetch for variant galleries
- Related slider fallback layout to avoid full-width flash before Swiper mounts

---

## Responsive breakpoints

| Breakpoint | Behavior |
|------------|----------|
| **≥ 1200px** | Desktop nav, mega menus, sticky header, sticky add-to-cart bar |
| **768px – 1199px** | Hamburger + drawer, compact top bar, no sticky cart |
| **≤ 767px** | Single-row top bar (phone only), smaller logo/icons/fonts, full-width buttons |
| **≥ 992px** | Product page 3-column layout; gallery sticky |
| **≥ 992px** | Footer email on one line |

Constants: `DESKTOP_NAV_MIN = 1200` in header, sticky cart, and site header.

---

## Styling approach

The UI mixes **three layers**:

1. **MUI theme** — colors, typography baseline, `Box`/`Drawer`/`Switch` for structure
2. **Global + feature CSS** — Multikart-class names (`.main-menu`, `.product-page-details`, `.stickyCart`, etc.)
3. **CSS variables** — `--theme-color`, `--font-montserrat`, `--layout-max-width`, responsive header vars in `styles/responsive.css`

Icons use **Remix Icon** classes (e.g. `ri-shopping-cart-line`), loaded in `globals.css`.

---

## Data & services

Products are **not fetched from an API**. Data lives in:

```
features/product/data/dummy-product.data.ts
```

The service layer abstracts access:

```ts
// api/services/product.service.ts
productService.getBySlug("gym-coords-set")  // → ProductDetails
productService.getAll()                     // → ProductDetails[]
```

Replace `productService` with real fetch/GraphQL calls when connecting a backend.

---

## State management

| Context | File | Stores |
|---------|------|--------|
| **DirectionProvider** | `core/providers/direction-provider.tsx` | LTR/RTL; persisted in `localStorage` |
| **CartProvider** | `features/cart/context/cart-provider.tsx` | Cart lines, item count, `addToCart` |
| **ProductViewProvider** | `features/product/context/product-view-context.tsx` | Active variant, quantity, hover variant for gallery |

All providers wrap the app in `core/providers/app-providers.tsx`.

---

## How to add a product

1. **Define data** in `features/product/data/dummy-product.data.ts`:
   - Add images under `public/images/products/…`
   - Extend `dummyProducts` array with a new `ProductDetails` object (unique `slug`)

2. **Service** automatically picks it up via `getBySlug`.

3. **Route** — visit `/product/your-slug`.

4. **Optional** — add links in `features/layout/data/header.data.ts` or mega menu data.

---

## Scripts reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack (port 3000) |
| `npm run build` | Production build + TypeScript check |
| `npm start` | Run production server (after build) |
| `npm run lint` | Run ESLint |

---

## Troubleshooting

### Hydration warnings in the browser console

If you see errors mentioning `data-pdffiller-skip` or `data-lastpass-icon-root`, those come from **browser extensions** (PDFfiller, LastPass, etc.) modifying the DOM before React hydrates. They are not app bugs.

**Fix:** test in Incognito with extensions disabled, or disable those extensions for `localhost`.

The footer newsletter form is built to avoid LastPass injection during SSR.

### Port already in use

```bash
# Windows — use another port
npm run dev -- -p 3001
```

### Images not loading

Ensure paths in dummy data match files under `public/images/`. Next.js serves `public/` at the site root (`/images/...`).

### Sticky cart not showing

Sticky add-to-cart only appears on **desktop (≥1200px)** when you scroll past the purchase panel and are not at the very bottom of the page.

---

## License

Private project (`"private": true` in `package.json`).

---

## Quick start summary

```bash
npm install
npm run dev
# → http://localhost:3000
```

Built with **Next.js 16 · React 19 · MUI 9 · TypeScript · Swiper · Remix Icon**.
