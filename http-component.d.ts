/**
 * HTTP Component TypeScript Definitions
 * @package @profpowell/http-component
 */

/**
 * HTTP Request data structure
 */
export interface HTTPRequestData {
  /** HTTP method (GET, POST, PUT, DELETE, etc.) */
  method: string;
  /** Request URL */
  url: string;
  /** HTTP protocol version (default: HTTP/1.1) */
  httpVersion?: string;
  /** Request headers as key-value pairs */
  headers?: Record<string, string>;
  /** Request body content */
  body?: string | null;
}

/**
 * HTTP Response data structure
 */
export interface HTTPResponseData {
  /** HTTP status code */
  status: number;
  /** Status text (OK, Not Found, etc.) */
  statusText: string;
  /** HTTP protocol version (default: HTTP/1.1) */
  httpVersion?: string;
  /** Response headers as key-value pairs */
  headers?: Record<string, string>;
  /** Response body content */
  body?: string | null;
}

/**
 * HTTP Exchange data structure (request + response)
 */
export interface HTTPExchange {
  /** Request data */
  request: HTTPRequestData;
  /** Response data */
  response: HTTPResponseData;
}

/**
 * Timing information for HTTP exchanges
 */
export interface HTTPTiming {
  /** Request start timestamp (milliseconds) */
  startTime: number;
  /** Request end timestamp (milliseconds) */
  endTime: number;
  /** Request duration (milliseconds) */
  duration: number;
  /** Optional detailed timing phases; null when the browser hides them */
  phases?: ResourcePhases | Record<string, number> | null;
}

/**
 * Timing phases of one request, in milliseconds, in the order they happen
 */
export interface ResourcePhases {
  /** Time before the request could start */
  queue: number;
  /** Name lookup */
  dns: number;
  /** TCP connection */
  connect: number;
  /** TLS negotiation */
  tls: number;
  /** Request sent until the first response byte */
  wait: number;
  /** First response byte until the last */
  download: number;
}

/**
 * What the browser's Resource Timing data reports about one request
 */
export interface ResourceFacts {
  /** The document itself, or something it loaded */
  kind: 'navigation' | 'resource';
  /** What asked for it: navigation, link, script, img, css, iframe, fetch, ... */
  initiatorType: string;
  /** Short display name: a path, or host and path when cross-origin */
  label: string;
  /** Whether the URL is on another origin than the page */
  crossOrigin: boolean;
  /** Cross-origin without Timing-Allow-Origin: sizes and phases are hidden */
  opaque: boolean;
  /** Negotiated protocol as reported (h2, h3, http/1.1), or '' */
  protocol: string;
  /** Bytes on the wire, headers included */
  transferSize: number;
  /** Body bytes as sent, after compression */
  encodedBodySize: number;
  /** Body bytes after decoding */
  decodedBodySize: number;
  /** Where the body came from */
  cache: 'network' | 'cache' | 'revalidated' | 'unknown';
  /** 'blocking' or 'non-blocking', when the browser reports it */
  renderBlocking?: string;
  /** Media type, when the browser reports it */
  contentType?: string;
  /** Content coding, when the browser reports it */
  contentEncoding?: string;
}

/**
 * HTTP Exchange with timing data
 */
export interface HTTPExchangeWithTiming extends HTTPExchange {
  /** Timing information */
  timing: HTTPTiming;
  /** Present on exchanges built from Resource Timing entries */
  resource?: ResourceFacts;
}

/**
 * HTTP Message element - base component for displaying headers and body
 */
export declare class HTTPMessageElement extends HTMLElement {
  /** HTTP headers */
  headers: Record<string, string>;
  /** Body content */
  body: string | null;
}

/**
 * HTTP Request element - displays HTTP request data
 */
export declare class HTTPRequestElement extends HTMLElement {
  /** Request data */
  data: HTTPRequestData | null;
}

/**
 * HTTP Response element - displays HTTP response data
 */
export declare class HTTPResponseElement extends HTMLElement {
  /** Response data */
  data: HTTPResponseData | null;
}

/**
 * HTTP Transaction element - displays complete request/response pair
 * (Also registered as http-console for backwards compatibility)
 */
export declare class HTTPTransactionElement extends HTMLElement {
  /** Exchange data (request + response) */
  data: HTTPExchange | null;
}

