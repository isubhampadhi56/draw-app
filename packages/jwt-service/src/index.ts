import { sign, verify } from "jsonwebtoken";
export interface JwtBody {
    userId: string,
    email: string,
    username: string,
    role?: string,
    iat?: number,
    exp?: number,
}
export class JwtService {
    private static instance: JwtService;
    private jwtSecret: string;
    private expiresIn: number;
    private constructor(jwtSecret: string, expiresIn: number) {
        this.jwtSecret = jwtSecret;
        this.expiresIn = expiresIn;
        JwtService.instance = this;
    }
    public static getInstance(): JwtService {
        if (!JwtService.instance) {
            JwtService.instance = new JwtService(
                String(process.env.JWT_SECRET || "sup3rs3cr3t"),
                60 * 60 * 24
            )
        }
        return JwtService.instance;
    }
    generateToken(payload: JwtBody): string {
        const jwtObj = {
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + this.expiresIn),
            ...payload,
          };
          const token = sign(jwtObj, this.jwtSecret);
          return token;
    }
    async jwtVerify(token: string) {
        try {
          return (await verify(token, this.jwtSecret)) as JwtBody;
        } catch (error) {}
    }
}
