"use client";

import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { MUTED_COLOR } from "@/core/constants/app.constants";
import type { BreadcrumbItem } from "@/features/product/models/product.model";

type AppBreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const crumbTextSx = {
  fontSize: { xs: 12, md: 13 },
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: MUTED_COLOR,
  fontWeight: 400,
  lineHeight: 1.4,
};

export function AppBreadcrumbs({ items }: AppBreadcrumbsProps) {
  return (
    <Breadcrumbs
      separator="/"
      sx={{
        justifyContent: "center",
        "& .MuiBreadcrumbs-separator": {
          mx: 0.8,
          color: MUTED_COLOR,
          fontSize: 13,
        },
        "& .MuiTypography-root, & a": crumbTextSx,
        "& a:hover": {
          color: "#222",
        },
      }}
    >
      {items.map((item) =>
        item.href ? (
          <Link key={item.label} component={NextLink} href={item.href} underline="none" sx={crumbTextSx}>
            {item.label}
          </Link>
        ) : (
          <Typography key={item.label} sx={crumbTextSx}>
            {item.label}
          </Typography>
        ),
      )}
    </Breadcrumbs>
  );
}
