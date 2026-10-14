import { z } from "zod";

export const UserSchema = z.object({
    id: z.coerce
    .number()
    .int("ID have to be a full number")
    .min(1000000000, "Id have to be minimum 1000000000")
    .max(9999999,"Id have to be maximum 9999999")
    .transform((val) => {return Number(val)}),
    name: z.string().min(1, "Name is required"),
    expiresAt: z.string(),
    userId: z.string().optional(),
    isActive : z.boolean()
})

export const ROLES = {
        Unauthenticated : "Unauthenticated",
        Tenant : "Tenant",
        Landlord : "Landlord",
        Admin: "ADMIN"
}

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ProfileSchema = z.object({
    email: z.string().email("Not active email"),
    userID: z.string().min(1, "User ID is Requiered"),
    role: z.enum(["Unauthenticated", "Tenant", "Landlord", "ADMIN" ])
})

export type Profile = z.infer<typeof ProfileSchema>
export type User = z.infer<typeof UserSchema>