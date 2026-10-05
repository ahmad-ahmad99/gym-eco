import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";

export function AppContainer({ children, sx, className, ...props }: BoxProps) {
  return (
    <Box className={className ? `container ${className}` : "container"} sx={sx} {...props}>
      {children}
    </Box>
  );
}
