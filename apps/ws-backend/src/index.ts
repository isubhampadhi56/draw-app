 import { WebSocketServer } from "ws";
 import {JwtService} from "@repo/jwt-service";
 const wss = new WebSocketServer({port: 8080});
 console.log("starting websocket server on 8080")
 wss.on('connection', async (ws,request) => {
    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token");
    const decoded = await JwtService.getInstance().jwtVerify(String(token));
    if(!decoded || !decoded.userId){
        ws.close();
        return;
    }
     ws.on('message', message => {

         console.log(message);
         ws.send(message);
     })
 })