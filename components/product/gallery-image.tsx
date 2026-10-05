"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { AppSkeleton } from "@/components/shared/ui";

type GalleryImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  ratio?: string;
};

export function GalleryImage({
  src,
  alt,
  fill = false,
  ratio = "443 / 517",
}: GalleryImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const markLoaded = () => setIsLoaded(true);

    if (image.complete && image.naturalWidth > 0) {
      markLoaded();
      return;
    }

    setIsLoaded(false);

    image.addEventListener("load", markLoaded);
    image.addEventListener("error", markLoaded);

    return () => {
      image.removeEventListener("load", markLoaded);
      image.removeEventListener("error", markLoaded);
    };
  }, [src]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: fill ? "100%" : "auto",
        aspectRatio: fill ? undefined : ratio,
        overflow: "hidden",
        bgcolor: "#f5f5f5",
      }}
    >
      {!isLoaded ? (
        <AppSkeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : null}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />
    </Box>
  );
}
