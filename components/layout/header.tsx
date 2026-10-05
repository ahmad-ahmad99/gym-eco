"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import { AppContainer } from "@/components/shared/ui";
import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { NavMegaPanel } from "@/components/layout/nav-mega-panel";
import { useCart } from "@/features/cart/context/cart-provider";
import { headerNav } from "@/features/layout/data/header.data";
import "@/styles/mobile-nav.css";

const CLOSE_DELAY_MS = 150;
const DESKTOP_NAV_MIN = 1200;

export function Header() {
  const { itemCount } = useCart();
  const [activeMenu, setActiveMenu] = useState<"collection" | "product" | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDesktopNav, setIsDesktopNav] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartCount = itemCount || 3;

  const closeMenus = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(null);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(closeMenus, CLOSE_DELAY_MS);
  }, [closeMenus]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(
    (menu: "collection" | "product") => {
      if (typeof window !== "undefined" && window.innerWidth < DESKTOP_NAV_MIN) {
        return;
      }
      cancelClose();
      setActiveMenu(menu);
    },
    [cancelClose],
  );

  useEffect(() => {
    const handleScroll = () => {
      closeMenus();
      setMobileNavOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
        setMobileNavOpen(false);
      }
    };

    const handleResize = () => {
      const desktop = window.innerWidth >= DESKTOP_NAV_MIN;
      setIsDesktopNav(desktop);
      closeMenus();
      if (desktop) {
        setMobileNavOpen(false);
      }
    };

    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [closeMenus]);

  return (
    <Box
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      sx={{
        bgcolor: "#fff",
        position: "relative",
        overflow: "visible",
      }}
    >
      <AppContainer>
        <Box className="main-menu">
          <BrandLogo />

          <Box className="menu-right">
            <Box className="menu-right__bar">
              <button
                type="button"
                className="mobile-nav-toggle"
                aria-label="Open menu"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen(true)}
              >
                <i className="ri-menu-line" aria-hidden />
              </button>

              <Box component="ul" className="navbar-nav desktop-nav">
                {headerNav.map((item) => {
                  const isActive = item.mega ? activeMenu === item.mega : false;
                  const showChevron = Boolean(item.mega || item.hasDropdown);

                  return (
                    <Box
                      component="li"
                      key={item.label}
                      onMouseEnter={() => {
                        if (item.mega) openMenu(item.mega);
                        else closeMenus();
                      }}
                    >
                      <Box
                        component={Link}
                        href={item.href}
                        className={`nav-link${isActive ? " is-active" : ""}`}
                      >
                        {item.label}
                        {showChevron ? (
                          <Box
                            component="i"
                            className="ri-arrow-down-s-line nav-chevron"
                            aria-hidden
                            sx={{
                              transform: isActive && item.mega ? "rotate(180deg)" : "none",
                              transition: "transform 0.2s ease",
                            }}
                          />
                        ) : null}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box component="ul" className="icon-nav">
                <Box component="li">
                  <Box className="onhover-div mobile-search">
                    <Box component="div">
                      <Box component="i" className="ri-search-line" aria-hidden />
                    </Box>
                  </Box>
                </Box>
                <Box component="li" className="icon-nav__wishlist">
                  <Box className="onhover-div mobile-wishlist">
                    <Box component="div">
                      <Box component="i" className="ri-heart-line" aria-hidden />
                    </Box>
                  </Box>
                </Box>
                <Box component="li">
                  <Box className="onhover-div onhover-dropdown mobile-cart">
                    <Box component="div">
                      <Box component="i" className="ri-shopping-cart-line" aria-hidden />
                      <Box component="span" className="cart_qty_cls">
                        {cartCount}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box component="li" className="icon-nav__account">
                  <Box className="onhover-div onhover-dropdown mobile-account">
                    <Box component="div">
                      <Box component="i" className="ri-user-line" aria-hidden />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            {isDesktopNav ? <NavMegaPanel activeMenu={activeMenu} /> : null}
          </Box>
        </Box>
      </AppContainer>

      <MobileNavDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </Box>
  );
}
