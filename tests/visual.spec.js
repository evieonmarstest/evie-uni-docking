Paste this into `tests/visual.spec.js`:

```javascript
const { test, expect } = require('@playwright/test');

async function waitGameReady(page) {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  await page.waitForSelector('canvas#game');
  await page.waitForTimeout(1600);

  expect(errors, 'No JavaScript page errors').toEqual([]);
}

async function dragLaunch(page) {
  const box = await page.locator('canvas#game').boundingBox();
  expect(box, 'canvas exists').toBeTruthy();

  const startX = box.x + 240;
  const startY = box.y + 675;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX - 125, startY + 95, { steps: 16 });
  await page.waitForTimeout(120);
  await page.mouse.up();
  await page.waitForTimeout(1800);
}

test.describe('Evie UNI Docking real browser visual tests', () => {
  for (let level = 1; level <= 9; level++) {
    test(`level ${level.toString().padStart(2, '0')} renders and launches`, async ({ page }) => {
      await page.goto(`/?level=${level}`);
      await waitGameReady(page);

      await page.screenshot({
        path: `test-results/screenshots/level_${level.toString().padStart(2, '0')}_loaded.png`,
        fullPage: true
      });

      await dragLaunch(page);

      await page.screenshot({
        path: `test-results/screenshots/level_${level.toString().padStart(2, '0')}_after_launch.png`,
        fullPage: true
      });
    });
  }

  test('keyboard jump 1 to 9 does not crash', async ({ page }) => {
    await page.goto('/');
    await waitGameReady(page);

    for (let level = 1; level <= 9; level++) {
      await page.keyboard.press(String(level));
      await page.waitForTimeout(600);

      await page.screenshot({
        path: `test-results/screenshots/key_jump_${level.toString().padStart(2, '0')}.png`,
        fullPage: true
      });
    }
  });
});
```
