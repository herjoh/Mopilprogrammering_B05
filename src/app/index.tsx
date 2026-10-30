import { Theme, useTheme } from "@/components/ui/theme/themeProvider";
import { useStyles } from "@/components/ui/theme/useStyles";
import { useAuth } from "@/context/AuthContext";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

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

export default function Index() {
    const {switchUser} = useAuth();
    const theme = useTheme();  
    const styles = useStyles(makeStyles);
  
  return(
    <ScrollView contentContainerStyle= {styles.scroll}>
      <View style={styles.content}>
        <View style={styles.header}>
           <Text style={styles.title}>Fiksa!!!</Text>
           <Text style={styles.subtitle}>Fiksa dit problem!</Text>
        </View>
       
        <View style={styles.card}>
          <Link href="/login" asChild>
            <Pressable style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.pressed,]}>
              <Text style={[styles.buttonText, styles.textOnOutline]}>Login</Text>
            </Pressable>
            </Link>

          <Link href="/about" asChild>
            <Pressable style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.pressed,]}>
              <Text style={[styles.buttonText, styles.textOnOutline]}>About</Text>
            </Pressable>
            </Link>

      <Text style={styles.sectionLabel}>Demo test innloging for leietaker & utleier</Text>
        <View style={styles.row}>
          <Pressable style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.pressed,]}
            onPress={() => switchUser("u1")}>
              <Text style={[styles.buttonText, styles.textOnDemo]}>Fortsett som Kari (leietaker)</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.pressed,]}
            onPress={() => switchUser("u2")}>
              <Text style={[styles.buttonText, styles.textOnDemo]}>Fortsett som Ola (utleier)</Text>
          </Pressable>
                </View>
        </View>
      </View>
    </ScrollView>
  );

}

