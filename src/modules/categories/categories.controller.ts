import { Controller, Get } from '@nestjs/common'
import { Public } from 'common/decorators'

@Controller('categories')
export class CategoriesController {
  @Public()
  @Get()
  findAll() {
    const str = 'get find all'
    return str
  }
}
