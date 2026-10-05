"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { AppContainer } from "@/components/shared/ui";
import { LanguageFlag } from "@/components/layout/language-flag";
import { useDirection } from "@/core/providers/direction-provider";
import {
  currencyOptions,
  languageOptions,
  topBarCopy,
} from "@/features/layout/data/header.data";

export function TopBar() {
  const { direction, setDirection } = useDirection();
  const [language, setLanguage] = useState(languageOptions[0]);
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (langRef.current && !langRef.current.contains(target)) setLangOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(target)) setCurrencyOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <Box component="section" className="top-header">
      <AppContainer>
        <Box className="top-header__inner">
          <Box component="ul" className="header-contact">
            <Box component="li">{topBarCopy.welcome}</Box>
            <Box component="li">
              <i className="ri-phone-fill" aria-hidden />
              {topBarCopy.phone}
            </Box>
          </Box>

          <Box className="right-nav-about">
            <Box ref={langRef} className="right-nav-list theme-form-select">
              <Box
                component="button"
                type="button"
                className="dropdown-toggle"
                aria-expanded={langOpen}
                onClick={() => {
                  setLangOpen((open) => !open);
                  setCurrencyOpen(false);
                }}
              >
                <Box component="span" className="dropdown-toggle-label">
                  <LanguageFlag icon={language.icon} />
                  {language.toggleLabel}
                </Box>
                <Box component="i" className="ri-arrow-down-s-line dropdown-toggle-chevron" aria-hidden />
              </Box>

              {langOpen ? (
                <Box component="ul" className="dropdown-menu top-header-language-menu show">
                  {languageOptions.map((option) => (
                    <Box component="li" key={option.code}>
                      <Box
                        component="button"
                        type="button"
                        className={`dropdown-item${option.code === language.code ? " active" : ""}`}
                        onClick={() => {
                          setLanguage(option);
                          setDirection(option.code === "ar" ? "rtl" : "ltr");
                          setLangOpen(false);
                        }}
                      >
                        <LanguageFlag icon={option.icon} />
                        {option.label}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Box>

            <Box ref={currencyRef} className="right-nav-list theme-form-select">
              <Box
                component="button"
                type="button"
                className="dropdown-toggle"
                aria-expanded={currencyOpen}
                onClick={() => {
                  setCurrencyOpen((open) => !open);
                  setLangOpen(false);
                }}
              >
                <Box component="span">{currency.label}</Box>
                <Box component="i" className="ri-arrow-down-s-line dropdown-toggle-chevron" aria-hidden />
              </Box>

              {currencyOpen ? (
                <Box component="ul" className="dropdown-menu top-header-currency-menu show">
                  {currencyOptions.map((option) => (
                    <Box component="li" key={option.code}>
                      <Box
                        component="button"
                        type="button"
                        className={`dropdown-item${option.code === currency.code ? " active" : ""}`}
                        onClick={() => {
                          setCurrency(option);
                          setCurrencyOpen(false);
                        }}
                      >
                        {option.label}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      </AppContainer>

      <Box sx={{ display: "none" }}>{direction}</Box>
    </Box>
  );
}
