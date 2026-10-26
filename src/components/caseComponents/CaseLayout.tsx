import { StyleSheet, Text, View } from 'react-native';

interface CaseLayoutProps {
    title?: string;
    children?: React.ReactNode;
}

export function CaseLayout({ title, children }: CaseLayoutProps) {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            {children}
        </View>
    )
}
// CaseLayout er tiltenkt som en wrapper for å enkelt style og sette CaseList og CaseItem inni.

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    }
})
// Enkel basis for styling