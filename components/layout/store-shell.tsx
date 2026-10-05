import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import { Footer } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { StickyCartBar } from "@/components/layout/sticky-cart-bar";
import { ThemeSettings } from "@/components/layout/theme-settings";

export function StoreShell({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
      <StickyCartBar />
      <ScrollToTop />
      <ThemeSettings />
    </Box>
  );
}
