import express from "express";
import authRouter from "./router/auth.router";
import roomRouter from "./router/room.router";
import { connectDB } from "@repo/database-service";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth",authRouter);
app.use("/room",roomRouter);
connectDB().then(()=>{
    app.listen(3000, () => {
        console.log("Example app listening on port 3000!");
    });
}).catch((error:any)=>{
    console.error(error);
});
