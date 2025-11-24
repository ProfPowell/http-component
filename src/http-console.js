/**
 * Inline CSS styles for http-console component
 * @const {string}
 */
const HTTP_CONSOLE_STYLES = `
/**
 * HTTP Console Component Styles
 * Styling for displaying HTTP request/response data in wire format
 */

:host {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;

  /* Light mode colors (default) */
  --bg-primary: #f5f5f5;
  --bg-secondary: white;
  --bg-header-request: #2563eb;
  --bg-header-response: #059669;
  --border-color: #ddd;
  --text-primary: #1f2937;
  --text-secondary: #64748b;
  --text-empty: #9ca3af;

  /* HTTP Method colors */
  --method-get: #2563eb;
  --method-post: #059669;
  --method-put: #d97706;
  --method-delete: #dc2626;
  --method-patch: #7c3aed;

  /* HTTP Status colors */
  --status-success: #16a34a;
  --status-redirect: #2563eb;
  --status-client-error: #ea580c;
  --status-server-error: #dc2626;

  /* Syntax highlighting */
  --url-color: #0891b2;
  --version-color: #64748b;
  --header-name: #0066cc;
  --header-value: #334155;
  --reason-phrase: #1f2937;
  --mime-type-bg: #f3e8ff;
  --mime-type-text: #7c3aed;

  /* JSON colors */
  --json-key: #0066cc;
  --json-string: #22863a;
  --json-number: #005cc5;
  --json-boolean: #6f42c1;
  --json-null: #6a737d;
  --json-error-bg: #ffeef0;
  --json-error-text: #d73a49;

  /* HTML colors */
  --html-tag: #2563eb;
  --html-attr: #059669;
  --html-value: #7c3aed;
  --html-comment: #6a737d;

  /* CSS colors */
  --css-selector: #2563eb;
  --css-property: #059669;
  --css-value: #7c3aed;
  --css-comment: #6a737d;

  /* JS colors */
  --js-keyword: #7c3aed;
  --js-string: #22863a;
  --js-number: #005cc5;
  --js-comment: #6a737d;
}

/* Dark mode */
:host([theme="dark"]) {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --bg-header-request: #3b82f6;
  --bg-header-response: #10b981;
  --border-color: #374151;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-empty: #6b7280;

  /* HTTP Method colors - brighter for dark mode */
  --method-get: #60a5fa;
  --method-post: #34d399;
  --method-put: #fbbf24;
  --method-delete: #f87171;
  --method-patch: #a78bfa;

  /* HTTP Status colors - brighter for dark mode */
  --status-success: #4ade80;
  --status-redirect: #60a5fa;
  --status-client-error: #fb923c;
  --status-server-error: #f87171;

  /* Syntax highlighting - adjusted for dark backgrounds */
  --url-color: #22d3ee;
  --version-color: #9ca3af;
  --header-name: #60a5fa;
  --header-value: #d1d5db;
  --reason-phrase: #f3f4f6;
  --mime-type-bg: #581c87;
  --mime-type-text: #e9d5ff;

  /* JSON colors - brighter for dark mode */
  --json-key: #60a5fa;
  --json-string: #6ee7b7;
  --json-number: #93c5fd;
  --json-boolean: #c4b5fd;
  --json-null: #9ca3af;
  --json-error-bg: #7f1d1d;
  --json-error-text: #fca5a5;

  /* HTML colors */
  --html-tag: #60a5fa;
  --html-attr: #34d399;
  --html-value: #c4b5fd;
  --html-comment: #9ca3af;

  /* CSS colors */
  --css-selector: #60a5fa;
  --css-property: #34d399;
  --css-value: #c4b5fd;
  --css-comment: #9ca3af;

  /* JS colors */
  --js-keyword: #c4b5fd;
  --js-string: #6ee7b7;
  --js-number: #93c5fd;
  --js-comment: #9ca3af;
}

.http-console {
  display: flex;
  gap: 20px;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: 4px;
}

.http-section {
  flex: 1;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.section-header {
  background: #333;
  color: white;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.request-section .section-header {
  background: var(--bg-header-request);
}

.response-section .section-header {
  background: var(--bg-header-response);
}

.http-content {
  padding: 16px;
}

.http-content pre {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: var(--text-primary);
}

.empty {
  color: var(--text-empty);
  font-style: italic;
  padding: 8px 0;
}

/* HTTP Headers Highlighting */
.http-method-get {
  color: var(--method-get);
  font-weight: bold;
}

.http-method-post {
  color: var(--method-post);
  font-weight: bold;
}

.http-method-put {
  color: var(--method-put);
  font-weight: bold;
}

.http-method-delete {
  color: var(--method-delete);
  font-weight: bold;
}

.http-method-patch {
  color: var(--method-patch);
  font-weight: bold;
}

.http-url {
  color: var(--url-color);
}

.http-version {
  color: var(--version-color);
}

.http-status-success {
  color: var(--status-success);
  font-weight: bold;
}

.http-status-redirect {
  color: var(--status-redirect);
  font-weight: bold;
}

.http-status-client-error {
  color: var(--status-client-error);
  font-weight: bold;
}

.http-status-server-error {
  color: var(--status-server-error);
  font-weight: bold;
}

.http-status-text {
  color: var(--version-color);
}

.http-reason-phrase {
  color: var(--reason-phrase);
  font-weight: 600;
}

.http-header-name {
  color: var(--header-name);
  font-weight: 600;
}

.mime-type {
  color: var(--mime-type-text);
  font-weight: 700;
  background: var(--mime-type-bg);
  padding: 1px 4px;
  border-radius: 2px;
}

.http-header-value {
  color: var(--header-value);
}

/* JSON Syntax Highlighting */
.json-key {
  color: var(--json-key);
  font-weight: 600;
}

.json-string {
  color: var(--json-string);
}

.json-number {
  color: var(--json-number);
}

.json-boolean {
  color: var(--json-boolean);
  font-weight: 600;
}

.json-null {
  color: var(--json-null);
  font-style: italic;
}

.json-error {
  color: var(--json-error-text);
  font-weight: 600;
  background: var(--json-error-bg);
  padding: 2px 6px;
  border-radius: 3px;
  margin-right: 8px;
}

/* HTML Syntax Highlighting */
.html-tag {
  color: var(--html-tag);
}

.html-attr {
  color: var(--html-attr);
}

.html-value {
  color: var(--html-value);
}

.html-comment {
  color: var(--html-comment);
  font-style: italic;
}

/* CSS Syntax Highlighting */
.css-selector {
  color: var(--css-selector);
  font-weight: 600;
}

.css-property {
  color: var(--css-property);
}

.css-value {
  color: var(--css-value);
}

.css-comment {
  color: var(--css-comment);
  font-style: italic;
}

/* JavaScript Syntax Highlighting */
.js-keyword {
  color: var(--js-keyword);
  font-weight: 600;
}

.js-string {
  color: var(--js-string);
}

.js-number {
  color: var(--js-number);
}

.js-comment {
  color: var(--js-comment);
  font-style: italic;
}

/* Responsive layout for smaller screens */
@media (max-width: 768px) {
  .http-console {
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
 * HTTPConsoleElement - Web component for displaying HTTP request/response data
 * Displays data in raw HTTP wire format for educational purposes.
 *
 * @class
 * @extends HTMLElement
 *
 * @example
 * // Using the data property
 * const console = document.querySelector('http-console');
 * console.data = {
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
 * <http-console
 *   request='{"method":"GET","url":"/api/users"}'
 *   response='{"status":200,"body":"..."}'
 *   theme="dark">
 * </http-console>
 */
class HTTPConsoleElement extends HTMLElement {
  /**
   * Creates an instance of HTTPConsoleElement
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
    return ['request', 'response', 'theme'];
  }

  /**
   * Called when element is added to the DOM
   * @memberof HTTPConsoleElement
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
   * @memberof HTTPConsoleElement
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'theme') {
        this.updateTheme();
      } else {
        this.render();
      }
    }
  }

  /**
   * Update theme based on attribute or system preference
   * Sets theme to 'dark', 'light', or auto-detects from system
   * @memberof HTTPConsoleElement
   */
  updateTheme() {
    const themeAttr = this.getAttribute('theme');

    if (themeAttr === 'dark' || themeAttr === 'light') {
      // Explicit theme set
      this.setAttribute('theme', themeAttr);
    } else if (themeAttr === 'auto' || !themeAttr) {
      // Auto-detect from system preferences
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setAttribute('theme', prefersDark ? 'dark' : 'light');
    }
  }

  /**
   * Set request/response data via property
   * @param {HTTPExchange} value - HTTP exchange data containing request and response
   * @memberof HTTPConsoleElement
   */
  set data(value) {
    this._data = value;
    this.render();
  }

  /**
   * Get current HTTP exchange data
   * @returns {HTTPExchange|null} Current exchange data
   * @memberof HTTPConsoleElement
   */
  get data() {
    return this._data;
  }

  /**
   * Parse JSON attribute or use property data
   * Attempts to parse 'request' and 'response' attributes as JSON
   * @returns {HTTPExchange} Exchange object with request and response
   * @memberof HTTPConsoleElement
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
   * Render the component's shadow DOM
   * @memberof HTTPConsoleElement
   * @private
   */
  render() {
    const data = this.getData();

    this.shadowRoot.innerHTML = `
      <style>${HTTP_CONSOLE_STYLES}</style>
      <div class="http-console">
        <div class="http-section request-section">
          <div class="section-header">Request</div>
          <div class="http-content">
            ${this.renderRequest(data.request)}
          </div>
        </div>
        <div class="http-section response-section">
          <div class="section-header">Response</div>
          <div class="http-content">
            ${this.renderResponse(data.response)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render HTTP request in wire format
   * @param {HTTPRequest|null} request - Request data to render
   * @returns {string} HTML string for request section
   * @memberof HTTPConsoleElement
   * @private
   */
  renderRequest(request) {
    if (!request) {
      return '<div class="empty">No request data</div>';
    }

    const { method, url, httpVersion = 'HTTP/1.1', headers = {}, body = null } = request;

    // Request line with highlighted method
    const methodClass = `http-method-${method.toLowerCase()}`;
    let content = `<span class="${methodClass}">${method}</span> `;
    content += `<span class="http-url">${this.escapeHtml(url)}</span> `;
    content += `<span class="http-version">${httpVersion}</span>\n`;

    // Headers with highlighting
    for (const [key, value] of Object.entries(headers)) {
      content += `<span class="http-header-name">${this.escapeHtml(key)}</span>: `;
      // Special highlighting for Content-Type (MIME type)
      if (key.toLowerCase() === 'content-type') {
        content += this.highlightContentType(value);
      } else {
        content += `<span class="http-header-value">${this.escapeHtml(value)}</span>`;
      }
      content += '\n';
    }

    // Add formatted body if present
    if (body) {
      content += '\n';
      content += this.formatBody(body, headers);
    }

    return `<pre>${content}</pre>`;
  }

  /**
   * Render HTTP response in wire format
   * @param {HTTPResponse|null} response - Response data to render
   * @returns {string} HTML string for response section
   * @memberof HTTPConsoleElement
   * @private
   */
  renderResponse(response) {
    if (!response) {
      return '<div class="empty">No response data</div>';
    }

    const { status, statusText, httpVersion = 'HTTP/1.1', headers = {}, body = null } = response;

    // Status line with highlighted status code
    const statusClass = this.getStatusColorClass(status);
    let content = `<span class="http-version">${httpVersion}</span> `;
    content += `<span class="${statusClass}">${status}</span> `;
    content += `<span class="http-reason-phrase">${this.escapeHtml(statusText)}</span>\n`;

    // Headers with highlighting
    for (const [key, value] of Object.entries(headers)) {
      content += `<span class="http-header-name">${this.escapeHtml(key)}</span>: `;
      // Special highlighting for Content-Type (MIME type)
      if (key.toLowerCase() === 'content-type') {
        content += this.highlightContentType(value);
      } else {
        content += `<span class="http-header-value">${this.escapeHtml(value)}</span>`;
      }
      content += '\n';
    }

    // Add formatted body if present
    if (body) {
      content += '\n';
      content += this.formatBody(body, headers);
    }

    return `<pre>${content}</pre>`;
  }

  /**
   * Get CSS class name for status code color
   * @param {number} status - HTTP status code
   * @returns {string} CSS class name for status color
   * @memberof HTTPConsoleElement
   * @private
   */
  getStatusColorClass(status) {
    if (status >= 200 && status < 300) return 'http-status-success';
    if (status >= 300 && status < 400) return 'http-status-redirect';
    if (status >= 400 && status < 500) return 'http-status-client-error';
    if (status >= 500) return 'http-status-server-error';
    return 'http-status';
  }

  /**
   * Escape HTML special characters to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} HTML-escaped text
   * @memberof HTTPConsoleElement
   * @private
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Highlight Content-Type header value (MIME type)
   * @param {string} value - Content-Type header value
   * @returns {string} HTML string with highlighted MIME type
   * @memberof HTTPConsoleElement
   * @private
   */
  highlightContentType(value) {
    const escaped = this.escapeHtml(value);
    // Split on semicolon to separate media type from parameters
    const parts = escaped.split(';');
    const mediaType = parts[0].trim();
    const params = parts
      .slice(1)
      .map(p => p.trim())
      .join('; ');

    let result = `<span class="mime-type">${mediaType}</span>`;
    if (params) {
      result += `<span class="http-header-value">; ${params}</span>`;
    }
    return result;
  }

  /**
   * Check if content type indicates JSON
   * @param {Object.<string, string>} headers - HTTP headers object
   * @returns {boolean} True if content type is JSON
   * @memberof HTTPConsoleElement
   * @private
   */
  isJsonContentType(headers) {
    const contentType = headers['Content-Type'] || headers['content-type'] || '';
    return contentType.includes('application/json') || contentType.includes('application/ld+json');
  }

  /**
   * Check if content type is binary
   * @param {string} contentType - Content-Type header value
   * @returns {boolean} True if content type is binary
   * @memberof HTTPConsoleElement
   * @private
   */
  isBinaryContentType(contentType) {
    const binaryTypes = [
      'image/',
      'video/',
      'audio/',
      'application/octet-stream',
      'application/pdf',
      'application/zip',
      'font/',
    ];
    return binaryTypes.some(type => contentType.includes(type));
  }

  /**
   * Format body with appropriate formatting based on content type
   * Handles JSON, HTML, CSS, JavaScript, and binary data
   * @param {string} body - Response body content
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {string} Formatted and syntax-highlighted body HTML
   * @memberof HTTPConsoleElement
   * @private
   */
  formatBody(body, headers) {
    if (!body) return '';

    const contentType = headers['Content-Type'] || headers['content-type'] || '';
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body, null, 2);

    // Binary data
    if (this.isBinaryContentType(contentType)) {
      const size = bodyStr.length;
      const sizeStr =
        size < 1024
          ? `${size} bytes`
          : size < 1024 * 1024
            ? `${(size / 1024).toFixed(1)} KB`
            : `${(size / (1024 * 1024)).toFixed(1)} MB`;
      return `<span class="binary-data">📦 Binary data (${this.escapeHtml(contentType.split(';')[0])}, ${sizeStr})</span>`;
    }

    // JSON
    if (this.isJsonContentType(headers)) {
      try {
        const parsed = typeof body === 'string' ? JSON.parse(body) : body;
        return this.formatJson(parsed);
      } catch (e) {
        return `<span class="json-error" title="Invalid JSON: ${this.escapeHtml(e.message)}">⚠️ Invalid JSON</span>\n${this.escapeHtml(bodyStr)}`;
      }
    }

    // HTML - escape first, then highlight
    if (contentType.includes('text/html')) {
      return this.highlightHtml(this.escapeHtml(bodyStr));
    }

    // CSS - escape first, then highlight
    if (contentType.includes('text/css')) {
      return this.highlightCss(this.escapeHtml(bodyStr));
    }

    // JavaScript - escape first, then highlight
    if (contentType.includes('javascript') || contentType.includes('application/x-javascript')) {
      return this.highlightJavaScript(this.escapeHtml(bodyStr));
    }

    // Plain text - escape only
    return this.escapeHtml(bodyStr);
  }

  /**
   * Format JSON with syntax highlighting
   * Recursively formats JSON with proper indentation and color coding
   * @param {*} obj - JavaScript object to format
   * @param {number} [indent=0] - Current indentation level
   * @returns {string} Formatted JSON with HTML syntax highlighting
   * @memberof HTTPConsoleElement
   * @private
   */
  formatJson(obj, indent = 0) {
    const indentStr = '  '.repeat(indent);
    const nextIndent = '  '.repeat(indent + 1);

    if (obj === null) {
      return '<span class="json-null">null</span>';
    }

    if (typeof obj === 'boolean') {
      return `<span class="json-boolean">${obj}</span>`;
    }

    if (typeof obj === 'number') {
      return `<span class="json-number">${obj}</span>`;
    }

    if (typeof obj === 'string') {
      return `<span class="json-string">"${this.escapeHtml(obj)}"</span>`;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';

      const items = obj
        .map(item => `${nextIndent}${this.formatJson(item, indent + 1)}`)
        .join(',\n');

      return `[\n${items}\n${indentStr}]`;
    }

    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      if (keys.length === 0) return '{}';

      const items = keys
        .map(
          key =>
            `${nextIndent}<span class="json-key">"${this.escapeHtml(key)}"</span>: ${this.formatJson(obj[key], indent + 1)}`
        )
        .join(',\n');

      return `{\n${items}\n${indentStr}}`;
    }

    return String(obj);
  }

  /**
   * Highlight HTML syntax with color coding for tags, attributes, and comments
   * @param {string} html - HTML-escaped HTML code to highlight
   * @returns {string} HTML with syntax highlighting spans
   * @memberof HTTPConsoleElement
   * @private
   */
  highlightHtml(html) {
    return (
      html
        // HTML comments
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="html-comment">$1</span>')
        // Tags with attributes
        .replace(
          /(&lt;\/?)([\w-]+)((?:\s+[\w-]+=(?:"[^"]*"|'[^']*'))*\s*)(\/?&gt;)/g,
          (match, open, tag, attrs, close) => {
            const highlightedTag = `<span class="html-tag">${open}${tag}</span>`;
            const highlightedAttrs = attrs.replace(
              /([\w-]+)=(["'])([^"']*)\2/g,
              '<span class="html-attr">$1</span>=<span class="html-value">$2$3$2</span>'
            );
            return highlightedTag + highlightedAttrs + `<span class="html-tag">${close}</span>`;
          }
        )
    );
  }

  /**
   * Highlight CSS syntax with color coding for selectors, properties, and values
   * @param {string} css - HTML-escaped CSS code to highlight
   * @returns {string} CSS with syntax highlighting spans
   * @memberof HTTPConsoleElement
   * @private
   */
  highlightCss(css) {
    return (
      css
        // Comments
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>')
        // Selectors (before {)
        .replace(/^([^{}/]+)(\s*{)/gm, (match, selector, brace) => {
          return `<span class="css-selector">${selector}</span>${brace}`;
        })
        // Properties
        .replace(/\b([\w-]+)(\s*):/g, '<span class="css-property">$1</span>$2:')
        // Values (after : and before ;)
        .replace(/:\s*([^;}\n]+)/g, (match, value) => {
          return ': <span class="css-value">' + value + '</span>';
        })
    );
  }

  /**
   * Highlight JavaScript syntax with color coding for keywords, strings, and comments
   * @param {string} js - HTML-escaped JavaScript code to highlight
   * @returns {string} JavaScript with syntax highlighting spans
   * @memberof HTTPConsoleElement
   * @private
   */
  highlightJavaScript(js) {
    // Use a placeholder system to prevent regex interference
    const placeholders = [];
    let result = js;

    // 1. Replace strings first (most specific)
    result = result.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, match => {
      const id = placeholders.length;
      placeholders.push(`<span class="js-string">${match}</span>`);
      return `___PLACEHOLDER_${id}___`;
    });

    // 2. Replace comments
    result = result.replace(/\/\/.*$/gm, match => {
      const id = placeholders.length;
      placeholders.push(`<span class="js-comment">${match}</span>`);
      return `___PLACEHOLDER_${id}___`;
    });
    result = result.replace(/\/\*[\s\S]*?\*\//g, match => {
      const id = placeholders.length;
      placeholders.push(`<span class="js-comment">${match}</span>`);
      return `___PLACEHOLDER_${id}___`;
    });

    // 3. Replace numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="js-number">$1</span>');

    // 4. Replace keywords
    const keywords =
      /\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g;
    result = result.replace(keywords, '<span class="js-keyword">$1</span>');

    // 5. Restore placeholders
    placeholders.forEach((replacement, id) => {
      result = result.replace(`___PLACEHOLDER_${id}___`, replacement);
    });

    return result;
  }
}

// Register the custom element
customElements.define('http-console', HTTPConsoleElement);
