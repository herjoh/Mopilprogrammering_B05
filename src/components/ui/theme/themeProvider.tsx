import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Platform, useColorScheme, useWindowDimensions } from "react-native";
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
  const [hydrated, setHydrated] = useState(Platform.OS !== "web");
  useEffect(() => setHydrated(true), []);
  const scheme: "light" | "dark" = hydrated && systemScheme === "dark" ? "dark" : "light";

  const theme = useMemo(
    () => buildTheme(scheme, hydrated ? width : 0, hydrated ? height : 0),
    [scheme, hydrated, width, height],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
