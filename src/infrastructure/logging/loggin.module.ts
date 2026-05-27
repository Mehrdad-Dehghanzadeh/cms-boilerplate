import { LoggerModule } from 'nestjs-pino';

export const LoggingModule = LoggerModule.forRoot({
  pinoHttp: {
    transport: {
      target: 'pino-roll',
      options: {
        file: './logs/file',
        frequency: 'daily',
        dateFormat: 'yyyy-MM-dd',
        size: '10m',
        mkdir: true,
        sync: true, 
      },
    },
  },
});
