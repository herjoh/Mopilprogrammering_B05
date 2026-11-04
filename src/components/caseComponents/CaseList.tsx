import { CaseStatus, Role } from "@/types/types";
import { FlatList } from "react-native";
import { CaseItem, CaseItemProps } from "./CaseItem";


interface CaseListProps {
    role: Role;
    cases: CaseItemProps[];
    onStatusChange?: (id: string, status: CaseStatus) => void;
}

// CaseListProps har to props, en som tar imot rollene våre og en som henter inn en liste med saker. // mulighet for endring

export function CaseList({ role, cases, onStatusChange }: CaseListProps) {
    return (
        // Å gjøre: Basert på en role, henter vi listen relevant til den rollen.
        <FlatList 
        data={cases} 
        keyExtractor={(item) => item.id} 
        renderItem={({ item}) => <CaseItem {...item} onStatusChange={onStatusChange && ((status) => onStatusChange(item.id, status))} />}
        />  
        
    )
}

// Her bruker jeg Flatlist for å rendre en liste med saker, og bruker CaseItem for å rendre hver sak. // mulighet for endring