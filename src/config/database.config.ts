import type { DataSourceOptions } from 'typeorm'
import { isProd } from '@shared/utils'

export function getDBConfig(): DataSourceOptions {
  return {
    type: process.env.DB_Type as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: isProd(),
    entities: [__dirname + '../common/entities/*{.ts}']
  }
}
