export const APP_NAME = "Multikart";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const LAYOUT_MAX_WIDTH = 1400;
export const LAYOUT_MAX_WIDTH_BREAKPOINT = 1430;
export const LAYOUT_GUTTER_X = "1.5rem";

export const THEME_COLOR = "#ec8951";
export const THEME_COLOR_HOVER = "#d67a43";
export const INK_COLOR = "#222222";
export const NAV_LINK_COLOR = "#333333";
export const NAV_CHEVRON_COLOR = "#333333";
export const MUTED_COLOR = "#777777";

export const NAV_BAR_MIN_HEIGHT = 88;
export const NAV_LINK_FONT_SIZE = 16;
export const NAV_LINK_FONT_WEIGHT = 500;
export const NAV_ICON_SIZE = 22;
export const NAV_CHEVRON_SIZE = 12;
export const LOGO_WIDTH = 175;
export const LOGO_HEIGHT = 36;
export const SURFACE_COLOR = "#ffffff";
export const PAGE_TINT = "#f8f8f8";
export const BORDER_COLOR = "#dddddd";

export const DEFAULT_PRODUCT_SLUG = "gym-coords-set";

export const STORAGE_KEYS = {
  direction: "eco.direction",
  cart: "eco.cart",
} as const;
