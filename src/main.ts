import { Logger } from 'nestjs-pino'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import process from 'node:process'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const configService = app.get(ConfigService)
  const port = configService.getOrThrow<number>('app.port')

  app.useLogger(app.get(Logger))
  app.enableShutdownHooks()

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          message: 'اطلاعات ارسالی معتبر نیست',
          errors: errors.map((error) => ({
            field: error.property,
            constraints: error.constraints
          }))
        })
      }
    })
  )

  await app.listen(port)
  app.get(Logger).log(`Application is listening on port ${port}`, 'Bootstrap')
}

void bootstrap().catch((error: unknown) => {
  console.error('Application failed to start', error)
  process.exitCode = 1
})
