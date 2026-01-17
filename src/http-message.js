/**
 * Inline CSS styles for http-message component
 * @const {string}
 */
const HTTP_MESSAGE_STYLES = `
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

  /* Syntax highlighting */
  --header-name: #0066cc;
  --header-value: #334155;
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
  --border-color: #374151;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-empty: #6b7280;

  /* Syntax highlighting - adjusted for dark backgrounds */
  --header-name: #60a5fa;
  --header-value: #d1d5db;
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

.http-message {
  padding: 0;
  color: var(--text-primary);
}

.http-message pre {
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

/* Highlight styles for emphasized sections */
mark.highlight {
  background: #fff3cd;
  color: inherit;
  padding: 2px 0;
  margin: -2px 0;
  border-radius: 2px;
  display: inline;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

:host([theme='dark']) mark.highlight {
  background: #664d03;
  border-left: 3px solid #ffc107;
  padding-left: 6px;
}

/* Box styles for bordered sections with labels */
.http-box {
  position: relative;
  border: 2px solid #2563eb;
  border-radius: 6px;
  padding: 20px 12px 12px 12px;
  margin: 8px 0;
  background: rgba(37, 99, 235, 0.02);
}

.http-box-label {
  position: absolute;
  top: -10px;
  left: 12px;
  background: var(--bg-secondary);
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #2563eb;
  border-radius: 3px;
  border: 2px solid #2563eb;
}

:host([theme='dark']) .http-box {
  border-color: #60a5fa;
  background: rgba(96, 165, 250, 0.05);
}

:host([theme='dark']) .http-box-label {
  color: #60a5fa;
  border-color: #60a5fa;
}
`;

/**
 * @typedef {Object} HTTPHeaders
 * @property {Object.<string, string>} headers - HTTP headers as key-value pairs
 */

/**
 * HTTPMessageElement - Base web component for displaying HTTP headers and body
 * Provides shared rendering functionality for request and response components.
 *
 * @class
 * @extends HTMLElement
 *
 * @example
 * <http-message></http-message>
 *
 * @example
 * // Set headers and body
 * const msg = document.querySelector('http-message');
 * msg.headers = { 'Content-Type': 'application/json' };
 * msg.body = '{"key": "value"}';
 */
class HTTPMessageElement extends HTMLElement {
  /**
   * Creates an instance of HTTPMessageElement
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._headers = {};
    this._body = null;
    this._contentType = '';

    // Handle property shadowing
    if (this.hasOwnProperty('headers')) {
      const existingHeaders = this.headers;
      delete this.headers;
      this.headers = existingHeaders;
    }
    if (this.hasOwnProperty('body')) {
      const existingBody = this.body;
      delete this.body;
      this.body = existingBody;
    }
  }

  /**
   * Observed attributes for automatic re-rendering
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ['theme', 'highlight', 'box'];
  }

  /**
   * Called when element is added to the DOM
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
   * Set HTTP headers
   * @param {Object.<string, string>} value - Headers object
   */
  set headers(value) {
    this._headers = value || {};
    this._contentType = this._headers['Content-Type'] || this._headers['content-type'] || '';
    this.render();
  }

  /**
   * Get HTTP headers
   * @returns {Object.<string, string>} Headers object
   */
  get headers() {
    return this._headers;
  }

  /**
   * Set body content
   * @param {string|null} value - Body content
   */
  set body(value) {
    this._body = value;
    this.render();
  }

  /**
   * Get body content
   * @returns {string|null} Body content
   */
  get body() {
    return this._body;
  }

  /**
   * Render the component
   * @private
   */
  render() {
    const headersHtml = this.renderHeaders();
    const bodyHtml = this.renderBody();

    this.shadowRoot.innerHTML = `
      <style>${HTTP_MESSAGE_STYLES}</style>
      <div class="http-message">
        <slot name="before-headers"></slot>
        <pre>${headersHtml}${bodyHtml ? '\n' + bodyHtml : ''}</pre>
        <slot name="after-body"></slot>
      </div>
    `;
  }

  /**
   * Render headers section
   * @returns {string} HTML string for headers
   * @private
   */
  renderHeaders() {
    if (!this._headers || Object.keys(this._headers).length === 0) {
      return '';
    }

    let content = '';
    for (const [key, value] of Object.entries(this._headers)) {
      let headerLine = `<span class="http-header-name">${this.escapeHtml(key)}</span>: `;
      if (key.toLowerCase() === 'content-type') {
        headerLine += this.highlightContentType(value);
      } else {
        headerLine += `<span class="http-header-value">${this.escapeHtml(value)}</span>`;
      }
      content += headerLine + '\n';
    }

    return content;
  }

