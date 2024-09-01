
import {DataSource, DataSourceOptions} from 'typeorm'
import  {config } from 'dotenv'
import { UserEntity } from 'src/user/entities/user.entity'
import { ProfileEntity } from 'src/profile/entities/profile.entity'
import { EventEntity } from 'src/event/entities/event.entity'

config()
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [UserEntity, ProfileEntity, EventEntity],
    synchronize: true,
    migrations: ['dist/db/migrations/*.js']
    
    
}

const datasource = new DataSource(dataSourceOptions)
export default datasource;