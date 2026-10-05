"use client";

import { useEffect, useState, type RefObject } from "react";

type StickyHeaderState = {
  isSticky: boolean;
  topBarHeight: number;
};

export function useStickyHeader(topBarRef: RefObject<HTMLElement | null>) {
  const [state, setState] = useState<StickyHeaderState>({
    isSticky: false,
    topBarHeight: 0,
  });

  useEffect(() => {
    const measure = () => {
      const topBarHeight = topBarRef.current?.offsetHeight ?? 0;
      const isSticky = window.scrollY >= topBarHeight;
      setState((current) =>
        current.isSticky === isSticky && current.topBarHeight === topBarHeight
          ? current
          : { isSticky, topBarHeight },
      );
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [topBarRef]);

  return state;
}
