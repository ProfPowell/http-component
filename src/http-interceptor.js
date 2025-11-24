/**
 * @typedef {Object} InterceptorOptions
 * @property {string|null} [filter=null] - URL filter pattern (* wildcard supported)
 * @property {number} [maxBodySize=1048576] - Maximum body size to capture (bytes)
 */

/**
 * @callback ExchangeCallback
 * @param {Object} exchange - Captured HTTP exchange
 * @param {Object} exchange.request - Request data
 * @param {Object} exchange.response - Response data
 * @param {Object} exchange.timing - Timing information
 */

/**
 * HTTP Interceptor - Captures fetch and XMLHttpRequest calls
 * Provides timing data and request/response details for visualization.
 * Patches global fetch and XMLHttpRequest to intercept all HTTP traffic.
 *
 * @class
 * @example
 * const interceptor = new HTTPInterceptor();
 * interceptor.start((exchange) => {
 *   console.log('Captured:', exchange.request.method, exchange.request.url);
 * }, {
 *   filter: '/api/*',
 *   maxBodySize: 1024 * 1024
 * });
 *
 * // Later, stop intercepting
 * interceptor.stop();
 */
export class HTTPInterceptor {
  /**
   * Creates a new HTTP interceptor instance
   * @constructor
   */
  constructor() {
    /** @type {Set<ExchangeCallback>} */
    this.listeners = new Set();
    /** @type {boolean} */
    this.isActive = false;
    /** @type {boolean} */
    this.isPaused = false;
    /** @type {string|null} */
    this.filter = null;
    /** @type {Function|null} */
    this.originalFetch = null;
    /** @type {Function|null} */
    this.originalXHR = null;
    /** @type {number} */
    this.maxBodySize = 1024 * 1024; // 1MB
  }

  /**
   * Start intercepting HTTP requests
   * Patches window.fetch and window.XMLHttpRequest
   * @param {ExchangeCallback} callback - Called with each captured exchange
   * @param {InterceptorOptions} [options={}] - Configuration options
   * @memberof HTTPInterceptor
   */
  start(callback, options = {}) {
    if (this.isActive) {
      console.warn('HTTPInterceptor is already active');
      return;
    }

    this.filter = options.filter || null;
    this.maxBodySize = options.maxBodySize || this.maxBodySize;

    if (callback) {
      this.listeners.add(callback);
    }

    this.patchFetch();
    this.patchXHR();

    this.isActive = true;
    this.isPaused = false;
  }

  /**
   * Stop intercepting and restore original functions
   * Removes patches from window.fetch and window.XMLHttpRequest
   * @memberof HTTPInterceptor
   */
  stop() {
    if (!this.isActive) return;

    if (this.originalFetch) {
      window.fetch = this.originalFetch;
      this.originalFetch = null;
    }

    if (this.originalXHR) {
      window.XMLHttpRequest = this.originalXHR;
      this.originalXHR = null;
    }

    this.isActive = false;
    this.listeners.clear();
  }

  /**
   * Pause capturing without stopping interception
   * Requests will still be intercepted but not forwarded to listeners
   * @memberof HTTPInterceptor
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * Resume capturing after pause
   * @memberof HTTPInterceptor
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * Add a listener for captured requests
   * @param {ExchangeCallback} callback - Callback to invoke for each exchange
   * @memberof HTTPInterceptor
   */
  addListener(callback) {
    this.listeners.add(callback);
  }

  /**
   * Remove a listener
   * @param {ExchangeCallback} callback - Callback to remove
   * @memberof HTTPInterceptor
   */
  removeListener(callback) {
    this.listeners.delete(callback);
  }

  /**
   * Notify all listeners with captured data
   * Applies filter and pause checks before notifying
   * @param {Object} exchange - HTTP exchange to send to listeners
   * @memberof HTTPInterceptor
   * @private
   */
  notifyListeners(exchange) {
    if (this.isPaused) return;

    // Check filter
    if (this.filter && !this.matchesFilter(exchange.request.url)) {
      return;
    }

    this.listeners.forEach(listener => {
      try {
        listener(exchange);
      } catch (error) {
        console.error('Error in HTTPInterceptor listener:', error);
      }
    });
  }

  /**
   * Check if URL matches filter pattern
   */
  matchesFilter(url) {
    if (!this.filter) return true;

    // Convert wildcard pattern to regex
    const pattern = this.filter
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&') // Escape special chars
      .replace(/\*/g, '.*'); // Convert * to .*

    const regex = new RegExp(pattern);
    return regex.test(url);
  }

