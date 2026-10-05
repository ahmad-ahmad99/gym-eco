"use client";

import { useEffect } from "react";

export function usePrefetchImages(urls: string[]) {
  useEffect(() => {
    const prefetch = () => {
      urls.forEach((url) => {
        if (!url) return;
        const image = new window.Image();
        image.decoding = "async";
        image.src = url;
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(prefetch, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(prefetch, 1500);
    return () => clearTimeout(timeoutId);
  }, [urls]);
}
