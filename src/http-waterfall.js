import { HTTPInterceptor } from './http-interceptor.js';
import './http-console.js';

/**
 * Inline CSS styles for http-waterfall component
 * @const {string}
 */
const HTTP_WATERFALL_STYLES = `/** HTTP Waterfall Component Styles */
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
`;

/**
 * @typedef {Object} HTTPTiming
 * @property {number} startTime - Request start timestamp (milliseconds)
 * @property {number} endTime - Request end timestamp (milliseconds)
 * @property {number} duration - Request duration (milliseconds)
 * @property {Object} [phases] - Optional detailed timing phases
 */

/**
 * @typedef {Object} HTTPExchangeWithTiming
 * @property {Object} request - HTTP request data
 * @property {Object} response - HTTP response data
 * @property {HTTPTiming} timing - Timing information
 */

/**
 * HTTPWaterfallElement - Web component for displaying multiple HTTP exchanges
 * Supports list, duration, and waterfall timeline views with live capture capability
 *
 * @class
 * @extends HTMLElement
 *
 * @example
 * // Static data display
 * const waterfall = document.querySelector('http-waterfall');
 * waterfall.exchanges = [
 *   {
 *     request: { method: 'GET', url: '/api/users' },
 *     response: { status: 200, statusText: 'OK' },
 *     timing: { startTime: 0, endTime: 87, duration: 87 }
 *   }
 * ];
 *
 * @example
 * // Live capture mode
 * <http-waterfall capture="true" filter="/api/*" theme="dark"></http-waterfall>
 */
class HTTPWaterfallElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._exchanges = [];
    this._view = 'duration'; // 'list', 'duration', or 'waterfall'
    this._expandedRows = new Set();
    this._capture = false;
    this._filter = null;
    this._maxEntries = 100;
    this._isPaused = false;
    this._interceptor = null;

    // Handle property shadowing like http-console
    if (this.hasOwnProperty('exchanges')) {
      const existingData = this.exchanges;
      delete this.exchanges;
      this.exchanges = existingData;
    }
  }

  static get observedAttributes() {
    return ['view', 'requests', 'capture', 'filter', 'max-entries', 'theme'];
  }

  /**
   * Called when element is added to the DOM
   * @memberof HTTPWaterfallElement
   */
  connectedCallback() {
    // Set smart default view if not explicitly set
    if (!this.hasAttribute('view')) {
      this._view = this.getSmartDefaultView();
    }

    // Create initial DOM structure
    this.shadowRoot.innerHTML = `
      <style>${HTTP_WATERFALL_STYLES}</style>
      <div class="http-waterfall">
        <div class="toolbar-container"></div>
        <div class="view-container"></div>
      </div>
    `;

    // Cache container references
    this._toolbarContainer = this.shadowRoot.querySelector('.toolbar-container');
    this._viewContainer = this.shadowRoot.querySelector('.view-container');

    // Initial render
    this.renderToolbar();
    this.renderView();
    this.updateTheme();

    // Start capturing if enabled
    if (this._capture) {
      this.startCapture();
    }
  }

  disconnectedCallback() {
    // Stop capturing when component is removed
    this.stopCapture();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'view') {
        this._view = newValue || 'list';
      } else if (name === 'requests') {
        try {
          this._exchanges = JSON.parse(newValue) || [];
        } catch (e) {
          console.error('Failed to parse requests:', e);
        }
      } else if (name === 'capture') {
        this._capture = newValue === 'true' || newValue === '';
        if (this._capture && this.isConnected) {
          this.startCapture();
        } else {
          this.stopCapture();
        }
      } else if (name === 'filter') {
        this._filter = newValue;
        if (this._interceptor) {
          this._interceptor.filter = newValue;
        }
      } else if (name === 'max-entries') {
        this._maxEntries = parseInt(newValue, 10) || 100;
      } else if (name === 'theme') {
        this.updateTheme();
        return; // Don't re-render for theme changes
      }
      this.render();
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

    // Also update any http-console children
    this.updateChildThemes();
  }

  /**
   * Update theme on child http-console elements
   */
  updateChildThemes() {
    const theme = this.getAttribute('theme');
    const consoles = this.shadowRoot.querySelectorAll('http-console');
    consoles.forEach(console => {
      console.setAttribute('theme', theme);
    });
  }

  /**
   * Set HTTP exchanges to display
   * @param {HTTPExchangeWithTiming[]} value - Array of HTTP exchanges with timing
   * @memberof HTTPWaterfallElement
   */
  set exchanges(value) {
    this._exchanges = Array.isArray(value) ? value : [];
    this.render();
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
  set view(value) {
    if (this._view !== value) {
      this._view = value;
      // Re-render both toolbar (to update active button) and view
      this.renderToolbar();
      this.renderView();
    }
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
    if (this._interceptor) return; // Already capturing

    this._interceptor = new HTTPInterceptor();
    this._interceptor.start((exchange) => {
      this.addCapturedExchange(exchange);
    }, {
      filter: this._filter
    });
  }

  /**
   * Stop capturing
   */
  stopCapture() {
    if (this._interceptor) {
      this._interceptor.stop();
      this._interceptor = null;
    }
  }

  /**
   * Pause/resume capturing
   */
  togglePause() {
    if (!this._interceptor) return;

    this._isPaused = !this._isPaused;
    if (this._isPaused) {
      this._interceptor.pause();
    } else {
      this._interceptor.resume();
    }
    // Only re-render toolbar to update pause button and indicator
    this.renderToolbar();
  }

  /**
   * Clear all captured exchanges
   */
  clearExchanges() {
    this._exchanges = [];
    this._expandedRows.clear();
    // Update view and request count
    this.renderView();
    this.updateRequestCount();
  }

  /**
   * Determine if requests are clustered (within 10 seconds of each other)
   */
  areRequestsClustered() {
    if (this._exchanges.length < 2) return false;

    const times = this._exchanges
      .map(e => e.timing?.startTime || 0)
      .filter(t => t > 0);

    if (times.length === 0) return false;

    const min = Math.min(...times);
    const max = Math.max(...times);

    // Clustered if all requests within 10 seconds
    return (max - min) < 10000;
  }

  /**
   * Get smart default view based on context
   */
  getSmartDefaultView() {
    // Live capture always defaults to duration (independent requests)
    if (this._capture) {
      return 'duration';
    }

    // Static data: waterfall if clustered, duration if dispersed
    if (this.areRequestsClustered()) {
      return 'waterfall';
    }

    return 'duration';
  }

  /**
   * Add a captured exchange
   */
  addCapturedExchange(exchange) {
    // Add to beginning of array (most recent first)
    this._exchanges.unshift(exchange);

    // Limit to max entries
    if (this._exchanges.length > this._maxEntries) {
      this._exchanges = this._exchanges.slice(0, this._maxEntries);
    }

    // Only update the view content, not the toolbar
    this.renderView();

    // Update just the request count in toolbar
    this.updateRequestCount();
  }

  toggleRow(index) {
    if (this._expandedRows.has(index)) {
      this._expandedRows.delete(index);
    } else {
      this._expandedRows.add(index);
    }
    // Only re-render the view content
    this.renderView();
  }

  render() {
    // Only render if connected
    if (!this._toolbarContainer || !this._viewContainer) return;

    this.renderToolbar();
    this.renderView();
  }

  renderView() {
    if (!this._viewContainer) return;

    let view;
    if (this._view === 'waterfall') {
      view = this.renderWaterfallView();
    } else if (this._view === 'duration') {
      view = this.renderDurationView();
    } else {
      view = this.renderListView();
    }

    this._viewContainer.innerHTML = view;

    // Attach event listeners for view (expand buttons)
    this.attachViewEventListeners();
  }

  renderToolbar() {
    if (!this._toolbarContainer) return;

    const captureControls = this._capture ? `
      <div class="capture-controls">
        <button class="control-btn pause-btn" title="${this._isPaused ? 'Resume' : 'Pause'}">
          ${this._isPaused ? '▶' : '⏸'}
        </button>
        <button class="control-btn clear-btn" title="Clear all">
          🗑
        </button>
        <span class="capture-indicator ${this._isPaused ? 'paused' : 'active'}">
          ${this._isPaused ? 'Paused' : 'Capturing'}
        </span>
      </div>
    ` : '';

    this._toolbarContainer.innerHTML = `
      <div class="toolbar">
        <div class="view-toggle">
          <button class="view-btn ${this._view === 'list' ? 'active' : ''}" data-view="list">List</button>
          <button class="view-btn ${this._view === 'duration' ? 'active' : ''}" data-view="duration">Duration</button>
          <button class="view-btn ${this._view === 'waterfall' ? 'active' : ''}" data-view="waterfall">Waterfall</button>
        </div>
        ${captureControls}
        <div class="info">
          ${this._exchanges.length} request${this._exchanges.length !== 1 ? 's' : ''}
        </div>
      </div>
    `;

    // Attach toolbar event listeners
    this.attachToolbarEventListeners();
  }

  renderListView() {
    if (this._exchanges.length === 0) {
      return '<div class="empty">No requests to display</div>';
    }

    return `
      <div class="list-view">
        ${this._exchanges.map((exchange, index) => this.renderExchangeRow(exchange, index)).join('')}
      </div>
    `;
  }

  renderExchangeRow(exchange, index) {
    const { request, response, timing } = exchange;
    const isExpanded = this._expandedRows.has(index);
    const method = request?.method || '?';
    const url = request?.url || '';
    const status = response?.status || 0;
    const statusText = response?.statusText || '';
    const duration = timing?.duration || 0;

    // Calculate response size (rough estimate from body length)
    const bodySize = response?.body?.length || 0;
    const size = this.formatSize(bodySize);

    const statusClass = this.getStatusClass(status);

    return `
      <div class="exchange-row ${isExpanded ? 'expanded' : ''}" data-index="${index}">
        <div class="exchange-summary">
          <span class="method method-${method.toLowerCase()}">${method}</span>
          <span class="url" title="${this.escapeHtml(url)}">${this.escapeHtml(url)}</span>
          <span class="status ${statusClass}">${status} ${statusText}</span>
          <span class="size">${size}</span>
          <span class="duration">${duration}ms</span>
          <button class="expand-btn" data-index="${index}">
            ${isExpanded ? '▼' : '▶'}
          </button>
        </div>
        ${isExpanded ? this.renderExchangeDetail(exchange) : ''}
      </div>
    `;
  }

  renderExchangeDetail(exchange) {
    const { request, response } = exchange;
    // Create a unique ID for this detail element
    const detailId = `detail-${Math.random().toString(36).substr(2, 9)}`;

    // Return placeholder that will be populated with http-console element
    setTimeout(() => {
      const detailElement = this.shadowRoot.getElementById(detailId);
      if (detailElement) {
        const consoleElement = document.createElement('http-console');
        consoleElement.data = { request, response };
        // Apply theme to child console
        const theme = this.getAttribute('theme');
        if (theme) {
          consoleElement.setAttribute('theme', theme);
        }
        detailElement.appendChild(consoleElement);
      }
    }, 0);

    return `
      <div class="exchange-detail">
        <div id="${detailId}" class="detail-console-container"></div>
      </div>
    `;
  }

  renderDurationView() {
    if (this._exchanges.length === 0) {
      return '<div class="empty">No requests to display</div>';
    }

    // Get max duration for scaling
    const maxDuration = this.getMaxDuration();

    if (maxDuration === 0) {
      return '<div class="empty">No duration data available</div>';
    }

    return `
      <div class="duration-view">
        <div class="duration-header">
          <div class="request-info-header">Request</div>
          <div class="duration-scale-header">Duration</div>
        </div>
        <div class="duration-rows">
          ${this._exchanges.map((exchange, index) =>
            this.renderDurationRow(exchange, index, maxDuration)
          ).join('')}
        </div>
      </div>
    `;
  }

  renderDurationRow(exchange, index, maxDuration) {
    const { request, response, timing } = exchange;
    const method = request?.method || '?';
    const url = request?.url || '';
    const status = response?.status || 0;
    const statusText = response?.statusText || '';
    const duration = timing?.duration || 0;
    const isExpanded = this._expandedRows.has(index);

    const statusClass = this.getStatusClass(status);
    const tooltip = `${method} ${url}\nStatus: ${status} ${statusText}\nDuration: ${duration}ms`;

    return `
      <div class="duration-row-container ${isExpanded ? 'expanded' : ''}">
        <div class="duration-row">
          <div class="request-info">
            <span class="method method-${method.toLowerCase()}">${method}</span>
            <span class="url-short" title="${this.escapeHtml(url)}">${this.escapeHtml(this.shortenUrl(url))}</span>
            <span class="status ${statusClass}">${status}</span>
            <button class="expand-btn" data-index="${index}">
              ${isExpanded ? '▼' : '▶'}
            </button>
          </div>
          <div class="duration-bar-area">
            <div class="duration-bar ${statusClass}"
                 title="${this.escapeHtml(tooltip)}"
                 style="--duration: ${duration}; --max-duration: ${maxDuration}">
              <span class="duration-label">${duration}ms</span>
            </div>
          </div>
        </div>
        ${isExpanded ? this.renderExchangeDetail(exchange) : ''}
      </div>
    `;
  }

  getMaxDuration() {
    if (this._exchanges.length === 0) return 0;

    const durations = this._exchanges
      .map(e => e.timing?.duration || 0)
      .filter(d => d > 0);

    return durations.length > 0 ? Math.max(...durations) : 0;
  }

  renderWaterfallView() {
    if (this._exchanges.length === 0) {
      return '<div class="empty">No requests to display</div>';
    }

    // Calculate timing metadata
    const startTimes = this._exchanges.map(e => e.timing?.startTime || 0).filter(t => t > 0);
    const endTimes = this._exchanges.map(e => e.timing?.endTime || 0).filter(t => t > 0);

    if (startTimes.length === 0) {
      return '<div class="empty">No timing data available for waterfall view</div>';
    }

    const baseTime = Math.min(...startTimes);
    const maxTime = Math.max(...endTimes);
    const totalDuration = maxTime - baseTime;

    return `
      <div class="waterfall-view">
        ${this.renderTimelineHeader(totalDuration)}
        <div class="waterfall-rows">
          ${this._exchanges.map((exchange, index) =>
            this.renderWaterfallRow(exchange, index, baseTime, totalDuration)
          ).join('')}
        </div>
      </div>
    `;
  }

  renderTimelineHeader(totalDuration) {
    // Create exactly 5 time markers evenly spaced across the timeline
    const markers = [];
    const positions = [0, 0.25, 0.5, 0.75, 1.0];

    for (let i = 0; i < positions.length; i++) {
      const time = Math.round(totalDuration * positions[i]);
      markers.push(`<span class="time-marker">${time}ms</span>`);
    }

    return `
      <div class="timeline-header">
        <div class="request-info-header">Request</div>
        <div class="timeline-scale">${markers.join('')}</div>
      </div>
    `;
  }

  renderWaterfallRow(exchange, index, baseTime, totalDuration) {
    const { request, response, timing } = exchange;
    const method = request?.method || '?';
    const url = request?.url || '';
    const status = response?.status || 0;
    const statusText = response?.statusText || '';
    const duration = timing?.duration || 0;
    const startTime = timing?.startTime || 0;
    const isExpanded = this._expandedRows.has(index);

    // Calculate offset from base time
    const offset = startTime - baseTime;
    const statusClass = this.getStatusClass(status);
    const tooltip = `${method} ${url}\nStatus: ${status} ${statusText}\nStart: ${offset}ms\nDuration: ${duration}ms`;

    return `
      <div class="waterfall-row-container ${isExpanded ? 'expanded' : ''}">
        <div class="waterfall-row">
          <div class="request-info">
            <span class="method method-${method.toLowerCase()}">${method}</span>
            <span class="url-short" title="${this.escapeHtml(url)}">${this.escapeHtml(this.shortenUrl(url))}</span>
            <span class="status ${statusClass}">${status}</span>
            <button class="expand-btn" data-index="${index}">
              ${isExpanded ? '▼' : '▶'}
            </button>
          </div>
          <div class="timing-area">
            <div class="timing-bar ${statusClass}"
                 title="${this.escapeHtml(tooltip)}"
                 style="--start-offset: ${offset}; --duration: ${duration}; --total-duration: ${totalDuration}">
              <span class="duration-label">${duration}ms</span>
            </div>
          </div>
        </div>
        ${isExpanded ? this.renderExchangeDetail(exchange) : ''}
      </div>
    `;
  }

  calculateTimeInterval(totalDuration) {
    // Choose appropriate interval based on total duration
    if (totalDuration <= 500) return 100;
    if (totalDuration <= 1000) return 200;
    if (totalDuration <= 5000) return 500;
    return 1000;
  }

  shortenUrl(url) {
    if (url.length > 40) {
      return url.substring(0, 37) + '...';
    }
    return url;
  }

  getStatusClass(status) {
    if (status >= 200 && status < 300) return 'status-success';
    if (status >= 300 && status < 400) return 'status-redirect';
    if (status >= 400 && status < 500) return 'status-client-error';
    if (status >= 500) return 'status-server-error';
    return '';
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' KB';
    return Math.round(bytes / (1024 * 1024)) + ' MB';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Update just the request count without re-rendering toolbar
   */
  updateRequestCount() {
    const infoElement = this.shadowRoot.querySelector('.info');
    if (infoElement) {
      infoElement.textContent = `${this._exchanges.length} request${this._exchanges.length !== 1 ? 's' : ''}`;
    }
  }

  attachToolbarEventListeners() {
    // View toggle buttons
    const viewBtns = this.shadowRoot.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.view = btn.dataset.view;
      });
    });

    // Pause/Resume button
    const pauseBtn = this.shadowRoot.querySelector('.pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        this.togglePause();
      });
    }

    // Clear button
    const clearBtn = this.shadowRoot.querySelector('.clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Clear all captured requests?')) {
          this.clearExchanges();
        }
      });
    }
  }

  attachViewEventListeners() {
    // Expand/collapse buttons (only in list view)
    const expandBtns = this.shadowRoot.querySelectorAll('.expand-btn');
    expandBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.index, 10);
        this.toggleRow(index);
      });
    });
  }
}

// Register the custom element
customElements.define('http-waterfall', HTTPWaterfallElement);