  /**
   * Patch window.fetch
   */
  patchFetch() {
    if (this.originalFetch) return;

    this.originalFetch = window.fetch;
    const interceptor = this;

    window.fetch = function(...args) {
      const startTime = performance.now();
      const [resource, init = {}] = args;

      // Extract URL
      const url = typeof resource === 'string' ? resource : resource.url;

      // Extract request details
      const request = {
        method: init.method || 'GET',
        url: url,
        httpVersion: 'HTTP/1.1',
        headers: interceptor.extractHeaders(init.headers),
        body: init.body || null
      };

      return interceptor.originalFetch.apply(this, args)
        .then(async response => {
          const endTime = performance.now();

          try {
            // Clone response to read without consuming
            const clone = response.clone();

            // Extract response data
            const responseData = await interceptor.extractResponse(clone);

            // Create exchange object
            const exchange = {
              request,
              response: responseData,
              timing: {
                startTime,
                endTime,
                duration: Math.round(endTime - startTime)
              }
            };

            interceptor.notifyListeners(exchange);
          } catch (error) {
            console.error('Error extracting response data:', error);
          }

          return response; // Return original response
        })
        .catch(error => {
          const endTime = performance.now();

          // Create error exchange
          const exchange = {
            request,
            response: {
              status: 0,
              statusText: 'Network Error',
              httpVersion: 'HTTP/1.1',
              headers: {},
              body: JSON.stringify({ error: error.message })
            },
            timing: {
              startTime,
              endTime,
              duration: Math.round(endTime - startTime)
            }
          };

          interceptor.notifyListeners(exchange);

          throw error; // Re-throw to not break caller's code
        });
    };
  }

  /**
   * Patch XMLHttpRequest
   */
  patchXHR() {
    if (this.originalXHR) return;

    this.originalXHR = window.XMLHttpRequest;
    const interceptor = this;

    window.XMLHttpRequest = function() {
      const xhr = new interceptor.originalXHR();
      const requestData = {
        method: 'GET',
        url: '',
        httpVersion: 'HTTP/1.1',
        headers: {},
        body: null
      };

      let startTime = 0;

      // Override open
      const originalOpen = xhr.open;
      xhr.open = function(method, url, ...args) {
        requestData.method = method;
        requestData.url = url;
        return originalOpen.apply(this, [method, url, ...args]);
      };

      // Override setRequestHeader
      const originalSetRequestHeader = xhr.setRequestHeader;
      xhr.setRequestHeader = function(name, value) {
        requestData.headers[name] = value;
        return originalSetRequestHeader.apply(this, arguments);
      };

      // Override send
      const originalSend = xhr.send;
      xhr.send = function(body) {
        requestData.body = body || null;
        startTime = performance.now();

        // Listen for completion
        xhr.addEventListener('loadend', function() {
          const endTime = performance.now();

          // Extract response headers
          const responseHeaders = {};
          const headerString = xhr.getAllResponseHeaders();
          if (headerString) {
            headerString.split('\r\n').forEach(line => {
              const [name, value] = line.split(': ');
              if (name && value) {
                responseHeaders[name] = value;
              }
            });
          }

          // Create exchange
          const exchange = {
            request: requestData,
            response: {
              status: xhr.status,
              statusText: xhr.statusText,
              httpVersion: 'HTTP/1.1',
              headers: responseHeaders,
              body: interceptor.truncateBody(xhr.responseText, xhr.getResponseHeader('Content-Type'))
            },
            timing: {
              startTime,
              endTime,
              duration: Math.round(endTime - startTime)
            }
          };

          interceptor.notifyListeners(exchange);
        });

        return originalSend.apply(this, arguments);
      };

      return xhr;
    };
  }

  /**
   * Extract headers from various formats
   */
  extractHeaders(headers) {
    if (!headers) return {};

    if (headers instanceof Headers) {
      const result = {};
      headers.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    }

    return headers;
  }

  /**
   * Extract response data
   */
  async extractResponse(response) {
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const contentType = response.headers.get('Content-Type') || '';
    let body = null;

    try {
      // Try to read body
      const text = await response.text();
      body = this.truncateBody(text, contentType);
    } catch (error) {
      body = '[Body not accessible - CORS or stream error]';
    }

    return {
      status: response.status,
      statusText: response.statusText,
      httpVersion: 'HTTP/1.1',
      headers,
      body
    };
  }

  /**
   * Truncate large bodies
   */
  truncateBody(text, contentType) {
    if (!text) return null;

    if (text.length > this.maxBodySize) {
      const sizeMB = (text.length / (1024 * 1024)).toFixed(2);
      return `[Body too large: ${sizeMB}MB - showing first 1MB]\n\n${text.substring(0, this.maxBodySize)}`;
    }

    return text;
  }
}

// Create singleton instance
export const httpInterceptor = new HTTPInterceptor();
