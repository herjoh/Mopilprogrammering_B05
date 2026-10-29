// felles typer for hele appen (MOB-19)
import { z } from "zod";

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

export const UserSchema= z.object({
  id: z.coerce.number()
    .int("ID must be a whole number(1)")
    .min(10000,"Id must be at least 100000")
    .max(9999999, "Id must be atleast be 9999999")
    .transform((val) => {return Number(val)}),
  tenantId: z.coerce.number()
    .int("ID must be a whole number(1)")
    .min(10000,"Id must be at least 100000")
    .max(9999999, "Id must be atleast be 9999999")
    .transform((val) => {return Number(val)}),
  name: z.string().min(1, "Name is requiered"),
  role: z.enum(["Tenant", "Landlord", "ADMIN"]),
  expireAat:z.string(),
  isActive: z.boolean()
});


export const ProfileSchema = z.object({
  name: z.string().min(6, {message: "Name is required"}),
  email: z.string().min(6,{message: "Email is Expected"}),
  role: z.enum(["Tenant", "Landlord"])
})


export const ROLES = {
    Tenant : "Tenant",
    Landlord: "Landlord",
    Admin: "ADMIN",
} as const;


// det et skjema sender inn; id, status og createdAt settes av databasen
export type NewCase = Omit<Case, "id" | "status" | "createdAt">;
export type ProfileUser = z.infer<typeof UserSchema>
export type Profile = z.infer<typeof ProfileSchema>

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type CaseStatus = "open" | "in progress" | "pending tenant confirmation" | "closed";
export type CaseCategory = "water" | "electricity" | "heating" | "complaint" | "other";
export type CaseSeverity = "low" | "medium" | "high" | "urgent";

export type User = { id: string; name: string; role: Role };
export type Property = { id: string; address: string; landlordId: string };
