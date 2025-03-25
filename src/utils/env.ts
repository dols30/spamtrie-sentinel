/**
 * Environment variable utility functions
 * Provides type-safe access to environment variables with proper parsing
 */

/**
 * Get a string environment variable
 * @param key The environment variable key
 * @param defaultValue Optional default value if not set
 */
export const getEnvString = (key: keyof ImportMetaEnv, defaultValue?: string): string => {
  const value = import.meta.env[key]
  return value ?? defaultValue ?? ''
}

/**
 * Get a number environment variable
 * @param key The environment variable key
 * @param defaultValue Optional default value if not set or invalid
 */
export const getEnvNumber = (key: keyof ImportMetaEnv, defaultValue?: number): number => {
  const value = import.meta.env[key]
  const parsed = value ? parseInt(value, 10) : undefined
  return parsed ?? defaultValue ?? 0
}

/**
 * Get a boolean environment variable
 * @param key The environment variable key
 * @param defaultValue Optional default value if not set
 */
export const getEnvBoolean = (key: keyof ImportMetaEnv, defaultValue?: boolean): boolean => {
  const value = import.meta.env[key]?.toLowerCase()
  if (value === 'true') return true
  if (value === 'false') return false
  return defaultValue ?? false
}

// Application config
export const APP_NAME = getEnvString('VITE_APP_NAME', 'SpamTrie Sentinel')
export const APP_URL = getEnvString('VITE_APP_URL', 'http://localhost:5173')

// API config
export const API_URL = getEnvString('VITE_API_URL', 'http://localhost:3000')
export const API_TIMEOUT = getEnvNumber('VITE_API_TIMEOUT', 5000)

// Feature flags
export const ENABLE_ANALYTICS = getEnvBoolean('VITE_ENABLE_ANALYTICS', false)
export const ENABLE_LOGGING = getEnvBoolean('VITE_ENABLE_LOGGING', true)

// Security
export const MAX_REQUEST_SIZE = getEnvNumber('VITE_MAX_REQUEST_SIZE', 10485760)
export const RATE_LIMIT = getEnvNumber('VITE_RATE_LIMIT', 100)

// Development
export const ENABLE_DEVTOOLS = getEnvBoolean('VITE_ENABLE_DEVTOOLS', false)
export const ENABLE_MOCK_API = getEnvBoolean('VITE_ENABLE_MOCK_API', false) 