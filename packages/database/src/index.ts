import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions.js";
import { User } from "./entities/users.entity";
import { DataSource } from "typeorm";
import { Room } from "./entities/room.entity";

const drawEntities = [
    User,
    Room
]
const sqlitedbConnectionOption: SqliteConnectionOptions = {
    type: "sqlite",
    database: "draw.sqlite",
    entities: drawEntities,
    logging: true,
    synchronize: true
}

export const drawAppDataSource = new DataSource(sqlitedbConnectionOption);

export async function connectDB() {
    try{
        await drawAppDataSource.initialize();
    }catch(err){
        console.error(err);
    }
}

export async function clearDB(){
    try{
        await drawAppDataSource.synchronize(true);
    }catch(err){
        console.error(err);
    }
}

export async function disconnectDB(){
    try{
        await drawAppDataSource.destroy();
    }catch(err){
        console.error(err);
    }
}

export const userRepo = drawAppDataSource.getRepository(User);
export const roomRepo = drawAppDataSource.getRepository(Room);