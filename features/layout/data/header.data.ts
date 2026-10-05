export type NavLink = {
  label: string;
  href: string;
  mega?: "collection" | "product";
  hasDropdown?: boolean;
  children?: NavLink[];
};

export type MegaLink = {
  label: string;
  href: string;
  hot?: boolean;
};

export type MegaSection = {
  title: string;
  links: MegaLink[];
};

export type MegaColumnStack = {
  sections: MegaSection[];
};

import type { BasicProductCardData } from "@/features/product/models/basic-product-card.model";

export type {
  BasicProductCardData as MegaProductCard,
  BasicProductVariant as MegaProductVariant,
} from "@/features/product/models/basic-product-card.model";

export const topBarCopy = {
  welcome: "Welcome to Our store Multikart",
  phone: "Call Us: 123 - 456 - 7890",
};

export const languageOptions = [
  { code: "en", label: "English", toggleLabel: "ENGLISH", icon: "us" },
  { code: "fr", label: "Français", toggleLabel: "FRANÇAIS", icon: "fr" },
];

export const currencyOptions = [
  { code: "USD", label: "USD" },
  { code: "INR", label: "INR" },
  { code: "GBP", label: "GBP" },
  { code: "EUR", label: "EUR" },
];

export const headerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Collection", href: "/#collection", mega: "collection" },
  { label: "Product", href: "/", mega: "product" },
  { label: "Mega Menu", href: "/#mega-menu", hasDropdown: true },
  { label: "Blogs", href: "/#blogs", hasDropdown: true },
  { label: "Pages", href: "/#pages", hasDropdown: true },
  { label: "Seller", href: "/#seller", hasDropdown: true },
];

export const collectionMega = {
  columns: [
    {
      title: "Collection Layouts",
      links: [
        { label: "Collection Left Sidebar", href: "/#collection-left", hot: true },
        { label: "Collection Right Sidebar", href: "/#collection-right" },
        { label: "Collection No Sidebar", href: "/#collection-none" },
        { label: "Collection 2 Grid", href: "/#collection-2" },
        { label: "Collection 3 Grid", href: "/#collection-3" },
        { label: "Collection 4 Grid", href: "/#collection-4" },
        { label: "Collection List", href: "/#collection-list" },
      ],
    },
    {
      title: "Collection Layouts",
      links: [
        { label: "Collection Category Slider", href: "/#category-slider" },
        { label: "Collection Category Sidebar", href: "/#category-sidebar" },
        { label: "Collection Top Filter", href: "/#top-filter" },
        { label: "Collection Sidebar Popup", href: "/#sidebar-popup" },
        { label: "Infinite Scroll", href: "/#infinite-scroll" },
      ],
    },
  ] satisfies MegaSection[],
  products: [
    {
      id: "mega-gym",
      href: "/product/gym-coords-set",
      brand: "Momentum Fit",
      name: "Gym Coords Set",
      variantDisplay: "thumbs",
      defaultVariantIndex: 0,
      variants: [
        {
          image: "/images/products/gym-coords/brown-1.jpg",
          thumb: "/images/products/gym-coords/thumb-1.jpg",
          label: "Brown",
        },
        {
          image: "/images/products/gym-coords/green-1.jpg",
          thumb: "/images/products/gym-coords/thumb-2.jpg",
          label: "Green",
        },
        {
          image: "/images/products/gym-coords/blue-1.jpg",
          thumb: "/images/products/gym-coords/thumb-3.jpg",
          label: "Blue",
        },
      ],
      price: 15,
      badge: "featured",
      rating: 0,
      offerLabel: "Limited Time Offer: 10% off",
    },
    {
      id: "mega-dress",
      href: "/#mini-dress",
      brand: "Glamour Gaze",
      name: "Mini Dress",
      variantDisplay: "swatches",
      defaultVariantIndex: 0,
      variants: [
        {
          image: "/images/products/mega/mini-dress-purple.jpg",
          color: "#ac69d8",
          label: "Purple",
        },
        {
          image: "/images/products/mega/mini-dress-green.jpg",
          color: "#2f9348",
          label: "Green",
        },
        {
          image: "/images/products/mega/mini-dress-brown.jpg",
          color: "#8B5A3C",
          label: "Brown",
        },
      ],
      price: 15.2,
      compareAtPrice: 16,
      discountPercent: 5,
      rating: 0,
      offerLabel: "Limited Time Offer: 5% off",
    },
  ] satisfies BasicProductCardData[],
};

export const productMega = {
  stacks: [
    {
      sections: [
        {
          title: "Product Page",
          links: [
            { label: "Product Thumbnail", href: "/" },
            { label: "Product Images", href: "/#product-images" },
            { label: "Product Slider", href: "/#product-slider" },
            { label: "Product Accordion", href: "/#product-accordion" },
            { label: "Product Sticky", href: "/#product-sticky" },
            { label: "Product Vertical Tab", href: "/#product-vertical-tab" },
          ],
        },
        {
          title: "Product Features",
          links: [
            { label: "Product Simple", href: "/#product-simple" },
            { label: "Product Classified", href: "/#product-classified" },
            { label: "Size Chart", href: "/#size-chart" },
            { label: "Delivery & Return", href: "/#delivery-return" },
            { label: "Product Review", href: "/#product-review" },
            { label: "Ask an Expert", href: "/#ask-expert" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: "Product Page",
          links: [
            { label: "Product Sidebar Left", href: "/#sidebar-left" },
            { label: "Product Sidebar Right", href: "/#sidebar-right" },
            { label: "Product No Sidebar", href: "/#no-sidebar" },
            { label: "Product Column Thumbnail", href: "/#column-thumbnail" },
            { label: "Product Thumbnail Image Outside", href: "/#thumbnail-outside" },
          ],
        },
        {
          title: "Product Features",
          links: [
            { label: "Bundle (Cross Sale)", href: "/#bundle" },
            { label: "Hot Stock Progress", href: "/#hot-stock" },
            { label: "Out Stock", href: "/#out-stock" },
            { label: "Sale Countdown", href: "/#sale-countdown" },
            { label: "Product Zoom", href: "/#product-zoom" },
          ],
        },
      ],
    },
    {
      sections: [
        {
          title: "Product Variants Style",
          links: [
            { label: "Variant Rectangle", href: "/#variant-rectangle" },
            { label: "Variant Circle", href: "/#variant-circle" },
            { label: "Variant Image Swatch", href: "/" },
            { label: "Variant Color", href: "/#variant-color" },
            { label: "Variant Radio Button", href: "/#variant-radio" },
            { label: "Variant Dropdown", href: "/#variant-dropdown" },
          ],
        },
        {
          title: "Product Features",
          links: [
            { label: "Sticky Checkout", href: "/#sticky-checkout" },
            { label: "Secure Checkout", href: "/#secure-checkout" },
            { label: "Social Share", href: "/#social-share" },
            { label: "Related Products", href: "/#related-products" },
            { label: "Wishlist & Compare", href: "/#wishlist-compare" },
          ],
        },
      ],
    },
  ] satisfies MegaColumnStack[],
  banner: {
    href: "/#theme-promo",
    image: "/images/mega/mega_menu_3.png",
    alt: "Multikart - The Best Minimal Theme",
  },
};
