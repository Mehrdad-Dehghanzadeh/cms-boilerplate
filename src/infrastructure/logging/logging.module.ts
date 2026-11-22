import { Global, Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
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
  ],
  exports: [LoggerModule]
})
export class LoggingModule {}
