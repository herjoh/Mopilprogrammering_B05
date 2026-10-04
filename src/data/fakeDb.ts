export type Role = "tenant" | "landlord";
export type CaseStatus = "open" | "in progress" | "pending tenant confirmation" | "closed";
export type CaseCategory = "water" | "electricity" | "heating" | "complaint" | "other";
export type Severity = "low" | "medium" | "high";

export type User = { id: string; name: string; role: Role };
export type Property = { id: string; address: string; landlordId: string };
export type Case = {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  category: CaseCategory;
  severity: Severity;
  tenantId: string;
  propertyId: string;
  createdAt: string;
};

export const users: User[] = [
  { id: "u1", name: "Kari Leietaker", role: "tenant" },
  { id: "u2", name: "Ola Utleier", role: "landlord" },
];

export const properties: Property[] = [
  { id: "p1", address: "Storgata 1, Halden", landlordId: "u2" },
];

function seedCases(): Case[] {
  return [
    {
      id: "1",
      title: "Lekkasje under kjøkkenvasken",
      description: "Det drypper fra røret under vasken.",
      status: "open",
      category: "water",
      severity: "high",
      tenantId: "u1",
      propertyId: "p1",
      createdAt: "2026-09-28T10:00:00.000Z",
    },
    {
      id: "2",
      title: "Stikkontakt på soverommet virker ikke",
      description: "Ingen strøm i kontakten ved sengen.",
      status: "in progress",
      category: "electricity",
      severity: "medium",
      tenantId: "u1",
      propertyId: "p1",
      createdAt: "2026-09-30T14:30:00.000Z",
    },
    {
      id: "3",
      title: "Radiatoren i stua blir ikke varm",
      description: "Radiatoren er kald selv på full styrke.",
      status: "closed",
      category: "heating",
      severity: "low",
      tenantId: "u1",
      propertyId: "p1",
      createdAt: "2026-10-01T08:15:00.000Z",
    },
  ];
}

let cases = seedCases();

export async function getCases() {
  return cases;
}

export async function getCase(id: string) {
  return cases.find((c) => c.id === id);
}

export async function createCase(input: Omit<Case, "id" | "status" | "createdAt">) {
  const newCase: Case = {
    ...input,
    id: String(cases.length + 1),
    status: "open",
    createdAt: new Date().toISOString(),
  };
  cases.push(newCase);
  return newCase;
}

export async function updateCase(id: string, changes: Partial<Omit<Case, "id">>) {
  const existing = await getCase(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...changes };
  cases = cases.map((c) => (c.id === id ? updated : c));
  return updated;
}

export function resetDb() {
  cases = seedCases();
}
