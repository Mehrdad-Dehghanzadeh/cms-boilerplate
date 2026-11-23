import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common'
import { PinoLogger } from 'nestjs-pino'
import { Pool } from 'pg'

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('DATABASE_POOL')
    private readonly pool: Pool,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(CategoriesService.name)
  }

  async findAll() {
    try {
      const result = await this.pool.query('select * from post.categories')
      this.logger.info('get rows for categories')
      return result.rows
    } catch (e) {
      this.logger.error('unkown error',CategoriesService.name)
      throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
