import { createTheme } from "@mui/material/styles";
import type { Direction } from "@mui/material/styles";
import {
  BORDER_COLOR,
  INK_COLOR,
  MUTED_COLOR,
  PAGE_TINT,
  THEME_COLOR,
  THEME_COLOR_HOVER,
} from "@/core/constants/app.constants";

export function createAppTheme(direction: Direction) {
  return createTheme({
    direction,
    palette: {
      primary: {
        main: THEME_COLOR,
        dark: THEME_COLOR_HOVER,
        contrastText: "#ffffff",
      },
      text: {
        primary: INK_COLOR,
        secondary: MUTED_COLOR,
      },
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      },
      divider: BORDER_COLOR,
    },
    typography: {
      fontFamily: "var(--font-montserrat), Montserrat, sans-serif",
      button: {
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      },
      h1: { fontWeight: 600, letterSpacing: "0.04em" },
      h2: { fontWeight: 600, letterSpacing: "0.03em" },
      h3: { fontWeight: 600 },
      body1: { fontSize: 14, lineHeight: 1.7 },
      body2: { fontSize: 13, lineHeight: 1.7 },
    },
    shape: { borderRadius: 2 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "#ffffff",
            color: INK_COLOR,
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 2,
            minHeight: 46,
            paddingInline: 22,
          },
          contained: {
            "&.MuiButton-containedPrimary:hover": {
              backgroundColor: THEME_COLOR_HOVER,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: { borderRadius: 2 },
        },
      },
      MuiContainer: {
        defaultProps: { maxWidth: "xl" },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            minHeight: 48,
            letterSpacing: 0,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 2,
            backgroundColor: PAGE_TINT,
          },
        },
      },
    },
  });
}
