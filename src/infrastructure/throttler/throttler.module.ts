import { ThrottlerModule } from '@nestjs/throttler'

export const ThrottlerAppModule = ThrottlerModule.forRoot({
  throttlers: [
    {
      ttl: 60000,
      limit: 30
    }
  ]
})
