"use client";

import Stack from "@mui/material/Stack";
import type { StackProps } from "@mui/material/Stack";

type Responsive<T> = T | { xs?: T; sm?: T; md?: T; lg?: T };

type AppStackProps = StackProps & {
  alignItems?: Responsive<string>;
  justifyContent?: Responsive<string>;
  flexWrap?: Responsive<string>;
  gap?: Responsive<number | string>;
  mb?: number | string;
};

export function AppStack({
  alignItems,
  justifyContent,
  flexWrap,
  gap,
  mb,
  sx,
  ...props
}: AppStackProps) {
  return (
    <Stack
      sx={[
        {
          ...(alignItems ? { alignItems } : {}),
          ...(justifyContent ? { justifyContent } : {}),
          ...(flexWrap ? { flexWrap } : {}),
          ...(gap !== undefined ? { gap } : {}),
          ...(mb !== undefined ? { mb } : {}),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    />
  );
}
