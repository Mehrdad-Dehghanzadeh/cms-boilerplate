import { Module } from '@nestjs/common'

@Module({
  imports: [],
  exports: []
})
export class DatabaseModule {
  constructor() {

    return Promise.reject(new Error('connection failed'))
  }
}
