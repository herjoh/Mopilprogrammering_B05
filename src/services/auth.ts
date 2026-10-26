// services/auth.ts

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
