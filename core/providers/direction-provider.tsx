"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Direction } from "@mui/material/styles";
import { STORAGE_KEYS } from "@/core/constants/app.constants";

type DirectionContextValue = {
  direction: Direction;
  toggleDirection: () => void;
  setDirection: (value: Direction) => void;
};

const DirectionContext = createContext<DirectionContextValue | null>(null);

export function useDirection() {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error("useDirection must be used within DirectionProvider");
  }
  return context;
}

export function DirectionProvider({ children }: { children: ReactNode }) {
  const [direction, setDirectionState] = useState<Direction>("ltr");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.direction);
    if (stored === "rtl" || stored === "ltr") {
      setDirectionState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", direction === "rtl" ? "ar" : "en");
    window.localStorage.setItem(STORAGE_KEYS.direction, direction);
  }, [direction]);

  const value = useMemo<DirectionContextValue>(
    () => ({
      direction,
      setDirection: setDirectionState,
      toggleDirection: () =>
        setDirectionState((current) => (current === "rtl" ? "ltr" : "rtl")),
    }),
    [direction],
  );

  return <DirectionContext.Provider value={value}>{children}</DirectionContext.Provider>;
}
