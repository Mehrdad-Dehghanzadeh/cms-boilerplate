import { Logger } from 'nestjs-pino'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import process from 'node:process'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const configService = app.get(ConfigService)
  const port = configService.getOrThrow<number>('app.port')

  app.useLogger(app.get(Logger))
  app.enableShutdownHooks()

  await app.listen(port)
  app.get(Logger).log(`Application is listening on port ${port}`, 'Bootstrap')
}

void bootstrap().catch((error: unknown) => {
  console.error('Application failed to start', error)
  process.exitCode = 1
})
