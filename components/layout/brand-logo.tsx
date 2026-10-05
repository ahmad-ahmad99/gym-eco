import Box from "@mui/material/Box";
import Link from "next/link";
import { AppImage } from "@/components/shared/ui";
import { LOGO_HEIGHT, LOGO_WIDTH } from "@/core/constants/app.constants";

type BrandLogoProps = {
  invert?: boolean;
};

export function BrandLogo({ invert = false }: BrandLogoProps) {
  return (
    <Box component={Link} href="/" className="brand-logo">
      <AppImage
        src={invert ? "/images/brand/logo-light.svg" : "/images/brand/logo.svg"}
        alt="Multikart"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority
        style={{ objectFit: "contain" }}
      />
    </Box>
  );
}
