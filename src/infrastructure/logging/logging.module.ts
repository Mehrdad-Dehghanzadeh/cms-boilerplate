import { LoggerModule } from 'nestjs-pino'

export const LoggingModule = LoggerModule.forRoot({
  pinoHttp: {
    autoLogging: true,
    transport: {
      target: 'pino-roll',
      options: {
        file: './logs/file',
        frequency: 'daily',
        dateFormat: 'yyyy-MM-dd',
        size: '10m',
        mkdir: true,
        sync: false
      }
    }
  }
})
