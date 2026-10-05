"use client";

import { useEffect, useState } from "react";

type UseStickyProductBarOptions = {
  purchasePanelSelector?: string;
  bottomThreshold?: number;
  minWidth?: number;
};

const DEFAULT_STICKY_CART_MIN_WIDTH = 1200;

function isAtPageBottom(threshold = 24) {
  const scrollRoot = document.documentElement;
  return scrollRoot.scrollTop + window.innerHeight >= scrollRoot.scrollHeight - threshold;
}

/**
 * Shows the sticky cart bar once the inline purchase panel scrolls out of view,
 * and hides it only when the user reaches the very bottom of the page.
 */
export function useStickyProductBar(options: UseStickyProductBarOptions = {}) {
  const {
    purchasePanelSelector = "#product-form-box",
    bottomThreshold = 24,
    minWidth = DEFAULT_STICKY_CART_MIN_WIDTH,
  } = options;

  const [pastPurchasePanel, setPastPurchasePanel] = useState(false);
  const [atPageBottom, setAtPageBottom] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktopViewport(window.innerWidth >= minWidth);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, [minWidth]);

  useEffect(() => {
    if (!isDesktopViewport) {
      setPastPurchasePanel(false);
      return;
    }

    const purchasePanel = document.querySelector(purchasePanelSelector);

    if (!purchasePanel) {
      setPastPurchasePanel(false);
      return;
    }

    const panelObserver = new IntersectionObserver(
      ([entry]) => {
        setPastPurchasePanel(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-110px 0px 0px 0px",
      },
    );

    panelObserver.observe(purchasePanel);

    const updateBottomState = () => {
      setAtPageBottom(isAtPageBottom(bottomThreshold));
    };

    updateBottomState();
    window.addEventListener("scroll", updateBottomState, { passive: true });
    window.addEventListener("resize", updateBottomState);

    return () => {
      panelObserver.disconnect();
      window.removeEventListener("scroll", updateBottomState);
      window.removeEventListener("resize", updateBottomState);
    };
  }, [purchasePanelSelector, bottomThreshold, isDesktopViewport]);

  return isDesktopViewport && pastPurchasePanel && !atPageBottom;
}
