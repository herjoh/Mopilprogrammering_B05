import type { Case } from "@/constants/types";
import { StyleSheet, Text, View } from "react-native";

export type CaseItemProps = Omit<Case, "tenantId" | "propertyId">;


// CaseItemProps inneholder de tiltenkte propsene jeg tenkte en Case/CaseItem vil ha. // mulighet for endring
export function CaseItem(props: CaseItemProps) { 
    return (
        <View style={styles.CaseItemCard}>
            <Text>{props.title}</Text>
            <Text>{props.description}</Text>
            <Text>{props.status}</Text>
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