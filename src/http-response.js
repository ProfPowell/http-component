import './http-message.js';

/**
 * Inline CSS styles for http-response component
 * @const {string}
 */
const HTTP_RESPONSE_STYLES = `
:host {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;

  /* Light mode colors (default) */
  --bg-primary: #f5f5f5;
  --bg-secondary: white;
  --bg-header: #059669;
  --border-color: #ddd;
  --text-primary: #1f2937;
  --text-secondary: #64748b;
  --text-empty: #9ca3af;

  /* HTTP Status colors */
  --status-success: #16a34a;
  --status-redirect: #2563eb;
  --status-client-error: #ea580c;
  --status-server-error: #dc2626;

  /* Syntax highlighting */
  --version-color: #64748b;
  --reason-phrase: #1f2937;
  --header-name: #0066cc;
  --header-value: #334155;
  --mime-type-bg: #f3e8ff;
  --mime-type-text: #7c3aed;
}

/* Dark mode */
:host([theme="dark"]) {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --bg-header: #10b981;
  --border-color: #374151;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --text-empty: #6b7280;

  /* HTTP Status colors - brighter for dark mode */
  --status-success: #4ade80;
  --status-redirect: #60a5fa;
  --status-client-error: #fb923c;
  --status-server-error: #f87171;

  /* Syntax highlighting */
  --version-color: #9ca3af;
  --reason-phrase: #f3f4f6;
  --header-name: #60a5fa;
  --header-value: #d1d5db;
  --mime-type-bg: #581c87;
  --mime-type-text: #e9d5ff;
}

.http-response {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.section-header {
  background: var(--bg-header);
  color: white;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

/* HTTP Status styling */
.http-status-success { color: var(--status-success); font-weight: bold; }
.http-status-redirect { color: var(--status-redirect); font-weight: bold; }
.http-status-client-error { color: var(--status-client-error); font-weight: bold; }
.http-status-server-error { color: var(--status-server-error); font-weight: bold; }

.http-version { color: var(--version-color); }
.http-reason-phrase { color: var(--reason-phrase); font-weight: 600; }

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

/* Highlight styles */
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

/* Box styles */
.http-box {
  position: relative;
  border: 2px solid #059669;
  border-radius: 6px;
  padding: 20px 12px 12px 12px;
  margin: 8px 0;
  background: rgba(5, 150, 105, 0.02);
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
  color: #059669;
  border-radius: 3px;
  border: 2px solid #059669;
}

:host([theme='dark']) .http-box {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

:host([theme='dark']) .http-box-label {
  color: #10b981;
  border-color: #10b981;
}

/* JSON Syntax Highlighting */
.json-key { color: #0066cc; font-weight: 600; }
.json-string { color: #22863a; }
.json-number { color: #005cc5; }
.json-boolean { color: #6f42c1; font-weight: 600; }
.json-null { color: #6a737d; font-style: italic; }
.json-error { color: #d73a49; font-weight: 600; background: #ffeef0; padding: 2px 6px; border-radius: 3px; }

:host([theme='dark']) .json-key { color: #60a5fa; }
:host([theme='dark']) .json-string { color: #6ee7b7; }
:host([theme='dark']) .json-number { color: #93c5fd; }
:host([theme='dark']) .json-boolean { color: #c4b5fd; }
:host([theme='dark']) .json-null { color: #9ca3af; }
:host([theme='dark']) .json-error { color: #fca5a5; background: #7f1d1d; }

/* HTML Syntax Highlighting */
.html-tag { color: #2563eb; }
.html-attr { color: #059669; }
.html-value { color: #7c3aed; }
.html-comment { color: #6a737d; font-style: italic; }

:host([theme='dark']) .html-tag { color: #60a5fa; }
:host([theme='dark']) .html-attr { color: #34d399; }
:host([theme='dark']) .html-value { color: #c4b5fd; }
:host([theme='dark']) .html-comment { color: #9ca3af; }

/* CSS Syntax Highlighting */
.css-selector { color: #2563eb; font-weight: 600; }
.css-property { color: #059669; }
.css-value { color: #7c3aed; }
.css-comment { color: #6a737d; font-style: italic; }

:host([theme='dark']) .css-selector { color: #60a5fa; }
:host([theme='dark']) .css-property { color: #34d399; }
:host([theme='dark']) .css-value { color: #c4b5fd; }
:host([theme='dark']) .css-comment { color: #9ca3af; }

/* JavaScript Syntax Highlighting */
.js-keyword { color: #7c3aed; font-weight: 600; }
.js-string { color: #22863a; }
.js-number { color: #005cc5; }
.js-comment { color: #6a737d; font-style: italic; }

:host([theme='dark']) .js-keyword { color: #c4b5fd; }
:host([theme='dark']) .js-string { color: #6ee7b7; }
:host([theme='dark']) .js-number { color: #93c5fd; }
:host([theme='dark']) .js-comment { color: #9ca3af; }
`;

