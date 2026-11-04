import { Theme } from "@/components/ui/theme/themeProvider";
import { useStyles } from "@/components/ui/theme/useStyles";
import { CasePage } from "@/pages/CasePage";
import { StyleSheet, Text, View } from "react-native";

export default function LandlordHomeScreen() {
  const styles = useStyles(makeStyles);
  
  return(
      <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Velkommen til Eiendomsmanager-appe</Text>
            <Text style={styles.subtitle}>Her kan du se alle dine leietakere's saker.</Text>
          </View >


      <CasePage />
    </View>
    );
}

const makeStyles = ({ colors, spacing, radii, fontSizes, shadows, screen }: Theme) =>
  StyleSheet.create({
    scroll: {
      flexGrow: 1,                 // lets content center when short, scroll when tall (landscape phones)
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
      backgroundColor: colors.background,
    },
    content: {
      width: "100%",
      maxWidth: screen.isTablet ? 560 : 420,   // responsive: wider card on tablets
    },
    header: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: screen.isTablet ? fontSizes.xl + 12 : fontSizes.xl,
      fontWeight: "bold",
      color: colors.primary,
    },
    subtitle: {
      fontSize: screen.isTablet ? fontSizes.lg : fontSizes.md,
      color: colors.textMuted,
      marginTop: spacing.xs,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.lg,
      gap: spacing.md,
      ...shadows.card,
    },
    sectionLabel: {
      fontSize: fontSizes.sm,
      color: colors.textMuted,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    // Side by side on landscape tablets, stacked otherwise
    row: {
      flexDirection: screen.isTablet && screen.isLandscape ? "row" : "column",
      gap: spacing.md,
    },
    button: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.md,
      alignItems: "center",
      flex: screen.isTablet && screen.isLandscape ? 1 : undefined,
    },
    buttonPrimary: { backgroundColor: colors.primary },
    buttonOutline: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    buttonDemo: { backgroundColor: colors.contrast },
    pressed: { opacity: 0.7 },
    buttonText: { fontSize: fontSizes.md, fontWeight: "600" },
    textOnPrimary: { color: colors.surface },
    textOnOutline: { color: colors.primary },
    textOnDemo: { color: "rgb(204, 21, 161)" },
  });
