import { registerAs } from '@nestjs/config'

const SUPPORTED_ENVIRONMENTS = ['development', 'test', 'production'] as const

function parsePort(value: unknown, name: string, fallback?: number): number {
  const candidate = value ?? fallback
  const port = Number(candidate)

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(`${name} must be an integer between 1 and 65535`)
  }

  return port
}

function requireString(environment: Record<string, unknown>, key: string): string {
  const value = environment[key]

  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${key} is required`)
  }

  return value.trim()
}

export function validateEnvironment(
  environment: Record<string, unknown>
): Record<string, unknown> {
  const nodeEnv = String(environment.NODE_ENV ?? 'development')

  if (!SUPPORTED_ENVIRONMENTS.includes(nodeEnv as (typeof SUPPORTED_ENVIRONMENTS)[number])) {
    throw new Error(`NODE_ENV must be one of: ${SUPPORTED_ENVIRONMENTS.join(', ')}`)
  }

  const dbType = String(environment.DB_TYPE ?? '')
  if (dbType !== 'postgres') {
    throw new Error('DB_TYPE must be postgres')
  }

  return {
    ...environment,
    NODE_ENV: nodeEnv,
    PORT: parsePort(environment.PORT, 'PORT', 3000),
    DB_TYPE: dbType,
    DB_HOST: requireString(environment, 'DB_HOST'),
    DB_PORT: parsePort(environment.DB_PORT, 'DB_PORT'),
    DB_USERNAME: requireString(environment, 'DB_USERNAME'),
    DB_PASSWORD: requireString(environment, 'DB_PASSWORD'),
    DB_NAME: requireString(environment, 'DB_NAME')
  }
}

export const appConfig = registerAs('app', () => ({
  environment: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000)
}))
