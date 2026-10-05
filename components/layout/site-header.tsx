"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Header } from "@/components/layout/header";
import { TopBar } from "@/components/layout/top-bar";
import { NAV_BAR_MIN_HEIGHT } from "@/core/constants/app.constants";
import { useStickyHeader } from "@/core/hooks/use-sticky-header";

const STICKY_NAV_MIN_WIDTH = 1200;

export function SiteHeader() {
  const topBarRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { isSticky } = useStickyHeader(topBarRef);
  const [navHeight, setNavHeight] = useState(NAV_BAR_MIN_HEIGHT);
  const [stickyNavEnabled, setStickyNavEnabled] = useState(false);

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const measureNav = () => {
      setNavHeight(navEl.offsetHeight);
      setStickyNavEnabled(window.innerWidth >= STICKY_NAV_MIN_WIDTH);
    };

    measureNav();
    const resizeObserver = new ResizeObserver(measureNav);
    resizeObserver.observe(navEl);
    window.addEventListener("resize", measureNav);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureNav);
    };
  }, []);

  const navIsSticky = stickyNavEnabled && isSticky;

  return (
    <Box component="header" sx={{ position: "relative", zIndex: 1200 }}>
      <Box ref={topBarRef}>
        <TopBar />
      </Box>

      {navIsSticky ? <Box aria-hidden sx={{ height: navHeight }} /> : null}

      <Box
        ref={navRef}
        sx={{
          position: navIsSticky ? "fixed" : "relative",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          bgcolor: "#fff",
          transition: "box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: navIsSticky ? "0 8px 28px rgba(0, 0, 0, 0.1)" : "none",
          animation: navIsSticky ? "navSlideDown 0.35s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          "@keyframes navSlideDown": {
            from: { transform: "translateY(-100%)" },
            to: { transform: "translateY(0)" },
          },
        }}
      >
        <Header />
      </Box>
    </Box>
  );
}
