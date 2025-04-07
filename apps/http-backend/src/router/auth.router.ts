import { Router } from "express";
import { signin, signup } from "../module/auth.module";

const app =  Router();

app.post("/signin", async (req, res, next) => {
    try{
        await signin(req.body);
    }catch(err){

    }
    
});

app.post("signup", async (req, res,next) => {
    try{
        await signup(req.body);
    }catch(err){
        
    }
});
