/**
 * HTTPConsoleElement - Web component for displaying HTTP request/response data
 * Displays data in raw HTTP wire format for educational purposes
 */
class HTTPConsoleElement extends HTMLElement {
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

  static get observedAttributes() {
    return ['request', 'response', 'theme'];
  }

  connectedCallback() {
    this.render();
    this.updateTheme();
  }

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
   */
  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  /**
   * Parse JSON attribute or use property data
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
        response: responseAttr ? JSON.parse(responseAttr) : null
      };
    } catch (e) {
      console.error('Failed to parse HTTP data:', e);
      return { request: null, response: null };
    }
  }

  render() {
    const data = this.getData();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../css/http-console.css">
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
   * Get status code color class
   */
  getStatusColorClass(status) {
    if (status >= 200 && status < 300) return 'http-status-success';
    if (status >= 300 && status < 400) return 'http-status-redirect';
    if (status >= 400 && status < 500) return 'http-status-client-error';
    if (status >= 500) return 'http-status-server-error';
    return 'http-status';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Highlight Content-Type header value (MIME type)
   */
  highlightContentType(value) {
    const escaped = this.escapeHtml(value);
    // Split on semicolon to separate media type from parameters
    const parts = escaped.split(';');
    const mediaType = parts[0].trim();
    const params = parts.slice(1).map(p => p.trim()).join('; ');

    let result = `<span class="mime-type">${mediaType}</span>`;
    if (params) {
      result += `<span class="http-header-value">; ${params}</span>`;
    }
    return result;
  }

  /**
   * Check if content type indicates JSON
   */
  isJsonContentType(headers) {
    const contentType = headers['Content-Type'] || headers['content-type'] || '';
    return contentType.includes('application/json') || contentType.includes('application/ld+json');
  }

  /**
   * Check if content type is binary
   */
  isBinaryContentType(contentType) {
    const binaryTypes = [
      'image/', 'video/', 'audio/', 'application/octet-stream',
      'application/pdf', 'application/zip', 'font/'
    ];
    return binaryTypes.some(type => contentType.includes(type));
  }

  /**
   * Format body with appropriate formatting
   */
  formatBody(body, headers) {
    if (!body) return '';

    const contentType = headers['Content-Type'] || headers['content-type'] || '';
    const bodyStr = typeof body === 'string' ? body : JSON.stringify(body, null, 2);

    // Binary data
    if (this.isBinaryContentType(contentType)) {
      const size = bodyStr.length;
      const sizeStr = size < 1024 ? `${size} bytes`
        : size < 1024 * 1024 ? `${(size / 1024).toFixed(1)} KB`
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
   */
  formatJson(obj, indent = 0) {
    const indentStr = '  '.repeat(indent);
    const nextIndent = '  '.repeat(indent + 1);

    if (obj === null) {
      return `<span class="json-null">null</span>`;
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

      const items = obj.map(item =>
        `${nextIndent}${this.formatJson(item, indent + 1)}`
      ).join(',\n');

      return `[\n${items}\n${indentStr}]`;
    }

    if (typeof obj === 'object') {
      const keys = Object.keys(obj);
      if (keys.length === 0) return '{}';

      const items = keys.map(key =>
        `${nextIndent}<span class="json-key">"${this.escapeHtml(key)}"</span>: ${this.formatJson(obj[key], indent + 1)}`
      ).join(',\n');

      return `{\n${items}\n${indentStr}}`;
    }

    return String(obj);
  }

  /**
   * Highlight HTML syntax
   */
  highlightHtml(html) {
    return html
      // HTML comments
      .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="html-comment">$1</span>')
      // Tags with attributes
      .replace(/(&lt;\/?)([\w-]+)((?:\s+[\w-]+=(?:"[^"]*"|'[^']*'))*\s*)(\/?&gt;)/g, (match, open, tag, attrs, close) => {
        const highlightedTag = `<span class="html-tag">${open}${tag}</span>`;
        const highlightedAttrs = attrs.replace(/([\w-]+)=(["'])([^"']*)\2/g,
          '<span class="html-attr">$1</span>=<span class="html-value">$2$3$2</span>');
        return highlightedTag + highlightedAttrs + `<span class="html-tag">${close}</span>`;
      });
  }

  /**
   * Highlight CSS syntax
   */
  highlightCss(css) {
    return css
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
      });
  }

  /**
   * Highlight JavaScript syntax
   */
  highlightJavaScript(js) {
    // Use a placeholder system to prevent regex interference
    const placeholders = [];
    let result = js;

    // 1. Replace strings first (most specific)
    result = result.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (match) => {
      const id = placeholders.length;
      placeholders.push(`<span class="js-string">${match}</span>`);
      return `___PLACEHOLDER_${id}___`;
    });

    // 2. Replace comments
    result = result.replace(/\/\/.*$/gm, (match) => {
      const id = placeholders.length;
      placeholders.push(`<span class="js-comment">${match}</span>`);
      return `___PLACEHOLDER_${id}___`;
    });
    result = result.replace(/\/\*[\s\S]*?\*\//g, (match) => {
      const id = placeholders.length;
      placeholders.push(`<span class="js-comment">${match}</span>`);
      return `___PLACEHOLDER_${id}___`;
    });

    // 3. Replace numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="js-number">$1</span>');

    // 4. Replace keywords
    const keywords = /\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g;
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
