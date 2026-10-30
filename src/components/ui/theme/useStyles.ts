import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Theme, useTheme } from "./themeProvider";

export function useStyles<T extends StyleSheet.NamedStyles<T>>(factory: (theme: Theme) => T) {
  const theme = useTheme();
  return useMemo(() => factory(theme), [factory, theme]);
}