import { Theme, useTheme } from "@/components/ui/theme/themeProvider";
import { useStyles } from "@/components/ui/theme/useStyles";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/features/users/user-service";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import AlretMessage from "../components/ui/AlertMessage";

export default function Login() {
  const { switchUser } = useAuth();
  const {colors} = useTheme();  
  const styles = useStyles(makeStyles);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const result = await userService.login(email, password);

      if (!result.success) {
        setError(result.error);
        return;
      }

      switchUser(result.data.id);
    } catch {
      setError("Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <View style={styles.container}>
        <View style = {styles.header}>
          <Text style={styles.title}>Logg inn</Text>
        </View>

        <Text style={styles.label}>E-post</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv inn e-post"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Passord</Text>
        <TextInput
          style={styles.input}
          placeholder="Skriv inn passord"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <AlretMessage message={error} />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
        <Text style={styles.buttonText}>
          {loading ? "Logger inn..." : "Logg inn"}
        </Text>
      </Pressable>
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