import type { Case, CaseStatus } from "@/types/types";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

export type CaseItemProps = Omit<Case, "tenantId" | "propertyId">;


// CaseItemProps inneholder de tiltenkte propsene jeg tenkte en Case/CaseItem vil ha. // mulighet for endring
export function CaseItem({ onStatusChange, ...props }: CaseItemProps & { onStatusChange?: (status: CaseStatus) => void }) { 
    return (
        <View style={styles.CaseItemCard}>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
            {onStatusChange ? (
                <Picker selectedValue={props.status} onValueChange={(value) => onStatusChange(value as CaseStatus)}>
                    <Picker.Item label="åpen" value="open" />
                    <Picker.Item label="under arbeid" value="in progress" />
                    <Picker.Item label="venter på leietaker" value="pending tenant confirmation" />
                    <Picker.Item label="lukket" value="closed" />
                </Picker>
            ) : (
                <Text>{props.status}</Text>
            )}
            <Text>{props.category}</Text>
            <Text>{props.severity}</Text>
            <Text>{props.createdAt}</Text>
        </View>
    )
}
// CaseItem er en default for hvordan en sak vil se ut, og hvilke props den vil ha. // mulighet for endring

const styles = StyleSheet.create ({
    CaseItemCard: {
        padding: 12,
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
    }
})