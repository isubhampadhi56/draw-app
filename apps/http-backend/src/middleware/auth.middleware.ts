import {JwtService} from "@repo/jwt-service";
import { NextFunction, Request, Response } from "express";


export const authMiddleware = async (req: Request, res:Response, next: NextFunction) => {
    try{
    const authHeader = req.get("authorization");
    if(!authHeader){
        throw new Error("auth header missing");
    }
    const jwtToken = String(authHeader.toString().split(" ")[1]);
    const jwtData = await JwtService.getInstance().jwtVerify(jwtToken);
    (req as any).userData = jwtData;
    next();
}catch(err){
    next(err);
}
}