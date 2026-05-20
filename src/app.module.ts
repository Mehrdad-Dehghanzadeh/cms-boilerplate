import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayModule } from '@modules/gateway.module';
import { DatabaseModule } from '@infrastructure';
@Module({
  imports: [ConfigModule.forRoot(), GatewayModule, DatabaseModule],
})
export class AppModule {}
