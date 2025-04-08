import { loginValidator, registerValidator } from "@repo/zod-validation/auth";
import { JwtBody,JwtService } from "@repo/jwt-service";

export async function signin(signInData: any) {
    const data = await loginValidator.parseAsync(signInData);
    const jwtPayload: JwtBody = {
        userId: "1",
        username: "demo",
        email:"demo@mail.com"
    }
    const token = JwtService.getInstance().generateToken(jwtPayload);
    return {
        userId: "1",
        username: "demo",
        email:"demo@mail.com",
        jwtToken: token
    }
}
export async function signup(signUpData: any) {
    const data = await registerValidator.parseAsync(signUpData);
}