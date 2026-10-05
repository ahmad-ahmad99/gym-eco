"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

type UseProductGalleryHeightOptions = {
  galleryRef: RefObject<HTMLElement | null>;
  syncRef: RefObject<HTMLElement | null>;
  detailsRef?: RefObject<HTMLElement | null>;
  minWidth?: number;
  offset?: number;
};

export function useProductGalleryHeight({
  galleryRef,
  syncRef,
  detailsRef,
  minWidth = 1200,
  offset = 12,
}: UseProductGalleryHeightOptions) {
  const [height, setHeight] = useState<number | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      if (window.innerWidth < minWidth) {
        setHeight(null);
        return;
      }

      const gallery = galleryRef.current;
      const sync = syncRef.current;
      if (!gallery || !sync) {
        return;
      }

      const galleryTop = gallery.getBoundingClientRect().top;
      const syncTop = sync.getBoundingClientRect().top;
      const nextHeight = Math.max(280, Math.round(syncTop - galleryTop - offset));

      setHeight((current) => (current === nextHeight ? current : nextHeight));
    };

    update();

    const resizeObserver = new ResizeObserver(update);
    const gallery = galleryRef.current;
    const sync = syncRef.current;

    if (gallery) {
      resizeObserver.observe(gallery);
    }

    if (sync) {
      resizeObserver.observe(sync);
    }

    const details = detailsRef?.current;
    if (details) {
      resizeObserver.observe(details);
    }

    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [detailsRef, galleryRef, syncRef, minWidth, offset]);

  return height;
}
