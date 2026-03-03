import z from "zod";


export const LoginSchema = z.object({
    username: z.string().min(3),
 password: z.string().min(8),
});

export const RegisterSchema = z.object({
    
    username: z.string().min(3),
 password: z.string().min(8)
 .refine((val) => /[A-Z]/.test(val), "Password must contain at least one uppercase letter")
  .refine((val) => /[a-z]/.test(val), "Password must contain at least one lowercase letter")
  .refine((val) => /[0-9]/.test(val), "Password must contain at least one number")
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), "Password must contain at least one special character"),
 email: z.email(),
 role : z.enum([ "ADMIN"]),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});
