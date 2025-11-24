# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HTTP Console Web Component - A dependency-free vanilla web component system for displaying HTTP request/response data in educational formats.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (no caching, opens browser to /demo)
npm run dev

# Server will be available at http://localhost:8081
```

## Project Structure

```
src/
  http-console.js       - Single request/response display component
  http-waterfall.js     - Multiple requests list/waterfall component
css/
  http-console.css      - Styles for http-console component
  http-waterfall.css    - Styles for http-waterfall component
demo/
  index.html           - Demo of http-console component
  waterfall.html       - Demo of http-waterfall component
```

## Components

Two primary web components:
- `<http-console>`: Single request/response display in raw HTTP wire format
- `<http-waterfall>`: Multiple requests with list view and timeline visualization

## Architecture

### Component Hierarchy

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
├── list-view
│   └── exchange-row (repeating, expandable to http-console)
└── waterfall-view
    ├── timeline-header
    └── waterfall-row (repeating)
```

### Data Schema

Components accept JSON data with this structure:
- Single exchange: `{ request: {...}, response: {...}, timing: {...} }`
- Multiple exchanges: `{ exchanges: [...], meta: {...} }`

Request objects include: method, url, httpVersion, headers, body
Response objects include: status, statusText, httpVersion, headers, body
Timing objects include: startTime, endTime, duration, phases (optional)

### Input Methods

1. **Declarative**: Pass data via attributes/properties
2. **Interceptor**: Capture actual fetch/XHR calls from page (Phase 4 feature)

## Implementation Phases

The project follows a phased approach:

**Phase 1 (MVP)**: `http-console` component accepting JSON data, rendering raw HTTP format
**Phase 2**: `http-waterfall` list view with expandable rows
**Phase 3**: Waterfall timeline visualization with horizontal duration bars
**Phase 4**: Request interception via fetch/XHR patching with Performance API integration
**Phase 5**: Enhancements (JSON pretty-printing, copy buttons, HAR export, filtering, sorting)

## Key Design Decisions

### Display Format
Show actual HTTP wire format rather than pretty-printed data:
```
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
```

### Waterfall Rendering
Use CSS custom properties and transforms for positioning timing bars:
```css
.timing-bar {
  transform: translateX(calc(var(--start-offset) * 1px));
  width: calc(var(--duration) * var(--px-per-ms));
}
```

### Request Interception
Wrap both `window.fetch` and `XMLHttpRequest` to capture all HTTP traffic. Use Performance API for accurate timing. Clone responses to read body without consuming the stream.

### Scalability
For large request sets: virtual scrolling in list view, configurable max entries (50-100 default), aggregation of similar requests.

## Development Principles

- **Zero dependencies**: Vanilla JavaScript web components only
- **Educational focus**: Display data in formats that teach HTTP protocol details
- **Progressive enhancement**: Start with manual data display, add live capture later
- **Content type awareness**: Smart rendering based on Content-Type headers
