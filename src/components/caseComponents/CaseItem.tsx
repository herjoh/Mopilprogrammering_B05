import { Theme } from "@/components/ui/theme/themeProvider";
import type { Case, CaseStatus } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";
import { useStyles } from "../ui/theme/useStyles";

export type CaseItemProps = Omit<Case, "tenantId" | "propertyId">;


// CaseItemProps inneholder de tiltenkte propsene jeg tenkte en Case/CaseItem vil ha. // mulighet for endring
export function CaseItem({ onStatusChange, ...props }: CaseItemProps & { onStatusChange?: (status: CaseStatus) => void }) { 
    const styles = useStyles(makeStyles);
    return (
        <View style={styles.CaseItemCard}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
            {onStatusChange ? (
                <Picker style={styles.picker} selectedValue={props.status} onValueChange={(value) => onStatusChange(value as CaseStatus)}>
                    <Picker.Item label="åpen" value="open" />
                    <Picker.Item label="under arbeid" value="in progress" />
                    <Picker.Item label="venter på leietaker" value="pending tenant confirmation" />
                    <Picker.Item label="lukket" value="closed" />
                </Picker>
            ) : (
                <Text style={styles.status}>{props.status}</Text>
            )}
            <Text style={styles.meta}>{props.category}</Text>
            <Text style={styles.meta}>{props.severity}</Text>
            <Text style={styles.meta}>{props.createdAt}</Text>
        </View>
    )
}
// CaseItem er en default for hvordan en sak vil se ut, og hvilke props den vil ha. // mulighet for endring

const makeStyles = ({ colors, spacing, radii, fontSizes }: Theme) => StyleSheet.create ({
    CaseItemCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radii.md,
        borderColor: colors.secondaryTint,
        borderWidth: 1,
        marginBottom: spacing.md,
    },
    title: {
        fontSize: fontSizes.md,
        fontWeight: "bold",
        color: colors.text,
    },
    description: {
        fontSize: fontSizes.sm,
        color: colors.text,
    },
    status: {
        fontSize: fontSizes.sm,
        fontWeight: "600",
        color: colors.primary,
    },
    meta: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
    },
    picker: {
        backgroundColor: colors.surface,
        color: colors.text,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.secondaryTint,

    }
})