import type { Viewport } from "next";
import { THEME_COLOR } from "@/core/constants/app.constants";

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: "device-width",
  initialScale: 1,
};
