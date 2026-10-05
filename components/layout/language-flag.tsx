import Box from "@mui/material/Box";

type LanguageFlagProps = {
  icon: string;
};

export function LanguageFlag({ icon }: LanguageFlagProps) {
  return <Box component="span" className={`iti-flag ${icon}`} aria-hidden />;
}