/**
 * @typedef {Object} HTTPResponseData
 * @property {number} status - HTTP status code
 * @property {string} statusText - Status text (OK, Not Found, etc.)
 * @property {string} [httpVersion='HTTP/1.1'] - HTTP protocol version
 * @property {Object.<string, string>} [headers={}] - Response headers
 * @property {string|null} [body=null] - Response body
 */

/**
 * HTTPResponseElement - Web component for displaying HTTP responses
 * Renders status line (HTTP/version STATUS REASON) followed by headers and body.
 *
 * @class
 * @extends HTMLElement
 *
 * @example
 * <http-response></http-response>
 *
 * @example
 * // Using the data property
 * const res = document.querySelector('http-response');
 * res.data = {
 *   status: 200,
 *   statusText: 'OK',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: '{"id": 1}'
 * };
 */
class HTTPResponseElement extends HTMLElement {
  /**
   * Creates an instance of HTTPResponseElement
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = null;

    // Handle property shadowing
    if (this.hasOwnProperty('data')) {
      const existingData = this.data;
      delete this.data;
      this.data = existingData;
    }
  }

  /**
   * Observed attributes
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ['response', 'theme', 'highlight', 'box', 'show-header'];
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
   * Set response data
   * @param {HTTPResponseData} value - Response data
   */
  set data(value) {
    this._data = value;
    this.render();
  }

  /**
   * Get response data
   * @returns {HTTPResponseData|null} Response data
   */
  get data() {
    return this._data;
  }

  /**
   * Get data from property or attribute
   * @returns {HTTPResponseData|null} Response data
   * @private
   */
  getData() {
    if (this._data) {
      return this._data;
    }

    const responseAttr = this.getAttribute('response');
    if (responseAttr) {
      try {
        return JSON.parse(responseAttr);
      } catch (e) {
        console.error('Failed to parse response:', e);
      }
    }

    return null;
  }

  /**
   * Parse highlight attribute
   * @returns {Object} Highlight configuration
   * @private
   */
  getHighlightedSections() {
    const highlightAttr = this.getAttribute('highlight');
    if (!highlightAttr) {
      return { sections: new Set(), allHeaders: false, specificHeaders: new Set() };
    }

    const sections = new Set();
    let allHeaders = false;
    const specificHeaders = new Set();

    const parts = highlightAttr
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const part of parts) {
      if (part === 'headers') {
        allHeaders = true;
      } else if (part.startsWith('header:')) {
        const headerName = part.substring('header:'.length).trim().toLowerCase();
        if (headerName) {
          specificHeaders.add(headerName);
        }
      } else {
        sections.add(part);
      }
    }

