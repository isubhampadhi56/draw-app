import {z} from "zod";

export const createRoomSchema = z.object({
    name: z.string().min(3).max(20),
    description: z.string().min(3).max(100).optional(),
    isPrivate: z.boolean().optional(),
    maxUsers: z.number().min(2).max(100).optional(),
    password: z.string().min(8).optional()
});