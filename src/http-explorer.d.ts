/**
 * TypeScript definitions for http-explorer component
 */

export interface HTTPExplorerRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string | null;
}

export interface HTTPExplorerResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string | null;
}

export interface HTTPExplorerData {
  request: HTTPExplorerRequest;
  response: HTTPExplorerResponse;
}

/**
 * Event detail for request-sent event
 */
export interface RequestSentDetail {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
}

/**
 * Event detail for response-received event
 */
export interface ResponseReceivedDetail {
  request: HTTPExplorerRequest;
  response: HTTPExplorerResponse;
}

/**
 * Event detail for request-error event
 */
export interface RequestErrorDetail {
  error: string;
}

/**
 * Interactive HTTP request builder component
 * Allows users to construct and send HTTP requests with a form-based UI
 *
 * @example
 * <http-explorer></http-explorer>
 *
 * @example
 * <http-explorer url="https://api.example.com/users" method="POST"></http-explorer>
 */
export class HTTPExplorerElement extends HTMLElement {
  /**
   * Default URL to populate in the URL input
   */
  url: string;

  /**
   * Default HTTP method
   */
  method: string;

  /**
   * Theme mode: 'light', 'dark', or 'auto'
   */
  theme: 'light' | 'dark' | 'auto';

  connectedCallback(): void;
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void;

  /**
   * Event fired when a request is sent
   */
  addEventListener(
    type: 'request-sent',
    listener: (event: CustomEvent<RequestSentDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;

  /**
   * Event fired when a response is received
   */
  addEventListener(
    type: 'response-received',
    listener: (event: CustomEvent<ResponseReceivedDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;

  /**
   * Event fired when a request fails
   */
  addEventListener(
    type: 'request-error',
    listener: (event: CustomEvent<RequestErrorDetail>) => void,
    options?: boolean | AddEventListenerOptions
  ): void;

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'http-explorer': HTTPExplorerElement;
  }
}