  /**
   * Render body section
   * @returns {string} HTML string for body
   * @private
   */
  renderBody() {
    if (!this._body) {
      return '';
    }

    return this.formatBody(this._body, this._headers);
  }

  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Highlight Content-Type header value
   * @param {string} value - Content-Type value
   * @returns {string} Highlighted HTML
   */
  highlightContentType(value) {
    const escaped = this.escapeHtml(value);
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
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {boolean} True if JSON content type
   */
  isJsonContentType(headers) {
    const contentType = headers['Content-Type'] || headers['content-type'] || '';
    return contentType.includes('application/json') || contentType.includes('application/ld+json');
  }

  /**
   * Check if content type is binary
   * @param {string} contentType - Content-Type value
   * @returns {boolean} True if binary content type
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
   * Format body with syntax highlighting
   * @param {string} body - Body content
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {string} Formatted body HTML
   */
  formatBody(body, headers) {
    if (!body) return '';

    const contentType = headers['Content-Type'] || headers['content-type'] || '';
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body, null, 2);

    if (this.isBinaryContentType(contentType)) {
      const size = bodyStr.length;
      const sizeStr =
        size < 1024
          ? `${size} bytes`
          : size < 1024 * 1024
            ? `${(size / 1024).toFixed(1)} KB`
            : `${(size / (1024 * 1024)).toFixed(1)} MB`;
      return `<span class="binary-data">\u{1F4E6} Binary data (${this.escapeHtml(contentType.split(';')[0])}, ${sizeStr})</span>`;
    }

    if (this.isJsonContentType(headers)) {
      try {
        const parsed = typeof body === 'string' ? JSON.parse(body) : body;
        return this.formatJson(parsed);
      } catch (e) {
        return `<span class="json-error" title="Invalid JSON: ${this.escapeHtml(e.message)}">\u26A0\uFE0F Invalid JSON</span>\n${this.escapeHtml(bodyStr)}`;
      }
    }

    if (contentType.includes('text/html')) {
      return this.highlightHtml(this.escapeHtml(bodyStr));
    }

    if (contentType.includes('text/css')) {
      return this.highlightCss(this.escapeHtml(bodyStr));
    }

    if (contentType.includes('javascript') || contentType.includes('application/x-javascript')) {
      return this.highlightJavaScript(this.escapeHtml(bodyStr));
    }

    return this.escapeHtml(bodyStr);
  }

  /**
   * Format JSON with syntax highlighting
   * @param {*} obj - Object to format
   * @param {number} indent - Indentation level
   * @returns {string} Formatted JSON HTML
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
   * Highlight HTML syntax
   * @param {string} html - Escaped HTML code
   * @returns {string} Highlighted HTML
   */
  highlightHtml(html) {
    return html
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="html-comment">$1</span>')
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
      );
  }

  /**
   * Highlight CSS syntax
   * @param {string} css - Escaped CSS code
   * @returns {string} Highlighted CSS
   */
  highlightCss(css) {
    return css
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>')
      .replace(/^([^{}/]+)(\s*{)/gm, (match, selector, brace) => {
        return `<span class="css-selector">${selector}</span>${brace}`;
      })
      .replace(/\b([\w-]+)(\s*):/g, '<span class="css-property">$1</span>$2:')
      .replace(/:\s*([^;}\n]+)/g, (match, value) => {
        return ': <span class="css-value">' + value + '</span>';
      });
  }

  /**
   * Highlight JavaScript syntax
   * @param {string} js - Escaped JavaScript code
   * @returns {string} Highlighted JavaScript
   */
  highlightJavaScript(js) {
    const placeholders = [];
    let result = js;

    result = result.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, match => {
      const id = placeholders.length;
      placeholders.push(`<span class="js-string">${match}</span>`);
      return `___PLACEHOLDER_${id}___`;
    });

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

    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="js-number">$1</span>');

    const keywords =
      /\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g;
    result = result.replace(keywords, '<span class="js-keyword">$1</span>');

    placeholders.forEach((replacement, id) => {
      result = result.replace(`___PLACEHOLDER_${id}___`, replacement);
    });

    return result;
  }
}

// Register the custom element
customElements.define('http-message', HTTPMessageElement);

export { HTTPMessageElement, HTTP_MESSAGE_STYLES };
