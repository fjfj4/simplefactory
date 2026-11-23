// Shared helpers for documentation captures. Used by docs/capture/*.spec.ts.
import { test as base, type Page } from '@playwright/test';
import path from 'node:path';

const MEDIA_ROOT = path.join('docs', 'user-guide', 'media');

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Save a screenshot as docs/user-guide/media/<feature>/<name>.png */
export async function shot(page: Page, feature: string, name: string) {
  await page.waitForLoadState('networkidle');
  await page.screenshot({
    path: path.join(MEDIA_ROOT, feature, `${name}.png`),
    animations: 'disabled',
    caret: 'hide',
  });
}

/**
 * Test fixture that saves each test's video to
 * docs/user-guide/media/<feature>/<test-title>.webm
 * Usage: const test = docsTest('invite-teammate');
 */
export function docsTest(feature: string) {
  const test = base.extend({});
  test.afterEach(async ({ page }, testInfo) => {
    const video = page.video();
    await page.close();
    if (video) {
      await video.saveAs(
        path.join(MEDIA_ROOT, feature, `${slugify(testInfo.title)}.webm`),
      );
    }
  });
  return test;
}

export { expect } from '@playwright/test';
