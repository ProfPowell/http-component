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
 * Valid highlight section names for sections
 */
export type HighlightSection =
  | 'request-line'
  | 'request-headers'
  | 'request-body'
  | 'response-line'
  | 'response-headers'
  | 'response-body';

/**
 * Highlight value can be:
 * - Section names: "request-line", "response-headers", etc.
 * - Specific headers: "request-header:Content-Type", "response-header:Authorization"
 * - Comma-separated combinations: "request-line,response-header:Content-Type,response-body"
 *
 * Examples:
 * - "response-line" - Highlight only the response status line
 * - "request-headers" - Highlight all request headers
 * - "response-header:Content-Type" - Highlight only the Content-Type response header
 * - "request-header:Authorization,response-header:Content-Type" - Highlight specific headers
 * - "request-line,request-header:Content-Type,response-body" - Mixed highlighting
 */
export type HighlightValue = string;

/**
 * Box value can be:
 * - Section names: "request-line", "response-headers", "response-body"
 * - Specific headers: "request-header:Content-Type", "response-header:Authorization"
 * - Comma-separated combinations: "request-line,response-header:Location,response-body"
 *
 * Boxes add a visual border with a label around sections.
 *
 * Examples:
 * - "response-line" - Box only the response status line
 * - "request-headers" - Box all request headers together
 * - "response-header:Content-Type" - Box only the Content-Type response header
 * - "request-header:Authorization,response-header:Content-Type" - Box specific headers
 * - "request-line,request-headers,request-body" - Box all three request sections
 */
export type BoxValue = string;

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

  /**
   * Comma-separated list of sections to highlight
   * Example: "response-line,response-headers" or "request-body,response-body"
   */
  highlight: string;

  /**
   * Comma-separated list of sections to box with borders and labels
   * Example: "response-line,response-headers" or "request-header:Authorization,response-body"
   */
  box: string;

  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'http-console': HTTPConsoleElement;
  }
}
