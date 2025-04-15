import { JwtBody } from "@repo/jwt-service";
import { roomUsersMapping, userRoomsMapping, userSocketMapping } from "../types";

interface roomMessage{
    type: string,
    roomId: string,

}
export function joinRoom(userData:JwtBody,parsedMessage:any){
    if(!(userRoomsMapping.get(userData.userId) || [])?.includes(parsedMessage.roomId)){
        userRoomsMapping.set(userData.userId,[...(userRoomsMapping.get(userData.userId) || []),parsedMessage.roomId]);
    }
    if(!(roomUsersMapping.get(parsedMessage.roomId) || [])?.includes(userData.userId)){
        roomUsersMapping.set(parsedMessage.roomId,[...(roomUsersMapping.get(parsedMessage.roomId) || []),userData.userId]);
    }
}

export function informRoomUsers(roomId:string,userData:JwtBody){
    const users = roomUsersMapping.get(roomId) || [];
    const joinUserNotification = {
        type: "join-room-notification",
        message: `${userData.username} has joined the room`,
        roomId:roomId,
        timestamp: new Date(),
    }
    users.forEach((user)=>{
        userSocketMapping.get(user)?.send(JSON.stringify(joinUserNotification));
    })
}

export function leaveRoom(userData:JwtBody,parsedMessage:any){
    roomUsersMapping.set(parsedMessage.roomId, (roomUsersMapping.get(parsedMessage.roomId) || []).filter((userId) => userId !== userData.userId) || []);
    userRoomsMapping.set(userData.userId, (userRoomsMapping.get(userData.userId) || []).filter((roomId) => roomId !== parsedMessage.roomId) || []);
}