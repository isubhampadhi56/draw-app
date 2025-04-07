import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";

const roomRouter:Router = Router();
roomRouter.post("/create-room",authMiddleware, async (req,res,next)=>{
    res.send("route hit");
})
export default roomRouter;