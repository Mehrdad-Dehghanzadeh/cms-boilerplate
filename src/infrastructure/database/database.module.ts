import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from '../../modules/categories/entities/category.entity'
import { InitialSchema1723464000000 } from './migrations/1723464000000-initial-schema'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('database.host'),
        port: configService.getOrThrow<number>('database.port'),
        username: configService.getOrThrow<string>('database.username'),
        password: configService.getOrThrow<string>('database.password'),
        database: configService.getOrThrow<string>('database.name'),
        entities: [Category],
        migrations: [InitialSchema1723464000000],
        migrationsRun: false,
        synchronize: false
      })
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
