import { test, expect } from '@playwright/test';

const ORIGIN = 'https://www.example.com';

/** A plain object shaped like a PerformanceResourceTiming entry. */
function entry(overrides = {}) {
  return {
    name: `${ORIGIN}/assets/main.css`,
    entryType: 'resource',
    initiatorType: 'link',
    startTime: 100,
    fetchStart: 100,
    domainLookupStart: 100,
    domainLookupEnd: 100,
    connectStart: 100,
    secureConnectionStart: 0,
    connectEnd: 100,
    requestStart: 102,
    responseStart: 140,
    responseEnd: 150,
    duration: 50,
    transferSize: 1100,
    encodedBodySize: 800,
    decodedBodySize: 1800,
    nextHopProtocol: 'h2',
    responseStatus: 200,
    ...overrides,
  };
}

test.describe('resourceEntryToExchange', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/test-page.html');
  });

  /** Run the pure conversion in the browser, where the module loads as shipped. */
  async function convert(page, overrides) {
    return page.evaluate(
      async ([e, origin]) => {
        const { resourceEntryToExchange } = await import('/src/resource-timing.js');
        return resourceEntryToExchange(e, origin);
      },
      [entry(overrides), ORIGIN]
    );
  }

  test('maps a same-origin network response', async ({ page }) => {
    const exchange = await convert(page, {});

    expect(exchange.request.method).toBe('GET');
    expect(exchange.request.httpVersion).toBe('HTTP/2');
    expect(exchange.response.status).toBe(200);
    expect(exchange.timing).toMatchObject({ startTime: 100, endTime: 150, duration: 50 });
    expect(exchange.resource).toMatchObject({
      kind: 'resource',
      initiatorType: 'link',
      label: '/assets/main.css',
      crossOrigin: false,
      opaque: false,
      cache: 'network',
      transferSize: 1100,
      encodedBodySize: 800,
      decodedBodySize: 1800,
    });
  });

  test('splits the duration into phases that add up', async ({ page }) => {
    const exchange = await convert(page, {
      domainLookupStart: 101,
      domainLookupEnd: 111,
      connectStart: 111,
      secureConnectionStart: 121,
      connectEnd: 136,
      requestStart: 136,
      responseStart: 146,
      responseEnd: 150,
    });
    const { queue, dns, connect, tls, wait, download } = exchange.timing.phases;

    expect({ dns, connect, tls, wait, download }).toEqual({
      dns: 10,
      connect: 10,
      tls: 15,
      wait: 10,
      download: 4,
    });
    expect(queue + dns + connect + tls + wait + download).toBeCloseTo(50, 5);
  });

  test('reports no connection phases on a reused connection', async ({ page }) => {
    const { phases } = (await convert(page, {})).timing;

    expect(phases.dns).toBe(0);
    expect(phases.connect).toBe(0);
    expect(phases.tls).toBe(0);
    expect(phases.wait).toBe(38);
  });

  test('recognises a body served from cache', async ({ page }) => {
    const exchange = await convert(page, { transferSize: 0 });
    expect(exchange.resource.cache).toBe('cache');
  });

  test('recognises a revalidated response', async ({ page }) => {
    // Headers crossed the network; the 800-byte body did not.
    const bySize = await convert(page, { transferSize: 300 });
    expect(bySize.resource.cache).toBe('revalidated');

    const byStatus = await convert(page, { responseStatus: 304 });
    expect(byStatus.resource.cache).toBe('revalidated');
  });

  test('marks a cross-origin response without Timing-Allow-Origin as opaque', async ({ page }) => {
    const exchange = await convert(page, {
      name: 'https://cdn.other.example/lib/widget.min.js',
      initiatorType: 'script',
      domainLookupStart: 0,
      domainLookupEnd: 0,
      connectStart: 0,
      connectEnd: 0,
      requestStart: 0,
      responseStart: 0,
      transferSize: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
      responseStatus: 0,
    });

    expect(exchange.resource).toMatchObject({
      crossOrigin: true,
      opaque: true,
      cache: 'unknown',
      label: 'cdn.other.example/lib/widget.min.js',
    });
    expect(exchange.timing.phases).toBeNull();
    // Start and end are still exposed, so the bar can be drawn.
    expect(exchange.timing.duration).toBe(50);
  });

  test('keeps sizes for a cross-origin response that opted in', async ({ page }) => {
    const exchange = await convert(page, { name: 'https://static.other.example/a.css' });

    expect(exchange.resource.crossOrigin).toBe(true);
    expect(exchange.resource.opaque).toBe(false);
    expect(exchange.resource.cache).toBe('network');
  });

  test('places the document at time zero', async ({ page }) => {
    const exchange = await convert(page, {
      name: `${ORIGIN}/index.html`,
      entryType: 'navigation',
      initiatorType: 'navigation',
      startTime: 0,
      fetchStart: 2,
      requestStart: 5,
      responseStart: 60,
      responseEnd: 64,
      duration: 900, // a navigation entry's duration runs to the load event
    });

    expect(exchange.resource.kind).toBe('navigation');
    expect(exchange.timing).toMatchObject({ startTime: 0, endTime: 64, duration: 64 });
  });

  test('does not claim a method for scripted requests', async ({ page }) => {
    const exchange = await convert(page, { initiatorType: 'fetch' });
    expect(exchange.request.method).toBe('?');
  });

  test('carries content type and encoding when the browser reports them', async ({ page }) => {
    const exchange = await convert(page, { contentType: 'text/css', contentEncoding: 'br' });

    expect(exchange.response.headers).toEqual({
      'Content-Type': 'text/css',
      'Content-Encoding': 'br',
    });
  });
});

