import { caseItems } from "@/app/data/CaseItemData";
import { CaseItemProps } from "@/components/caseComponents/CaseItem";
import { CaseLayout } from "@/components/caseComponents/CaseLayout";
import { CaseList } from "@/components/caseComponents/CaseList";
import type { NewCase } from "@/components/caseComponents/CaseRegister";
import { CaseRegister } from "@/components/caseComponents/CaseRegister";
import { useState } from "react";

export function CasePage () {
    const [cases, setCases] = useState<CaseItemProps[]>(caseItems); // lagd en state 
    
    const addCase = (data : NewCase) => {
        const CaseItem : CaseItemProps = {
            ...data,
            id: "1",
            createdAt: Date.now().toString(),
            status: "open"
        }
        setCases((prev) => [CaseItem, ...prev]);
    }

    return (
              <CaseLayout title="Legg til en sak?">
                <CaseRegister onSubmit={addCase}/>
                <CaseList role="tenant" cases={caseItems}/>
              </CaseLayout>
    )
}


