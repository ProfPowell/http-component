/**
 * TypeScript definitions for http-waterfall component
 */

import { HTTPRequest, HTTPResponse } from './http-console.js';

export interface HTTPTiming {
  startTime: number;
  endTime: number;
  duration: number;
  phases?: {
    dns?: number;
    connect?: number;
    request?: number;
    response?: number;
  };
}

export interface HTTPExchangeWithTiming {
  request: HTTPRequest;
  response: HTTPResponse;
  timing: HTTPTiming;
}

export type ViewMode = 'list' | 'duration' | 'waterfall';

/**
 * Web component for displaying multiple HTTP exchanges
 * Supports list, duration, and waterfall timeline views with live capture
 */
export class HTTPWaterfallElement extends HTMLElement {
  /**
   * Array of HTTP exchanges to display
   */
  exchanges: HTTPExchangeWithTiming[];

  /**
   * Current view mode
   */
  view: ViewMode;

  /**
   * Theme mode: 'light', 'dark', or 'auto'
   */
  theme: 'light' | 'dark' | 'auto';

  /**
   * Enable live capture of HTTP requests
   */
  capture: boolean;

  /**
   * URL filter pattern (supports * wildcard)
   */
  filter: string | null;

  /**
   * Maximum number of captured entries
   */
  maxEntries: number;

  /**
   * Start capturing live HTTP requests
   */
  startCapture(): void;

  /**
   * Stop capturing
   */
  stopCapture(): void;

  /**
   * Toggle pause/resume capturing
   */
  togglePause(): void;

  /**
   * Clear all captured exchanges
   */
  clearExchanges(): void;

  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'http-waterfall': HTTPWaterfallElement;
  }
}
