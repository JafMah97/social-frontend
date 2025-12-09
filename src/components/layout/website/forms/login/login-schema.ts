import  z from "zod";

export const loginSchema = z.object({
  email: z
    .email()
    .min(5, "email must be at least 5 characters.")
    .max(32, "email must be at most 32 characters."),
  password: z
    .string()
    .min(8, "password must be at least 8 characters.")
    .max(100, "password must be at most 100 characters."),
});


