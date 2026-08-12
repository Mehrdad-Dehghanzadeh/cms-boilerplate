import { validateEnvironment } from './app.config'

const validEnvironment = {
  NODE_ENV: 'test',
  PORT: '3000',
  DB_TYPE: 'postgres',
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_USERNAME: 'cms_user',
  DB_PASSWORD: 'secret',
  DB_NAME: 'cms'
}

describe('validateEnvironment', () => {
  it('normalizes numeric values', () => {
    expect(validateEnvironment(validEnvironment)).toMatchObject({
      NODE_ENV: 'test',
      PORT: 3000,
      DB_PORT: 5432
    })
  })

  it('uses the default application port', () => {
    const environmentWithoutPort: Record<string, string> = {
      ...validEnvironment
    }
    Reflect.deleteProperty(environmentWithoutPort, 'PORT')

    expect(validateEnvironment(environmentWithoutPort)).toMatchObject({
      PORT: 3000
    })
  })

  it('rejects missing database credentials', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        DB_PASSWORD: ''
      })
    ).toThrow('DB_PASSWORD is required')
  })

  it('rejects unsupported database types', () => {
    expect(() =>
      validateEnvironment({
        ...validEnvironment,
        DB_TYPE: 'mysql'
      })
    ).toThrow('DB_TYPE must be postgres')
  })
})
