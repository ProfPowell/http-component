/**
 * Resource Timing source
 *
 * Turns the browser's own record of a page load (Navigation Timing and
 * Resource Timing entries) into the exchange objects http-waterfall draws.
 *
 * The interceptor sees only fetch() and XMLHttpRequest calls made by script.
 * This source sees what the HTML itself asked for: the document, stylesheets,
 * scripts, images, fonts, and frames. It cannot see headers or bodies, because
 * the Resource Timing API does not expose them.
 *
 * The conversion is a pure function (resourceEntryToExchange) so it can be
 * tested with plain objects. ResourceTimingSource is the thin shell that
 * subscribes to the browser.
 */

/**
 * @typedef {Object} ResourcePhases
 * @property {number} queue - Time before the request could start (ms)
 * @property {number} dns - Name lookup (ms)
 * @property {number} connect - TCP connection (ms)
 * @property {number} tls - TLS negotiation (ms)
 * @property {number} wait - Request sent until the first response byte (ms)
 * @property {number} download - First response byte until the last (ms)
 */

/**
 * @typedef {Object} ResourceFacts
 * @property {'navigation'|'resource'} kind - The entry type
 * @property {string} initiatorType - What asked for it (img, css, script, ...)
 * @property {string} label - Short display name (path, or host and path)
 * @property {boolean} crossOrigin - Whether the URL is on another origin
 * @property {boolean} opaque - Cross-origin without Timing-Allow-Origin: sizes and phases are hidden
 * @property {string} protocol - Negotiated protocol as reported (h2, h3, http/1.1) or ''
 * @property {number} transferSize - Bytes on the wire, headers included
 * @property {number} encodedBodySize - Body bytes as sent (after compression)
 * @property {number} decodedBodySize - Body bytes after decoding
 * @property {'network'|'cache'|'revalidated'|'unknown'} cache - Where the body came from
 * @property {string} [renderBlocking] - 'blocking' or 'non-blocking' when the browser reports it
 * @property {string} [contentType] - Media type when the browser reports it
 * @property {string} [contentEncoding] - Content coding when the browser reports it
 */

const PROTOCOL_LABELS = {
  'http/1.0': 'HTTP/1.0',
  'http/1.1': 'HTTP/1.1',
  h2: 'HTTP/2',
  h2c: 'HTTP/2',
  h3: 'HTTP/3',
};

/** Initiators that are always a plain GET made by the browser itself. */
const GET_INITIATORS = new Set([
  'navigation',
  'link',
  'script',
  'img',
  'image',
  'css',
  'iframe',
  'frame',
  'video',
  'audio',
  'track',
  'embed',
  'object',
  'input',
  'use',
  'other',
]);

const num = value => (Number.isFinite(value) ? value : 0);
const round1 = value => Math.round(num(value) * 10) / 10;
const span = (end, start) => (end > 0 && start > 0 && end >= start ? round1(end - start) : 0);

/**
 * Test a URL against a filter pattern. `*` matches any run of characters.
 * A pattern with no `*` matches when the URL contains it.
 * @param {string} url - URL to test
 * @param {string|null} [pattern] - Filter pattern
 * @returns {boolean} True when the URL passes the filter
 */
export function matchesResourceFilter(url, pattern) {
  if (!pattern) return true;
  if (!pattern.includes('*')) return url.includes(pattern);
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(escaped).test(url);
}

/**
 * Shorten a long label in the middle, keeping the host and the file name.
 * @param {string} text - Text to shorten
 * @param {number} [max=40] - Maximum length
 * @returns {string} Shortened text
 */
export function shortenMiddle(text, max = 40) {
  if (text.length <= max) return text;
  const head = Math.ceil((max - 1) * 0.4);
  const tail = max - 1 - head;
  return `${text.slice(0, head)}…${text.slice(-tail)}`;
}

/**
 * Describe a URL relative to the page it was loaded by.
 * @param {string} url - Absolute resource URL
 * @param {string} pageOrigin - Origin of the page (location.origin)
 * @returns {{crossOrigin: boolean, label: string}} Origin relation and display label
 */
export function describeResourceUrl(url, pageOrigin) {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname + parsed.search;
    const crossOrigin = parsed.origin !== pageOrigin;
    return { crossOrigin, label: crossOrigin ? parsed.host + path : path };
  } catch {
    return { crossOrigin: false, label: url };
  }
}

/**
 * Decide where a response body came from, using sizes alone.
 * @param {Object} entry - Resource timing entry (or a plain object shaped like one)
 * @param {boolean} opaque - Whether sizes are hidden for this entry
 * @returns {'network'|'cache'|'revalidated'|'unknown'} Cache state
 */
export function resourceCacheState(entry, opaque) {
  if (opaque) return 'unknown';
  const transfer = num(entry.transferSize);
  const encoded = num(entry.encodedBodySize);
  const decoded = num(entry.decodedBodySize);

  if (entry.responseStatus === 304) return 'revalidated';
  if (entry.deliveryType === 'cache') return 'cache';
  // Nothing crossed the network, yet there is a body: it came from a cache.
  if (transfer === 0 && decoded > 0) return 'cache';
  // Fewer bytes crossed the network than the body holds: headers only, a 304.
  if (transfer > 0 && encoded > 0 && transfer < encoded) return 'revalidated';
  if (transfer > 0) return 'network';
  return 'unknown';
}

/**
 * Convert one Navigation Timing or Resource Timing entry into an exchange.
 * Pure: reads only its arguments.
 *
 * @param {Object} entry - PerformanceResourceTiming-like object
 * @param {string} pageOrigin - Origin of the page (location.origin)
 * @returns {Object} Exchange with request, response, timing, and resource facts
 */
