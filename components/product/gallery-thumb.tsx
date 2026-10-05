"use client";

import { useEffect, useRef, useState } from "react";
import { AppSkeleton } from "@/components/shared/ui";

type GalleryThumbProps = {
  src: string;
  alt: string;
  isActive: boolean;
  onSelect: () => void;
};

export function GalleryThumb({ src, alt, isActive, onSelect }: GalleryThumbProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const markLoaded = () => setIsLoaded(true);

    setIsLoaded(false);

    if (image.complete && image.naturalWidth > 0) {
      markLoaded();
      return;
    }

    image.addEventListener("load", markLoaded);
    image.addEventListener("error", markLoaded);

    return () => {
      image.removeEventListener("load", markLoaded);
      image.removeEventListener("error", markLoaded);
    };
  }, [src]);

  return (
    <li className={isActive ? "active" : undefined}>
      <button type="button" onClick={onSelect} aria-label={alt} aria-current={isActive}>
        <div className="slider-image gallery-thumb__frame">
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
            key={src}
            ref={imageRef}
            className={`gallery-thumb__image${isLoaded ? " is-loaded" : ""}`}
            src={src}
            alt={alt}
            loading="eager"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </button>
    </li>
  );
}
