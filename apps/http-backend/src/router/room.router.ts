import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createRoom } from "../module/room.module";

const roomRouter:Router = Router();
roomRouter.post("/create-room",authMiddleware, async (req,res,next)=>{
    try{
        const result = await createRoom(req.body,(req as any).userData.id);
        res.json(result);
    }catch(err){
        next(err);
    }
})
export default roomRouter;