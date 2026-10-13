// felles typer for hele appen (MOB-19)

export type Role = "tenant" | "landlord";
export type CaseStatus = "open" | "in progress" | "pending tenant confirmation" | "closed";
export type CaseCategory = "water" | "electricity" | "heating" | "complaint" | "other";
export type CaseSeverity = "low" | "medium" | "high" | "urgent";

export type User = { id: string; name: string; role: Role };
export type Property = { id: string; address: string; landlordId: string };

export type Case = {
  id: string;
  title: string;
  description: string;
  status: CaseStatus;
  category: CaseCategory;
  severity: CaseSeverity;
  tenantId: string;
  propertyId: string;
  createdAt: string;
};

// det et skjema sender inn; id, status og createdAt settes av databasen
export type NewCase = Omit<Case, "id" | "status" | "createdAt">;
