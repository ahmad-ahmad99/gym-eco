"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AppIcon } from "@/components/shared/ui/app-icon";
import { AppImage } from "@/components/shared/ui/app-image";
import { PURCHASE_PANEL } from "@/core/constants/purchase-panel.constants";

type AppQuantityFieldProps = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  variant?: "default" | "chevron" | "panel";
  fullWidth?: boolean;
};

export function AppQuantityField({
  value,
  min = 1,
  max = 99,
  onChange,
  variant = "default",
  fullWidth = false,
}: AppQuantityFieldProps) {
  if (variant === "panel") {
    const divider = PURCHASE_PANEL.quantityBorderColor;
    const btnSize = PURCHASE_PANEL.quantityBtnSize;

    return (
      <Box sx={{ display: "flex", justifyContent: "center", width: fullWidth ? "100%" : "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            width: PURCHASE_PANEL.quantityWidth,
            maxWidth: "100%",
            px: `${PURCHASE_PANEL.quantityInnerPaddingX}px`,
            py: `${PURCHASE_PANEL.quantityInnerPaddingY}px`,
            border: `1px solid ${divider}`,
            borderRadius: `${PURCHASE_PANEL.borderRadius}px`,
            bgcolor: PURCHASE_PANEL.quantityBg,
          }}
        >
          <IconButton
            aria-label="Decrease quantity"
            onClick={() => onChange(Math.max(min, value - 1))}
            sx={{
              width: btnSize,
              height: btnSize,
              flexShrink: 0,
              borderRadius: "2px",
              bgcolor: "#fff",
              border: `1px solid ${divider}`,
              p: 0,
              boxShadow: "none",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <AppImage src="/images/icons/qty-chevron-left.svg" alt="" width={8} height={12} aria-hidden />
          </IconButton>

          <Typography
            component="span"
            sx={{
              flex: 1,
              textAlign: "center",
              fontWeight: 500,
              fontSize: 15,
              color: "#333",
              userSelect: "none",
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>

          <IconButton
            aria-label="Increase quantity"
            onClick={() => onChange(Math.min(max, value + 1))}
            sx={{
              width: btnSize,
              height: btnSize,
              flexShrink: 0,
              borderRadius: "2px",
              bgcolor: "#fff",
              border: `1px solid ${divider}`,
              p: 0,
              boxShadow: "none",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <AppImage src="/images/icons/qty-chevron-right.svg" alt="" width={8} height={12} aria-hidden />
          </IconButton>
        </Box>
      </Box>
    );
  }

  const decreaseIcon = variant === "chevron" ? "chevronLeft" : "minus";
  const increaseIcon = variant === "chevron" ? "chevronRight" : "plus";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "stretch",
        border: "1px solid #dddddd",
        borderRadius: 0,
        overflow: "hidden",
        minWidth: fullWidth ? "100%" : 132,
        width: fullWidth ? "100%" : "auto",
        bgcolor: "#fff",
        height: 50,
      }}
    >
      <IconButton
        size="small"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        sx={{
          borderRadius: 0,
          width: 50,
          flexShrink: 0,
          borderRight: "1px solid #dddddd",
          color: "#888",
          "&:hover": { bgcolor: "#fafafa" },
        }}
      >
        <AppIcon name={decreaseIcon} sx={{ fontSize: 18 }} />
      </IconButton>
      <Typography
        component="span"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 15,
          color: "#222",
          userSelect: "none",
          bgcolor: "#fff",
        }}
      >
        {value}
      </Typography>
      <IconButton
        size="small"
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        sx={{
          borderRadius: 0,
          width: 50,
          flexShrink: 0,
          borderLeft: "1px solid #dddddd",
          color: "#888",
          "&:hover": { bgcolor: "#fafafa" },
        }}
      >
        <AppIcon name={increaseIcon} sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
}
