"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { AppIcon, AppStack } from "@/components/shared/ui";
import { useDirection } from "@/core/providers/direction-provider";

export function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const { direction, setDirection } = useDirection();

  return (
    <>
      <Box
        component="button"
        className="theme-customize-tab"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          top: "42%",
          right: 0,
          zIndex: 25,
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          border: 0,
          bgcolor: "#222",
          color: "#fff",
          px: 1,
          py: 1.5,
          letterSpacing: "0.12em",
          fontSize: 11,
          fontFamily: "inherit",
          cursor: "pointer",
        }}
      >
        CUSTOMIZE
      </Box>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 320, p: 3 }}>
          <AppStack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Theme Setting</Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="Close settings">
              <AppIcon name="close" />
            </IconButton>
          </AppStack>
          <AppStack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontWeight: 700 }}>RTL Mode</Typography>
              <Typography variant="body2" color="text.secondary">
                Change Language Direction
              </Typography>
            </Box>
            <Switch
              checked={direction === "rtl"}
              onChange={(_, checked) => setDirection(checked ? "rtl" : "ltr")}
            />
          </AppStack>
        </Box>
      </Drawer>
    </>
  );
}
