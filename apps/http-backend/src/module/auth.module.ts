import { loginValidator, registerValidator } from "@repo/zod-validation/auth";
import { JwtBody,JwtService } from "@repo/jwt-service";
import { userRepo } from "@repo/database-service";
import { pbkdf2Sync,randomBytes,timingSafeEqual,} from "node:crypto"

export async function signin(signInData: any) {
    const data = await loginValidator.parseAsync(signInData);
    const user = await userRepo.findOne({
        where:{
            username: data.username
        }
    })
    if(!user){
        throw new Error("no user found with this username");
    }
    const [salt, ...others] = user.password.split(".");
    const hash = others.join(".");
    const inputHash = pbkdf2Sync(
        data.password,
        salt as string,
        1000,
        64,
        "sha512"
    ).toString("hex");
    const verifyPass = timingSafeEqual(
        Buffer.from(inputHash,"hex"),
        Buffer.from(hash,"hex")
    )
    if(!verifyPass){
        throw new Error("invalid password")
    }
    const jwtPayload: JwtBody = {
        userId: String(user.id),
        username: user.username,
        email: user.email,
        role: user.role
    }
    const token = JwtService.getInstance().generateToken(jwtPayload);
    return {
        userId: String(user.id),
        username: user.username,
        email: user.email,
        role: user.role,
        jwtToken: token
    }
}
export async function signup(signUpData: any) {
    const data = await registerValidator.parseAsync(signUpData);
    const usernameExist = await userRepo.findOne({where:{
        username: data.username
    }});
    const emailExist = await userRepo.findOne({where:{
        email: data.email
    }});
    if(usernameExist || emailExist){
        throw new Error("email or username already exist")
    }
    const salt = randomBytes(16).toString("hex");
    const hashedPassword = pbkdf2Sync(
        data.password,
        salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
    data.password = `${salt}.${hashedPassword}`
    const user = await userRepo.insert({
        username: data.username,
        password:data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        role: "user",
        email: data.email,

    });
    return{
        userId: user.identifiers[0]?.id,
        username: data.username,
        email: data.email,
    };
}