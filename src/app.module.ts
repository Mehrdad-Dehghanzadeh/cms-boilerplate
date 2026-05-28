import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GatewayModule } from '@modules/gateway.module'
import { DatabaseModule, LoggingModule } from '@infrastructure'
@Module({
  imports: [ConfigModule.forRoot(), LoggingModule, GatewayModule, DatabaseModule]
})
export class AppModule {}
