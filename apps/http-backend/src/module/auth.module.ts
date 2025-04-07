import { Request } from "express";
import { loginValidator, registerValidator } from "../validation/auth.validator";

export async function signin(signInData: any) {
    const data = await loginValidator.parseAsync(signInData);
}
export async function signup(signUpData: any) {
    const data = await registerValidator.parseAsync(signUpData);
}