/**
 * HTTP Waterfall element - displays multiple HTTP exchanges with timeline
 */
export declare class HTTPWaterfallElement extends HTMLElement {
  /** Array of HTTP exchanges with timing data */
  exchanges: HTTPExchangeWithTiming[];
  /** Current view mode */
  view: 'list' | 'duration' | 'waterfall';
  /** Start capturing HTTP requests */
  startCapture(): void;
  /** Stop capturing HTTP requests */
  stopCapture(): void;
  /** Pause/resume capturing */
  togglePause(): void;
  /** Clear all captured exchanges */
  clearExchanges(): void;
  /** Start listing the page's own requests from Resource Timing */
  startResources(): void;
  /** Stop listing the page's own requests */
  stopResources(): void;
  /** Toggle the explorer panel */
  toggleExplorer(): void;
}

/**
 * Interceptor options
 */
export interface InterceptorOptions {
  /** URL filter pattern (* wildcard supported) */
  filter?: string | null;
  /** Maximum body size to capture (bytes) */
  maxBodySize?: number;
}

/**
 * Exchange callback type
 */
export type ExchangeCallback = (exchange: HTTPExchangeWithTiming) => void;

/**
 * HTTP Interceptor class - captures fetch and XMLHttpRequest calls
 */
export declare class HTTPInterceptor {
  /** Whether interception is active */
  isActive: boolean;
  /** Whether capturing is paused */
  isPaused: boolean;
  /** URL filter pattern */
  filter: string | null;
  /** Maximum body size to capture */
  maxBodySize: number;

  /** Start intercepting HTTP requests */
  start(callback?: ExchangeCallback, options?: InterceptorOptions): void;
  /** Stop intercepting and restore original functions */
  stop(): void;
  /** Pause capturing without stopping interception */
  pause(): void;
  /** Resume capturing after pause */
  resume(): void;
  /** Add a listener for captured requests */
  addListener(callback: ExchangeCallback): void;
  /** Remove a listener */
  removeListener(callback: ExchangeCallback): void;
}

/** Singleton interceptor instance */
export declare const httpInterceptor: HTTPInterceptor;

/**
 * Resource Timing source options
 */
export interface ResourceSourceOptions {
  /** URL filter pattern (* wildcard supported) */
  filter?: string | null;
  /** Include the document itself (default: true) */
  navigation?: boolean;
  /** Leave out fetch and XHR entries; use when the interceptor is also capturing */
  skipScripted?: boolean;
}

/**
 * Reports the page's own requests, from Navigation Timing and Resource Timing
 */
export declare class ResourceTimingSource {
  /** Whether this browser can report resource timing */
  static readonly supported: boolean;
  /** Whether the source is reporting */
  isActive: boolean;
  /** URL filter pattern */
  filter: string | null;

  /** Start reporting; earlier entries are delivered first, in batches */
  start(
    callback: (exchanges: HTTPExchangeWithTiming[]) => void,
    options?: ResourceSourceOptions
  ): void;
  /** Stop reporting */
  stop(): void;
}

/** Convert one Navigation Timing or Resource Timing entry into an exchange */
export declare function resourceEntryToExchange(
  entry: PerformanceResourceTiming | Record<string, unknown>,
  pageOrigin: string
): HTTPExchangeWithTiming;

/** Decide where a response body came from, using sizes alone */
export declare function resourceCacheState(
  entry: PerformanceResourceTiming | Record<string, unknown>,
  opaque: boolean
): ResourceFacts['cache'];

/** Describe a URL relative to the page that loaded it */
export declare function describeResourceUrl(
  url: string,
  pageOrigin: string
): { crossOrigin: boolean; label: string };

/** Test a URL against a filter pattern (* wildcard supported) */
export declare function matchesResourceFilter(url: string, pattern?: string | null): boolean;

// Extend HTMLElementTagNameMap for TypeScript support
declare global {
  interface HTMLElementTagNameMap {
    'http-message': HTTPMessageElement;
    'http-request': HTTPRequestElement;
    'http-response': HTTPResponseElement;
    'http-transaction': HTTPTransactionElement;
    'http-console': HTTPTransactionElement;
    'http-waterfall': HTTPWaterfallElement;
  }
}
