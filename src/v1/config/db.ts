import { config } from 'dotenv'
config()
import { User } from "../entities/user.entity"
import { DataSource } from "typeorm"
import Job from '../entities/job.entity'

const dataSource =  new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_SERVER,
    port:  Number(process.env.POSTGRES_PORT),
    username: String(process.env.POSTGRES_USERNAME),
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    logging: false,
    entities: [User,Job],
    subscribers: [],
    migrations: [__dirname+'/../migrations/*.ts'],
    dropSchema:false,

})

export default dataSource


//npx typeorm-ts-node-commonjs migration:generate ./src/v1/migrations/user-v1 -d src/v1/config/db.ts
//npx typeorm-ts-node-commonjs migration:run -d src/v1/config/db.ts