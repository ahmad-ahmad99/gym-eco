"use client";

import { useMemo, type ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { DirectionProvider, useDirection } from "@/core/providers/direction-provider";
import { CartProvider } from "@/features/cart/context/cart-provider";
import { ProductViewProvider } from "@/features/product/context/product-view-context";
import { createAppTheme } from "@/core/theme/create-app-theme";

function ThemedApp({ children }: { children: ReactNode }) {
  const { direction } = useDirection();
  const theme = useMemo(() => createAppTheme(direction), [direction]);

  return (
    <AppRouterCacheProvider
      key={direction}
      options={{
        key: direction === "rtl" ? "mui-rtl" : "mui",
        enableCssLayer: true,
        stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [prefixer],
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CartProvider>
          <ProductViewProvider>{children}</ProductViewProvider>
        </CartProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <DirectionProvider>
      <ThemedApp>{children}</ThemedApp>
    </DirectionProvider>
  );
}
