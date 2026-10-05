"use client";

import Button, { type ButtonProps } from "@mui/material/Button";

type AppButtonProps = ButtonProps & {
  fullWidthOnMobile?: boolean;
};

export function AppButton({
  children,
  fullWidthOnMobile,
  variant = "contained",
  sx,
  ...props
}: AppButtonProps) {
  return (
    <Button
      variant={variant}
      color="primary"
      sx={{
        fontSize: 13,
        ...(fullWidthOnMobile ? { width: { xs: "100%", sm: "auto" } } : null),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
