# HTTP Console Web Component

## Overview
A dependency free vanilla web component system that displays HTTP request/response data in educational formats. Consists of two primary components:
- `<http-console>`: Single request/response display
- `<http-waterfall>`: Multiple requests with timing visualization

## Core Requirements

### Display Capabilities
- Show request line (method, path, HTTP version)
- Show request headers
- Show request body (with content type awareness)
- Show response status line
- Show response headers  
- Show response body (with content type awareness)
- Toggle between request/response views
- Syntax highlighting for bodies (JSON, HTML, etc.)
- **List view of multiple requests**
- **Waterfall timeline visualization**
- **Request timing and duration**

### Input Methods
Two primary approaches:

1. **Declarative**: Pass data via attributes/properties
2. **Interceptor**: Capture actual fetch/XHR calls from page

## Technical Design

### Component Interface

```html
<!-- Single request/response -->
<http-console 
  request='{"method":"GET","url":"/api/users",...}'
  response='{"status":200,"headers":{...},...}'>
</http-console>

<!-- Multiple requests - list view -->
<http-waterfall 
  requests='[{...}, {...}]'
  view="list">
</http-waterfall>

<!-- Multiple requests - waterfall view -->
<http-waterfall 
  requests='[{...}, {...}]'
  view="waterfall">
</http-waterfall>

<!-- Live capture -->
<http-waterfall 
  capture="true" 
  filter="/api/*"
  view="waterfall">
</http-waterfall>
```

### Data Schema

```javascript
// Single exchange
{
  request: {
    method: string,
    url: string,
    httpVersion: string, // default "HTTP/1.1"
    headers: Object,
    body: string | null
  },
  response: {
    status: number,
    statusText: string,
    httpVersion: string,
    headers: Object,
    body: string | null
  },
  timing: {
    startTime: number,      // timestamp
    endTime: number,        // timestamp
    duration: number,       // milliseconds
    phases?: {              // optional detailed timing
      dns: number,
      connect: number,
      request: number,
      response: number
    }
  }
}

// Multiple exchanges
{
  exchanges: [
    { request, response, timing },
    ...
  ],
  meta: {
    baseTime: number,      // earliest startTime for relative positioning
    totalDuration: number  // latest endTime - baseTime
  }
}
```

### Component Architecture

```
http-console (single exchange)
├── http-request
│   ├── request-line
│   ├── header-list
│   └── body-viewer
└── http-response
    ├── status-line
    ├── header-list
    └── body-viewer

http-waterfall (multiple exchanges)
├── toolbar
│   ├── view-toggle (list/waterfall)
│   ├── filter-input
│   └── clear-button
├── list-view
│   ├── exchange-row (repeating)
│   │   ├── method-badge
│   │   ├── url
│   │   ├── status-badge
│   │   ├── size
│   │   ├── duration
│   │   └── expand-button
│   └── exchange-detail (expanded http-console)
└── waterfall-view
    ├── timeline-header (time scale)
    └── waterfall-row (repeating)
        ├── request-info (method, url, status)
        └── timing-bar
            ├── bar-segment (visual duration)
            └── duration-label
```

## Implementation Phases

### Phase 1: Manual Display (MVP)
- `http-console` accepts JSON data via property
- Render request/response in raw HTTP format
- Basic styling (monospace, readable)
- No capture, just display

### Phase 2: Waterfall List View
- `http-waterfall` component
- Accept array of exchanges
- List view with expandable rows
- Click row to show full `http-console` detail
- Display method, URL, status, size, duration

### Phase 3: Waterfall Timeline View
- Timeline visualization
- Horizontal bars representing request duration
- Time scale header (0ms, 100ms, 200ms...)
- Bars positioned relative to baseTime
- Color coding by status (2xx green, 4xx yellow, 5xx red)

### Phase 4: Request Interception
- Patch `fetch` and `XMLHttpRequest`
- Performance API integration for accurate timing
- Match against filter patterns
- Auto-populate waterfall component
- Real-time updates as requests complete

