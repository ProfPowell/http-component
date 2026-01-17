import { test, expect } from '@playwright/test';

test.describe('http-waterfall component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/test-page.html');
    await page.waitForFunction(() => window.componentsReady === true);
  });

  test('renders exchange rows', async ({ page }) => {
    const waterfall = page.locator('#test-waterfall');
    await expect(waterfall).toBeVisible();

    // Check that exchange rows are rendered
    const rowCount = await waterfall.evaluate(el => {
      const rows = el.shadowRoot.querySelectorAll('.exchange-row, .duration-row-container, .waterfall-row-container');
      return rows.length;
    });

    expect(rowCount).toBe(3); // We set 3 exchanges in test data
  });

  test('displays HTTP methods with correct colors', async ({ page }) => {
    const waterfall = page.locator('#test-waterfall');

    const methods = await waterfall.evaluate(el => {
      const methodEls = el.shadowRoot.querySelectorAll('.method');
      return Array.from(methodEls).map(m => m.textContent.trim());
    });

    expect(methods).toContain('GET');
    expect(methods).toContain('POST');
  });

  test('displays status codes', async ({ page }) => {
    const waterfall = page.locator('#test-waterfall');

    const statuses = await waterfall.evaluate(el => {
      const statusEls = el.shadowRoot.querySelectorAll('.status');
      return Array.from(statusEls).map(s => s.textContent.trim());
    });

    expect(statuses.some(s => s.includes('200'))).toBe(true);
    expect(statuses.some(s => s.includes('201'))).toBe(true);
    expect(statuses.some(s => s.includes('404'))).toBe(true);
  });

  test('switches between views', async ({ page }) => {
    const waterfall = page.locator('#test-waterfall');

    // Click duration view button
    await waterfall.evaluate(el => {
      const btn = el.shadowRoot.querySelector('[data-view="duration"]');
      if (btn) btn.click();
    });

    const view = await waterfall.evaluate(el => el.view);
    expect(view).toBe('duration');

    // Click waterfall view button
    await waterfall.evaluate(el => {
      const btn = el.shadowRoot.querySelector('[data-view="waterfall"]');
      if (btn) btn.click();
    });

    const waterfallView = await waterfall.evaluate(el => el.view);
    expect(waterfallView).toBe('waterfall');
  });

  test('expands row on click', async ({ page }) => {
    const waterfall = page.locator('#test-waterfall');

    // Set to list view first
    await waterfall.evaluate(el => el.view = 'list');

    // Click expand button on first row
    await waterfall.evaluate(el => {
      const expandBtn = el.shadowRoot.querySelector('.expand-btn');
      if (expandBtn) expandBtn.click();
    });

    // Check that detail section appeared
    const hasDetail = await waterfall.evaluate(el => {
      return el.shadowRoot.querySelector('.exchange-detail') !== null;
    });

    expect(hasDetail).toBe(true);
  });

  test('displays request count', async ({ page }) => {
    const waterfall = page.locator('#test-waterfall');

    const infoText = await waterfall.evaluate(el => {
      const info = el.shadowRoot.querySelector('.info');
      return info ? info.textContent : '';
    });

    expect(infoText).toContain('3');
    expect(infoText).toContain('request');
  });
});

test.describe('http-waterfall explorer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/test-page.html');
    await page.waitForFunction(() => window.componentsReady === true);
  });

  test('shows explorer panel when attribute is set', async ({ page }) => {
    const explorer = page.locator('#test-explorer');
    await expect(explorer).toBeVisible();

    // Check that explorer content is visible
    const hasExplorerContent = await explorer.evaluate(el => {
      const content = el.shadowRoot.querySelector('.explorer-content.visible');
      return content !== null;
    });

    expect(hasExplorerContent).toBe(true);
  });

  test('has method selector', async ({ page }) => {
    const explorer = page.locator('#test-explorer');

    const hasMethodSelect = await explorer.evaluate(el => {
      return el.shadowRoot.querySelector('.method-select') !== null;
    });

    expect(hasMethodSelect).toBe(true);
  });

  test('has URL input', async ({ page }) => {
    const explorer = page.locator('#test-explorer');

    const hasUrlInput = await explorer.evaluate(el => {
      return el.shadowRoot.querySelector('.url-input') !== null;
    });

    expect(hasUrlInput).toBe(true);
  });

  test('has send button', async ({ page }) => {
    const explorer = page.locator('#test-explorer');

    const hasSendBtn = await explorer.evaluate(el => {
      return el.shadowRoot.querySelector('.send-button') !== null;
    });

    expect(hasSendBtn).toBe(true);
  });

  test('has headers section', async ({ page }) => {
    const explorer = page.locator('#test-explorer');

    const hasHeadersList = await explorer.evaluate(el => {
      return el.shadowRoot.querySelector('.headers-list') !== null;
    });

    expect(hasHeadersList).toBe(true);
  });

  test('can add headers', async ({ page }) => {
    const explorer = page.locator('#test-explorer');

    // Get initial header count
    const initialCount = await explorer.evaluate(el => {
      return el.shadowRoot.querySelectorAll('.header-row').length;
    });

    // Click add header button
    await explorer.evaluate(el => {
      const btn = el.shadowRoot.querySelector('.add-header-btn');
      if (btn) btn.click();
    });

    // Check header count increased
    const newCount = await explorer.evaluate(el => {
      return el.shadowRoot.querySelectorAll('.header-row').length;
    });

    expect(newCount).toBe(initialCount + 1);
  });

  test('toggles explorer panel', async ({ page }) => {
    const explorer = page.locator('#test-explorer');

    // Click toggle to close
    await explorer.evaluate(el => {
      const toggle = el.shadowRoot.querySelector('.explorer-toggle');
      if (toggle) toggle.click();
    });

    // Check content is hidden
    const isVisible = await explorer.evaluate(el => {
      const content = el.shadowRoot.querySelector('.explorer-content');
      return content && content.classList.contains('visible');
    });

    expect(isVisible).toBe(false);

    // Click toggle to open again
    await explorer.evaluate(el => {
      const toggle = el.shadowRoot.querySelector('.explorer-toggle');
      if (toggle) toggle.click();
    });

    // Check content is visible again
    const isVisibleAgain = await explorer.evaluate(el => {
      const content = el.shadowRoot.querySelector('.explorer-content');
      return content && content.classList.contains('visible');
    });

    expect(isVisibleAgain).toBe(true);
  });
});
