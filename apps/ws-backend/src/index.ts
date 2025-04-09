 import { WebSocketServer,WebSocket } from "ws";
 import {JwtBody, JwtService} from "@repo/jwt-service";
import { json } from "express";
 const wss = new WebSocketServer({port: 8080});
 console.log("starting websocket server on 8080")
 interface User{
     id: string,
     rooms: string[],
     ws: WebSocket
 }
 interface Room{
     id: string,
     users: User[]

 }
 const users:User[] = [];
 const rooms:Room[] = [];

 wss.on('connection', async (ws,request) => {
    const url = request.url;
    if(!url){
        return;
    }
    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token");
    let userData:JwtBody|undefined;
    try{
    userData = await JwtService.getInstance().jwtVerify(String(token));
    if(!userData || !userData.userId){
        ws.send("Invalid User");
        ws.close();
        return;
    }
    }catch(err){
        ws.send("Invalid JWT");
        ws.close();
        return;
    }
    users.push(
        {
            id: userData.userId,
            rooms: [],
            ws
        }
    )
    
     ws.on('message', function message(data) {
        const parsedMessage = JSON.parse(data as unknown as string);
        console.log(parsedMessage);
        if(parsedMessage.type === "join-room"){
            users.forEach((user) => {
                if(user.id === userData?.userId){
                    user.rooms.push(parsedMessage.roomId);
                }
            })
        }
        if(parsedMessage.type === "leave-room"){
            const user = users.find((user) => user.ws === ws);
            if(!user){
                return;
            }
            user.rooms = user.rooms.filter((roomId) => roomId !== parsedMessage.roomId); 
        }
        if(parsedMessage.type === "chat"){
            users.forEach((user) => {
                if(user.rooms.includes(parsedMessage.roomId)){
                    user.ws.send(JSON.stringify({
                        userId: userData.userId,
                        userData: userData.username,
                        type: "chat",
                        roomId: parsedMessage.roomId,
                        message: parsedMessage.message
                    }));
            }})
        }
     })
 })