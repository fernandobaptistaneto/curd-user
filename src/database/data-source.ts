import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm"

const port = process.env.TYPEORM_PORT as number | undefined
const entity = process.env.TYPEORM_ENTITIES as string | Function

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: port,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [entity]
})
