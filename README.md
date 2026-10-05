# Eco App

Next.js App Router storefront starter. The first route opens a Multikart-style product details page with dummy data, Material UI, RTL, skeletons, and code-split sections.

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Home and `/product/gym-coords-set` render the same dummy product.

## Feature notes

- **Layout:** shared header, footer, customize drawer (RTL), sticky add-to-cart near page end, scroll-to-top.
- **Product page:** title + breadcrumb, gallery slider, quantity/cart actions, description/review/Q&A tabs, related products slider.
- **Data:** dummy product lives in `features/product/data`. `productService.getBySlug` simulates network delay for skeleton/Suspense.
- **RTL:** toggle from the right `CUSTOMIZE` drawer or switch language to Arabic in the top bar.
- **Performance:** `loading.tsx` + Suspense skeletons, dynamic imports for tabs/related slider, `next/image` and `next/font`.

## Folder map

```
app/                           # Next.js App Router (pages, layouts, loading)
components/layout              # header, footer, sticky cart
components/product             # product sections
components/shared/ui           # reusable MUI wrappers
core/theme, providers, hooks
features/product|cart|layout   # models, dummy data, services
public/images                  # static assets
```
