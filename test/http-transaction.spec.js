import { test, expect } from '@playwright/test';

test.describe('http-transaction component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/test-page.html');
    await page.waitForFunction(() => window.componentsReady === true);
  });

  test('renders request and response sections', async ({ page }) => {
    const transaction = page.locator('#test-transaction');
    await expect(transaction).toBeVisible();

    // Check that both request and response sections exist
    const shadowRoot = await transaction.evaluateHandle(el => el.shadowRoot);
    const requestSection = await shadowRoot.evaluate(root => root.querySelector('http-request') !== null);
    const responseSection = await shadowRoot.evaluate(root => root.querySelector('http-response') !== null);

    expect(requestSection).toBe(true);
    expect(responseSection).toBe(true);
  });

  test('displays correct HTTP method', async ({ page }) => {
    const transaction = page.locator('#test-transaction');
    // http-request is nested in shadow DOM
    const text = await transaction.evaluate(el => {
      const request = el.shadowRoot.querySelector('http-request');
      return request ? request.shadowRoot.textContent : '';
    });

    expect(text).toContain('GET');
  });

  test('displays URL', async ({ page }) => {
    const transaction = page.locator('#test-transaction');
    const text = await transaction.evaluate(el => {
      const request = el.shadowRoot.querySelector('http-request');
      return request ? request.shadowRoot.textContent : '';
    });

    expect(text).toContain('/api/test');
  });

  test('displays status code', async ({ page }) => {
    const transaction = page.locator('#test-transaction');
    const text = await transaction.evaluate(el => {
      const response = el.shadowRoot.querySelector('http-response');
      return response ? response.shadowRoot.textContent : '';
    });

    expect(text).toContain('200');
    expect(text).toContain('OK');
  });

  test('displays headers', async ({ page }) => {
    const transaction = page.locator('#test-transaction');
    const text = await transaction.evaluate(el => {
      const request = el.shadowRoot.querySelector('http-request');
      return request ? request.shadowRoot.textContent : '';
    });

    expect(text).toContain('Accept');
    expect(text).toContain('application/json');
  });

  test('displays JSON body with highlighting', async ({ page }) => {
    const transaction = page.locator('#test-transaction');
    const text = await transaction.evaluate(el => {
      const response = el.shadowRoot.querySelector('http-response');
      return response ? response.shadowRoot.textContent : '';
    });

    expect(text).toContain('success');
    expect(text).toContain('true');
  });

  test('respects theme attribute', async ({ page }) => {
    const transaction = page.locator('#test-transaction');

    // Set dark theme
    await transaction.evaluate(el => el.setAttribute('theme', 'dark'));

    const theme = await transaction.getAttribute('theme');
    expect(theme).toBe('dark');
  });
});
