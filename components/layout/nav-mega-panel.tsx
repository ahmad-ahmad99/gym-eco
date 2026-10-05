"use client";

import dynamic from "next/dynamic";
import Box from "@mui/material/Box";
import Link from "next/link";
import { AppImage } from "@/components/shared/ui";
import {
  collectionMega,
  productMega,
  type MegaSection,
} from "@/features/layout/data/header.data";

const BasicProductCard = dynamic(
  () =>
    import("@/components/product/basic-product-card").then((module) => module.BasicProductCard),
  { loading: () => null },
);

type NavMegaPanelProps = {
  activeMenu: "collection" | "product" | null;
};

export function NavMegaPanel({ activeMenu }: NavMegaPanelProps) {
  if (!activeMenu) return null;

  return (
    <Box className={`nav-mega-panel${activeMenu === "product" ? " nav-mega-panel--product" : ""}`}>
      {activeMenu === "collection" ? <CollectionMegaContent /> : <ProductMegaContent />}
    </Box>
  );
}

function CollectionMegaContent() {
  return (
    <Box className="mega-panel-grid mega-panel-grid--collection">
      {collectionMega.columns.map((column, index) => (
        <MegaLinksColumn key={`collection-col-${index}`} section={column} />
      ))}
      {collectionMega.products.map((product) => (
        <BasicProductCard
          key={product.id}
          product={product}
          imageSizes="(max-width: 1200px) 25vw, 320px"
          showVariants
        />
      ))}
    </Box>
  );
}

function ProductMegaContent() {
  const topSections = productMega.stacks.map((stack) => stack.sections[0]);
  const bottomSections = productMega.stacks.map((stack) => stack.sections[1]);

  return (
    <>
      <Box className="mega-panel-grid mega-panel-grid--product">
        {topSections.map((section, index) => (
          <MegaLinksColumn key={`product-top-${index}`} section={section} row="top" />
        ))}
        {bottomSections.map((section, index) => (
          <MegaLinksColumn key={`product-bottom-${index}`} section={section} row="bottom" />
        ))}
      </Box>
      <Box component={Link} href={productMega.banner.href} className="mega-promo-banner">
        <AppImage
          src={productMega.banner.image}
          alt={productMega.banner.alt}
          fill
          fit="cover"
          quality={90}
          sizes="260px"
        />
      </Box>
    </>
  );
}

function MegaLinksColumn({
  section,
  row,
}: {
  section: MegaSection;
  row?: "top" | "bottom";
}) {
  return (
    <Box className={row ? `mega-links-column mega-links-column--${row}` : "mega-links-column"}>
      <Box component="h5" className="mega-links-column__title">
        {section.title}
      </Box>
      <Box component="ul" className="mega-links-column__list">
        {section.links.map((link) => (
          <Box component="li" key={link.label}>
            <Box component={Link} href={link.href} className="mega-menu-link">
              {link.label}
              {link.hot ? (
                <Box component="span" className="menu-label">
                  Hot
                </Box>
              ) : null}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
