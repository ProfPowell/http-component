import './http-request.js';
import './http-response.js';

/**
 * Inline CSS styles for http-transaction component
 * @const {string}
 */
const HTTP_TRANSACTION_STYLES = `
:host {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;

  /* Light mode colors (default) */
  --bg-primary: #f5f5f5;
  --bg-secondary: white;
  --border-color: #ddd;
  --text-primary: #1f2937;
  --text-secondary: #64748b;
  --text-empty: #9ca3af;
}

/* Dark mode */
:host([theme="dark"]) {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --border-color: #374151;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-empty: #6b7280;
}

.http-transaction {
  display: flex;
  gap: 20px;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: 4px;
}

.http-section {
  flex: 1;
}

.empty {
  color: var(--text-empty);
  font-style: italic;
  padding: 16px;
}

/* Responsive layout for smaller screens */
@media (max-width: 768px) {
  .http-transaction {
    flex-direction: column;
  }
}
`;

/**
 * @typedef {Object} HTTPRequest
 * @property {string} method - HTTP method (GET, POST, etc.)
 * @property {string} url - Request URL
 * @property {string} [httpVersion='HTTP/1.1'] - HTTP protocol version
 * @property {Object.<string, string>} [headers={}] - Request headers
 * @property {string|null} [body=null] - Request body
 */

/**
 * @typedef {Object} HTTPResponse
 * @property {number} status - HTTP status code
 * @property {string} statusText - Status text (OK, Not Found, etc.)
 * @property {string} [httpVersion='HTTP/1.1'] - HTTP protocol version
 * @property {Object.<string, string>} [headers={}] - Response headers
 * @property {string|null} [body=null] - Response body
 */

/**
 * @typedef {Object} HTTPExchange
 * @property {HTTPRequest} request - The HTTP request
 * @property {HTTPResponse} response - The HTTP response
 */

/**
 * HTTPTransactionElement - Web component for displaying HTTP request/response pairs
 * Displays data in raw HTTP wire format for educational purposes.
 * Composes http-request and http-response sub-components.
 *
 * @class
 * @extends HTMLElement
 *
 * @example
 * // Using the data property
 * const transaction = document.querySelector('http-transaction');
 * transaction.data = {
 *   request: {
 *     method: 'GET',
 *     url: '/api/users',
 *     headers: { 'Accept': 'application/json' }
 *   },
 *   response: {
 *     status: 200,
 *     statusText: 'OK',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ id: 1, name: 'John' })
 *   }
 * };
 *
 * @example
 * // Using attributes
 * <http-transaction
 *   request='{"method":"GET","url":"/api/users"}'
 *   response='{"status":200,"body":"..."}'
 *   theme="dark">
 * </http-transaction>
 */
