/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_URL: string
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_LOGGING: string
  readonly VITE_MAX_REQUEST_SIZE: string
  readonly VITE_RATE_LIMIT: string
  readonly VITE_ENABLE_DEVTOOLS: string
  readonly VITE_ENABLE_MOCK_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {}; 