import { roomRepo } from "@repo/database-service";
import { createRoomSchema } from "@repo/zod-validation/room";

export async function createRoom(data: any,userId: number) {
    const roomData = await createRoomSchema.parseAsync(data); 
    const result = await roomRepo.insert({
        name: roomData.name,
        description: roomData.description,
        isPrivate: roomData.isPrivate,
        maxUsers: roomData.maxUsers,
        password: roomData.password,
        owner: {
            id: data.userId
        }
    });
    const room = await roomRepo.findOne({
        where:{
            id: result.identifiers[0]?.id
        }
    });
    return {
        name: room?.name,
        description: room?.description,
        isPrivate: room?.isPrivate,
        maxUsers: room?.maxUsers
    }
}