class HTTPTransactionElement extends HTMLElement {
  /**
   * Creates an instance of HTTPTransactionElement
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = null;

    // Handle case where 'data' property was set before element upgrade
    if (this.hasOwnProperty('data')) {
      const existingData = this.data;
      delete this.data;
      this.data = existingData;
    }
  }

  /**
   * Observed attributes for automatic re-rendering
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ['request', 'response', 'theme', 'highlight', 'box'];
  }

  /**
   * Called when element is added to the DOM
   * @memberof HTTPTransactionElement
   */
  connectedCallback() {
    this.render();
    this.updateTheme();
  }

  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   * @memberof HTTPTransactionElement
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'theme') {
        this.updateTheme();
        this.updateChildThemes();
      } else {
        this.render();
      }
    }
  }

  /**
   * Update theme based on attribute or system preference
   * Sets theme to 'dark', 'light', or auto-detects from system
   * @memberof HTTPTransactionElement
   */
  updateTheme() {
    const themeAttr = this.getAttribute('theme');

    if (themeAttr === 'dark' || themeAttr === 'light') {
      this.setAttribute('theme', themeAttr);
    } else if (themeAttr === 'auto' || !themeAttr) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setAttribute('theme', prefersDark ? 'dark' : 'light');
    }
  }

  /**
   * Update theme on child components
   * @memberof HTTPTransactionElement
   * @private
   */
  updateChildThemes() {
    const theme = this.getAttribute('theme');
    const requests = this.shadowRoot.querySelectorAll('http-request');
    const responses = this.shadowRoot.querySelectorAll('http-response');

    requests.forEach(el => el.setAttribute('theme', theme));
    responses.forEach(el => el.setAttribute('theme', theme));
  }

  /**
   * Set request/response data via property
   * @param {HTTPExchange} value - HTTP exchange data containing request and response
   * @memberof HTTPTransactionElement
   */
  set data(value) {
    this._data = value;
    this.render();
  }

  /**
   * Get current HTTP exchange data
   * @returns {HTTPExchange|null} Current exchange data
   * @memberof HTTPTransactionElement
   */
  get data() {
    return this._data;
  }

  /**
   * Parse JSON attribute or use property data
   * Attempts to parse 'request' and 'response' attributes as JSON
   * @returns {HTTPExchange} Exchange object with request and response
   * @memberof HTTPTransactionElement
   * @private
   */
  getData() {
    if (this._data) {
      return this._data;
    }

    const requestAttr = this.getAttribute('request');
    const responseAttr = this.getAttribute('response');

    try {
      return {
        request: requestAttr ? JSON.parse(requestAttr) : null,
        response: responseAttr ? JSON.parse(responseAttr) : null,
      };
    } catch (e) {
      console.error('Failed to parse HTTP data:', e);
      return { request: null, response: null };
    }
  }

  /**
   * Parse highlight attribute and split into request/response highlights
   * @returns {Object} Highlight configuration for request and response
   * @memberof HTTPTransactionElement
   * @private
   */
  getHighlightConfig() {
    const highlightAttr = this.getAttribute('highlight');
    if (!highlightAttr) {
      return { request: '', response: '' };
    }

    const requestHighlights = [];
    const responseHighlights = [];

    const parts = highlightAttr
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const part of parts) {
      if (part.startsWith('request-')) {
        // Convert request-line -> request-line, request-headers -> headers, request-body -> body
        const section = part.replace('request-', '');
        if (section === 'line') {
          requestHighlights.push('request-line');
        } else {
          requestHighlights.push(section);
        }
      } else if (part.startsWith('response-')) {
        // Convert response-line -> status-line, response-headers -> headers, response-body -> body
        const section = part.replace('response-', '');
        if (section === 'line') {
          responseHighlights.push('status-line');
        } else {
          responseHighlights.push(section);
        }
      } else if (part.startsWith('request-header:')) {
        requestHighlights.push(part.replace('request-header:', 'header:'));
      } else if (part.startsWith('response-header:')) {
        responseHighlights.push(part.replace('response-header:', 'header:'));
      }
    }

    return {
      request: requestHighlights.join(','),
      response: responseHighlights.join(','),
    };
  }

  /**
   * Parse box attribute and split into request/response boxes
   * @returns {Object} Box configuration for request and response
   * @memberof HTTPTransactionElement
   * @private
   */
  getBoxConfig() {
    const boxAttr = this.getAttribute('box');
    if (!boxAttr) {
      return { request: '', response: '' };
    }

    const requestBoxes = [];
    const responseBoxes = [];

    const parts = boxAttr
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const part of parts) {
      if (part.startsWith('request-')) {
        const section = part.replace('request-', '');
        if (section === 'line') {
          requestBoxes.push('request-line');
        } else {
          requestBoxes.push(section);
        }
      } else if (part.startsWith('response-')) {
        const section = part.replace('response-', '');
        if (section === 'line') {
          responseBoxes.push('status-line');
        } else {
          responseBoxes.push(section);
        }
      } else if (part.startsWith('request-header:')) {
        requestBoxes.push(part.replace('request-header:', 'header:'));
      } else if (part.startsWith('response-header:')) {
        responseBoxes.push(part.replace('response-header:', 'header:'));
      }
    }

    return {
      request: requestBoxes.join(','),
      response: responseBoxes.join(','),
    };
  }

  /**
   * Render the component's shadow DOM
   * Only renders sections for which data is provided
   * @memberof HTTPTransactionElement
   * @private
   */
  render() {
    const data = this.getData();
    const hasRequest = data.request !== null && data.request !== undefined;
    const hasResponse = data.response !== null && data.response !== undefined;
    const theme = this.getAttribute('theme') || 'light';

    const highlightConfig = this.getHighlightConfig();
    const boxConfig = this.getBoxConfig();

    // Build sections conditionally
    let sections = '';

    if (hasRequest) {
      sections += `
        <div class="http-section">
          <http-request
            theme="${theme}"
            ${highlightConfig.request ? `highlight="${highlightConfig.request}"` : ''}
            ${boxConfig.request ? `box="${boxConfig.request}"` : ''}
          ></http-request>
        </div>
      `;
    }

    if (hasResponse) {
      sections += `
        <div class="http-section">
          <http-response
            theme="${theme}"
            ${highlightConfig.response ? `highlight="${highlightConfig.response}"` : ''}
            ${boxConfig.response ? `box="${boxConfig.response}"` : ''}
          ></http-response>
        </div>
      `;
    }

    // If neither request nor response, show a placeholder
    if (!hasRequest && !hasResponse) {
      sections = '<div class="empty">No HTTP data provided</div>';
    }

    this.shadowRoot.innerHTML = `
      <style>${HTTP_TRANSACTION_STYLES}</style>
      <div class="http-transaction">
        ${sections}
      </div>
    `;

    // Set data on child components
    if (hasRequest) {
      const requestEl = this.shadowRoot.querySelector('http-request');
      if (requestEl) {
        requestEl.data = data.request;
      }
    }

    if (hasResponse) {
      const responseEl = this.shadowRoot.querySelector('http-response');
      if (responseEl) {
        responseEl.data = data.response;
      }
    }
  }
}

// Register the custom element
customElements.define('http-transaction', HTTPTransactionElement);

// Also register as http-console for backwards compatibility
if (!customElements.get('http-console')) {
  customElements.define('http-console', class HTTPConsoleElement extends HTTPTransactionElement {});
}

export { HTTPTransactionElement };
