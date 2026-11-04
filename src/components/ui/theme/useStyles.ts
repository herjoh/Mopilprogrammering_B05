import { useMemo } from "react";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";
import { Theme, useTheme } from "./themeProvider";

type Styles = { [key: string]: ViewStyle | TextStyle | ImageStyle}

export function useStyles<T extends Styles>(factory: (theme: Theme) => T) {
  const theme = useTheme();
  return useMemo(() => factory(theme), [factory, theme]);
}