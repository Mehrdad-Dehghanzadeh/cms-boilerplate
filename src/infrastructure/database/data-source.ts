import 'dotenv/config'
import { DataSource } from 'typeorm'
import { validateEnvironment } from '../../config/app.config'
import { getDatabaseConnectionOptions } from '../../config/database.config'
import { Category } from '../../modules/categories/entities/category.entity'
import { InitialSchema1723464000000 } from './migrations/1723464000000-initial-schema'

validateEnvironment(process.env)

export default new DataSource({
  ...getDatabaseConnectionOptions(),
  entities: [Category],
  migrations: [InitialSchema1723464000000]
})
