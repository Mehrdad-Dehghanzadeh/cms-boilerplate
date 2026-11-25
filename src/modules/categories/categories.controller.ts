import { Controller, Get, Post, Body } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './category.dto'

@Controller('/categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @Post()
  create(
    @Body()
    dto: CreateCategoryDto
  ) {
    return dto
  }
}
