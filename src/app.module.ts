import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { appConfig, databaseConfig, validateEnvironment } from './config'
import {
  DatabaseModule,
  LoggingModule,
  ThrottlerAppModule
} from './infrastructure'
import { GatewayModule } from './modules/gateway.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, databaseConfig],
      validate: validateEnvironment
    }),
    ThrottlerAppModule,
    LoggingModule,
    DatabaseModule,
    GatewayModule
  ]
})
export class AppModule {}
