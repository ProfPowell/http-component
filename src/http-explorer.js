import './http-console.js';

/**
 * Inline CSS styles for http-explorer component
 * @const {string}
 */
const HTTP_EXPLORER_STYLES = `
:host {
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --primary-color: #2563eb;
  --border-color: #ddd;
  --bg-primary: #f5f5f5;
  --bg-secondary: white;
  --text-primary: #1f2937;
  --text-secondary: #64748b;
  --error-color: #dc2626;
  --success-color: #16a34a;
}

:host([theme="dark"]) {
  --primary-color: #60a5fa;
  --border-color: #374151;
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f3f4f6;
  --text-secondary: #9ca3af;
  --error-color: #f87171;
  --success-color: #4ade80;
}

.explorer-container {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.explorer-header {
  background: var(--primary-color);
  color: white;
  padding: 16px 20px;
  font-size: 18px;
  font-weight: 600;
}

.request-section {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

.request-line {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

.method-select {
  padding: 10px 12px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  min-width: 100px;
}

.method-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.url-input {
  flex: 1;
  padding: 10px 12px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Courier New', monospace;
}

.url-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.send-button {
  padding: 10px 24px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-button:hover {
  opacity: 0.9;
}

.send-button:active {
  opacity: 0.8;
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.headers-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.header-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.header-input {
  padding: 8px 10px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

.header-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.header-input.name {
  flex: 1;
  min-width: 150px;
}

.header-input.value {
  flex: 2;
  min-width: 200px;
}

.remove-button {
  padding: 6px 10px;
  background: var(--error-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.remove-button:hover {
  opacity: 0.9;
}

.add-header-button {
  padding: 8px 16px;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 2px dashed var(--border-color);
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-header-button:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.body-section {
  margin-top: 20px;
}

.body-textarea {
  width: 100%;
  min-height: 150px;
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 13px;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  resize: vertical;
  box-sizing: border-box;
}

.body-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.response-section {
  padding: 20px;
  background: var(--bg-primary);
}

.status-message {
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}

.status-message.success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.status-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.status-message.loading {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #3b82f6;
}

:host([theme="dark"]) .status-message.success {
  background: #064e3b;
  color: #6ee7b7;
}

:host([theme="dark"]) .status-message.error {
  background: #7f1d1d;
  color: #fca5a5;
}

:host([theme="dark"]) .status-message.loading {
  background: #1e3a8a;
  color: #93c5fd;
}

.empty-response {
  color: var(--text-secondary);
  text-align: center;
  padding: 40px 20px;
  font-style: italic;
}
`;

/**
 * @typedef {Object} HTTPExplorerRequest
 * @property {string} method - HTTP method
 * @property {string} url - Request URL
 * @property {Object.<string, string>} headers - Request headers
 * @property {string} body - Request body
 */

/**
 * HTTPExplorerElement - Interactive HTTP request builder component
 *
 * @class
 * @extends HTMLElement
 *
 * @example
 * <http-explorer></http-explorer>
 *
 * @example
 * // With default URL
 * <http-explorer url="https://api.example.com/users"></http-explorer>
 *
 * @fires http-explorer#request-sent - Fired when a request is sent
 * @fires http-explorer#response-received - Fired when a response is received
 * @fires http-explorer#request-error - Fired when a request fails
 */
