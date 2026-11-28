import { Global, Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { IGNORE_PATH_LOG, REQ_KEYS_BLOCK } from 'shared/constants/Security'

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        serializers: {
          req(req) {
            const body = req?.raw?.body || null
            //TODO remove security keys such as password
            
            return { ...req, body }
          },

          res(res) {
            const rawRes = res.raw
            let body = rawRes.responseBody
            return res
          }
        },
        autoLogging: {
          ignore: (req) => (req?.url ? IGNORE_PATH_LOG.includes(req.url) : false)
        },
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
