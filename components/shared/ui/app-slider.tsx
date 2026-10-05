"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Swiper, type SwiperProps } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import Box from "@mui/material/Box";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

type AppSliderProps = SwiperProps & {
  children: ReactNode;
  fallbackHeight?: number | string;
  fallbackClassName?: string;
};

export function AppSlider({
  children,
  modules = [],
  fallbackHeight = 120,
  fallbackClassName,
  className,
  ...props
}: AppSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box
        className={["app-slider-fallback", fallbackClassName].filter(Boolean).join(" ")}
        sx={{
          width: "100%",
          minHeight: fallbackHeight,
          display: "flex",
          overflow: "hidden",
          gap: `${props.spaceBetween ?? 0}px`,
        }}
        aria-hidden
      >
        {children}
      </Box>
    );
  }

  return (
    <Swiper className={className} modules={[Navigation, Pagination, Thumbs, ...modules]} {...props}>
      {children}
    </Swiper>
  );
}

export { SwiperSlide as AppSliderSlide } from "swiper/react";
