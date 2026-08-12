import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { QueryFailedError, Repository } from 'typeorm'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'

const POSTGRES_UNIQUE_VIOLATION = '23505'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const input = this.validateCreateInput(createCategoryDto)
    const category = this.categoriesRepository.create(input)

    return this.save(category)
  }

  findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({
      order: { createdAt: 'DESC' }
    })
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOneBy({ id })

    if (!category) {
      throw new NotFoundException(`Category with id "${id}" was not found`)
    }

    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id)
    const input = this.validateUpdateInput(updateCategoryDto)

    this.categoriesRepository.merge(category, input)
    return this.save(category)
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id)
    await this.categoriesRepository.remove(category)
  }

  private async save(category: Category): Promise<Category> {
    try {
      return await this.categoriesRepository.save(category)
    } catch (error: unknown) {
      if (
        error instanceof QueryFailedError &&
        (error.driverError as { code?: string }).code === POSTGRES_UNIQUE_VIOLATION
      ) {
        throw new ConflictException('A category with this name or slot already exists')
      }

      throw error
    }
  }

  private validateCreateInput(createCategoryDto: CreateCategoryDto): CreateCategoryDto {
    this.assertPlainObject(createCategoryDto)
    this.assertAllowedKeys(createCategoryDto, ['name', 'slot', 'isActive'])

    return {
      name: this.normalizeRequiredText(createCategoryDto.name, 'name'),
      slot: this.normalizeSlot(createCategoryDto.slot),
      ...(createCategoryDto.isActive === undefined
        ? {}
        : { isActive: this.validateBoolean(createCategoryDto.isActive, 'isActive') })
    }
  }

  private validateUpdateInput(updateCategoryDto: UpdateCategoryDto): UpdateCategoryDto {
    this.assertPlainObject(updateCategoryDto)
    this.assertAllowedKeys(updateCategoryDto, ['name', 'slot', 'isActive'])

    if (Object.keys(updateCategoryDto).length === 0) {
      throw new BadRequestException('At least one field must be provided')
    }

    return {
      ...(updateCategoryDto.name === undefined
        ? {}
        : { name: this.normalizeRequiredText(updateCategoryDto.name, 'name') }),
      ...(updateCategoryDto.slot === undefined
        ? {}
        : { slot: this.normalizeSlot(updateCategoryDto.slot) }),
      ...(updateCategoryDto.isActive === undefined
        ? {}
        : { isActive: this.validateBoolean(updateCategoryDto.isActive, 'isActive') })
    }
  }

  private assertPlainObject(value: unknown): asserts value is Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      throw new BadRequestException('Request body must be an object')
    }
  }

  private assertAllowedKeys(value: object, allowedKeys: string[]): void {
    const unexpectedKeys = Object.keys(value).filter((key) => !allowedKeys.includes(key))

    if (unexpectedKeys.length > 0) {
      throw new BadRequestException(`Unexpected fields: ${unexpectedKeys.join(', ')}`)
    }
  }

  private normalizeRequiredText(value: unknown, field: string): string {
    if (typeof value !== 'string') {
      throw new BadRequestException(`${field} must be a string`)
    }

    const normalized = value.trim()
    if (normalized.length === 0 || normalized.length > 100) {
      throw new BadRequestException(`${field} must contain between 1 and 100 characters`)
    }

    return normalized
  }

  private normalizeSlot(value: unknown): string {
    const slot = this.normalizeRequiredText(value, 'slot').toLowerCase()

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slot)) {
      throw new BadRequestException(
        'slot may only contain lowercase letters, numbers and single hyphens'
      )
    }

    return slot
  }

  private validateBoolean(value: unknown, field: string): boolean {
    if (typeof value !== 'boolean') {
      throw new BadRequestException(`${field} must be a boolean`)
    }

    return value
  }
}
