 import { WebSocketServer,WebSocket } from "ws";
 import {JwtBody, JwtService} from "@repo/jwt-service";
import { roomUsersMapping, userRoomsMapping, userSocketMapping } from "./types";
import { hasJoinedRoom, informRoomUsers, joinRoom, leaveRoom, sendMessage } from "./module/room.module";
 const wss = new WebSocketServer({port: 8080});
 console.log("starting websocket server on 8080")
 

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
    userSocketMapping.set(userData.userId,ws);
    
     ws.on('message', function message(data) {
        const parsedMessage = JSON.parse(data as unknown as string);
        console.log(parsedMessage);
        if(parsedMessage.type === "join-room"){
            joinRoom(userData,parsedMessage);
            informRoomUsers(parsedMessage.roomId,userData);
        }
        if(parsedMessage.type === "leave-room"){
            leaveRoom(userData,parsedMessage);
        }
        if(parsedMessage.type === "chat"){
            const messageData = {
                userId: userData.userId,
                username: userData.username,
                type: "chat",
                roomId: parsedMessage.roomId,
                message: parsedMessage.message,
                timestamp: new Date()
            };
            if(hasJoinedRoom(userData,parsedMessage.roomId)){
                sendMessage(parsedMessage.roomId,userData,messageData);
            }
        }
     })
 })