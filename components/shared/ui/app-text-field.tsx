"use client";

import TextField, { type TextFieldProps } from "@mui/material/TextField";

export function AppTextField(props: TextFieldProps) {
  return (
    <TextField
      size="small"
      fullWidth
      variant="outlined"
      {...props}
    />
  );
}
