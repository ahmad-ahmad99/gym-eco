import Box from "@mui/material/Box";
import { AppImage } from "@/components/shared/ui";
import { NAV_ICON_SIZE } from "@/core/constants/app.constants";

type HeaderNavIconProps = {
  src: string;
  alt: string;
};

export function HeaderNavIcon({ src, alt }: HeaderNavIconProps) {
  return (
    <Box
      sx={{
        width: NAV_ICON_SIZE,
        height: NAV_ICON_SIZE,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <AppImage
        src={src}
        alt={alt}
        width={NAV_ICON_SIZE}
        height={NAV_ICON_SIZE}
        style={{ display: "block" }}
      />
    </Box>
  );
}
