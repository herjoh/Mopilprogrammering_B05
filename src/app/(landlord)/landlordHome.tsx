import { Theme } from "@/components/ui/theme/themeProvider";
import { useStyles } from "@/components/ui/theme/useStyles";
import { CasePage } from "@/pages/CasePage";
import { StyleSheet, Text, View } from "react-native";

export default function LandlordHomeScreen() {
    const styles = useStyles(makeStyles);

  return(
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Velkommen til Eiendomsmanager-appe</Text>
            <Text style={styles.subtitle}>Her kan du se alle dine leietakere's saker.</Text>
          </View>

      <CasePage />
    </View>
    );
}

const makeStyles = ({ colors, spacing, radii, fontSizes, shadows, screen }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
      backgroundColor: colors.background,
    },
      form: {
      width: "100%",
      maxWidth: screen.isTablet ? 480 : 400,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.lg,
      ...shadows.card,
    },
    content: {
      width: "100%",
      maxWidth: screen.isTablet ? 560 : 420,   // responsive: wider card on tablets
    },
    header: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
     label: {
      fontSize: fontSizes.sm,
      fontWeight: "600",
      color: colors.textMuted,
      marginBottom: spacing.xs,
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
      input: {
      backgroundColor: colors.background,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.secondaryTint,
      borderRadius: radii.md,
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.md,
      fontSize: fontSizes.md,
      marginBottom: spacing.md,
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
    buttonDisabled: { opacity: 0.5 },
    buttonPressed: { opacity: 0.8 },
    buttonText: {
      color: colors.surface,
      fontSize: fontSizes.md,
      fontWeight: "600",
    }
  });