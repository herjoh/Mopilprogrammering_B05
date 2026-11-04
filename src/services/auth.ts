// services/auth.ts
import { Result } from "@/types/resultTypes";
import type { User } from "@/types/types";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email("Ugylding epost"),
    password: z.string().min(8, "A minimum of 8 characters are requierd.")
})

export const registerSchema = loginSchema.extend({name: z.string().trim().min(2)});

export type Session = {user: User};

export interface AuthService{
    restore(): Promise<Session | null>;
    login(i: { email: string; password: string }): Promise<Result<Session>>;
    register(i: {email: string; password: string; name: string }) : Promise<Result<Session>>;
    logout(): Promise<void>;
    onChange(cb: (s: Session | null) => void):() => void;
}


export type LoginResult = 
    | { success: true }
    | { success: false; message: string };

export async function loginUser(
    email: string,
    password: string
): Promise<LoginResult> {
    //Midlertidig innloging for testing
    // Denne funksjonen skal kobles til en backend/API

    if (!email.trim() || !password) {
        return {
            success: false,
            message: "Fyll ut både e-post og passord",
        };
    }

    if (email.trim().toLowerCase() === "test@test.no" &&
        password === "1234"
    ) {
        return { success: true };
    }
    return {
        success: false,
        message: "Feil e-post eller passord",
    };
}
