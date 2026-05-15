import { DataSource } from 'typeorm';
import { dbconfig } from '@config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(dbconfig);

      return dataSource.initialize();
    },
  },
];
