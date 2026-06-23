import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GatewayModule } from 'modules/gateway.module'
import { DatabaseModule, LoggingModule, ThrottlerAppModule } from 'infrastructure'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerAppModule,
    LoggingModule,
    GatewayModule,
    DatabaseModule
  ]
})
export class AppModule {}