### Phase 5: Enhancements
- JSON pretty-printing in body-viewer
- Header collapsing
- Copy buttons (copy as curl, copy as fetch)
- Export as HAR format
- Request filtering/search
- Sort by duration, status, time
- Zoom/pan timeline

## Key Design Decisions

### Raw Format vs Pretty Format
Show actual HTTP wire format in `http-console`:
```
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json

```

List view shows summary; expand for raw detail.

### Waterfall Bar Rendering
Use CSS transforms for positioning:
```css
.timing-bar {
  transform: translateX(calc(var(--start-offset) * 1px));
  width: calc(var(--duration) * var(--px-per-ms));
}
```

Calculate `--start-offset` relative to earliest request in set.

### View Switching
Single component handles both views:
```javascript
// Toggle view mode
<http-waterfall view="list">     <!-- default -->
<http-waterfall view="waterfall">
```

Use attribute change to swap rendering mode.

### Timing Collection

**Manual mode**: Require timing in data
```javascript
{
  timing: {
    startTime: performance.now(),
    duration: 245
  }
}
```

**Capture mode**: Use Performance API
```javascript
const startTime = performance.now();
const response = await originalFetch(...);
const endTime = performance.now();

// Or use Resource Timing API
const entries = performance.getEntriesByType('resource');
```

### Interception Approach
Wrap both fetch and XMLHttpRequest:
```javascript
// Fetch
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const startTime = performance.now();
  return originalFetch.apply(this, args).then(async response => {
    const endTime = performance.now();
    // Clone to read body without consuming
    const clone = response.clone();
    const body = await clone.text();
    // Dispatch custom event with data
    dispatchHttpEvent({request, response, timing});
    return response;
  });
};

// XMLHttpRequest
const OriginalXHR = window.XMLHttpRequest;
window.XMLHttpRequest = function() {
  const xhr = new OriginalXHR();
  // Wrap open, send, onreadystatechange
  return xhr;
};
```

### Scalability
For large numbers of requests:
- Virtual scrolling for list view (only render visible rows)
- Aggregate/group similar requests
- Pagination or infinite scroll
- Configurable max entries (default 50-100)

## Waterfall View Layout

```
┌─────────────────────────────────────────────────────────┐
│ [List] [Waterfall]  [Filter: /api/*]  [Clear]          │
├───────────┬─────────────────────────────────────────────┤
│ Method URL│ 0ms    100ms   200ms   300ms   400ms   500ms│
├───────────┼─────────────────────────────────────────────┤
│ GET /users│ ████████ 87ms                               │
│ 200       │                                             │
├───────────┼─────────────────────────────────────────────┤
│ GET /posts│   ██████████████ 156ms                      │
│ 200       │                                             │
├───────────┼─────────────────────────────────────────────┤
│ POST /user│        ████ 42ms                            │
│ 201       │                                             │
└───────────┴─────────────────────────────────────────────┘
```


## Sample Usage in Tutorial

```html
<h3>Single Request Example</h3>
<http-console 
  request='{"method":"GET","url":"/api/users"}'
  response='{"status":200,"body":"[...]"}'>
</http-console>

<h3>Page Load Sequence</h3>
<http-waterfall 
  view="list"
  requests='[
    {"request":{"method":"GET","url":"/"},"response":{"status":200},"timing":{"duration":120}},
    {"request":{"method":"GET","url":"/styles.css"},"response":{"status":200},"timing":{"duration":45}},
    {"request":{"method":"GET","url":"/api/data"},"response":{"status":200},"timing":{"duration":230}}
  ]'>
</http-waterfall>

<h3>API Call Waterfall</h3>
<http-waterfall 
  view="waterfall"
  requests='[...]'>
</http-waterfall>
```

---

## Future Possibilities

1. **WebSocket**: Support beyond HTTP request/response? → Future phase
2. **Privacy**: Filter sensitive headers (Authorization)? → Add sanitize option
3. **HAR Format Support**: Import/export HAR for compatibility with other tools?
4. **Performance Improvements**: Virtual scrolling needed for 100+ requests?


