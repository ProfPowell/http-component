/**
 * TypeScript definitions for http-console component
 */

export interface HTTPRequest {
  method: string;
  url: string;
  httpVersion?: string;
  headers?: Record<string, string>;
  body?: string | null;
}

export interface HTTPResponse {
  status: number;
  statusText: string;
  httpVersion?: string;
  headers?: Record<string, string>;
  body?: string | null;
}

export interface HTTPExchange {
  request: HTTPRequest;
  response: HTTPResponse;
}

/**
 * Web component for displaying HTTP request/response data
 * Displays data in raw HTTP wire format for educational purposes
 */
export class HTTPConsoleElement extends HTMLElement {
  /**
   * Set HTTP exchange data
   */
  data: HTTPExchange | null;

  /**
   * Theme mode: 'light', 'dark', or 'auto'
   */
  theme: 'light' | 'dark' | 'auto';

  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'http-console': HTTPConsoleElement;
  }
}
