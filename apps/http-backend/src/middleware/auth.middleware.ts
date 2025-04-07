import {JwtService} from "@repo/jwt-service/src";
import { NextFunction, Request, Response } from "express";

const jwtObj = new JwtService(String(process.env.JWT_SECRET),60*60*24);
JwtService.getInstance()


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