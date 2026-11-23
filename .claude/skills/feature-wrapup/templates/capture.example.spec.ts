// Example capture script. Copy to docs/capture/<feature-slug>.spec.ts.
// One test per user task. The test name becomes the video file name.
import { docsTest, shot, expect } from './helpers';

const FEATURE = 'invite-teammate';
const test = docsTest(FEATURE);

test('invite a teammate', async ({ page }) => {
  await page.goto('/');
  // TODO: log in with the DEMO account (never real credentials).
  await page.getByRole('link', { name: 'Team' }).click();
  await shot(page, FEATURE, '01-team-page');

  await page.getByRole('button', { name: 'Invite teammate' }).click();
  await page.getByLabel('Email').fill('maria@acme.example');
  await shot(page, FEATURE, '02-invite-form');

  await page.getByRole('button', { name: 'Send invite' }).click();
  // Assert the outcome: the capture doubles as a smoke test.
  await expect(page.getByText('Invite sent to maria@acme.example')).toBeVisible();
  await shot(page, FEATURE, '03-invite-sent');
});
