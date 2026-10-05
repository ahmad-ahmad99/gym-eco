"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import {
  collectionMega,
  headerNav,
  productMega,
  type NavLink,
} from "@/features/layout/data/header.data";
import "@/styles/mobile-nav.css";

type MobileNavDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type MobileSubLink = {
  label: string;
  href: string;
};

function getSubLinks(item: NavLink): MobileSubLink[] {
  if (item.mega === "collection") {
    return collectionMega.columns.flatMap((column) =>
      column.links.map((link) => ({ label: link.label, href: link.href })),
    );
  }

  if (item.mega === "product") {
    return productMega.stacks.flatMap((stack) =>
      stack.sections.flatMap((section) =>
        section.links.map((link) => ({ label: link.label, href: link.href })),
      ),
    );
  }

  return [];
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const panelId = useId();
  const [expandedLabel, setExpandedLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setExpandedLabel(null);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        className={`mobile-nav-overlay${open ? " is-open" : ""}`}
        aria-label="Close menu"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />

      <aside
        id={panelId}
        className={`mobile-nav-drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="mobile-nav-drawer__head">
          <BrandLogo />
          <button type="button" className="mobile-nav-drawer__close" aria-label="Close menu" onClick={onClose}>
            <i className="ri-close-line" aria-hidden />
          </button>
        </div>

        <nav className="mobile-nav-drawer__nav" aria-label="Mobile navigation">
          <ul className="mobile-nav-list">
            {headerNav.map((item) => {
              const subLinks = getSubLinks(item);
              const hasSub = subLinks.length > 0 || item.hasDropdown;
              const isExpanded = expandedLabel === item.label;

              if (!hasSub) {
                return (
                  <li key={item.label} className="mobile-nav-list__item">
                    <Link href={item.href} className="mobile-nav-list__link" onClick={onClose}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.label} className="mobile-nav-list__item mobile-nav-list__item--has-sub">
                  <button
                    type="button"
                    className={`mobile-nav-list__toggle${isExpanded ? " is-open" : ""}`}
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedLabel(isExpanded ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <i className="ri-arrow-down-s-line" aria-hidden />
                  </button>

                  {subLinks.length > 0 ? (
                    <ul className={`mobile-nav-sublist${isExpanded ? " is-open" : ""}`}>
                      {subLinks.map((link) => (
                        <li key={`${item.label}-${link.label}`}>
                          <Link href={link.href} className="mobile-nav-sublist__link" onClick={onClose}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className={`mobile-nav-sublist${isExpanded ? " is-open" : ""}`}>
                      <li>
                        <Link href={item.href} className="mobile-nav-sublist__link" onClick={onClose}>
                          View {item.label}
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-nav-drawer__actions">
          <Link href="/#wishlist" className="mobile-nav-action" onClick={onClose}>
            <i className="ri-heart-line" aria-hidden />
            Wishlist
          </Link>
          <Link href="/#account" className="mobile-nav-action" onClick={onClose}>
            <i className="ri-user-line" aria-hidden />
            My Account
          </Link>
        </div>
      </aside>
    </>
  );
}
