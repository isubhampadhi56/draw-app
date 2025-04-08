import { Router } from "express";
import { signin, signup } from "../module/auth.module";

const authRouter:Router =  Router();

authRouter.post("/signin", async (req, res, next) => {
    try{
        const result = await signin(req.body);
        res.json(result);
    }catch(err){
        next(err);
    }
});

authRouter.post("/signup", async (req, res,next) => {
    try{
        const result = await signup(req.body);
        res.json(result);
    }catch(err){
        next(err);
    }
});

export default authRouter;