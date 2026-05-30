import { Public } from '@common/decorators'
import { Controller, Get } from '@nestjs/common'

@Controller('categories')
export class CategoriesController {
  @Public()
  @Get()
  findAll() {
    const str = 'get find all'
    return str
  }
}
