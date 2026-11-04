import { Theme } from '@/components/ui/theme/themeProvider';
import { useStyles } from '@/components/ui/theme/useStyles';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface CaseLayoutProps {
    title?: string;
    children?: React.ReactNode;
}

export function CaseLayout({ title, children }: CaseLayoutProps) {
    const styles = useStyles(makeStyles);
    return (
        <ScrollView>
            <View style={styles.container}>
                {title && <Text style={styles.title}>{title}</Text>}
                {children}
            </View>
        </ScrollView>
    )
}
// CaseLayout er tiltenkt som en wrapper for å enkelt style og sette CaseList og CaseItem inni.

const makeStyles = ({ colors, spacing, fontSizes }: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.md,
    },

    title: {
        fontSize: fontSizes.lg,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.md,
    }
})
// Enkel basis for styling