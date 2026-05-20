import { DataSource } from 'typeorm';
import { getDBConfig } from '@config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dbConfig = getDBConfig();
      const dataSource = new DataSource(dbConfig);

      return dataSource.initialize();
    },
  },
];