export function resourceEntryToExchange(entry, pageOrigin) {
  const url = entry.name || '';
  const { crossOrigin, label } = describeResourceUrl(url, pageOrigin);
  const kind = entry.entryType === 'navigation' ? 'navigation' : 'resource';
  const initiatorType = kind === 'navigation' ? 'navigation' : entry.initiatorType || 'other';

  const transferSize = num(entry.transferSize);
  const encodedBodySize = num(entry.encodedBodySize);
  const decodedBodySize = num(entry.decodedBodySize);

  // Without Timing-Allow-Origin a cross-origin entry reports zero for its
  // sizes and for every timestamp between start and end.
  const opaque =
    crossOrigin &&
    transferSize === 0 &&
    encodedBodySize === 0 &&
    decodedBodySize === 0 &&
    !(num(entry.responseStart) > 0);

  const startTime = num(entry.startTime);
  const endTime = num(entry.responseEnd) > 0 ? entry.responseEnd : startTime + num(entry.duration);
  const duration = Math.max(0, endTime - startTime);

  let phases = null;
  if (!opaque) {
    const tlsStart = num(entry.secureConnectionStart);
    const dns = span(entry.domainLookupEnd, entry.domainLookupStart);
    const connect = span(tlsStart > 0 ? tlsStart : entry.connectEnd, entry.connectStart);
    const tls = tlsStart > 0 ? span(entry.connectEnd, tlsStart) : 0;
    const wait = span(entry.responseStart, entry.requestStart);
    const download = span(entry.responseEnd, entry.responseStart);
    const queue = Math.max(0, round1(duration - dns - connect - tls - wait - download));
    phases = { queue, dns, connect, tls, wait, download };
  }

  const protocol = entry.nextHopProtocol || '';
  const httpVersion = PROTOCOL_LABELS[protocol] || (protocol ? protocol.toUpperCase() : undefined);
  const status = num(entry.responseStatus);
  const responseHeaders = {};
  if (entry.contentType) responseHeaders['Content-Type'] = entry.contentType;
  if (entry.contentEncoding) responseHeaders['Content-Encoding'] = entry.contentEncoding;

  /** @type {ResourceFacts} */
  const resource = {
    kind,
    initiatorType,
    label,
    crossOrigin,
    opaque,
    protocol,
    transferSize,
    encodedBodySize,
    decodedBodySize,
    cache: resourceCacheState(entry, opaque),
  };
  if (entry.renderBlockingStatus) resource.renderBlocking = entry.renderBlockingStatus;
  if (entry.contentType) resource.contentType = entry.contentType;
  if (entry.contentEncoding) resource.contentEncoding = entry.contentEncoding;

  return {
    request: {
      method: GET_INITIATORS.has(initiatorType) ? 'GET' : '?',
      url,
      httpVersion,
      headers: {},
      body: null,
    },
    response: {
      status,
      statusText: '',
      httpVersion,
      headers: responseHeaders,
      body: null,
    },
    timing: {
      startTime: Math.round(startTime),
      endTime: Math.round(endTime),
      duration: Math.round(duration),
      phases,
    },
    resource,
  };
}

/**
 * @typedef {Object} ResourceSourceOptions
 * @property {string|null} [filter=null] - URL filter pattern (* wildcard supported)
 * @property {boolean} [navigation=true] - Include the document itself
 * @property {boolean} [skipScripted=false] - Leave out fetch and XHR entries (use when the interceptor is also capturing)
 */

/**
 * Subscribes to the browser's Navigation Timing and Resource Timing entries
 * and reports them as exchanges, in batches.
 *
 * @class
 * @example
 * const source = new ResourceTimingSource();
 * source.start(exchanges => console.log(exchanges.length, 'new requests'));
 * // Later
 * source.stop();
 */
export class ResourceTimingSource {
  constructor() {
    /** @type {boolean} */
    this.isActive = false;
    /** @type {string|null} */
    this.filter = null;
    /** @type {PerformanceObserver|null} */
    this._observer = null;
  }

  /**
   * True when this browser can report resource timing.
   * @returns {boolean} Support flag
   */
  static get supported() {
    return (
      typeof window !== 'undefined' &&
      'PerformanceObserver' in window &&
      'performance' in window &&
      typeof performance.getEntriesByType === 'function'
    );
  }

  /**
   * Start reporting. Entries recorded before this call are delivered first.
   * @param {function(Object[]): void} callback - Called with each batch of exchanges, oldest first
   * @param {ResourceSourceOptions} [options={}] - Configuration options
   */
  start(callback, options = {}) {
    if (this.isActive || !ResourceTimingSource.supported) return;

    this.isActive = true;
    this.filter = options.filter || null;
    const includeNavigation = options.navigation !== false;
    const skipScripted = options.skipScripted === true;
    const pageOrigin = window.location.origin;

    const deliver = entries => {
      const exchanges = entries
        .filter(entry => matchesResourceFilter(entry.name, this.filter))
        .filter(
          entry =>
            !skipScripted ||
            (entry.initiatorType !== 'fetch' && entry.initiatorType !== 'xmlhttprequest')
        )
        .map(entry => resourceEntryToExchange(entry, pageOrigin))
        .sort((a, b) => a.timing.startTime - b.timing.startTime);
      if (exchanges.length > 0) callback(exchanges);
    };

    if (includeNavigation) {
      deliver(performance.getEntriesByType('navigation'));
    }

    this._observer = new window.PerformanceObserver(list => deliver(list.getEntries()));
    this._observer.observe({ type: 'resource', buffered: true });
  }

  /**
   * Stop reporting.
   */
  stop() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    this.isActive = false;
  }
}
