import { CaseLayout } from "@/components/caseComponents/CaseLayout";
import { CaseList } from "@/components/caseComponents/CaseList";
import { CaseRegister } from "@/components/caseComponents/CaseRegister";
import { createCase, getCases } from "@/data/fakeDb";
import type { Case, NewCase } from "@/types/types";
import { useEffect, useState } from "react";

export function CasePage() {
  const [cases, setCases] = useState<Case[]>([]); // Loader for hver eneste gang ny case kommer

  const loadCases = async () => {
    setCases(await getCases());
  };

  useEffect(() => {
    loadCases(); // konstant som henter cases
  }, []);

  const handleSubmit = async (newCase: NewCase) => {
    await createCase({
      ...newCase,
      tenantId: "t1",     // midlertidig
      propertyId: "p1",   // midlertidig
    });
    await loadCases(); 
  
  
  
  
  };

        
    
    // Bruk av CaseLayout, gjør det enklere å struktuere innhold med children. CaseRegister og CaseList er da satt som children.
    return ( 
    <CaseLayout title="Legg til en sak?">
      <CaseRegister onSubmit={handleSubmit} />
      <CaseList role="Tenant" cases={cases} />
    </CaseLayout>
    )
}


