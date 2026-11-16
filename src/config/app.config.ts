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

  if (
    !SUPPORTED_ENVIRONMENTS.includes(nodeEnv as (typeof SUPPORTED_ENVIRONMENTS)[number])
  ) {
    throw new Error(`NODE_ENV must be one of: ${SUPPORTED_ENVIRONMENTS.join(', ')}`)
  }

  return {
    ...environment,
    NODE_ENV: nodeEnv,
    PORT: parsePort(environment.PORT, 'PORT', 3000),
    PGHOST: requireString(environment, 'PGHOST'),
    PGPORT: parsePort(environment.PGPORT, 'PGPORT'),
    PGUSER: requireString(environment, 'PGUSER'),
    PGPASSWORD: requireString(environment, 'PGPASSWORD'),
    PGDATABASE: requireString(environment, 'PGDATABASE')
  }
}

export const appConfig = registerAs('app', () => ({
  environment: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000)
}))
