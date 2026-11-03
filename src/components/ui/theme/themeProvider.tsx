import React, { createContext, useContext, useMemo } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import { breakpoints, fontSizes, palette, radii, shadows, spacing } from "./theme";

 
const buildTheme = (scheme: "light" | "dark", width: number, height: number) => ({
  colors: palette[scheme],
  spacing,
  radii,
  fontSizes,
  shadows,
  screen: {
    width,
    height,
    isTablet: width >= breakpoints.tablet,
    isLandscape: width > height,
  },
});

export type Theme = ReturnType<typeof buildTheme>;
const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { width, height } = useWindowDimensions();
  const systemScheme = useColorScheme();
  const scheme: "light" | "dark" = systemScheme === "dark" ? "dark" : "light";

  const theme = useMemo(() => buildTheme(scheme, width, height), [scheme, width, height]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
