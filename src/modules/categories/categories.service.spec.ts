import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { QueryFailedError } from 'typeorm'
import { CategoriesService } from './categories.service'
import { Category } from './entities/category.entity'

type RepositoryMock = {
  create: jest.Mock
  find: jest.Mock
  findOneBy: jest.Mock
  merge: jest.Mock
  remove: jest.Mock
  save: jest.Mock
}

describe('CategoriesService', () => {
  let service: CategoriesService
  let repository: RepositoryMock

  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      merge: jest.fn(),
      remove: jest.fn(),
      save: jest.fn()
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: repository
        }
      ]
    }).compile()

    service = moduleRef.get(CategoriesService)
  })

  it('normalizes and creates a category', async () => {
    const category = {
      id: 'eeb89a4e-a541-4fb2-bca4-cb3be7dba96f',
      name: 'News',
      slot: 'top-news',
      isActive: true
    } as Category

    repository.create.mockReturnValue(category)
    repository.save.mockResolvedValue(category)

    await expect(
      service.create({ name: ' News ', slot: 'Top-News', isActive: true })
    ).resolves.toBe(category)
    expect(repository.create).toHaveBeenCalledWith({
      name: 'News',
      slot: 'top-news',
      isActive: true
    })
  })

  it('rejects invalid slots', async () => {
    await expect(service.create({ name: 'News', slot: 'top_news' })).rejects.toBeInstanceOf(
      BadRequestException
    )
  })

  it('throws when a category does not exist', async () => {
    repository.findOneBy.mockResolvedValue(null)

    await expect(
      service.findOne('eeb89a4e-a541-4fb2-bca4-cb3be7dba96f')
    ).rejects.toBeInstanceOf(NotFoundException)
  })

  it('maps PostgreSQL unique violations to a conflict', async () => {
    const category = { name: 'News', slot: 'news' } as Category
    const error = new QueryFailedError(
      'query',
      [],
      Object.assign(new Error('duplicate'), { code: '23505' })
    )

    repository.create.mockReturnValue(category)
    repository.save.mockRejectedValue(error)

    await expect(service.create({ name: 'News', slot: 'news' })).rejects.toBeInstanceOf(
      ConflictException
    )
  })
})
