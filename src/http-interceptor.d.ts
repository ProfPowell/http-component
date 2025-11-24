/**
 * TypeScript definitions for http-interceptor
 */

import { HTTPRequest, HTTPResponse } from './http-console.js';
import { HTTPTiming } from './http-waterfall.js';

export interface InterceptorOptions {
  /**
   * URL filter pattern (* wildcard supported)
   */
  filter?: string | null;

  /**
   * Maximum body size to capture (bytes)
   * @default 1048576 (1MB)
   */
  maxBodySize?: number;
}

export interface CapturedExchange {
  request: HTTPRequest;
  response: HTTPResponse;
  timing: HTTPTiming;
}

export type ExchangeCallback = (exchange: CapturedExchange) => void;

/**
 * HTTP Interceptor - Captures fetch and XMLHttpRequest calls
 * Provides timing data and request/response details for visualization
 */
export class HTTPInterceptor {
  /**
   * Whether interceptor is currently active
   */
  isActive: boolean;

  /**
   * Whether capturing is paused
   */
  isPaused: boolean;

  /**
   * URL filter pattern
   */
  filter: string | null;

  /**
   * Maximum body size to capture (bytes)
   */
  maxBodySize: number;

  /**
   * Create a new HTTP interceptor instance
   */
  constructor();

  /**
   * Start intercepting HTTP requests
   * @param callback - Called with each captured exchange
   * @param options - Configuration options
   */
  start(callback: ExchangeCallback, options?: InterceptorOptions): void;

  /**
   * Stop intercepting and restore original functions
   */
  stop(): void;

  /**
   * Pause capturing without stopping interception
   */
  pause(): void;

  /**
   * Resume capturing after pause
   */
  resume(): void;

  /**
   * Add a listener for captured requests
   */
  addListener(callback: ExchangeCallback): void;

  /**
   * Remove a listener
   */
  removeListener(callback: ExchangeCallback): void;

  /**
   * Check if URL matches filter pattern
   */
  matchesFilter(url: string): boolean;
}

/**
 * Singleton instance of HTTPInterceptor
 */
export const httpInterceptor: HTTPInterceptor;
