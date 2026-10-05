import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { AppProviders } from "@/core/providers/app-providers";
import { StoreShell } from "@/components/layout/store-shell";
import { siteMetadata } from "@/core/seo/site-metadata";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable} suppressHydrationWarning>
      <body className={montserrat.className} suppressHydrationWarning>
        <AppProviders>
          <StoreShell>{children}</StoreShell>
        </AppProviders>
      </body>
    </html>
  );
}
