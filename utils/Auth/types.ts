import z from "zod";
import { forgotPasswordSchema } from "./schema";

export type LoginInput = {
    username: string;
    password: string;
};

export type RegisterInput = {
    username: string;
    password: string;
    email: string;
    role :  "ADMIN";
};

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type AuthResponse = {
    success: boolean;
    token?: string;
    message?: string;
};