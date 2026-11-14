import { Controller, Get } from '@nestjs/common'

@Controller('/categories')
export class CategoriesController {
  @Get()
  findAll(): string {
    return 'this is test'
  }
}
