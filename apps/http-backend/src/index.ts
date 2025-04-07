import express from "express";
import authRouter from "./router/auth.router";
import roomRouter from "./router/room.router";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth",authRouter);
app.use("/room",roomRouter);
app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});