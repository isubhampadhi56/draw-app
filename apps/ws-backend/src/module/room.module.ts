import { JwtBody } from "@repo/jwt-service";
import { roomUsersMapping, userRoomsMapping, userSocketMapping } from "../types";

interface roomMessage{
    type: string,
    roomId: string,

}
export function joinRoom(userData:JwtBody,parsedMessage:roomMessage){
    if(!(userRoomsMapping.get(userData.userId) || [])?.includes(parsedMessage.roomId)){
        userRoomsMapping.set(userData.userId,[...(userRoomsMapping.get(userData.userId) || []),parsedMessage.roomId]);
    }
    if(!(roomUsersMapping.get(parsedMessage.roomId) || [])?.includes(userData.userId)){
        roomUsersMapping.set(parsedMessage.roomId,[...(roomUsersMapping.get(parsedMessage.roomId) || []),userData.userId]);
    }
}

export function sendMessage(roomId:string,userData:JwtBody,messageData:any){
    const users = roomUsersMapping.get(roomId) || [];
    users.forEach((userId)=>{
        if(userId !== userData.userId){
            userSocketMapping.get(userId)?.send(JSON.stringify(messageData));
        }
    })
}
export function informRoomUsers(roomId:string,userData:JwtBody){
    
    const joinUserNotification = {
        type: "join-room-notification",
        message: `${userData.username} has joined the room`,
        roomId:roomId,
        timestamp: new Date(),
    }
    sendMessage(roomId,userData,joinUserNotification);
}

export function leaveRoom(userData:JwtBody,parsedMessage:roomMessage){
    roomUsersMapping.set(parsedMessage.roomId, (roomUsersMapping.get(parsedMessage.roomId) || []).filter((userId) => userId !== userData.userId) || []);
    userRoomsMapping.set(userData.userId, (userRoomsMapping.get(userData.userId) || []).filter((roomId) => roomId !== parsedMessage.roomId) || []);
}

export function hasJoinedRoom(userData:JwtBody,roomId:string){
    const users = roomUsersMapping.get(roomId) || [];
    if(!users.includes(userData.userId)){
        userSocketMapping.get(userData.userId)?.send(JSON.stringify({
            type:"error",
            message: "user need to join the room first"
        }))
        return false;
    }
    return true;
}