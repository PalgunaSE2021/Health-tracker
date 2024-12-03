import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e/tests',
  testMatch: ['**/*.e2e-spec.ts'],
  timeout: 60000, // Timeout for each test in ms
  retries: 1, // Retries on failure
  reporter: 'html', // Generates an HTML report after the tests
  use: {
    baseURL: 'http://localhost:4200', // Base URL of your Angular app
    headless: false, // Set to true if you want to run tests in headless mode
    viewport: { width: 1280, height: 720 }, // Browser viewport size
    actionTimeout: 10000, // Timeout for individual actions
    ignoreHTTPSErrors: true, // Ignore HTTPS errors
    video: 'retain-on-failure', // Capture video on failure
    screenshot: 'only-on-failure', // Capture screenshots on failure
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'Webkit',
      use: { browserName: 'webkit' },
    },
  ],
});
