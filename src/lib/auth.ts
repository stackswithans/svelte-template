import { writable } from "svelte/store";
import {
    signInWithEmailAndPassword,
    getAuth,
    UserCredential,
} from "firebase/auth";
import { app } from "./firebase";

const authErrors = ["auth/invalid-email", "auth/wrong-password"];

type AuthError = string;

export function isAuthError(
    result: AuthError | UserCredential
): result is AuthError {
    return typeof result === "string";
}

export async function login(
    email: string,
    password: string
): Promise<UserCredential | AuthError> {
    const auth = getAuth(app);

    try {
        let userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential;
    } catch (error) {
        const errorObj = error as { code: string };
        return authErrors.some((error) => errorObj.code == error)
            ? "Email ou palavra-passe incorrecta."
            : "Ocorreu um erro inesperado";
    }
}
