import { CaseLayout } from "@/components/caseComponents/CaseLayout";
import { CaseList } from "@/components/caseComponents/CaseList";
import { CaseRegister } from "@/components/caseComponents/CaseRegister";
import { useAuth } from "@/context/AuthContext";
import { caseService } from "@/features/cases/case-service";
import type { Case, CaseStatus, NewCase } from "@/types/types";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export function CasePage() {
  const { user } = useAuth();
  const [cases, setCases] = useState<Case[]>([]); // Loader for hver eneste gang ny case kommer
  const [error, setError] = useState<string | null>(null);

  const loadCases = async () => {
    if (!user) return;
    const result = await caseService.list(user);
    setCases(result.success ? result.data : []);
    setError(result.success ? null : result.error);
  };

  useEffect(() => {
    loadCases(); // konstant som henter cases
  }, [user?.id]);

  const handleSubmit = async (newCase: NewCase) => {
    if (!user) throw new Error("Logg inn først");
    const result = await caseService.create(user, {
      ...newCase,
      propertyId: user.propertyId,
    });
    if (!result.success) throw new Error(result.error);
    await loadCases();
  };

  const handleStatusChange = async (id: string, status: CaseStatus) => {
    if (!user) return;
    const result = await caseService.update(user, id, { status });
    setError(result.success ? null : result.error);
    if (result.success) await loadCases();
  };

  if (!user) return <Text>Logg inn for å se og melde inn saker</Text>;

    // Bruk av CaseLayout, gjør det enklere å struktuere innhold med children. CaseRegister og CaseList er da satt som children.
    return ( 
    <CaseLayout title="Legg til en sak?">
      {error && <Text>{error}</Text>}
      {user.role === "Tenant" && <CaseRegister onSubmit={handleSubmit} />}
      <CaseList role={user.role} cases={cases} onStatusChange={user.role === "Landlord" ? handleStatusChange : undefined} />
    </CaseLayout>
    )
}
