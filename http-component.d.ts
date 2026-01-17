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
  /** Optional detailed timing phases */
  phases?: Record<string, number>;
}

/**
 * HTTP Exchange with timing data
 */
export interface HTTPExchangeWithTiming extends HTTPExchange {
  /** Timing information */
  timing: HTTPTiming;
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
