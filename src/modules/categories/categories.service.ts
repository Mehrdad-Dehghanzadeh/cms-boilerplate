import { Injectable } from '@nestjs/common'
import { pool } from 'infrastructure'

@Injectable()
export class CategoriesService {
  async findAll() {
    const t = await pool.query('select * from post.categories')
    return t?.rows
  }
}