    return { sections, allHeaders, specificHeaders };
  }

  /**
   * Check if a section should be highlighted
   * @param {string} section - Section name
   * @returns {boolean} True if highlighted
   * @private
   */
  isHighlighted(section) {
    return this.getHighlightedSections().sections.has(section);
  }

  /**
   * Check if a header should be highlighted
   * @param {string} headerName - Header name
   * @returns {boolean} True if highlighted
   * @private
   */
  isHeaderHighlighted(headerName) {
    const highlighted = this.getHighlightedSections();
    return highlighted.allHeaders || highlighted.specificHeaders.has(headerName.toLowerCase());
  }

  /**
   * Parse box attribute
   * @returns {Object} Box configuration
   * @private
   */
  getBoxedSections() {
    const boxAttr = this.getAttribute('box');
    if (!boxAttr) {
      return { sections: new Set(), allHeaders: false, specificHeaders: new Set() };
    }

    const sections = new Set();
    let allHeaders = false;
    const specificHeaders = new Set();

    const parts = boxAttr
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const part of parts) {
      if (part === 'headers') {
        allHeaders = true;
      } else if (part.startsWith('header:')) {
        const headerName = part.substring('header:'.length).trim().toLowerCase();
        if (headerName) {
          specificHeaders.add(headerName);
        }
      } else {
        sections.add(part);
      }
    }

    return { sections, allHeaders, specificHeaders };
  }

  /**
   * Check if a section should be boxed
   * @param {string} section - Section name
   * @returns {boolean} True if boxed
   * @private
   */
  isBoxed(section) {
    return this.getBoxedSections().sections.has(section);
  }

  /**
   * Get CSS class for status code
   * @param {number} status - HTTP status code
   * @returns {string} CSS class name
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
   * Render the component
   * @private
   */
  render() {
    const response = this.getData();
    const showHeader = this.getAttribute('show-header') !== 'false';

    if (!response) {
      this.shadowRoot.innerHTML = `
        <style>${HTTP_RESPONSE_STYLES}</style>
        <div class="http-response">
          ${showHeader ? '<div class="section-header">Response</div>' : ''}
          <div class="http-content">
            <div class="empty">No response data</div>
          </div>
        </div>
      `;
      return;
    }

    const content = this.renderResponseContent(response);

    this.shadowRoot.innerHTML = `
      <style>${HTTP_RESPONSE_STYLES}</style>
      <div class="http-response">
        ${showHeader ? '<div class="section-header">Response</div>' : ''}
        <div class="http-content">
          <pre>${content}</pre>
        </div>
      </div>
    `;
  }

  /**
   * Render response content
   * @param {HTTPResponseData} response - Response data
   * @returns {string} HTML content
   * @private
   */
  renderResponseContent(response) {
    const { status, statusText, httpVersion = 'HTTP/1.1', headers = {}, body = null } = response;

    let content = '';

    // Status line
    const statusClass = this.getStatusColorClass(status);
    let statusLine = `<span class="http-version">${httpVersion}</span> `;
    statusLine += `<span class="${statusClass}">${status}</span> `;
    statusLine += `<span class="http-reason-phrase">${this.escapeHtml(statusText)}</span>`;

    const lineHighlighted = this.isHighlighted('status-line');
    const lineBoxed = this.isBoxed('status-line');

    if (lineBoxed) {
      const highlighted = lineHighlighted
        ? `<mark class="highlight">${statusLine}</mark>`
        : statusLine;
      content += `<div class="http-box"><div class="http-box-label">Status Line</div>${highlighted}\n</div>`;
    } else {
      content += lineHighlighted
        ? `<mark class="highlight">${statusLine}</mark>\n`
        : `${statusLine}\n`;
    }

    // Headers
    const boxed = this.getBoxedSections();
    let headersContent = '';

    for (const [key, value] of Object.entries(headers)) {
      let headerLine = `<span class="http-header-name">${this.escapeHtml(key)}</span>: `;
      if (key.toLowerCase() === 'content-type') {
        headerLine += this.highlightContentType(value);
      } else {
        headerLine += `<span class="http-header-value">${this.escapeHtml(value)}</span>`;
      }
      headerLine += '\n';

      const isHeaderHl = this.isHeaderHighlighted(key);
      const isHeaderBoxed = boxed.specificHeaders.has(key.toLowerCase());

      const processedLine = isHeaderHl
        ? `<mark class="highlight">${headerLine}</mark>`
        : headerLine;

      if (isHeaderBoxed && !boxed.allHeaders) {
        headersContent += `<div class="http-box"><div class="http-box-label">${key}</div>${processedLine}</div>`;
      } else {
        headersContent += processedLine;
      }
    }

    if (headersContent) {
      if (boxed.allHeaders) {
        content += `<div class="http-box"><div class="http-box-label">Headers</div>${headersContent}</div>`;
      } else {
        content += headersContent;
      }
    }

    // Body
    if (body) {
      content += '\n';
      const bodyContent = this.formatBody(body, headers);
      const bodyHighlighted = this.isHighlighted('body');
      const bodyBoxed = this.isBoxed('body');

      const processedBody = bodyHighlighted
        ? `<mark class="highlight">${bodyContent}</mark>`
        : bodyContent;

      if (bodyBoxed) {
        content += `<div class="http-box"><div class="http-box-label">Body</div>${processedBody}\n</div>`;
      } else {
        content += processedBody;
      }
    }

    return content;
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
   * Format body with syntax highlighting
   * @param {string} body - Body content
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {string} Formatted body HTML
   */
  formatBody(body, headers) {
    if (!body) return '';

    const contentType = headers['Content-Type'] || headers['content-type'] || '';
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body, null, 2);

    // Binary check
    const binaryTypes = [
      'image/',
      'video/',
      'audio/',
      'application/octet-stream',
      'application/pdf',
      'application/zip',
      'font/',
    ];
    if (binaryTypes.some(type => contentType.includes(type))) {
      const size = bodyStr.length;
      const sizeStr =
        size < 1024
          ? `${size} bytes`
          : size < 1024 * 1024
            ? `${(size / 1024).toFixed(1)} KB`
            : `${(size / (1024 * 1024)).toFixed(1)} MB`;
      return `<span class="binary-data">\u{1F4E6} Binary data (${this.escapeHtml(contentType.split(';')[0])}, ${sizeStr})</span>`;
    }

    // JSON
    if (contentType.includes('application/json') || contentType.includes('application/ld+json')) {
      try {
        const parsed = typeof body === 'string' ? JSON.parse(body) : body;
        return this.formatJson(parsed);
      } catch (e) {
        return `<span class="json-error" title="Invalid JSON: ${this.escapeHtml(e.message)}">\u26A0\uFE0F Invalid JSON</span>\n${this.escapeHtml(bodyStr)}`;
      }
    }

    // HTML
    if (contentType.includes('text/html')) {
      return this.highlightHtml(this.escapeHtml(bodyStr));
    }

    // CSS
    if (contentType.includes('text/css')) {
      return this.highlightCss(this.escapeHtml(bodyStr));
    }

    // JavaScript
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

    if (obj === null) return '<span class="json-null">null</span>';
    if (typeof obj === 'boolean') return `<span class="json-boolean">${obj}</span>`;
    if (typeof obj === 'number') return `<span class="json-number">${obj}</span>`;
    if (typeof obj === 'string')
      return `<span class="json-string">"${this.escapeHtml(obj)}"</span>`;

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
      .replace(
        /^([^{}/]+)(\s*{)/gm,
        (match, selector, brace) => `<span class="css-selector">${selector}</span>${brace}`
      )
      .replace(/\b([\w-]+)(\s*):/g, '<span class="css-property">$1</span>$2:')
      .replace(
        /:\s*([^;}\n]+)/g,
        (match, value) => ': <span class="css-value">' + value + '</span>'
      );
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
customElements.define('http-response', HTTPResponseElement);

export { HTTPResponseElement };
