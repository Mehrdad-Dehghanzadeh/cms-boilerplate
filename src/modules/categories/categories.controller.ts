import { Public } from '@common/decorators';
import { Controller, Get } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Public()
  @Get()
  findAll() {
    const t = 1
    const str = 'get find all';
    return str;
  }
}