test.describe('http-waterfall resources attribute', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/resources-page.html');
    await page.waitForFunction(() => window.componentsReady === true);
  });

  /** Initiator of every row, in display order. */
  const initiators = waterfall =>
    waterfall.evaluate(el =>
      Array.from(el.shadowRoot.querySelectorAll('[data-initiator]')).map(
        row => row.dataset.initiator
      )
    );

  test('lists the document and the sub-resources it loaded', async ({ page }) => {
    const found = await initiators(page.locator('#page-load'));

    expect(found[0]).toBe('navigation');
    expect(found).toContain('link'); // sample.css
    expect(found).toContain('img'); // pixel.svg
    expect(found).toContain('css'); // bg.svg, found inside sample.css
    expect(found).toContain('script'); // the component itself
  });

  test('shows what asked for each request in place of the method', async ({ page }) => {
    const chips = await page.locator('#page-load').evaluate(el =>
      Array.from(el.shadowRoot.querySelectorAll('.initiator')).map(chip => chip.textContent.trim())
    );

    expect(chips[0]).toBe('doc');
    expect(chips).toContain('img');
    expect(chips).toContain('css');
  });

  test('defaults to the waterfall view, in start order', async ({ page }) => {
    const waterfall = page.locator('#page-load');
    expect(await waterfall.evaluate(el => el.view)).toBe('waterfall');

    const starts = await waterfall.evaluate(el => el.exchanges.map(e => e.timing.startTime));
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
    expect(starts[0]).toBe(0);
  });

  test('starts the document bar at the left edge', async ({ page }) => {
    const offset = await page.locator('#page-load').evaluate(el => {
      const bar = el.shadowRoot.querySelector('.timing-bar');
      return bar.style.getPropertyValue('--start-offset').trim();
    });

    expect(offset).toBe('0');
  });

  test('draws timing phases and a legend', async ({ page }) => {
    const counts = await page.locator('#page-load').evaluate(el => ({
      legendItems: el.shadowRoot.querySelectorAll('.phase-legend span').length,
      phasedBars: el.shadowRoot.querySelectorAll('.timing-bar.has-phases').length,
    }));

    expect(counts.legendItems).toBe(6);
    expect(counts.phasedBars).toBeGreaterThan(0);
  });

  test('summarises requests and bytes', async ({ page }) => {
    const info = await page
      .locator('#page-load')
      .evaluate(el => el.shadowRoot.querySelector('.info').textContent);

    expect(info).toMatch(/\d+ requests · [\d.]+ (B|KB|MB) transferred/);
  });

  test('applies the filter attribute', async ({ page }) => {
    const urls = await page
      .locator('#page-load-list')
      .evaluate(el => el.exchanges.map(e => e.request.url));

    expect(urls.length).toBeGreaterThanOrEqual(3);
    expect(urls.every(url => url.includes('/test/assets/'))).toBe(true);
  });

  test('shows a size for each row in list view', async ({ page }) => {
    const sizes = await page.locator('#page-load-list').evaluate(el =>
      Array.from(el.shadowRoot.querySelectorAll('.exchange-summary.resource .size')).map(size =>
        size.textContent.trim()
      )
    );

    expect(sizes.length).toBeGreaterThanOrEqual(3);
    for (const size of sizes) {
      expect(size).toMatch(/^([\d.]+ (B|KB|MB)|cache|revalidated|hidden)$/);
    }
  });

  test('expands a row into the facts the browser reports', async ({ page }) => {
    const waterfall = page.locator('#page-load-list');
    await waterfall.evaluate(el => el.shadowRoot.querySelector('.expand-btn').click());

    const detail = await waterfall.evaluate(el => ({
      terms: Array.from(el.shadowRoot.querySelectorAll('.resource-facts dt')).map(
        term => term.textContent
      ),
      // Resource Timing has no headers or bodies, so no wire-format panel.
      transactions: el.shadowRoot.querySelectorAll('http-transaction').length,
    }));

    expect(detail.terms).toEqual(
      expect.arrayContaining(['Requested by', 'Protocol', 'On the wire', 'Body', 'Cache', 'Phases'])
    );
    expect(detail.transactions).toBe(0);
  });

  test('adds a request that finishes after load', async ({ page }) => {
    const waterfall = page.locator('#page-load');
    const before = await waterfall.evaluate(el => el.exchanges.length);

    await page.evaluate(() => {
      const img = document.createElement('img');
      img.src = './assets/late.svg';
      img.alt = '';
      document.body.append(img);
    });

    await expect
      .poll(() => waterfall.evaluate(el => el.exchanges.length))
      .toBe(before + 1);

    const last = await waterfall.evaluate(el => el.exchanges.at(-1).request.url);
    expect(last).toContain('late.svg');
  });

  test('announces each batch with an event', async ({ page }) => {
    const urls = await page.evaluate(
      () =>
        new Promise(resolve => {
          const el = document.getElementById('page-load');
          el.addEventListener(
            'resources-observed',
            event => resolve(event.detail.exchanges.map(e => e.request.url)),
            { once: true }
          );
          const img = document.createElement('img');
          img.src = './assets/late.svg?again';
          img.alt = '';
          document.body.append(img);
        })
    );

    expect(urls.some(url => url.includes('late.svg'))).toBe(true);
  });

  test('stops listing when the attribute is removed', async ({ page }) => {
    const waterfall = page.locator('#page-load');
    const before = await waterfall.evaluate(el => {
      el.removeAttribute('resources');
      return el.exchanges.length;
    });

    await page.evaluate(async () => {
      await fetch('./assets/late.svg?after-stop');
      await new Promise(resolve => setTimeout(resolve, 150));
    });

    expect(await waterfall.evaluate(el => el.exchanges.length)).toBe(before);
  });
});

test.describe('http-waterfall timeline with static data', () => {
  test('places an exchange that starts at zero at the left edge', async ({ page }) => {
    await page.goto('/test/test-page.html');
    await page.waitForFunction(() => window.componentsReady === true);

    const offsets = await page.locator('#test-waterfall').evaluate(el => {
      el.view = 'waterfall';
      return Array.from(el.shadowRoot.querySelectorAll('.timing-bar')).map(bar =>
        bar.style.getPropertyValue('--start-offset').trim()
      );
    });

    // Test data starts at 0, 50, and 100 ms.
    expect(offsets).toEqual(['0', '50', '100']);
  });
});
