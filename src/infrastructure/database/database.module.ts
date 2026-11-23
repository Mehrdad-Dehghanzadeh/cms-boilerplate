import { Module, Global } from '@nestjs/common'
import { Pool } from 'pg'

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      useFactory: () => {
        return new Pool({
          max: 20,
          idleTimeoutMillis: 30000
        })
      }
    }
  ],

  exports: ['DATABASE_POOL']
})
export class DatabaseModule {}
