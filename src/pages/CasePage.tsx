import { caseItems } from "@/app/data/CaseItemData";
import { CaseItemProps } from "@/components/caseComponents/CaseItem";
import { CaseLayout } from "@/components/caseComponents/CaseLayout";
import { CaseList } from "@/components/caseComponents/CaseList";
import type { NewCase } from "@/components/caseComponents/CaseRegister";
import { CaseRegister } from "@/components/caseComponents/CaseRegister";
import { useState } from "react";

export function CasePage () {
    const [cases, setCases] = useState<CaseItemProps[]>(caseItems); // lagd en state slik at i fremtiden når den kaller setCases så endres listen.
    
    // Når en liste faktisk legges til så må den ta med data fra NewCase, men også generere en id, createdAt og en status.
    const addCase = (data : NewCase) => {
        const CaseItem : CaseItemProps = {
            ...data,
            id: "1",
            createdAt: Date.now().toString(),
            status: "open"
        }
        setCases((prev) => [CaseItem, ...prev]); // Legger den nye saken foran i listen, foran de andre.

        
    }
    // Bruk av CaseLayout, gjør det enklere å struktuere innhold med children. CaseRegister og CaseList er da satt som children.
    return ( 
              <CaseLayout title="Legg til en sak?"> 
                <CaseRegister onSubmit={addCase} /> 
                <CaseList role="tenant" cases={cases}/>
              </CaseLayout>
    )
}


