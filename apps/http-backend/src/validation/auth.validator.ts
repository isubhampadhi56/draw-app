import { z } from "zod";

export const loginValidator = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerValidator = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
});

export type Login = z.infer<typeof loginValidator>;
export type Register = z.infer<typeof registerValidator>;