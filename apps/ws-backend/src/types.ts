import { WebSocket } from "ws";



export const userRoomsMapping = new Map<string, string[]>();
export const roomUsersMapping = new Map<string, string[]>();
export const userSocketMapping = new Map<string, WebSocket>();
