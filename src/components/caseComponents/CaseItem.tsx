import { StyleSheet, Text, View } from "react-native";

export type CaseStatus = "open" | "in progress" | "pending" | "closed"; // definerer ulike status for saker
export type CaseCategory = "water" | "electricity" | "heating" | "complaint" | "other"; // definerer ulike kategorier for saker, (kan endres)
export type CaseSeverity = "low" | "medium" | "high" | "urgent"; // definerer ulike alvorlighetsgrader for saker, (kan endres)

export interface CaseItemProps { 
    id: string;
    title: string;
    description: string;
    status: CaseStatus;
    category: CaseCategory;
    severity: CaseSeverity;
    createdAt: string;
}
// CaseItemProps inneholder de tiltenkte propsene jeg tenkte en Case/CaseItem vil ha. // mulighet for endring
export function CaseItem({...props}: CaseItemProps) { 
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