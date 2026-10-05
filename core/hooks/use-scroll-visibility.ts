"use client";

import { useEffect, useState } from "react";

type Options = {
  offset?: number;
};

export function useScrollVisibility({ offset = 360 }: Options = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > offset);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return visible;
}

export function useNearPageEnd(threshold = 0.72) {
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const progress = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      setNearEnd(progress >= threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return nearEnd;
}
