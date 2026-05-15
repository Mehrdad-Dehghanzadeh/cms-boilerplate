import type { DataSourceOptions } from 'typeorm';
import { isDev } from '@shared/utils';

export const dbconfig: DataSourceOptions = {
  type: process.env.DB_Type as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: isDev()
};
