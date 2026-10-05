import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

export function createEmotionCache(direction: "ltr" | "rtl") {
  return createCache({
    key: direction === "rtl" ? "mui-rtl" : "mui",
    stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [prefixer],
  });
}
