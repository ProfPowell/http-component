const O = `
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
class z extends HTMLElement {
  /**
   * Creates an instance of HTTPMessageElement
   * @constructor
   */
  constructor() {
    if (super(), this.attachShadow({ mode: "open" }), this._headers = {}, this._body = null, this._contentType = "", this.hasOwnProperty("headers")) {
      const e = this.headers;
      delete this.headers, this.headers = e;
    }
    if (this.hasOwnProperty("body")) {
      const e = this.body;
      delete this.body, this.body = e;
    }
  }
  /**
   * Observed attributes for automatic re-rendering
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ["theme", "highlight", "box"];
  }
  /**
   * Called when element is added to the DOM
   */
  connectedCallback() {
    this.render(), this.updateTheme();
  }
  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(e, t, r) {
    t !== r && (e === "theme" ? this.updateTheme() : this.render());
  }
  /**
   * Update theme based on attribute or system preference
   */
  updateTheme() {
    const e = this.getAttribute("theme");
    if (e === "dark" || e === "light")
      this.setAttribute("theme", e);
    else if (e === "auto" || !e) {
      const t = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setAttribute("theme", t ? "dark" : "light");
    }
  }
  /**
   * Set HTTP headers
   * @param {Object.<string, string>} value - Headers object
   */
  set headers(e) {
    this._headers = e || {}, this._contentType = this._headers["Content-Type"] || this._headers["content-type"] || "", this.render();
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
  set body(e) {
    this._body = e, this.render();
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
    const e = this.renderHeaders(), t = this.renderBody();
    this.shadowRoot.innerHTML = `
      <style>${O}</style>
      <div class="http-message">
        <slot name="before-headers"></slot>
        <pre>${e}${t ? `
` + t : ""}</pre>
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
    if (!this._headers || Object.keys(this._headers).length === 0)
      return "";
    let e = "";
    for (const [t, r] of Object.entries(this._headers)) {
      let o = `<span class="http-header-name">${this.escapeHtml(t)}</span>: `;
      t.toLowerCase() === "content-type" ? o += this.highlightContentType(r) : o += `<span class="http-header-value">${this.escapeHtml(r)}</span>`, e += o + `
`;
    }
    return e;
  }
  /**
   * Render body section
   * @returns {string} HTML string for body
   * @private
   */
  renderBody() {
    return this._body ? this.formatBody(this._body, this._headers) : "";
  }
  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(e) {
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  /**
   * Highlight Content-Type header value
   * @param {string} value - Content-Type value
   * @returns {string} Highlighted HTML
   */
  highlightContentType(e) {
    const r = this.escapeHtml(e).split(";"), o = r[0].trim(), s = r.slice(1).map((i) => i.trim()).join("; ");
    let a = `<span class="mime-type">${o}</span>`;
    return s && (a += `<span class="http-header-value">; ${s}</span>`), a;
  }
  /**
   * Check if content type indicates JSON
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {boolean} True if JSON content type
   */
  isJsonContentType(e) {
    const t = e["Content-Type"] || e["content-type"] || "";
    return t.includes("application/json") || t.includes("application/ld+json");
  }
  /**
   * Check if content type is binary
   * @param {string} contentType - Content-Type value
   * @returns {boolean} True if binary content type
   */
  isBinaryContentType(e) {
    return [
      "image/",
      "video/",
      "audio/",
      "application/octet-stream",
      "application/pdf",
      "application/zip",
      "font/"
    ].some((r) => e.includes(r));
  }
  /**
   * Format body with syntax highlighting
   * @param {string} body - Body content
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {string} Formatted body HTML
   */
  formatBody(e, t) {
    if (!e) return "";
    const r = t["Content-Type"] || t["content-type"] || "", o = typeof e == "string" ? e : JSON.stringify(e, null, 2);
    if (this.isBinaryContentType(r)) {
      const s = o.length, a = s < 1024 ? `${s} bytes` : s < 1024 * 1024 ? `${(s / 1024).toFixed(1)} KB` : `${(s / (1024 * 1024)).toFixed(1)} MB`;
      return `<span class="binary-data">📦 Binary data (${this.escapeHtml(r.split(";")[0])}, ${a})</span>`;
    }
    if (this.isJsonContentType(t))
      try {
        const s = typeof e == "string" ? JSON.parse(e) : e;
        return this.formatJson(s);
      } catch (s) {
        return `<span class="json-error" title="Invalid JSON: ${this.escapeHtml(s.message)}">⚠️ Invalid JSON</span>
${this.escapeHtml(o)}`;
      }
    return r.includes("text/html") ? this.highlightHtml(this.escapeHtml(o)) : r.includes("text/css") ? this.highlightCss(this.escapeHtml(o)) : r.includes("javascript") || r.includes("application/x-javascript") ? this.highlightJavaScript(this.escapeHtml(o)) : this.escapeHtml(o);
  }
  /**
   * Format JSON with syntax highlighting
   * @param {*} obj - Object to format
   * @param {number} indent - Indentation level
   * @returns {string} Formatted JSON HTML
   */
  formatJson(e, t = 0) {
    const r = "  ".repeat(t), o = "  ".repeat(t + 1);
    if (e === null)
      return '<span class="json-null">null</span>';
    if (typeof e == "boolean")
      return `<span class="json-boolean">${e}</span>`;
    if (typeof e == "number")
      return `<span class="json-number">${e}</span>`;
    if (typeof e == "string")
      return `<span class="json-string">"${this.escapeHtml(e)}"</span>`;
    if (Array.isArray(e))
      return e.length === 0 ? "[]" : `[
${e.map((a) => `${o}${this.formatJson(a, t + 1)}`).join(`,
`)}
${r}]`;
    if (typeof e == "object") {
      const s = Object.keys(e);
      return s.length === 0 ? "{}" : `{
${s.map(
        (i) => `${o}<span class="json-key">"${this.escapeHtml(i)}"</span>: ${this.formatJson(e[i], t + 1)}`
      ).join(`,
`)}
${r}}`;
    }
    return String(e);
  }
  /**
   * Highlight HTML syntax
   * @param {string} html - Escaped HTML code
   * @returns {string} Highlighted HTML
   */
  highlightHtml(e) {
    return e.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="html-comment">$1</span>').replace(
      /(&lt;\/?)([\w-]+)((?:\s+[\w-]+=(?:"[^"]*"|'[^']*'))*\s*)(\/?&gt;)/g,
      (t, r, o, s, a) => {
        const i = `<span class="html-tag">${r}${o}</span>`, d = s.replace(
          /([\w-]+)=(["'])([^"']*)\2/g,
          '<span class="html-attr">$1</span>=<span class="html-value">$2$3$2</span>'
        );
        return i + d + `<span class="html-tag">${a}</span>`;
      }
    );
  }
  /**
   * Highlight CSS syntax
   * @param {string} css - Escaped CSS code
   * @returns {string} Highlighted CSS
   */
  highlightCss(e) {
    return e.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>').replace(/^([^{}/]+)(\s*{)/gm, (t, r, o) => `<span class="css-selector">${r}</span>${o}`).replace(/\b([\w-]+)(\s*):/g, '<span class="css-property">$1</span>$2:').replace(/:\s*([^;}\n]+)/g, (t, r) => ': <span class="css-value">' + r + "</span>");
  }
  /**
   * Highlight JavaScript syntax
   * @param {string} js - Escaped JavaScript code
   * @returns {string} Highlighted JavaScript
   */
  highlightJavaScript(e) {
    const t = [];
    let r = e;
    r = r.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (s) => {
      const a = t.length;
      return t.push(`<span class="js-string">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\/\/.*$/gm, (s) => {
      const a = t.length;
      return t.push(`<span class="js-comment">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\/\*[\s\S]*?\*\//g, (s) => {
      const a = t.length;
      return t.push(`<span class="js-comment">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\b(\d+\.?\d*)\b/g, '<span class="js-number">$1</span>');
    const o = /\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g;
    return r = r.replace(o, '<span class="js-keyword">$1</span>'), t.forEach((s, a) => {
      r = r.replace(`___PLACEHOLDER_${a}___`, s);
    }), r;
  }
}
customElements.define("http-message", z);
const q = `
:host {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;

  /* Light mode colors (default) */
  --bg-primary: #f5f5f5;
  --bg-secondary: white;
  --bg-header: #2563eb;
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
  --method-head: #6b7280;
  --method-options: #0891b2;

  /* Syntax highlighting */
  --url-color: #0891b2;
  --version-color: #64748b;
  --header-name: #0066cc;
  --header-value: #334155;
  --mime-type-bg: #f3e8ff;
  --mime-type-text: #7c3aed;
}

/* Dark mode */
:host([theme="dark"]) {
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --bg-header: #3b82f6;
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
  --method-head: #9ca3af;
  --method-options: #22d3ee;

  /* Syntax highlighting */
  --url-color: #22d3ee;
  --version-color: #9ca3af;
  --header-name: #60a5fa;
  --header-value: #d1d5db;
  --mime-type-bg: #581c87;
  --mime-type-text: #e9d5ff;
}

.http-request {
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

/* HTTP Method styling */
.http-method-get { color: var(--method-get); font-weight: bold; }
.http-method-post { color: var(--method-post); font-weight: bold; }
.http-method-put { color: var(--method-put); font-weight: bold; }
.http-method-delete { color: var(--method-delete); font-weight: bold; }
.http-method-patch { color: var(--method-patch); font-weight: bold; }
.http-method-head { color: var(--method-head); font-weight: bold; }
.http-method-options { color: var(--method-options); font-weight: bold; }

.http-url { color: var(--url-color); }
.http-version { color: var(--version-color); }

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
class M extends HTMLElement {
  /**
   * Creates an instance of HTTPRequestElement
   * @constructor
   */
  constructor() {
    if (super(), this.attachShadow({ mode: "open" }), this._data = null, this.hasOwnProperty("data")) {
      const e = this.data;
      delete this.data, this.data = e;
    }
  }
  /**
   * Observed attributes
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ["request", "theme", "highlight", "box", "show-header"];
  }
  /**
   * Called when element is added to the DOM
   */
  connectedCallback() {
    this.render(), this.updateTheme();
  }
  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(e, t, r) {
    t !== r && (e === "theme" ? this.updateTheme() : this.render());
  }
  /**
   * Update theme based on attribute or system preference
   */
  updateTheme() {
    const e = this.getAttribute("theme");
    if (e === "dark" || e === "light")
      this.setAttribute("theme", e);
    else if (e === "auto" || !e) {
      const t = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setAttribute("theme", t ? "dark" : "light");
    }
  }
  /**
   * Set request data
   * @param {HTTPRequestData} value - Request data
   */
  set data(e) {
    this._data = e, this.render();
  }
  /**
   * Get request data
   * @returns {HTTPRequestData|null} Request data
   */
  get data() {
    return this._data;
  }
  /**
   * Get data from property or attribute
   * @returns {HTTPRequestData|null} Request data
   * @private
   */
  getData() {
    if (this._data)
      return this._data;
    const e = this.getAttribute("request");
    if (e)
      try {
        return JSON.parse(e);
      } catch (t) {
        console.error("Failed to parse request:", t);
      }
    return null;
  }
  /**
   * Parse highlight attribute
   * @returns {Object} Highlight configuration
   * @private
   */
  getHighlightedSections() {
    const e = this.getAttribute("highlight");
    if (!e)
      return { sections: /* @__PURE__ */ new Set(), allHeaders: !1, specificHeaders: /* @__PURE__ */ new Set() };
    const t = /* @__PURE__ */ new Set();
    let r = !1;
    const o = /* @__PURE__ */ new Set(), s = e.split(",").map((a) => a.trim()).filter((a) => a.length > 0);
    for (const a of s)
      if (a === "headers")
        r = !0;
      else if (a.startsWith("header:")) {
        const i = a.substring(7).trim().toLowerCase();
        i && o.add(i);
      } else
        t.add(a);
    return { sections: t, allHeaders: r, specificHeaders: o };
  }
  /**
   * Check if a section should be highlighted
   * @param {string} section - Section name
   * @returns {boolean} True if highlighted
   * @private
   */
  isHighlighted(e) {
    return this.getHighlightedSections().sections.has(e);
  }
  /**
   * Check if a header should be highlighted
   * @param {string} headerName - Header name
   * @returns {boolean} True if highlighted
   * @private
   */
  isHeaderHighlighted(e) {
    const t = this.getHighlightedSections();
    return t.allHeaders || t.specificHeaders.has(e.toLowerCase());
  }
  /**
   * Parse box attribute
   * @returns {Object} Box configuration
   * @private
   */
  getBoxedSections() {
    const e = this.getAttribute("box");
    if (!e)
      return { sections: /* @__PURE__ */ new Set(), allHeaders: !1, specificHeaders: /* @__PURE__ */ new Set() };
    const t = /* @__PURE__ */ new Set();
    let r = !1;
    const o = /* @__PURE__ */ new Set(), s = e.split(",").map((a) => a.trim()).filter((a) => a.length > 0);
    for (const a of s)
      if (a === "headers")
        r = !0;
      else if (a.startsWith("header:")) {
        const i = a.substring(7).trim().toLowerCase();
        i && o.add(i);
      } else
        t.add(a);
    return { sections: t, allHeaders: r, specificHeaders: o };
  }
  /**
   * Check if a section should be boxed
   * @param {string} section - Section name
   * @returns {boolean} True if boxed
   * @private
   */
  isBoxed(e) {
    return this.getBoxedSections().sections.has(e);
  }
  /**
   * Render the component
   * @private
   */
  render() {
    const e = this.getData(), t = this.getAttribute("show-header") !== "false";
    if (!e) {
      this.shadowRoot.innerHTML = `
        <style>${q}</style>
        <div class="http-request">
          ${t ? '<div class="section-header">Request</div>' : ""}
          <div class="http-content">
            <div class="empty">No request data</div>
          </div>
        </div>
      `;
      return;
    }
    const r = this.renderRequestContent(e);
    this.shadowRoot.innerHTML = `
      <style>${q}</style>
      <div class="http-request">
        ${t ? '<div class="section-header">Request</div>' : ""}
        <div class="http-content">
          <pre>${r}</pre>
        </div>
      </div>
    `;
  }
  /**
   * Render request content
   * @param {HTTPRequestData} request - Request data
   * @returns {string} HTML content
   * @private
   */
  renderRequestContent(e) {
    const { method: t, url: r, httpVersion: o = "HTTP/1.1", headers: s = {}, body: a = null } = e;
    let i = "", c = `<span class="${`http-method-${t.toLowerCase()}`}">${t}</span> `;
    c += `<span class="http-url">${this.escapeHtml(r)}</span> `, c += `<span class="http-version">${o}</span>`;
    const l = this.isHighlighted("request-line");
    if (this.isBoxed("request-line")) {
      const h = l ? `<mark class="highlight">${c}</mark>` : c;
      i += `<div class="http-box"><div class="http-box-label">Request Line</div>${h}
</div>`;
    } else
      i += l ? `<mark class="highlight">${c}</mark>
` : `${c}
`;
    const u = this.getBoxedSections();
    let m = "";
    for (const [h, g] of Object.entries(s)) {
      let p = `<span class="http-header-name">${this.escapeHtml(h)}</span>: `;
      h.toLowerCase() === "content-type" ? p += this.highlightContentType(g) : p += `<span class="http-header-value">${this.escapeHtml(g)}</span>`, p += `
`;
      const b = this.isHeaderHighlighted(h), y = u.specificHeaders.has(h.toLowerCase()), x = b ? `<mark class="highlight">${p}</mark>` : p;
      y && !u.allHeaders ? m += `<div class="http-box"><div class="http-box-label">${h}</div>${x}</div>` : m += x;
    }
    if (m && (u.allHeaders ? i += `<div class="http-box"><div class="http-box-label">Headers</div>${m}</div>` : i += m), a) {
      i += `
`;
      const h = this.formatBody(a, s), g = this.isHighlighted("body"), p = this.isBoxed("body"), b = g ? `<mark class="highlight">${h}</mark>` : h;
      p ? i += `<div class="http-box"><div class="http-box-label">Body</div>${b}
</div>` : i += b;
    }
    return i;
  }
  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(e) {
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  /**
   * Highlight Content-Type header value
   * @param {string} value - Content-Type value
   * @returns {string} Highlighted HTML
   */
  highlightContentType(e) {
    const r = this.escapeHtml(e).split(";"), o = r[0].trim(), s = r.slice(1).map((i) => i.trim()).join("; ");
    let a = `<span class="mime-type">${o}</span>`;
    return s && (a += `<span class="http-header-value">; ${s}</span>`), a;
  }
  /**
   * Format body with syntax highlighting
   * @param {string} body - Body content
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {string} Formatted body HTML
   */
  formatBody(e, t) {
    if (!e) return "";
    const r = t["Content-Type"] || t["content-type"] || "", o = typeof e == "string" ? e : JSON.stringify(e, null, 2);
    if ([
      "image/",
      "video/",
      "audio/",
      "application/octet-stream",
      "application/pdf",
      "application/zip",
      "font/"
    ].some((a) => r.includes(a))) {
      const a = o.length, i = a < 1024 ? `${a} bytes` : a < 1024 * 1024 ? `${(a / 1024).toFixed(1)} KB` : `${(a / (1024 * 1024)).toFixed(1)} MB`;
      return `<span class="binary-data">📦 Binary data (${this.escapeHtml(r.split(";")[0])}, ${i})</span>`;
    }
    if (r.includes("application/json") || r.includes("application/ld+json"))
      try {
        const a = typeof e == "string" ? JSON.parse(e) : e;
        return this.formatJson(a);
      } catch (a) {
        return `<span class="json-error" title="Invalid JSON: ${this.escapeHtml(a.message)}">⚠️ Invalid JSON</span>
${this.escapeHtml(o)}`;
      }
    return r.includes("text/html") ? this.highlightHtml(this.escapeHtml(o)) : r.includes("text/css") ? this.highlightCss(this.escapeHtml(o)) : r.includes("javascript") || r.includes("application/x-javascript") ? this.highlightJavaScript(this.escapeHtml(o)) : this.escapeHtml(o);
  }
  /**
   * Format JSON with syntax highlighting
   * @param {*} obj - Object to format
   * @param {number} indent - Indentation level
   * @returns {string} Formatted JSON HTML
   */
  formatJson(e, t = 0) {
    const r = "  ".repeat(t), o = "  ".repeat(t + 1);
    if (e === null) return '<span class="json-null">null</span>';
    if (typeof e == "boolean") return `<span class="json-boolean">${e}</span>`;
    if (typeof e == "number") return `<span class="json-number">${e}</span>`;
    if (typeof e == "string")
      return `<span class="json-string">"${this.escapeHtml(e)}"</span>`;
    if (Array.isArray(e))
      return e.length === 0 ? "[]" : `[
${e.map((a) => `${o}${this.formatJson(a, t + 1)}`).join(`,
`)}
${r}]`;
    if (typeof e == "object") {
      const s = Object.keys(e);
      return s.length === 0 ? "{}" : `{
${s.map(
        (i) => `${o}<span class="json-key">"${this.escapeHtml(i)}"</span>: ${this.formatJson(e[i], t + 1)}`
      ).join(`,
`)}
${r}}`;
    }
    return String(e);
  }
  /**
   * Highlight HTML syntax
   * @param {string} html - Escaped HTML code
   * @returns {string} Highlighted HTML
   */
  highlightHtml(e) {
    return e.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="html-comment">$1</span>').replace(
      /(&lt;\/?)([\w-]+)((?:\s+[\w-]+=(?:"[^"]*"|'[^']*'))*\s*)(\/?&gt;)/g,
      (t, r, o, s, a) => {
        const i = `<span class="html-tag">${r}${o}</span>`, d = s.replace(
          /([\w-]+)=(["'])([^"']*)\2/g,
          '<span class="html-attr">$1</span>=<span class="html-value">$2$3$2</span>'
        );
        return i + d + `<span class="html-tag">${a}</span>`;
      }
    );
  }
  /**
   * Highlight CSS syntax
   * @param {string} css - Escaped CSS code
   * @returns {string} Highlighted CSS
   */
  highlightCss(e) {
    return e.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>').replace(
      /^([^{}/]+)(\s*{)/gm,
      (t, r, o) => `<span class="css-selector">${r}</span>${o}`
    ).replace(/\b([\w-]+)(\s*):/g, '<span class="css-property">$1</span>$2:').replace(
      /:\s*([^;}\n]+)/g,
      (t, r) => ': <span class="css-value">' + r + "</span>"
    );
  }
  /**
   * Highlight JavaScript syntax
   * @param {string} js - Escaped JavaScript code
   * @returns {string} Highlighted JavaScript
   */
  highlightJavaScript(e) {
    const t = [];
    let r = e;
    r = r.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (s) => {
      const a = t.length;
      return t.push(`<span class="js-string">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\/\/.*$/gm, (s) => {
      const a = t.length;
      return t.push(`<span class="js-comment">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\/\*[\s\S]*?\*\//g, (s) => {
      const a = t.length;
      return t.push(`<span class="js-comment">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\b(\d+\.?\d*)\b/g, '<span class="js-number">$1</span>');
    const o = /\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g;
    return r = r.replace(o, '<span class="js-keyword">$1</span>'), t.forEach((s, a) => {
      r = r.replace(`___PLACEHOLDER_${a}___`, s);
    }), r;
  }
}
customElements.define("http-request", M);
const L = `
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
class N extends HTMLElement {
  /**
   * Creates an instance of HTTPResponseElement
   * @constructor
   */
  constructor() {
    if (super(), this.attachShadow({ mode: "open" }), this._data = null, this.hasOwnProperty("data")) {
      const e = this.data;
      delete this.data, this.data = e;
    }
  }
  /**
   * Observed attributes
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ["response", "theme", "highlight", "box", "show-header"];
  }
  /**
   * Called when element is added to the DOM
   */
  connectedCallback() {
    this.render(), this.updateTheme();
  }
  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   */
  attributeChangedCallback(e, t, r) {
    t !== r && (e === "theme" ? this.updateTheme() : this.render());
  }
  /**
   * Update theme based on attribute or system preference
   */
  updateTheme() {
    const e = this.getAttribute("theme");
    if (e === "dark" || e === "light")
      this.setAttribute("theme", e);
    else if (e === "auto" || !e) {
      const t = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setAttribute("theme", t ? "dark" : "light");
    }
  }
  /**
   * Set response data
   * @param {HTTPResponseData} value - Response data
   */
  set data(e) {
    this._data = e, this.render();
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
    if (this._data)
      return this._data;
    const e = this.getAttribute("response");
    if (e)
      try {
        return JSON.parse(e);
      } catch (t) {
        console.error("Failed to parse response:", t);
      }
    return null;
  }
  /**
   * Parse highlight attribute
   * @returns {Object} Highlight configuration
   * @private
   */
  getHighlightedSections() {
    const e = this.getAttribute("highlight");
    if (!e)
      return { sections: /* @__PURE__ */ new Set(), allHeaders: !1, specificHeaders: /* @__PURE__ */ new Set() };
    const t = /* @__PURE__ */ new Set();
    let r = !1;
    const o = /* @__PURE__ */ new Set(), s = e.split(",").map((a) => a.trim()).filter((a) => a.length > 0);
    for (const a of s)
      if (a === "headers")
        r = !0;
      else if (a.startsWith("header:")) {
        const i = a.substring(7).trim().toLowerCase();
        i && o.add(i);
      } else
        t.add(a);
    return { sections: t, allHeaders: r, specificHeaders: o };
  }
  /**
   * Check if a section should be highlighted
   * @param {string} section - Section name
   * @returns {boolean} True if highlighted
   * @private
   */
  isHighlighted(e) {
    return this.getHighlightedSections().sections.has(e);
  }
  /**
   * Check if a header should be highlighted
   * @param {string} headerName - Header name
   * @returns {boolean} True if highlighted
   * @private
   */
  isHeaderHighlighted(e) {
    const t = this.getHighlightedSections();
    return t.allHeaders || t.specificHeaders.has(e.toLowerCase());
  }
  /**
   * Parse box attribute
   * @returns {Object} Box configuration
   * @private
   */
  getBoxedSections() {
    const e = this.getAttribute("box");
    if (!e)
      return { sections: /* @__PURE__ */ new Set(), allHeaders: !1, specificHeaders: /* @__PURE__ */ new Set() };
    const t = /* @__PURE__ */ new Set();
    let r = !1;
    const o = /* @__PURE__ */ new Set(), s = e.split(",").map((a) => a.trim()).filter((a) => a.length > 0);
    for (const a of s)
      if (a === "headers")
        r = !0;
      else if (a.startsWith("header:")) {
        const i = a.substring(7).trim().toLowerCase();
        i && o.add(i);
      } else
        t.add(a);
    return { sections: t, allHeaders: r, specificHeaders: o };
  }
  /**
   * Check if a section should be boxed
   * @param {string} section - Section name
   * @returns {boolean} True if boxed
   * @private
   */
  isBoxed(e) {
    return this.getBoxedSections().sections.has(e);
  }
  /**
   * Get CSS class for status code
   * @param {number} status - HTTP status code
   * @returns {string} CSS class name
   * @private
   */
  getStatusColorClass(e) {
    return e >= 200 && e < 300 ? "http-status-success" : e >= 300 && e < 400 ? "http-status-redirect" : e >= 400 && e < 500 ? "http-status-client-error" : e >= 500 ? "http-status-server-error" : "http-status";
  }
  /**
   * Render the component
   * @private
   */
  render() {
    const e = this.getData(), t = this.getAttribute("show-header") !== "false";
    if (!e) {
      this.shadowRoot.innerHTML = `
        <style>${L}</style>
        <div class="http-response">
          ${t ? '<div class="section-header">Response</div>' : ""}
          <div class="http-content">
            <div class="empty">No response data</div>
          </div>
        </div>
      `;
      return;
    }
    const r = this.renderResponseContent(e);
    this.shadowRoot.innerHTML = `
      <style>${L}</style>
      <div class="http-response">
        ${t ? '<div class="section-header">Response</div>' : ""}
        <div class="http-content">
          <pre>${r}</pre>
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
  renderResponseContent(e) {
    const { status: t, statusText: r, httpVersion: o = "HTTP/1.1", headers: s = {}, body: a = null } = e;
    let i = "";
    const d = this.getStatusColorClass(t);
    let c = `<span class="http-version">${o}</span> `;
    c += `<span class="${d}">${t}</span> `, c += `<span class="http-reason-phrase">${this.escapeHtml(r)}</span>`;
    const l = this.isHighlighted("status-line");
    if (this.isBoxed("status-line")) {
      const h = l ? `<mark class="highlight">${c}</mark>` : c;
      i += `<div class="http-box"><div class="http-box-label">Status Line</div>${h}
</div>`;
    } else
      i += l ? `<mark class="highlight">${c}</mark>
` : `${c}
`;
    const u = this.getBoxedSections();
    let m = "";
    for (const [h, g] of Object.entries(s)) {
      let p = `<span class="http-header-name">${this.escapeHtml(h)}</span>: `;
      h.toLowerCase() === "content-type" ? p += this.highlightContentType(g) : p += `<span class="http-header-value">${this.escapeHtml(g)}</span>`, p += `
`;
      const b = this.isHeaderHighlighted(h), y = u.specificHeaders.has(h.toLowerCase()), x = b ? `<mark class="highlight">${p}</mark>` : p;
      y && !u.allHeaders ? m += `<div class="http-box"><div class="http-box-label">${h}</div>${x}</div>` : m += x;
    }
    if (m && (u.allHeaders ? i += `<div class="http-box"><div class="http-box-label">Headers</div>${m}</div>` : i += m), a) {
      i += `
`;
      const h = this.formatBody(a, s), g = this.isHighlighted("body"), p = this.isBoxed("body"), b = g ? `<mark class="highlight">${h}</mark>` : h;
      p ? i += `<div class="http-box"><div class="http-box-label">Body</div>${b}
</div>` : i += b;
    }
    return i;
  }
  /**
   * Escape HTML special characters
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(e) {
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  /**
   * Highlight Content-Type header value
   * @param {string} value - Content-Type value
   * @returns {string} Highlighted HTML
   */
  highlightContentType(e) {
    const r = this.escapeHtml(e).split(";"), o = r[0].trim(), s = r.slice(1).map((i) => i.trim()).join("; ");
    let a = `<span class="mime-type">${o}</span>`;
    return s && (a += `<span class="http-header-value">; ${s}</span>`), a;
  }
  /**
   * Format body with syntax highlighting
   * @param {string} body - Body content
   * @param {Object.<string, string>} headers - HTTP headers
   * @returns {string} Formatted body HTML
   */
  formatBody(e, t) {
    if (!e) return "";
    const r = t["Content-Type"] || t["content-type"] || "", o = typeof e == "string" ? e : JSON.stringify(e, null, 2);
    if ([
      "image/",
      "video/",
      "audio/",
      "application/octet-stream",
      "application/pdf",
      "application/zip",
      "font/"
    ].some((a) => r.includes(a))) {
      const a = o.length, i = a < 1024 ? `${a} bytes` : a < 1024 * 1024 ? `${(a / 1024).toFixed(1)} KB` : `${(a / (1024 * 1024)).toFixed(1)} MB`;
      return `<span class="binary-data">📦 Binary data (${this.escapeHtml(r.split(";")[0])}, ${i})</span>`;
    }
    if (r.includes("application/json") || r.includes("application/ld+json"))
      try {
        const a = typeof e == "string" ? JSON.parse(e) : e;
        return this.formatJson(a);
      } catch (a) {
        return `<span class="json-error" title="Invalid JSON: ${this.escapeHtml(a.message)}">⚠️ Invalid JSON</span>
${this.escapeHtml(o)}`;
      }
    return r.includes("text/html") ? this.highlightHtml(this.escapeHtml(o)) : r.includes("text/css") ? this.highlightCss(this.escapeHtml(o)) : r.includes("javascript") || r.includes("application/x-javascript") ? this.highlightJavaScript(this.escapeHtml(o)) : this.escapeHtml(o);
  }
  /**
   * Format JSON with syntax highlighting
   * @param {*} obj - Object to format
   * @param {number} indent - Indentation level
   * @returns {string} Formatted JSON HTML
   */
  formatJson(e, t = 0) {
    const r = "  ".repeat(t), o = "  ".repeat(t + 1);
    if (e === null) return '<span class="json-null">null</span>';
    if (typeof e == "boolean") return `<span class="json-boolean">${e}</span>`;
    if (typeof e == "number") return `<span class="json-number">${e}</span>`;
    if (typeof e == "string")
      return `<span class="json-string">"${this.escapeHtml(e)}"</span>`;
    if (Array.isArray(e))
      return e.length === 0 ? "[]" : `[
${e.map((a) => `${o}${this.formatJson(a, t + 1)}`).join(`,
`)}
${r}]`;
    if (typeof e == "object") {
      const s = Object.keys(e);
      return s.length === 0 ? "{}" : `{
${s.map(
        (i) => `${o}<span class="json-key">"${this.escapeHtml(i)}"</span>: ${this.formatJson(e[i], t + 1)}`
      ).join(`,
`)}
${r}}`;
    }
    return String(e);
  }
  /**
   * Highlight HTML syntax
   * @param {string} html - Escaped HTML code
   * @returns {string} Highlighted HTML
   */
  highlightHtml(e) {
    return e.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="html-comment">$1</span>').replace(
      /(&lt;\/?)([\w-]+)((?:\s+[\w-]+=(?:"[^"]*"|'[^']*'))*\s*)(\/?&gt;)/g,
      (t, r, o, s, a) => {
        const i = `<span class="html-tag">${r}${o}</span>`, d = s.replace(
          /([\w-]+)=(["'])([^"']*)\2/g,
          '<span class="html-attr">$1</span>=<span class="html-value">$2$3$2</span>'
        );
        return i + d + `<span class="html-tag">${a}</span>`;
      }
    );
  }
  /**
   * Highlight CSS syntax
   * @param {string} css - Escaped CSS code
   * @returns {string} Highlighted CSS
   */
  highlightCss(e) {
    return e.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="css-comment">$1</span>').replace(
      /^([^{}/]+)(\s*{)/gm,
      (t, r, o) => `<span class="css-selector">${r}</span>${o}`
    ).replace(/\b([\w-]+)(\s*):/g, '<span class="css-property">$1</span>$2:').replace(
      /:\s*([^;}\n]+)/g,
      (t, r) => ': <span class="css-value">' + r + "</span>"
    );
  }
  /**
   * Highlight JavaScript syntax
   * @param {string} js - Escaped JavaScript code
   * @returns {string} Highlighted JavaScript
   */
  highlightJavaScript(e) {
    const t = [];
    let r = e;
    r = r.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (s) => {
      const a = t.length;
      return t.push(`<span class="js-string">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\/\/.*$/gm, (s) => {
      const a = t.length;
      return t.push(`<span class="js-comment">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\/\*[\s\S]*?\*\//g, (s) => {
      const a = t.length;
      return t.push(`<span class="js-comment">${s}</span>`), `___PLACEHOLDER_${a}___`;
    }), r = r.replace(/\b(\d+\.?\d*)\b/g, '<span class="js-number">$1</span>');
    const o = /\b(function|const|let|var|if|else|for|while|return|class|import|export|from|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g;
    return r = r.replace(o, '<span class="js-keyword">$1</span>'), t.forEach((s, a) => {
      r = r.replace(`___PLACEHOLDER_${a}___`, s);
    }), r;
  }
}
customElements.define("http-response", N);
const D = `
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
class A extends HTMLElement {
  /**
   * Creates an instance of HTTPTransactionElement
   * @constructor
   */
  constructor() {
    if (super(), this.attachShadow({ mode: "open" }), this._data = null, this.hasOwnProperty("data")) {
      const e = this.data;
      delete this.data, this.data = e;
    }
  }
  /**
   * Observed attributes for automatic re-rendering
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ["request", "response", "theme", "highlight", "box"];
  }
  /**
   * Called when element is added to the DOM
   * @memberof HTTPTransactionElement
   */
  connectedCallback() {
    this.render(), this.updateTheme();
  }
  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   * @memberof HTTPTransactionElement
   */
  attributeChangedCallback(e, t, r) {
    t !== r && (e === "theme" ? (this.updateTheme(), this.updateChildThemes()) : this.render());
  }
  /**
   * Update theme based on attribute or system preference
   * Sets theme to 'dark', 'light', or auto-detects from system
   * @memberof HTTPTransactionElement
   */
  updateTheme() {
    const e = this.getAttribute("theme");
    if (e === "dark" || e === "light")
      this.setAttribute("theme", e);
    else if (e === "auto" || !e) {
      const t = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setAttribute("theme", t ? "dark" : "light");
    }
  }
  /**
   * Update theme on child components
   * @memberof HTTPTransactionElement
   * @private
   */
  updateChildThemes() {
    const e = this.getAttribute("theme"), t = this.shadowRoot.querySelectorAll("http-request"), r = this.shadowRoot.querySelectorAll("http-response");
    t.forEach((o) => o.setAttribute("theme", e)), r.forEach((o) => o.setAttribute("theme", e));
  }
  /**
   * Set request/response data via property
   * @param {HTTPExchange} value - HTTP exchange data containing request and response
   * @memberof HTTPTransactionElement
   */
  set data(e) {
    this._data = e, this.render();
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
    if (this._data)
      return this._data;
    const e = this.getAttribute("request"), t = this.getAttribute("response");
    try {
      return {
        request: e ? JSON.parse(e) : null,
        response: t ? JSON.parse(t) : null
      };
    } catch (r) {
      return console.error("Failed to parse HTTP data:", r), { request: null, response: null };
    }
  }
  /**
   * Parse highlight attribute and split into request/response highlights
   * @returns {Object} Highlight configuration for request and response
   * @memberof HTTPTransactionElement
   * @private
   */
  getHighlightConfig() {
    const e = this.getAttribute("highlight");
    if (!e)
      return { request: "", response: "" };
    const t = [], r = [], o = e.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    for (const s of o)
      if (s.startsWith("request-")) {
        const a = s.replace("request-", "");
        a === "line" ? t.push("request-line") : t.push(a);
      } else if (s.startsWith("response-")) {
        const a = s.replace("response-", "");
        a === "line" ? r.push("status-line") : r.push(a);
      } else s.startsWith("request-header:") ? t.push(s.replace("request-header:", "header:")) : s.startsWith("response-header:") && r.push(s.replace("response-header:", "header:"));
    return {
      request: t.join(","),
      response: r.join(",")
    };
  }
  /**
   * Parse box attribute and split into request/response boxes
   * @returns {Object} Box configuration for request and response
   * @memberof HTTPTransactionElement
   * @private
   */
  getBoxConfig() {
    const e = this.getAttribute("box");
    if (!e)
      return { request: "", response: "" };
    const t = [], r = [], o = e.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    for (const s of o)
      if (s.startsWith("request-")) {
        const a = s.replace("request-", "");
        a === "line" ? t.push("request-line") : t.push(a);
      } else if (s.startsWith("response-")) {
        const a = s.replace("response-", "");
        a === "line" ? r.push("status-line") : r.push(a);
      } else s.startsWith("request-header:") ? t.push(s.replace("request-header:", "header:")) : s.startsWith("response-header:") && r.push(s.replace("response-header:", "header:"));
    return {
      request: t.join(","),
      response: r.join(",")
    };
  }
  /**
   * Render the component's shadow DOM
   * Only renders sections for which data is provided
   * @memberof HTTPTransactionElement
   * @private
   */
  render() {
    const e = this.getData(), t = e.request !== null && e.request !== void 0, r = e.response !== null && e.response !== void 0, o = this.getAttribute("theme") || "light", s = this.getHighlightConfig(), a = this.getBoxConfig();
    let i = "";
    if (t && (i += `
        <div class="http-section">
          <http-request
            theme="${o}"
            ${s.request ? `highlight="${s.request}"` : ""}
            ${a.request ? `box="${a.request}"` : ""}
          ></http-request>
        </div>
      `), r && (i += `
        <div class="http-section">
          <http-response
            theme="${o}"
            ${s.response ? `highlight="${s.response}"` : ""}
            ${a.response ? `box="${a.response}"` : ""}
          ></http-response>
        </div>
      `), !t && !r && (i = '<div class="empty">No HTTP data provided</div>'), this.shadowRoot.innerHTML = `
      <style>${D}</style>
      <div class="http-transaction">
        ${i}
      </div>
    `, t) {
      const d = this.shadowRoot.querySelector("http-request");
      d && (d.data = e.request);
    }
    if (r) {
      const d = this.shadowRoot.querySelector("http-response");
      d && (d.data = e.response);
    }
  }
}
customElements.define("http-transaction", A);
customElements.get("http-console") || customElements.define("http-console", class extends A {
});
class B {
  /**
   * Creates a new HTTP interceptor instance
   * @constructor
   */
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.isActive = !1, this.isPaused = !1, this.filter = null, this.originalFetch = null, this.originalXHR = null, this.maxBodySize = 1024 * 1024;
  }
  /**
   * Start intercepting HTTP requests
   * Patches window.fetch and window.XMLHttpRequest
   * @param {ExchangeCallback} callback - Called with each captured exchange
   * @param {InterceptorOptions} [options={}] - Configuration options
   * @memberof HTTPInterceptor
   */
  start(e, t = {}) {
    if (this.isActive) {
      console.warn("HTTPInterceptor is already active");
      return;
    }
    this.filter = t.filter || null, this.maxBodySize = t.maxBodySize || this.maxBodySize, e && this.listeners.add(e), this.patchFetch(), this.patchXHR(), this.isActive = !0, this.isPaused = !1;
  }
  /**
   * Stop intercepting and restore original functions
   * Removes patches from window.fetch and window.XMLHttpRequest
   * @memberof HTTPInterceptor
   */
  stop() {
    this.isActive && (this.originalFetch && (window.fetch = this.originalFetch, this.originalFetch = null), this.originalXHR && (window.XMLHttpRequest = this.originalXHR, this.originalXHR = null), this.isActive = !1, this.listeners.clear());
  }
  /**
   * Pause capturing without stopping interception
   * Requests will still be intercepted but not forwarded to listeners
   * @memberof HTTPInterceptor
   */
  pause() {
    this.isPaused = !0;
  }
  /**
   * Resume capturing after pause
   * @memberof HTTPInterceptor
   */
  resume() {
    this.isPaused = !1;
  }
  /**
   * Add a listener for captured requests
   * @param {ExchangeCallback} callback - Callback to invoke for each exchange
   * @memberof HTTPInterceptor
   */
  addListener(e) {
    this.listeners.add(e);
  }
  /**
   * Remove a listener
   * @param {ExchangeCallback} callback - Callback to remove
   * @memberof HTTPInterceptor
   */
  removeListener(e) {
    this.listeners.delete(e);
  }
  /**
   * Notify all listeners with captured data
   * Applies filter and pause checks before notifying
   * @param {Object} exchange - HTTP exchange to send to listeners
   * @memberof HTTPInterceptor
   * @private
   */
  notifyListeners(e) {
    this.isPaused || this.filter && !this.matchesFilter(e.request.url) || this.listeners.forEach((t) => {
      try {
        t(e);
      } catch (r) {
        console.error("Error in HTTPInterceptor listener:", r);
      }
    });
  }
  /**
   * Check if URL matches filter pattern
   */
  matchesFilter(e) {
    if (!this.filter) return !0;
    const t = this.filter.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    return new RegExp(t).test(e);
  }
  /**
   * Patch window.fetch
   */
  patchFetch() {
    if (this.originalFetch) return;
    this.originalFetch = window.fetch;
    const e = this;
    window.fetch = function(...t) {
      const r = performance.now(), [o, s = {}] = t, a = typeof o == "string" ? o : o.url, i = {
        method: s.method || "GET",
        url: a,
        httpVersion: "HTTP/1.1",
        headers: e.extractHeaders(s.headers),
        body: s.body || null
      };
      return e.originalFetch.apply(this, t).then(async (d) => {
        const c = performance.now();
        try {
          const l = d.clone(), f = await e.extractResponse(l), u = {
            request: i,
            response: f,
            timing: {
              startTime: r,
              endTime: c,
              duration: Math.round(c - r)
            }
          };
          e.notifyListeners(u);
        } catch (l) {
          console.error("Error extracting response data:", l);
        }
        return d;
      }).catch((d) => {
        const c = performance.now(), l = {
          request: i,
          response: {
            status: 0,
            statusText: "Network Error",
            httpVersion: "HTTP/1.1",
            headers: {},
            body: JSON.stringify({ error: d.message })
          },
          timing: {
            startTime: r,
            endTime: c,
            duration: Math.round(c - r)
          }
        };
        throw e.notifyListeners(l), d;
      });
    };
  }
  /**
   * Patch XMLHttpRequest
   */
  patchXHR() {
    if (this.originalXHR) return;
    this.originalXHR = window.XMLHttpRequest;
    const e = this;
    window.XMLHttpRequest = function() {
      const t = new e.originalXHR(), r = {
        method: "GET",
        url: "",
        httpVersion: "HTTP/1.1",
        headers: {},
        body: null
      };
      let o = 0;
      const s = t.open;
      t.open = function(d, c, ...l) {
        return r.method = d, r.url = c, s.apply(this, [d, c, ...l]);
      };
      const a = t.setRequestHeader;
      t.setRequestHeader = function(d, c) {
        return r.headers[d] = c, a.apply(this, arguments);
      };
      const i = t.send;
      return t.send = function(d) {
        return r.body = d || null, o = performance.now(), t.addEventListener("loadend", function() {
          const c = performance.now(), l = {}, f = t.getAllResponseHeaders();
          f && f.split(`\r
`).forEach((m) => {
            const [h, g] = m.split(": ");
            h && g && (l[h] = g);
          });
          const u = {
            request: r,
            response: {
              status: t.status,
              statusText: t.statusText,
              httpVersion: "HTTP/1.1",
              headers: l,
              body: e.truncateBody(
                t.responseText,
                t.getResponseHeader("Content-Type")
              )
            },
            timing: {
              startTime: o,
              endTime: c,
              duration: Math.round(c - o)
            }
          };
          e.notifyListeners(u);
        }), i.apply(this, arguments);
      }, t;
    };
  }
  /**
   * Extract headers from various formats
   */
  extractHeaders(e) {
    if (!e) return {};
    if (e instanceof Headers) {
      const t = {};
      return e.forEach((r, o) => {
        t[o] = r;
      }), t;
    }
    return e;
  }
  /**
   * Extract response data
   */
  async extractResponse(e) {
    const t = {};
    e.headers.forEach((s, a) => {
      t[a] = s;
    });
    const r = e.headers.get("Content-Type") || "";
    let o = null;
    try {
      const s = await e.text();
      o = this.truncateBody(s, r);
    } catch {
      o = "[Body not accessible - CORS or stream error]";
    }
    return {
      status: e.status,
      statusText: e.statusText,
      httpVersion: "HTTP/1.1",
      headers: t,
      body: o
    };
  }
  /**
   * Truncate large bodies
   */
  truncateBody(e, t) {
    return e ? e.length > this.maxBodySize ? `[Body too large: ${(e.length / 1048576).toFixed(2)}MB - showing first 1MB]

${e.substring(0, this.maxBodySize)}` : e : null;
  }
}
const Z = new B(), J = {
  "http/1.0": "HTTP/1.0",
  "http/1.1": "HTTP/1.1",
  h2: "HTTP/2",
  h2c: "HTTP/2",
  h3: "HTTP/3"
}, F = /* @__PURE__ */ new Set([
  "navigation",
  "link",
  "script",
  "img",
  "image",
  "css",
  "iframe",
  "frame",
  "video",
  "audio",
  "track",
  "embed",
  "object",
  "input",
  "use",
  "other"
]), v = (n) => Number.isFinite(n) ? n : 0, P = (n) => Math.round(v(n) * 10) / 10, w = (n, e) => n > 0 && e > 0 && n >= e ? P(n - e) : 0;
function I(n, e) {
  if (!e) return !0;
  if (!e.includes("*")) return n.includes(e);
  const t = e.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(t).test(n);
}
function V(n, e = 40) {
  if (n.length <= e) return n;
  const t = Math.ceil((e - 1) * 0.4), r = e - 1 - t;
  return `${n.slice(0, t)}…${n.slice(-r)}`;
}
function W(n, e) {
  try {
    const t = new URL(n), r = t.pathname + t.search, o = t.origin !== e;
    return { crossOrigin: o, label: o ? t.host + r : r };
  } catch {
    return { crossOrigin: !1, label: n };
  }
}
function U(n, e) {
  if (e) return "unknown";
  const t = v(n.transferSize), r = v(n.encodedBodySize), o = v(n.decodedBodySize);
  return n.responseStatus === 304 ? "revalidated" : n.deliveryType === "cache" || t === 0 && o > 0 ? "cache" : t > 0 && r > 0 && t < r ? "revalidated" : t > 0 ? "network" : "unknown";
}
function X(n, e) {
  const t = n.name || "", { crossOrigin: r, label: o } = W(t, e), s = n.entryType === "navigation" ? "navigation" : "resource", a = s === "navigation" ? "navigation" : n.initiatorType || "other", i = v(n.transferSize), d = v(n.encodedBodySize), c = v(n.decodedBodySize), l = r && i === 0 && d === 0 && c === 0 && !(v(n.responseStart) > 0), f = v(n.startTime), u = v(n.responseEnd) > 0 ? n.responseEnd : f + v(n.duration), m = Math.max(0, u - f);
  let h = null;
  if (!l) {
    const $ = v(n.secureConnectionStart), H = w(n.domainLookupEnd, n.domainLookupStart), S = w($ > 0 ? $ : n.connectEnd, n.connectStart), E = $ > 0 ? w(n.connectEnd, $) : 0, C = w(n.responseStart, n.requestStart), R = w(n.responseEnd, n.responseStart);
    h = { queue: Math.max(0, P(m - H - S - E - C - R)), dns: H, connect: S, tls: E, wait: C, download: R };
  }
  const g = n.nextHopProtocol || "", p = J[g] || (g ? g.toUpperCase() : void 0), b = v(n.responseStatus), y = {};
  n.contentType && (y["Content-Type"] = n.contentType), n.contentEncoding && (y["Content-Encoding"] = n.contentEncoding);
  const x = {
    kind: s,
    initiatorType: a,
    label: o,
    crossOrigin: r,
    opaque: l,
    protocol: g,
    transferSize: i,
    encodedBodySize: d,
    decodedBodySize: c,
    cache: U(n, l)
  };
  return n.renderBlockingStatus && (x.renderBlocking = n.renderBlockingStatus), n.contentType && (x.contentType = n.contentType), n.contentEncoding && (x.contentEncoding = n.contentEncoding), {
    request: {
      method: F.has(a) ? "GET" : "?",
      url: t,
      httpVersion: p,
      headers: {},
      body: null
    },
    response: {
      status: b,
      statusText: "",
      httpVersion: p,
      headers: y,
      body: null
    },
    timing: {
      startTime: Math.round(f),
      endTime: Math.round(u),
      duration: Math.round(m),
      phases: h
    },
    resource: x
  };
}
class _ {
  constructor() {
    this.isActive = !1, this.filter = null, this._observer = null;
  }
  /**
   * True when this browser can report resource timing.
   * @returns {boolean} Support flag
   */
  static get supported() {
    return typeof window < "u" && "PerformanceObserver" in window && "performance" in window && typeof performance.getEntriesByType == "function";
  }
  /**
   * Start reporting. Entries recorded before this call are delivered first.
   * @param {function(Object[]): void} callback - Called with each batch of exchanges, oldest first
   * @param {ResourceSourceOptions} [options={}] - Configuration options
   */
  start(e, t = {}) {
    if (this.isActive || !_.supported) return;
    this.isActive = !0, this.filter = t.filter || null;
    const r = t.navigation !== !1, o = t.skipScripted === !0, s = window.location.origin, a = (i) => {
      const d = i.filter((c) => I(c.name, this.filter)).filter(
        (c) => !o || c.initiatorType !== "fetch" && c.initiatorType !== "xmlhttprequest"
      ).map((c) => X(c, s)).sort((c, l) => c.timing.startTime - l.timing.startTime);
      d.length > 0 && e(d);
    };
    r && a(performance.getEntriesByType("navigation")), this._observer = new window.PerformanceObserver((i) => a(i.getEntries())), this._observer.observe({ type: "resource", buffered: !0 });
  }
  /**
   * Stop reporting.
   */
  stop() {
    this._observer && (this._observer.disconnect(), this._observer = null), this.isActive = !1;
  }
}
const G = `/** HTTP Waterfall Component Styles */
:host { display: block; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; --bg-primary: white; --bg-secondary: #f9fafb; --bg-tertiary: #fafafa; --bg-expanded: #f3f4f6; --border-color: #e5e7eb; --text-primary: #374151; --text-secondary: #6b7280; --text-tertiary: #9ca3af; --button-bg: white; --button-border: #d1d5db; --button-hover-bg: #f3f4f6; --button-hover-border: #9ca3af; --button-active-bg: #e5e7eb; --button-primary-bg: #2563eb; --button-primary-border: #2563eb; --button-primary-hover: #1d4ed8; --status-success-bg: #dcfce7; --status-success-text: #166534; --status-redirect-bg: #e0e7ff; --status-redirect-text: #3730a3; --status-client-error-bg: #fef3c7; --status-client-error-text: #92400e; --status-server-error-bg: #fee2e2; --status-server-error-text: #991b1b; --timing-success-bg: #86efac; --timing-success-border: #22c55e; --timing-redirect-bg: #a5b4fc; --timing-redirect-border: #6366f1; --timing-client-error-bg: #fde047; --timing-client-error-border: #eab308; --timing-server-error-bg: #fca5a5; --timing-server-error-border: #ef4444; --capture-active-bg: #dcfce7; --capture-active-text: #166534; --capture-active-dot: #22c55e; --capture-paused-bg: #fef3c7; --capture-paused-text: #92400e; }
:host([theme="dark"]) { --bg-primary: #111827; --bg-secondary: #1f2937; --bg-tertiary: #374151; --bg-expanded: #4b5563; --border-color: #374151; --text-primary: #f3f4f6; --text-secondary: #9ca3af; --text-tertiary: #6b7280; --button-bg: #374151; --button-border: #4b5563; --button-hover-bg: #4b5563; --button-hover-border: #6b7280; --button-active-bg: #6b7280; --button-primary-bg: #3b82f6; --button-primary-border: #3b82f6; --button-primary-hover: #2563eb; --status-success-bg: #065f46; --status-success-text: #6ee7b7; --status-redirect-bg: #312e81; --status-redirect-text: #a5b4fc; --status-client-error-bg: #78350f; --status-client-error-text: #fde047; --status-server-error-bg: #7f1d1d; --status-server-error-text: #fca5a5; --timing-success-bg: #047857; --timing-success-border: #10b981; --timing-redirect-bg: #4338ca; --timing-redirect-border: #6366f1; --timing-client-error-bg: #b45309; --timing-client-error-border: #f59e0b; --timing-server-error-bg: #b91c1c; --timing-server-error-border: #ef4444; --capture-active-bg: #065f46; --capture-active-text: #6ee7b7; --capture-active-dot: #10b981; --capture-paused-bg: #78350f; --capture-paused-text: #fde047; }
.http-waterfall { background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 4px; overflow: hidden; }
.toolbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 12px 16px; background: var(--bg-secondary); border-bottom: 1px solid var(--border-color); }
.view-toggle { display: flex; gap: 4px; }
.view-btn { padding: 6px 12px; border: 1px solid var(--button-border); background: var(--button-bg); color: var(--text-primary); font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 4px; transition: all 0.2s; }
.view-btn:hover { background: var(--button-hover-bg); }
.view-btn.active { background: var(--button-primary-bg); color: white; border-color: var(--button-primary-border); }
.capture-controls { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.control-btn { padding: 6px 12px; border: 1px solid var(--button-border); background: var(--button-bg); color: var(--text-primary); font-size: 16px; cursor: pointer; border-radius: 4px; transition: all 0.2s; min-width: 36px; }
.control-btn:hover { background: var(--button-hover-bg); border-color: var(--button-hover-border); }
.control-btn:active { background: var(--button-active-bg); }
.capture-indicator { font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 12px; display: flex; align-items: center; gap: 6px; }
.capture-indicator.active { background: var(--capture-active-bg); color: var(--capture-active-text); }
.capture-indicator.active::before { content: ''; display: inline-block; width: 8px; height: 8px; background: var(--capture-active-dot); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
.capture-indicator.paused { background: var(--capture-paused-bg); color: var(--capture-paused-text); }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
.info { font-size: 13px; color: var(--text-secondary); }
.empty { padding: 40px 20px; text-align: center; color: var(--text-tertiary); font-style: italic; }
.list-view { display: flex; flex-direction: column; }
.exchange-row { border-bottom: 1px solid var(--border-color); }
.exchange-row:last-child { border-bottom: none; }
.exchange-summary { display: grid; grid-template-columns: 80px 1fr 140px 80px 80px 40px; gap: 12px; align-items: center; padding: 12px 16px; cursor: pointer; transition: background 0.2s; }
.exchange-summary:hover { background: var(--bg-secondary); }
.exchange-row.expanded .exchange-summary { background: var(--bg-expanded); border-bottom: 1px solid var(--border-color); }
.method { font-weight: 600; font-family: 'Courier New', monospace; padding: 2px 8px; border-radius: 3px; text-align: center; font-size: 12px; }
.method-get { background: var(--status-redirect-bg); color: var(--status-redirect-text); }
.method-post { background: var(--status-success-bg); color: var(--status-success-text); }
.method-put { background: var(--status-client-error-bg); color: var(--status-client-error-text); }
.method-delete { background: var(--status-server-error-bg); color: var(--status-server-error-text); }
.method-patch { background: var(--status-redirect-bg); color: var(--status-redirect-text); }
.url { color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.status { font-family: 'Courier New', monospace; font-size: 13px; font-weight: 500; padding: 2px 8px; border-radius: 3px; text-align: center; }
.status-success { background: var(--status-success-bg); color: var(--status-success-text); }
.status-redirect { background: var(--status-redirect-bg); color: var(--status-redirect-text); }
.status-client-error { background: var(--status-client-error-bg); color: var(--status-client-error-text); }
.status-server-error { background: var(--status-server-error-bg); color: var(--status-server-error-text); }
.size, .duration { font-family: 'Courier New', monospace; font-size: 13px; color: var(--text-secondary); text-align: right; }
.expand-btn { background: none; border: none; color: var(--text-secondary); font-size: 14px; cursor: pointer; padding: 6px 8px; transition: all 0.2s; min-width: 32px; display: flex; align-items: center; justify-content: center; }
.expand-btn:hover { color: var(--text-primary); background: var(--button-active-bg); border-radius: 4px; }
.exchange-detail { padding: 16px; background: var(--bg-tertiary); border-top: 1px solid var(--border-color); }
.detail-console-container { width: 100%; }
.duration-view { display: flex; flex-direction: column; }
.duration-header { display: grid; grid-template-columns: 300px 1fr; border-bottom: 2px solid var(--border-color); background: var(--bg-secondary); font-weight: 600; font-size: 12px; color: var(--text-secondary); padding: 8px 16px; min-height: 46px; align-items: start; }
.duration-scale-header { padding-left: 16px; }
.duration-rows { display: flex; flex-direction: column; }
.duration-row-container { border-bottom: 1px solid var(--border-color); }
.duration-row-container:last-child { border-bottom: none; }
.duration-row-container.expanded { background: var(--bg-tertiary); }
.duration-row { display: grid; grid-template-columns: 300px 1fr; min-height: 40px; transition: background 0.2s; }
.duration-row:hover { background: var(--bg-secondary); cursor: pointer; }
.duration-bar-area { position: relative; padding: 8px 16px; background: var(--bg-tertiary); overflow-x: auto; overflow-y: hidden; min-width: 0; }
.duration-bar { height: 24px; border-radius: 3px; display: flex; align-items: center; padding: 0 8px; box-sizing: border-box; width: calc((var(--duration) / var(--max-duration)) * (100% - 32px)); min-width: 40px; max-width: calc(100% - 16px); }
.duration-bar.status-success { background: var(--timing-success-bg); border: 1px solid var(--timing-success-border); }
.duration-bar.status-redirect { background: var(--timing-redirect-bg); border: 1px solid var(--timing-redirect-border); }
.duration-bar.status-client-error { background: var(--timing-client-error-bg); border: 1px solid var(--timing-client-error-border); }
.duration-bar.status-server-error { background: var(--timing-server-error-bg); border: 1px solid var(--timing-server-error-border); }
.waterfall-view { display: flex; flex-direction: column; }
.timeline-header { display: grid; grid-template-columns: 300px 1fr; border-bottom: 2px solid var(--border-color); background: var(--bg-secondary); font-weight: 600; font-size: 12px; color: var(--text-secondary); min-height: 46px; align-items: start; }
.request-info-header { padding: 8px 16px; border-right: 1px solid var(--border-color); }
.timeline-scale { display: flex; position: relative; padding: 8px 16px; min-height: 30px; }
.time-marker { position: absolute; font-size: 11px; color: var(--text-tertiary); white-space: nowrap; }
.time-marker:nth-child(1) { left: 16px; }
.time-marker:nth-child(2) { left: 20%; }
.time-marker:nth-child(3) { left: 40%; }
.time-marker:nth-child(4) { left: 60%; }
.time-marker:nth-child(5) { left: 80%; }
.waterfall-rows { display: flex; flex-direction: column; }
.waterfall-row-container { border-bottom: 1px solid var(--border-color); }
.waterfall-row-container:last-child { border-bottom: none; }
.waterfall-row-container.expanded { background: var(--bg-tertiary); }
.waterfall-row { display: grid; grid-template-columns: 300px 1fr; min-height: 40px; transition: background 0.2s; }
.waterfall-row:hover { background: var(--bg-secondary); cursor: pointer; }
.request-info { display: flex; align-items: center; gap: 8px; padding: 8px 16px; border-right: 1px solid var(--border-color); background: var(--bg-primary); }
.url-short { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; color: var(--text-primary); }
.timing-area { position: relative; padding: 8px 16px; background: var(--bg-tertiary); overflow-x: auto; overflow-y: hidden; min-width: 0; }
.timing-bar { position: absolute; top: 50%; transform: translateY(-50%); height: 24px; border-radius: 3px; display: flex; align-items: center; padding: 0 8px; box-sizing: border-box; left: calc(16px + (var(--start-offset) / var(--total-duration)) * (100% - 32px)); width: calc((var(--duration) / var(--total-duration)) * (100% - 32px)); min-width: 2px; max-width: calc(100% - 32px); }
.timing-bar.status-success { background: var(--timing-success-bg); border: 1px solid var(--timing-success-border); }
.timing-bar.status-redirect { background: var(--timing-redirect-bg); border: 1px solid var(--timing-redirect-border); }
.timing-bar.status-client-error { background: var(--timing-client-error-bg); border: 1px solid var(--timing-client-error-border); }
.timing-bar.status-server-error { background: var(--timing-server-error-bg); border: 1px solid var(--timing-server-error-border); }
.duration-label { font-size: 11px; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: clip; }
@media (max-width: 900px) { .exchange-summary { grid-template-columns: 60px 1fr 100px 60px 60px 30px; gap: 8px; font-size: 13px; } .duration-row, .duration-header { grid-template-columns: 200px 1fr; } .waterfall-row, .timeline-header { grid-template-columns: 200px 1fr; } }

/* Explorer/Request Builder styles */
.explorer-panel { background: var(--bg-secondary); border-bottom: 1px solid var(--border-color); padding: 16px; }
.explorer-toggle { display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--text-primary); font-weight: 500; font-size: 13px; padding: 8px 12px; background: var(--button-bg); border: 1px solid var(--button-border); border-radius: 4px; transition: all 0.2s; }
.explorer-toggle:hover { background: var(--button-hover-bg); border-color: var(--button-hover-border); }
.explorer-toggle.active { background: var(--button-primary-bg); color: white; border-color: var(--button-primary-border); }
.explorer-content { margin-top: 16px; display: none; }
.explorer-content.visible { display: block; }
.request-builder { display: flex; flex-direction: column; gap: 16px; }
.request-line-builder { display: flex; gap: 12px; align-items: center; }
.method-select { padding: 10px 12px; border: 1px solid var(--button-border); border-radius: 4px; background: var(--button-bg); color: var(--text-primary); font-size: 14px; font-weight: 600; cursor: pointer; min-width: 100px; }
.method-select:focus { outline: none; border-color: var(--button-primary-bg); }
.url-input { flex: 1; padding: 10px 12px; border: 1px solid var(--button-border); border-radius: 4px; background: var(--button-bg); color: var(--text-primary); font-size: 14px; font-family: 'Courier New', monospace; }
.url-input:focus { outline: none; border-color: var(--button-primary-bg); }
.send-button { padding: 10px 24px; background: var(--button-primary-bg); color: white; border: none; border-radius: 4px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.send-button:hover { background: var(--button-primary-hover); }
.send-button:disabled { opacity: 0.5; cursor: not-allowed; }
.headers-section { display: flex; flex-direction: column; gap: 8px; }
.section-label { font-size: 13px; font-weight: 600; color: var(--text-secondary); }
.headers-list { display: flex; flex-direction: column; gap: 8px; }
.header-row { display: flex; gap: 8px; align-items: center; }
.header-input { padding: 8px 10px; border: 1px solid var(--button-border); border-radius: 4px; background: var(--button-bg); color: var(--text-primary); font-size: 13px; font-family: 'Courier New', monospace; }
.header-input:focus { outline: none; border-color: var(--button-primary-bg); }
.header-input.name { flex: 1; min-width: 150px; }
.header-input.value { flex: 2; min-width: 200px; }
.remove-header-btn { padding: 6px 10px; background: var(--status-server-error-bg); color: var(--status-server-error-text); border: none; border-radius: 4px; font-size: 12px; cursor: pointer; transition: opacity 0.2s; }
.remove-header-btn:hover { opacity: 0.9; }
.add-header-btn { padding: 8px 16px; background: var(--bg-primary); color: var(--text-primary); border: 2px dashed var(--button-border); border-radius: 4px; font-size: 13px; cursor: pointer; transition: all 0.2s; }
.add-header-btn:hover { border-color: var(--button-primary-bg); color: var(--button-primary-bg); }
.body-section { display: flex; flex-direction: column; gap: 8px; }
.body-textarea { width: 100%; min-height: 100px; padding: 12px; border: 1px solid var(--button-border); border-radius: 4px; background: var(--button-bg); color: var(--text-primary); font-size: 13px; font-family: 'Courier New', monospace; line-height: 1.5; resize: vertical; box-sizing: border-box; }
.body-textarea:focus { outline: none; border-color: var(--button-primary-bg); }
.explorer-status { margin-top: 12px; padding: 12px 16px; border-radius: 4px; font-size: 14px; }
.explorer-status.loading { background: var(--status-redirect-bg); color: var(--status-redirect-text); }
.explorer-status.success { background: var(--status-success-bg); color: var(--status-success-text); }
.explorer-status.error { background: var(--status-server-error-bg); color: var(--status-server-error-text); }
/* Resource Timing mode (resources attribute) */
:host { --phase-queue-bg: #e5e7eb; --phase-dns-bg: #5eead4; --phase-connect-bg: #fdba74; --phase-tls-bg: #c4b5fd; --phase-wait-bg: #86efac; --phase-download-bg: #60a5fa; --initiator-bg: #e5e7eb; --initiator-text: #374151; --cross-origin-text: #9a3412; }
:host([theme="dark"]) { --phase-queue-bg: #4b5563; --phase-dns-bg: #0f766e; --phase-connect-bg: #c2410c; --phase-tls-bg: #6d28d9; --phase-wait-bg: #047857; --phase-download-bg: #1d4ed8; --initiator-bg: #4b5563; --initiator-text: #f3f4f6; --cross-origin-text: #fdba74; }
.initiator { background: var(--initiator-bg); color: var(--initiator-text); min-width: 44px; box-sizing: border-box; }
.exchange-summary.resource { grid-template-columns: 72px 1fr 64px 110px 80px 40px; }
.url.cross-origin, .url-short.cross-origin { color: var(--cross-origin-text); }
.timing-bar.status-unknown, .duration-bar.status-unknown { background: var(--phase-queue-bg); border: 1px dashed var(--text-tertiary); }
.timing-bar.has-phases { background: var(--bg-primary); overflow: hidden; }
.phases { position: absolute; inset: 0; display: flex; }
.phase { flex: var(--ms) 1 0; min-width: 0; }
.phase-queue { background: var(--phase-queue-bg); }
.phase-dns { background: var(--phase-dns-bg); }
.phase-connect { background: var(--phase-connect-bg); }
.phase-tls { background: var(--phase-tls-bg); }
.phase-wait { background: var(--phase-wait-bg); }
.phase-download { background: var(--phase-download-bg); }
.timing-bar.has-phases .duration-label { position: relative; }
.phase-legend { display: flex; flex-wrap: wrap; gap: 4px 16px; padding: 8px 16px; font-size: 12px; color: var(--text-secondary); border-bottom: 1px solid var(--border-color); background: var(--bg-secondary); }
.phase-legend span { display: inline-flex; align-items: center; gap: 6px; }
.phase-legend i { display: inline-block; width: 12px; height: 12px; border-radius: 2px; }
.resource-facts { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 0; font-size: 13px; color: var(--text-primary); }
.resource-facts dt { color: var(--text-secondary); }
.resource-facts dd { margin: 0; font-family: 'Courier New', monospace; overflow-wrap: anywhere; }
.resource-note { margin: 12px 0 0; font-size: 12px; color: var(--text-secondary); }
`, k = {
  navigation: ["doc", "The document itself: the URL that was navigated to"],
  link: ["link", "Requested by a <link> element, such as a stylesheet or a preload"],
  script: ["script", "Requested by a <script> element"],
  img: ["img", "Requested by an <img> element"],
  image: ["image", "Requested by an SVG <image> element"],
  css: ["css", "Requested from inside a stylesheet, such as a font or a background image"],
  iframe: ["iframe", "A document loaded into an <iframe>"],
  fetch: ["fetch", "Requested by script with fetch()"],
  xmlhttprequest: ["xhr", "Requested by script with XMLHttpRequest"],
  beacon: ["beacon", "Sent by script with navigator.sendBeacon()"],
  video: ["video", "Requested by a <video> element"],
  audio: ["audio", "Requested by an <audio> element"],
  other: ["other", "Requested by the browser itself, such as the favicon"]
}, T = [
  ["queue", "Queued"],
  ["dns", "DNS"],
  ["connect", "Connect"],
  ["tls", "TLS"],
  ["wait", "Waiting"],
  ["download", "Download"]
], j = {
  network: "fetched over the network",
  cache: "served from cache; nothing was sent",
  revalidated: "revalidated; the server answered 304 and the cached body was reused",
  unknown: "not exposed"
};
class Y extends HTMLElement {
  constructor() {
    if (super(), this.attachShadow({ mode: "open" }), this._exchanges = [], this._view = "duration", this._expandedRows = /* @__PURE__ */ new Set(), this._capture = !1, this._filter = null, this._maxEntries = 100, this._isPaused = !1, this._interceptor = null, this._resources = !1, this._resourceSource = null, this._explorerOpen = !1, this._explorerHeaders = [{ name: "", value: "" }], this._explorerLoading = !1, this._explorerStatus = null, this.hasOwnProperty("exchanges")) {
      const e = this.exchanges;
      delete this.exchanges, this.exchanges = e;
    }
  }
  static get observedAttributes() {
    return [
      "view",
      "requests",
      "capture",
      "resources",
      "filter",
      "max-entries",
      "theme",
      "explorer"
    ];
  }
  /**
   * Called when element is added to the DOM
   * @memberof HTTPWaterfallElement
   */
  connectedCallback() {
    this.hasAttribute("view") || (this._view = this.getSmartDefaultView()), this._explorerOpen = this.hasAttribute("explorer"), this.shadowRoot.innerHTML = `
      <style>${G}</style>
      <div class="http-waterfall">
        <div class="toolbar-container"></div>
        <div class="explorer-container"></div>
        <div class="view-container"></div>
      </div>
    `, this._toolbarContainer = this.shadowRoot.querySelector(".toolbar-container"), this._explorerContainer = this.shadowRoot.querySelector(".explorer-container"), this._viewContainer = this.shadowRoot.querySelector(".view-container"), this.renderToolbar(), this.renderExplorer(), this.renderView(), this.updateTheme(), this._capture && this.startCapture(), this._resources && this.startResources();
  }
  disconnectedCallback() {
    this.stopCapture(), this.stopResources();
  }
  attributeChangedCallback(e, t, r) {
    if (t !== r) {
      if (e === "view")
        this._view = r || "list";
      else if (e === "requests")
        try {
          this._exchanges = JSON.parse(r) || [];
        } catch (o) {
          console.error("Failed to parse requests:", o);
        }
      else if (e === "capture")
        this._capture = r === "true" || r === "", this._capture && this.isConnected ? this.startCapture() : this.stopCapture();
      else if (e === "resources")
        this._resources = r !== null && r !== "false", this._resources && this._viewContainer ? this.startResources() : this.stopResources(), this.renderExplorer();
      else if (e === "filter")
        this._filter = r, this._interceptor && (this._interceptor.filter = r), this._resourceSource && (this._resourceSource.filter = r);
      else if (e === "max-entries")
        this._maxEntries = parseInt(r, 10) || 100;
      else if (e === "theme") {
        this.updateTheme();
        return;
      } else if (e === "explorer") {
        this._explorerOpen = r !== null, this.renderExplorer();
        return;
      }
      this.render();
    }
  }
  /**
   * Update theme based on attribute or system preference
   */
  updateTheme() {
    const e = this.getAttribute("theme");
    if (e === "dark" || e === "light")
      this.setAttribute("theme", e);
    else if (e === "auto" || !e) {
      const t = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.setAttribute("theme", t ? "dark" : "light");
    }
    this.updateChildThemes();
  }
  /**
   * Update theme on child http-transaction/http-console elements
   */
  updateChildThemes() {
    const e = this.getAttribute("theme");
    this.shadowRoot.querySelectorAll("http-transaction, http-console").forEach((r) => {
      r.setAttribute("theme", e);
    });
  }
  /**
   * Set HTTP exchanges to display
   * @param {HTTPExchangeWithTiming[]} value - Array of HTTP exchanges with timing
   * @memberof HTTPWaterfallElement
   */
  set exchanges(e) {
    this._exchanges = Array.isArray(e) ? e : [], this.render();
  }
  /**
   * Get current HTTP exchanges
   * @returns {HTTPExchangeWithTiming[]} Array of exchanges
   * @memberof HTTPWaterfallElement
   */
  get exchanges() {
    return this._exchanges;
  }
  /**
   * Set current view mode
   * @param {'list'|'duration'|'waterfall'} value - View mode
   * @memberof HTTPWaterfallElement
   */
  set view(e) {
    this._view !== e && (this._view = e, this.renderToolbar(), this.renderView());
  }
  /**
   * Get current view mode
   * @returns {'list'|'duration'|'waterfall'} Current view mode
   * @memberof HTTPWaterfallElement
   */
  get view() {
    return this._view;
  }
  /**
   * Start capturing live HTTP requests using the interceptor
   * @memberof HTTPWaterfallElement
   */
  startCapture() {
    this._interceptor || (this._interceptor = new B(), this._interceptor.start(
      (e) => {
        this.addCapturedExchange(e);
      },
      {
        filter: this._filter
      }
    ));
  }
  /**
   * Stop capturing
   */
  stopCapture() {
    this._interceptor && (this._interceptor.stop(), this._interceptor = null);
  }
  /**
   * Start listing the requests the page itself made, from the browser's
   * Navigation Timing and Resource Timing data: the document, stylesheets,
   * scripts, images, fonts, and frames, oldest first. Requests that finish
   * later (a lazy image, a late font) are added as they complete.
   * @memberof HTTPWaterfallElement
   */
  startResources() {
    this._resourceSource || (!this.hasAttribute("view") && this._view !== "waterfall" && (this._view = "waterfall", this.renderToolbar()), this._resourceSource = new _(), this._resourceSource.start((e) => this.addResourceExchanges(e), {
      filter: this._filter,
      // The interceptor already reports fetch and XHR, with headers and bodies
      skipScripted: this._capture
    }));
  }
  /**
   * Stop listing the page's own requests
   * @memberof HTTPWaterfallElement
   */
  stopResources() {
    this._resourceSource && (this._resourceSource.stop(), this._resourceSource = null);
  }
  /**
   * Add a batch of exchanges built from Resource Timing entries
   * @param {HTTPExchangeWithTiming[]} exchanges - Exchanges to add
   */
  addResourceExchanges(e) {
    this.insertChronological(e), this.dispatchEvent(new CustomEvent("resources-observed", { detail: { exchanges: e } }));
  }
  /**
   * Merge exchanges into the list in start-time order, oldest first
   * @param {HTTPExchangeWithTiming[]} exchanges - Exchanges to merge
   */
  insertChronological(e) {
    const t = this._exchanges.concat(e);
    t.sort((r, o) => {
      var s, a;
      return (((s = r.timing) == null ? void 0 : s.startTime) || 0) - (((a = o.timing) == null ? void 0 : a.startTime) || 0);
    }), this._exchanges = t.slice(0, this._maxEntries), this.renderView(), this.updateRequestCount();
  }
  /**
   * True when an exchange carries usable timing. A start time of 0 is valid:
   * the document itself starts at 0.
   * @param {HTTPExchangeWithTiming} exchange - Exchange to test
   * @returns {boolean} Whether the exchange can be placed on a timeline
   */
  hasTiming(e) {
    const t = e.timing;
    return !!t && Number.isFinite(t.startTime) && t.endTime > 0;
  }
  /**
   * Pause/resume capturing
   */
  togglePause() {
    this._interceptor && (this._isPaused = !this._isPaused, this._isPaused ? this._interceptor.pause() : this._interceptor.resume(), this.renderToolbar());
  }
  /**
   * Clear all captured exchanges
   */
  clearExchanges() {
    this._exchanges = [], this._expandedRows.clear(), this.renderView(), this.updateRequestCount();
  }
  /**
   * Determine if requests are clustered (within 10 seconds of each other)
   */
  areRequestsClustered() {
    if (this._exchanges.length < 2) return !1;
    const e = this._exchanges.filter((o) => this.hasTiming(o)).map((o) => o.timing.startTime);
    if (e.length === 0) return !1;
    const t = Math.min(...e);
    return Math.max(...e) - t < 1e4;
  }
  /**
   * Get smart default view based on context
   */
  getSmartDefaultView() {
    return this._resources ? "waterfall" : this._capture ? "duration" : this.areRequestsClustered() ? "waterfall" : "duration";
  }
  /**
   * Add a captured exchange
   */
  addCapturedExchange(e) {
    if (this._resources) {
      this.insertChronological([e]);
      return;
    }
    this._exchanges.unshift(e), this._exchanges.length > this._maxEntries && (this._exchanges = this._exchanges.slice(0, this._maxEntries)), this.renderView(), this.updateRequestCount();
  }
  toggleRow(e) {
    this._expandedRows.has(e) ? this._expandedRows.delete(e) : this._expandedRows.add(e), this.renderView();
  }
  render() {
    !this._toolbarContainer || !this._viewContainer || (this.renderToolbar(), this.renderView());
  }
  renderView() {
    if (!this._viewContainer) return;
    let e;
    this._view === "waterfall" ? e = this.renderWaterfallView() : this._view === "duration" ? e = this.renderDurationView() : e = this.renderListView(), this._viewContainer.innerHTML = e, this.attachViewEventListeners();
  }
  renderToolbar() {
    if (!this._toolbarContainer) return;
    const e = this._capture ? `
      <div class="capture-controls">
        <button class="control-btn pause-btn" title="${this._isPaused ? "Resume" : "Pause"}">
          ${this._isPaused ? "▶" : "⏸"}
        </button>
        <button class="control-btn clear-btn" title="Clear all">
          🗑
        </button>
        <span class="capture-indicator ${this._isPaused ? "paused" : "active"}">
          ${this._isPaused ? "Paused" : "Capturing"}
        </span>
      </div>
    ` : "";
    this._toolbarContainer.innerHTML = `
      <div class="toolbar">
        <div class="view-toggle">
          <button class="view-btn ${this._view === "list" ? "active" : ""}" data-view="list">List</button>
          <button class="view-btn ${this._view === "duration" ? "active" : ""}" data-view="duration">Duration</button>
          <button class="view-btn ${this._view === "waterfall" ? "active" : ""}" data-view="waterfall">Waterfall</button>
        </div>
        ${e}
        <div class="info">
          ${this.getSummaryText()}
        </div>
      </div>
    `, this.attachToolbarEventListeners();
  }
  renderListView() {
    return this._exchanges.length === 0 ? '<div class="empty">No requests to display</div>' : `
      <div class="list-view">
        ${this._exchanges.map((e, t) => this.renderExchangeRow(e, t)).join("")}
      </div>
    `;
  }
  renderExchangeRow(e, t) {
    var g;
    const { request: r, response: o, timing: s } = e, a = this._expandedRows.has(t), i = (r == null ? void 0 : r.method) || "?", d = (r == null ? void 0 : r.url) || "", c = (o == null ? void 0 : o.status) || 0, l = (o == null ? void 0 : o.statusText) || "", f = (s == null ? void 0 : s.duration) || 0, u = ((g = o == null ? void 0 : o.body) == null ? void 0 : g.length) || 0, m = this.formatSize(u), h = this.getStatusClass(c);
    if (e.resource) {
      const p = e.resource;
      return `
      <div class="exchange-row ${a ? "expanded" : ""}" data-index="${t}" data-initiator="${this.escapeHtml(p.initiatorType)}" data-cross-origin="${p.crossOrigin}">
        <div class="exchange-summary resource">
          ${this.renderRowChip(e)}
          <span class="url ${p.crossOrigin ? "cross-origin" : ""}" title="${this.escapeHtml(d)}">${this.escapeHtml(p.label)}</span>
          <span class="status ${h}">${c || "—"}</span>
          <span class="size" title="${this.escapeHtml(this.getResourceSizeTitle(p))}">${this.getResourceSizeLabel(p)}</span>
          <span class="duration">${f}ms</span>
          <button class="expand-btn" data-index="${t}">
            ${a ? "▼" : "▶"}
          </button>
        </div>
        ${a ? this.renderExchangeDetail(e) : ""}
      </div>
    `;
    }
    return `
      <div class="exchange-row ${a ? "expanded" : ""}" data-index="${t}">
        <div class="exchange-summary">
          <span class="method method-${i.toLowerCase()}">${i}</span>
          <span class="url" title="${this.escapeHtml(d)}">${this.escapeHtml(d)}</span>
          <span class="status ${h}">${c} ${l}</span>
          <span class="size">${m}</span>
          <span class="duration">${f}ms</span>
          <button class="expand-btn" data-index="${t}">
            ${a ? "▼" : "▶"}
          </button>
        </div>
        ${a ? this.renderExchangeDetail(e) : ""}
      </div>
    `;
  }
  renderExchangeDetail(e) {
    if (e.resource)
      return `
      <div class="exchange-detail">
        ${this.renderResourceFacts(e)}
      </div>
    `;
    const { request: t, response: r } = e, o = `detail-${Math.random().toString(36).substr(2, 9)}`;
    return setTimeout(() => {
      const s = this.shadowRoot.getElementById(o);
      if (s) {
        const a = document.createElement("http-transaction");
        a.data = { request: t, response: r };
        const i = this.getAttribute("theme");
        i && a.setAttribute("theme", i), s.appendChild(a);
      }
    }, 0), `
      <div class="exchange-detail">
        <div id="${o}" class="detail-console-container"></div>
      </div>
    `;
  }
  renderDurationView() {
    if (this._exchanges.length === 0)
      return '<div class="empty">No requests to display</div>';
    const e = this.getMaxDuration();
    return e === 0 ? '<div class="empty">No duration data available</div>' : `
      <div class="duration-view">
        <div class="duration-header">
          <div class="request-info-header">Request</div>
          <div class="duration-scale-header">Duration</div>
        </div>
        <div class="duration-rows">
          ${this._exchanges.map((t, r) => this.renderDurationRow(t, r, e)).join("")}
        </div>
      </div>
    `;
  }
  renderDurationRow(e, t, r) {
    const { request: o, response: s, timing: a } = e, i = (o == null ? void 0 : o.method) || "?", d = (o == null ? void 0 : o.url) || "", c = (s == null ? void 0 : s.status) || 0, l = (s == null ? void 0 : s.statusText) || "", f = (a == null ? void 0 : a.duration) || 0, u = this._expandedRows.has(t), m = this.getStatusClass(c), h = m || (e.resource ? "status-unknown" : ""), g = e.resource ? this.getResourceTooltip(e) : `${i} ${d}
Status: ${c} ${l}
Duration: ${f}ms`;
    return `
      <div class="duration-row-container ${u ? "expanded" : ""}"${this.renderResourceAttributes(e)}>
        <div class="duration-row">
          <div class="request-info">
            ${this.renderRowChip(e)}
            ${this.renderShortUrl(e)}
            <span class="status ${m}">${c || (e.resource ? "—" : c)}</span>
            <button class="expand-btn" data-index="${t}">
              ${u ? "▼" : "▶"}
            </button>
          </div>
          <div class="duration-bar-area">
            <div class="duration-bar ${h}"
                 title="${this.escapeHtml(g)}"
                 style="--duration: ${f}; --max-duration: ${r}">
              <span class="duration-label">${f}ms</span>
            </div>
          </div>
        </div>
        ${u ? this.renderExchangeDetail(e) : ""}
      </div>
    `;
  }
  getMaxDuration() {
    if (this._exchanges.length === 0) return 0;
    const e = this._exchanges.map((t) => {
      var r;
      return ((r = t.timing) == null ? void 0 : r.duration) || 0;
    }).filter((t) => t > 0);
    return e.length > 0 ? Math.max(...e) : 0;
  }
  renderWaterfallView() {
    if (this._exchanges.length === 0)
      return '<div class="empty">No requests to display</div>';
    const e = this._exchanges.filter((a) => this.hasTiming(a));
    if (e.length === 0)
      return '<div class="empty">No timing data available for waterfall view</div>';
    const t = Math.min(...e.map((a) => a.timing.startTime)), r = Math.max(...e.map((a) => a.timing.endTime)), o = Math.max(r - t, 1), s = e.some((a) => a.timing.phases);
    return `
      <div class="waterfall-view">
        ${this.renderTimelineHeader(o)}
        ${s ? this.renderPhaseLegend() : ""}
        <div class="waterfall-rows">
          ${this._exchanges.map(
      (a, i) => this.renderWaterfallRow(a, i, t, o)
    ).join("")}
        </div>
      </div>
    `;
  }
  renderTimelineHeader(e) {
    const t = [], r = [0, 0.25, 0.5, 0.75, 1];
    for (let o = 0; o < r.length; o++) {
      const s = Math.round(e * r[o]), a = r[o] === 1 ? "left: auto; right: 16px;" : `left: calc(16px + (100% - 32px) * ${r[o]});`;
      t.push(`<span class="time-marker" style="${a}">${s}ms</span>`);
    }
    return `
      <div class="timeline-header">
        <div class="request-info-header">Request</div>
        <div class="timeline-scale">${t.join("")}</div>
      </div>
    `;
  }
  renderWaterfallRow(e, t, r, o) {
    const { request: s, response: a, timing: i } = e, d = (s == null ? void 0 : s.method) || "?", c = (s == null ? void 0 : s.url) || "", l = (a == null ? void 0 : a.status) || 0, f = (a == null ? void 0 : a.statusText) || "", u = (i == null ? void 0 : i.duration) || 0, m = (i == null ? void 0 : i.startTime) || 0, h = this._expandedRows.has(t), g = m - r, p = this.getStatusClass(l), b = p || (e.resource ? "status-unknown" : ""), y = e.resource ? this.getResourceTooltip(e) : `${d} ${c}
Status: ${l} ${f}
Start: ${g}ms
Duration: ${u}ms`, x = this.renderPhases(e);
    return `
      <div class="waterfall-row-container ${h ? "expanded" : ""}"${this.renderResourceAttributes(e)}>
        <div class="waterfall-row">
          <div class="request-info">
            ${this.renderRowChip(e)}
            ${this.renderShortUrl(e)}
            <span class="status ${p}">${l || (e.resource ? "—" : l)}</span>
            <button class="expand-btn" data-index="${t}">
              ${h ? "▼" : "▶"}
            </button>
          </div>
          <div class="timing-area">
            <div class="timing-bar ${b} ${x ? "has-phases" : ""}"
                 title="${this.escapeHtml(y)}"
                 style="--start-offset: ${g}; --duration: ${u}; --total-duration: ${o}">
              ${x}
              <span class="duration-label">${u}ms</span>
            </div>
          </div>
        </div>
        ${h ? this.renderExchangeDetail(e) : ""}
      </div>
    `;
  }
  // ===== Resource Timing rendering =====
  /**
   * The chip at the start of a row: the HTTP method, or for a resource
   * exchange, what asked for it
   */
  renderRowChip(e) {
    var s;
    if (!e.resource) {
      const a = ((s = e.request) == null ? void 0 : s.method) || "?";
      return `<span class="method method-${a.toLowerCase()}">${a}</span>`;
    }
    const t = e.resource.initiatorType, [r, o] = k[t] || [t, `Requested by: ${t}`];
    return `<span class="method initiator" title="${this.escapeHtml(o)}">${this.escapeHtml(r)}</span>`;
  }
  /**
   * The shortened URL for duration and waterfall rows. Resource exchanges
   * show a path, or a host and path when the request left the page's origin.
   */
  renderShortUrl(e) {
    var s;
    const t = ((s = e.request) == null ? void 0 : s.url) || "";
    if (!e.resource)
      return `<span class="url-short" title="${this.escapeHtml(t)}">${this.escapeHtml(this.shortenUrl(t))}</span>`;
    const { label: r, crossOrigin: o } = e.resource;
    return `<span class="url-short ${o ? "cross-origin" : ""}" title="${this.escapeHtml(t)}">${this.escapeHtml(V(r, 28))}</span>`;
  }
  /** Data attributes that let a page style or select resource rows */
  renderResourceAttributes(e) {
    if (!e.resource) return "";
    const { initiatorType: t, crossOrigin: r } = e.resource;
    return ` data-initiator="${this.escapeHtml(t)}" data-cross-origin="${r}"`;
  }
  /** Coloured segments inside a waterfall bar, one per timing phase */
  renderPhases(e) {
    var o;
    const t = (o = e.timing) == null ? void 0 : o.phases;
    if (!t) return "";
    const r = T.filter(([s]) => t[s] > 0);
    return r.length === 0 ? "" : `<span class="phases" aria-hidden="true">${r.map(([s]) => `<span class="phase phase-${s}" style="--ms: ${t[s]}"></span>`).join("")}</span>`;
  }
  renderPhaseLegend() {
    return `
      <div class="phase-legend">
        ${T.map(([e, t]) => `<span><i class="phase-${e}"></i>${t}</span>`).join("")}
      </div>
    `;
  }
  /** One line of phase timings, in the order they happen */
  getPhaseText(e) {
    return T.map(([t, r]) => `${r} ${Math.round(e[t])}`).join(" · ") + " (ms)";
  }
  getResourceSizeLabel(e) {
    return e.opaque ? "hidden" : e.cache === "cache" ? "cache" : e.cache === "revalidated" ? "revalidated" : this.formatBytes(e.transferSize);
  }
  getResourceSizeTitle(e) {
    return e.opaque ? "Cross-origin response without Timing-Allow-Origin: sizes are not exposed" : `On the wire: ${this.formatBytes(e.transferSize)}
${this.getBodyText(e)}`;
  }
  /** Body size as sent and as decoded, with the saving when it was compressed */
  getBodyText(e) {
    const { encodedBodySize: t, decodedBodySize: r } = e;
    let o = `Body: ${this.formatBytes(t)} sent, ${this.formatBytes(r)} decoded`;
    return t > 0 && t < r && (o += ` (${Math.round((1 - t / r) * 100)}% smaller)`), o;
  }
  getResourceTooltip(e) {
    const { request: t, response: r, timing: o, resource: s } = e, [, a] = k[s.initiatorType] || ["", s.initiatorType], i = [
      t.url,
      a,
      `Status: ${r.status || "not reported"}${t.httpVersion ? ` over ${t.httpVersion}` : ""}`,
      `Start: ${o.startTime}ms, duration: ${o.duration}ms`
    ];
    return s.opaque ? i.push("Sizes and phases hidden: cross-origin without Timing-Allow-Origin") : (i.push(`On the wire: ${this.formatBytes(s.transferSize)}`), i.push(this.getBodyText(s)), i.push(`Cache: ${j[s.cache]}`), o.phases && i.push(this.getPhaseText(o.phases))), i.join(`
`);
  }
  /** The expanded detail for a resource exchange: what the browser reports */
  renderResourceFacts(e) {
    const { request: t, response: r, timing: o, resource: s } = e, [, a] = k[s.initiatorType] || ["", s.initiatorType], i = "hidden: cross-origin response without Timing-Allow-Origin", d = [
      ["URL", t.url],
      ["Requested by", a],
      ["Origin", s.crossOrigin ? "cross-origin" : "same origin as the page"],
      ["Protocol", t.httpVersion || "not reported"],
      ["Status", r.status || "not reported"]
    ];
    return s.contentType && d.push(["Content type", s.contentType]), s.contentEncoding && d.push(["Content encoding", s.contentEncoding]), d.push(
      [
        "On the wire",
        s.opaque ? i : `${this.formatBytes(s.transferSize)} (headers and body)`
      ],
      ["Body", s.opaque ? i : this.getBodyText(s).replace("Body: ", "")],
      ["Cache", j[s.cache]]
    ), s.renderBlocking && d.push(["Render blocking", s.renderBlocking]), d.push(
      ["Timing", `starts at ${o.startTime} ms, takes ${o.duration} ms`],
      ["Phases", o.phases ? this.getPhaseText(o.phases) : i]
    ), `
      <dl class="resource-facts">
        ${d.map(([c, l]) => `<dt>${c}</dt><dd>${this.escapeHtml(String(l))}</dd>`).join("")}
      </dl>
      <p class="resource-note">From the browser's Resource Timing data, which reports no headers or bodies. The Network panel in DevTools shows those.</p>
    `;
  }
  /** Request count, plus bytes and cross-origin count when resources are listed */
  getSummaryText() {
    const e = this._exchanges.length;
    let t = `${e} request${e !== 1 ? "s" : ""}`;
    const r = this._exchanges.filter((o) => o.resource).map((o) => o.resource);
    if (r.length > 0) {
      const o = r.reduce((a, i) => a + i.transferSize, 0), s = r.filter((a) => a.crossOrigin).length;
      t += ` · ${this.formatBytes(o)} transferred`, s > 0 && (t += ` · ${s} cross-origin`);
    }
    return t;
  }
  /** Byte count with one decimal for small kilobyte values */
  formatBytes(e) {
    if (e < 1024) return `${e} B`;
    const t = e / 1024;
    return t < 1024 ? `${t < 100 ? t.toFixed(1) : Math.round(t)} KB` : `${(t / 1024).toFixed(1)} MB`;
  }
  calculateTimeInterval(e) {
    return e <= 500 ? 100 : e <= 1e3 ? 200 : e <= 5e3 ? 500 : 1e3;
  }
  shortenUrl(e) {
    return e.length > 40 ? e.substring(0, 37) + "..." : e;
  }
  getStatusClass(e) {
    return e >= 200 && e < 300 ? "status-success" : e >= 300 && e < 400 ? "status-redirect" : e >= 400 && e < 500 ? "status-client-error" : e >= 500 ? "status-server-error" : "";
  }
  formatSize(e) {
    return e === 0 ? "0 B" : e < 1024 ? e + " B" : e < 1024 * 1024 ? Math.round(e / 1024) + " KB" : Math.round(e / (1024 * 1024)) + " MB";
  }
  escapeHtml(e) {
    const t = document.createElement("div");
    return t.textContent = e, t.innerHTML;
  }
  /**
   * Update just the request count without re-rendering toolbar
   */
  updateRequestCount() {
    const e = this.shadowRoot.querySelector(".info");
    e && (e.textContent = this.getSummaryText());
  }
  attachToolbarEventListeners() {
    this.shadowRoot.querySelectorAll(".view-btn").forEach((o) => {
      o.addEventListener("click", () => {
        this.view = o.dataset.view;
      });
    });
    const t = this.shadowRoot.querySelector(".pause-btn");
    t && t.addEventListener("click", () => {
      this.togglePause();
    });
    const r = this.shadowRoot.querySelector(".clear-btn");
    r && r.addEventListener("click", () => {
      confirm("Clear all captured requests?") && this.clearExchanges();
    });
  }
  attachViewEventListeners() {
    this.shadowRoot.querySelectorAll(".expand-btn").forEach((t) => {
      t.addEventListener("click", (r) => {
        r.stopPropagation();
        const o = parseInt(t.dataset.index, 10);
        this.toggleRow(o);
      });
    });
  }
  // ===== Explorer (Request Builder) Methods =====
  /**
   * Toggle the explorer panel open/closed
   */
  toggleExplorer() {
    this._explorerOpen = !this._explorerOpen, this.renderExplorer();
  }
  /**
   * Render the explorer/request builder panel
   */
  renderExplorer() {
    if (this._explorerContainer) {
      if (this._resources && !this.hasAttribute("explorer")) {
        this._explorerContainer.innerHTML = "";
        return;
      }
      this._explorerContainer.innerHTML = `
      <div class="explorer-panel">
        <button class="explorer-toggle ${this._explorerOpen ? "active" : ""}">
          ${this._explorerOpen ? "▼" : "▶"} Request Builder
        </button>
        <div class="explorer-content ${this._explorerOpen ? "visible" : ""}">
          ${this.renderExplorerContent()}
        </div>
      </div>
    `, this.attachExplorerEventListeners();
    }
  }
  /**
   * Render the explorer form content
   * @returns {string} HTML content
   */
  renderExplorerContent() {
    const e = this._explorerStatus ? `<div class="explorer-status ${this._explorerStatus.type}">${this._explorerStatus.message}</div>` : "";
    return `
      <div class="request-builder">
        <div class="request-line-builder">
          <select class="method-select" id="explorer-method">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
            <option value="HEAD">HEAD</option>
            <option value="OPTIONS">OPTIONS</option>
          </select>
          <input type="text" class="url-input" id="explorer-url" placeholder="https://api.example.com/endpoint" />
          <button class="send-button" id="explorer-send" ${this._explorerLoading ? "disabled" : ""}>
            ${this._explorerLoading ? "Sending..." : "Send"}
          </button>
        </div>

        <div class="headers-section">
          <div class="section-label">Headers</div>
          <div class="headers-list" id="explorer-headers">
            ${this._explorerHeaders.map((t, r) => this.renderHeaderRow(t, r)).join("")}
          </div>
          <button class="add-header-btn" id="explorer-add-header">+ Add Header</button>
        </div>

        <div class="body-section">
          <div class="section-label">Request Body</div>
          <textarea class="body-textarea" id="explorer-body" placeholder="Enter request body (JSON, XML, etc.)"></textarea>
        </div>

        ${e}
      </div>
    `;
  }
  /**
   * Render a single header row
   * @param {Object} header - Header object with name and value
   * @param {number} index - Row index
   * @returns {string} HTML content
   */
  renderHeaderRow(e, t) {
    return `
      <div class="header-row" data-index="${t}">
        <input type="text" class="header-input name" placeholder="Header name" value="${this.escapeHtml(e.name)}" data-index="${t}" />
        <input type="text" class="header-input value" placeholder="Header value" value="${this.escapeHtml(e.value)}" data-index="${t}" />
        <button class="remove-header-btn" data-index="${t}">×</button>
      </div>
    `;
  }
  /**
   * Attach event listeners for the explorer panel
   */
  attachExplorerEventListeners() {
    const e = this.shadowRoot.querySelector(".explorer-toggle");
    e && e.addEventListener("click", () => this.toggleExplorer());
    const t = this.shadowRoot.querySelector("#explorer-send");
    t && t.addEventListener("click", () => this.sendExplorerRequest());
    const r = this.shadowRoot.querySelector("#explorer-add-header");
    r && r.addEventListener("click", () => this.addExplorerHeader());
    const o = this.shadowRoot.querySelector("#explorer-headers");
    o && (o.addEventListener("input", (s) => {
      s.target.classList.contains("header-input") && this.updateExplorerHeader(s.target);
    }), o.addEventListener("click", (s) => {
      s.target.classList.contains("remove-header-btn") && this.removeExplorerHeader(parseInt(s.target.dataset.index, 10));
    }));
  }
  /**
   * Add a new header row to the explorer
   */
  addExplorerHeader() {
    this._explorerHeaders.push({ name: "", value: "" }), this.renderExplorer();
  }
  /**
   * Update a header value in the explorer
   * @param {HTMLInputElement} input - Input element
   */
  updateExplorerHeader(e) {
    const t = parseInt(e.dataset.index, 10), r = e.classList.contains("name") ? "name" : "value";
    this._explorerHeaders[t][r] = e.value;
  }
  /**
   * Remove a header row from the explorer
   * @param {number} index - Header index
   */
  removeExplorerHeader(e) {
    this._explorerHeaders.splice(e, 1), this._explorerHeaders.length === 0 && this._explorerHeaders.push({ name: "", value: "" }), this.renderExplorer();
  }
  /**
   * Send the request built in the explorer
   */
  async sendExplorerRequest() {
    const e = this.shadowRoot.querySelector("#explorer-method"), t = this.shadowRoot.querySelector("#explorer-url"), r = this.shadowRoot.querySelector("#explorer-body"), o = e.value, s = t.value.trim(), a = r.value.trim();
    if (!s) {
      this._explorerStatus = { type: "error", message: "Please enter a URL" }, this.renderExplorer();
      return;
    }
    try {
      new URL(s);
    } catch {
      this._explorerStatus = { type: "error", message: "Invalid URL format" }, this.renderExplorer();
      return;
    }
    const i = {};
    this._explorerHeaders.forEach((c) => {
      c.name && c.value && (i[c.name] = c.value);
    }), this._explorerLoading = !0, this._explorerStatus = { type: "loading", message: "Sending request..." }, this.renderExplorer();
    const d = performance.now();
    try {
      const c = { method: o, headers: i };
      ["POST", "PUT", "PATCH"].includes(o) && a && (c.body = a), this.dispatchEvent(
        new CustomEvent("request-sent", {
          detail: { method: o, url: s, headers: i, body: a }
        })
      );
      const l = await fetch(s, c), f = performance.now(), u = Math.round(f - d), m = {};
      l.headers.forEach((b, y) => {
        m[y] = b;
      });
      let h = null;
      const g = l.headers.get("content-type") || "";
      try {
        if (g.includes("application/json")) {
          const b = await l.json();
          h = JSON.stringify(b, null, 2);
        } else
          h = await l.text();
      } catch {
        h = "[Could not read response body]";
      }
      const p = {
        request: {
          method: o,
          url: s,
          httpVersion: "HTTP/1.1",
          headers: i,
          body: a || null
        },
        response: {
          status: l.status,
          statusText: l.statusText,
          httpVersion: "HTTP/1.1",
          headers: m,
          body: h
        },
        timing: {
          startTime: d,
          endTime: f,
          duration: u
        }
      };
      this._exchanges.unshift(p), this._exchanges.length > this._maxEntries && (this._exchanges = this._exchanges.slice(0, this._maxEntries)), this._explorerLoading = !1, this._explorerStatus = {
        type: "success",
        message: `Request completed in ${u}ms - ${l.status} ${l.statusText}`
      }, this.dispatchEvent(
        new CustomEvent("response-received", {
          detail: p
        })
      ), this.renderExplorer(), this.renderView(), this.updateRequestCount();
    } catch (c) {
      const l = performance.now(), f = Math.round(l - d);
      this._explorerLoading = !1, this._explorerStatus = {
        type: "error",
        message: `Request failed: ${c.message}`
      };
      const u = {
        request: {
          method: o,
          url: s,
          httpVersion: "HTTP/1.1",
          headers: i,
          body: a || null
        },
        response: {
          status: 0,
          statusText: "Network Error",
          httpVersion: "HTTP/1.1",
          headers: {},
          body: JSON.stringify({ error: c.message })
        },
        timing: {
          startTime: d,
          endTime: l,
          duration: f
        }
      };
      this._exchanges.unshift(u), this.dispatchEvent(
        new CustomEvent("request-error", {
          detail: { error: c.message }
        })
      ), this.renderExplorer(), this.renderView(), this.updateRequestCount();
    }
  }
}
customElements.define("http-waterfall", Y);
export {
  B as HTTPInterceptor,
  z as HTTPMessageElement,
  M as HTTPRequestElement,
  N as HTTPResponseElement,
  A as HTTPTransactionElement,
  Y as HTTPWaterfallElement,
  O as HTTP_MESSAGE_STYLES,
  _ as ResourceTimingSource,
  W as describeResourceUrl,
  Z as httpInterceptor,
  I as matchesResourceFilter,
  U as resourceCacheState,
  X as resourceEntryToExchange
};
//# sourceMappingURL=http-component.js.map