class HTTPExplorerElement extends HTMLElement {
  /**
   * Creates an instance of HTTPExplorerElement
   * @constructor
   */
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._headers = [{ name: '', value: '' }];
    this._responseData = null;
    this._isLoading = false;
    this._statusMessage = null;
  }

  /**
   * Observed attributes for automatic re-rendering
   * @static
   * @returns {string[]} Array of observed attribute names
   */
  static get observedAttributes() {
    return ['url', 'method', 'theme'];
  }

  /**
   * Called when element is added to the DOM
   * @memberof HTTPExplorerElement
   */
  connectedCallback() {
    this.render();
    this.attachEventListeners();
  }

  /**
   * Called when observed attributes change
   * @param {string} name - Attribute name
   * @param {string} oldValue - Previous value
   * @param {string} newValue - New value
   * @memberof HTTPExplorerElement
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  /**
   * Render the component's shadow DOM
   * @memberof HTTPExplorerElement
   * @private
   */
  render() {
    const method = this.getAttribute('method') || 'GET';
    const url = this.getAttribute('url') || '';

    this.shadowRoot.innerHTML = `
      <style>${HTTP_EXPLORER_STYLES}</style>
      <div class="explorer-container">
        <div class="explorer-header">HTTP Request Explorer</div>

        <div class="request-section">
          <div class="request-line">
            <select class="method-select" id="method-select">
              <option value="GET" ${method === 'GET' ? 'selected' : ''}>GET</option>
              <option value="POST" ${method === 'POST' ? 'selected' : ''}>POST</option>
              <option value="PUT" ${method === 'PUT' ? 'selected' : ''}>PUT</option>
              <option value="PATCH" ${method === 'PATCH' ? 'selected' : ''}>PATCH</option>
              <option value="DELETE" ${method === 'DELETE' ? 'selected' : ''}>DELETE</option>
              <option value="HEAD" ${method === 'HEAD' ? 'selected' : ''}>HEAD</option>
              <option value="OPTIONS" ${method === 'OPTIONS' ? 'selected' : ''}>OPTIONS</option>
            </select>
            <input
              type="text"
              class="url-input"
              id="url-input"
              placeholder="https://api.example.com/endpoint"
              value="${url}"
            />
            <button class="send-button" id="send-button">Send</button>
          </div>

          <div class="headers-section">
            <div class="section-label">Headers</div>
            <div class="headers-list" id="headers-list">
              ${this.renderHeaders()}
            </div>
            <button class="add-header-button" id="add-header-button">+ Add Header</button>
          </div>

          <div class="body-section">
            <div class="section-label">Request Body</div>
            <textarea
              class="body-textarea"
              id="body-textarea"
              placeholder="Enter request body (JSON, XML, etc.)"
            ></textarea>
          </div>
        </div>

        <div class="response-section">
          <div class="section-label">Response</div>
          ${this.renderStatusMessage()}
          ${this.renderResponse()}
        </div>
      </div>
    `;
  }

  /**
   * Render headers inputs
   * @returns {string} HTML for headers inputs
   * @memberof HTTPExplorerElement
   * @private
   */
  renderHeaders() {
    return this._headers
      .map(
        (header, index) => `
      <div class="header-row" data-index="${index}">
        <input
          type="text"
          class="header-input name"
          placeholder="Header name"
          value="${header.name}"
          data-index="${index}"
        />
        <input
          type="text"
          class="header-input value"
          placeholder="Header value"
          value="${header.value}"
          data-index="${index}"
        />
        <button class="remove-button" data-index="${index}">×</button>
      </div>
    `
      )
      .join('');
  }

  /**
   * Render status message
   * @returns {string} HTML for status message
   * @memberof HTTPExplorerElement
   * @private
   */
  renderStatusMessage() {
    if (!this._statusMessage) return '';

    const { type, message } = this._statusMessage;
    return `<div class="status-message ${type}">${message}</div>`;
  }

  /**
   * Render response section
   * @returns {string} HTML for response section
   * @memberof HTTPExplorerElement
   * @private
   */
  renderResponse() {
    if (this._isLoading) {
      return '<div class="empty-response">Sending request...</div>';
    }

    if (!this._responseData) {
      return '<div class="empty-response">Send a request to see the response here</div>';
    }

    return '<http-console id="response-console"></http-console>';
  }

  /**
   * Attach event listeners
   * @memberof HTTPExplorerElement
   * @private
   */
  attachEventListeners() {
    const sendButton = this.shadowRoot.getElementById('send-button');
    const addHeaderButton = this.shadowRoot.getElementById('add-header-button');
    const headersList = this.shadowRoot.getElementById('headers-list');

    sendButton.addEventListener('click', () => this.sendRequest());

    addHeaderButton.addEventListener('click', () => this.addHeader());

    headersList.addEventListener('input', e => {
      if (e.target.classList.contains('header-input')) {
        this.updateHeader(e.target);
      }
    });

    headersList.addEventListener('click', e => {
      if (e.target.classList.contains('remove-button')) {
        this.removeHeader(parseInt(e.target.dataset.index));
      }
    });
  }

  /**
   * Add a new header row
   * @memberof HTTPExplorerElement
   * @private
   */
  addHeader() {
    this._headers.push({ name: '', value: '' });
    this.render();
    this.attachEventListeners();
  }

  /**
   * Update a header value
   * @param {HTMLInputElement} input - Input element
   * @memberof HTTPExplorerElement
   * @private
   */
  updateHeader(input) {
    const index = parseInt(input.dataset.index);
    const field = input.classList.contains('name') ? 'name' : 'value';
    this._headers[index][field] = input.value;
  }

  /**
   * Remove a header row
   * @param {number} index - Header index
   * @memberof HTTPExplorerElement
   * @private
   */
  removeHeader(index) {
    this._headers.splice(index, 1);
    if (this._headers.length === 0) {
      this._headers.push({ name: '', value: '' });
    }
    this.render();
    this.attachEventListeners();
  }

  /**
   * Send the HTTP request
   * @memberof HTTPExplorerElement
   * @private
   */
  async sendRequest() {
    const method = this.shadowRoot.getElementById('method-select').value;
    const url = this.shadowRoot.getElementById('url-input').value.trim();
    const bodyText = this.shadowRoot.getElementById('body-textarea').value.trim();

    // Validation
    if (!url) {
      this._statusMessage = { type: 'error', message: 'Please enter a URL' };
      this.render();
      this.attachEventListeners();
      return;
    }

    try {
      new URL(url);
    } catch {
      this._statusMessage = { type: 'error', message: 'Invalid URL format' };
      this.render();
      this.attachEventListeners();
      return;
    }

    // Build headers object
    const headers = {};
    this._headers.forEach(header => {
      if (header.name && header.value) {
        headers[header.name] = header.value;
      }
    });

    // Set loading state
    this._isLoading = true;
    this._statusMessage = { type: 'loading', message: 'Sending request...' };
    this._responseData = null;
    this.render();
    this.attachEventListeners();

    const startTime = Date.now();

    try {
      // Build fetch options
      const options = {
        method,
        headers,
      };

      // Add body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(method) && bodyText) {
        options.body = bodyText;
      }

      // Fire request-sent event
      this.dispatchEvent(
        new CustomEvent('request-sent', {
          detail: { method, url, headers, body: bodyText },
        })
      );

      // Send request
      const response = await fetch(url, options);
      const duration = Date.now() - startTime;

      // Extract response data
      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let responseBody = null;
      const contentType = response.headers.get('content-type') || '';

      try {
        if (contentType.includes('application/json')) {
          const json = await response.json();
          responseBody = JSON.stringify(json, null, 2);
        } else {
          responseBody = await response.text();
        }
      } catch {
        responseBody = '[Could not read response body]';
      }

      // Store response data
      this._responseData = {
        request: {
          method,
          url,
          headers,
          body: bodyText || null,
        },
        response: {
          status: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          body: responseBody,
        },
      };

      this._isLoading = false;
      this._statusMessage = {
        type: 'success',
        message: `Request completed in ${duration}ms - ${response.status} ${response.statusText}`,
      };

      // Fire response-received event
      this.dispatchEvent(
        new CustomEvent('response-received', {
          detail: this._responseData,
        })
      );

      this.render();
      this.attachEventListeners();

      // Update http-console with response data
      const responseConsole = this.shadowRoot.getElementById('response-console');
      if (responseConsole) {
        responseConsole.data = this._responseData;
      }
    } catch (error) {
      this._isLoading = false;
      this._statusMessage = {
        type: 'error',
        message: `Request failed: ${error.message}`,
      };
      this._responseData = null;

      // Fire request-error event
      this.dispatchEvent(
        new CustomEvent('request-error', {
          detail: { error: error.message },
        })
      );

      this.render();
      this.attachEventListeners();
    }
  }
}

// Register the custom element
customElements.define('http-explorer', HTTPExplorerElement);
