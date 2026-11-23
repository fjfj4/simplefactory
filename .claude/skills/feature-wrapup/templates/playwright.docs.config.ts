// Playwright config used ONLY for documentation captures (docs/capture/*.spec.ts).
// Copy to the repo root as playwright.docs.config.ts and fill in the TODOs.
// Run: npx playwright test -c playwright.docs.config.ts
import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.DOCS_PORT ?? 3000);

export default defineConfig({
  testDir: './docs/capture',
  outputDir: './test-results/docs-capture',
  fullyParallel: false,
  workers: 1, // deterministic order, one demo state
  retries: 0, // a flaky capture is a bug to fix, not to retry
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.DOCS_BASE_URL ?? `http://localhost:${PORT}`,
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
    video: { mode: 'on', size: { width: 1280, height: 800 } },
    launchOptions: {
      slowMo: 250, // slow enough for a human to follow the video
      ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
        ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
        : {}),
    },
  },
  webServer: process.env.DOCS_BASE_URL
    ? undefined
    : {
        // TODO: command that boots the app WITH deterministic demo/seed data.
        command: `npm run dev:demo -- --port ${PORT}`,
        url: `http://localhost:${PORT}`,
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
