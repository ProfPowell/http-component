import { HTTPInterceptor } from './http-interceptor.js';
import './http-console.js';

/**
 * HTTPWaterfallElement - Web component for displaying multiple HTTP exchanges
 * Supports both list view and waterfall timeline view
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

  connectedCallback() {
    // Set smart default view if not explicitly set
    if (!this.hasAttribute('view')) {
      this._view = this.getSmartDefaultView();
    }

    // Create initial DOM structure
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="../css/http-waterfall.css">
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

  set exchanges(value) {
    this._exchanges = Array.isArray(value) ? value : [];
    this.render();
  }

  get exchanges() {
    return this._exchanges;
  }

  set view(value) {
    if (this._view !== value) {
      this._view = value;
      // Re-render both toolbar (to update active button) and view
      this.renderToolbar();
      this.renderView();
    }
  }

  get view() {
    return this._view;
  }

  /**
   * Start capturing live HTTP requests
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
