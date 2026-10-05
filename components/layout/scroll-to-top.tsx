"use client";

import Box from "@mui/material/Box";
import { useScrollVisibility } from "@/core/hooks/use-scroll-visibility";
import { useStickyProductBar } from "@/core/hooks/use-sticky-product-bar";

export function ScrollToTop() {
  const visible = useScrollVisibility({ offset: 420 });
  const stickyCartVisible = useStickyProductBar();

  return (
    <Box
      className={`compare-tap-top-box${visible ? " is-visible" : ""}`}
      sx={{
        bottom: stickyCartVisible ? { xs: 92, md: 108 } : { xs: 30, md: 30 },
        transition: "all 0.5s ease, bottom 0.32s ease",
      }}
    >
      <Box
        component="button"
        type="button"
        className="tap-top"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Box component="div">
          <i className="ri-arrow-up-double-line" aria-hidden />
        </Box>
      </Box>
    </Box>
  );
}
