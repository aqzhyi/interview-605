import { defineConfig, devices } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testMatch: ['**/*.e2e.ts', '**/*.e2e.tsx'],
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  reporter: 'html',
  workers: '90%',
  use: {
    baseURL: 'http://localhost:60733',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:60733',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
})
