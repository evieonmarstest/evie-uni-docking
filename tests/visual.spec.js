const { test, expect } = require('@playwright/test');

async function waitGameReady(page) {
  await page.waitForSelector('canvas#game');
  await page.waitForTimeout(1200);
}

async function dragLaunch(page) {
  const box = await page.locator('canvas#game').boundingBox();
  // Launch ring is near lower-left Earth rim. Drag backwards down-left, then release.
  const startX = box.x + 240;
  const startY = box.y + 675;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX - 125, startY + 95, { steps: 12 });
  await page.waitForTimeout(120);
  await page.mouse.up();
  await page.waitForTimeout(1600);
}

test.describe('Evie UNI Docking visual tests', () => {
  for (let level = 1; level <= 9; level++) {
    test(`level ${level.toString().padStart(2,'0')} loads and screenshots`, async ({ page }) => {
      await page.goto(`/?level=${level}`);
      await waitGameReady(page);

      await expect(page.locator('body')).toContainText(`LEVEL ${level.toString().padStart(2,'0')}/09`);

      await page.screenshot({
        path: `test-results/screenshots/level_${level.toString().padStart(2,'0')}_loaded.png`,
        fullPage: true
      });

      await dragLaunch(page);

      await page.screenshot({
        path: `test-results/screenshots/level_${level.toString().padStart(2,'0')}_after_launch.png`,
        fullPage: true
      });
    });
  }

  test('keyboard jump 1 to 9 works', async ({ page }) => {
    await page.goto('/');
    await waitGameReady(page);
    for (let level = 1; level <= 9; level++) {
      await page.keyboard.press(String(level));
      await page.waitForTimeout(350);
      await expect(page.locator('body')).toContainText(`LEVEL ${level.toString().padStart(2,'0')}/09`);
    }
  });
});
