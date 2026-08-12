import type { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CategoriesController } from '../src/modules/categories/categories.controller'
import { CategoriesService } from '../src/modules/categories/categories.service'

describe('CategoriesController (e2e)', () => {
  let app: INestApplication

  const categoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: categoriesService
        }
      ]
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('GET /categories returns categories', async () => {
    const categories = [
      {
        id: 'eeb89a4e-a541-4fb2-bca4-cb3be7dba96f',
        name: 'News',
        slot: 'news',
        isActive: true
      }
    ]
    categoriesService.findAll.mockResolvedValue(categories)

    await request(app.getHttpServer()).get('/categories').expect(200).expect(categories)
  })

  it('POST /categories forwards a valid request body', async () => {
    const category = {
      id: 'eeb89a4e-a541-4fb2-bca4-cb3be7dba96f',
      name: 'News',
      slot: 'news',
      isActive: true
    }
    categoriesService.create.mockResolvedValue(category)

    await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'News', slot: 'news' })
      .expect(201)
      .expect(category)
  })

  it('GET /categories/:id rejects invalid UUIDs', async () => {
    await request(app.getHttpServer()).get('/categories/not-a-uuid').expect(400)
    expect(categoriesService.findOne).not.toHaveBeenCalled()
  })
})
