# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HTTP Component - A dependency-free vanilla web component system for displaying HTTP request/response data in educational formats.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (opens browser to /docs)
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Lint and format
npm run lint
npm run format
```

## Project Structure

```
http-component/
├── src/
│   ├── http-component.js    - Barrel file (exports all components)
│   ├── http-message.js      - Base component for headers/body display
│   ├── http-request.js      - Request display (method, URL, headers, body)
│   ├── http-response.js     - Response display (status, headers, body)
│   ├── http-transaction.js  - Request + Response pair (main component)
│   ├── http-waterfall.js    - Multiple requests with list/timeline + explorer
│   └── http-interceptor.js  - Utility for live capture
├── dist/                    - Built output (npm run build)
├── docs/                    - Documentation site
│   ├── index.html          - Home page
│   ├── demos.html          - Interactive demos
│   ├── api.html            - API reference
│   └── styles.css          - Shared styles
├── test/                    - Playwright tests
│   ├── test-page.html      - Test harness
│   ├── http-transaction.spec.js
│   └── http-waterfall.spec.js
├── http-component.d.ts      - TypeScript definitions
├── vite.config.js           - Vite build configuration
├── playwright.config.js     - Playwright test configuration
└── package.json
```

## Components

Five web components with a clear hierarchy:

- `<http-message>`: Base component for rendering headers and body (internal use)
- `<http-request>`: Displays HTTP request with method coloring
- `<http-response>`: Displays HTTP response with status code coloring
- `<http-transaction>`: Complete request/response pair (also registered as `<http-console>` for backwards compatibility)
- `<http-waterfall>`: Multiple exchanges with list/duration/waterfall views + built-in request explorer

## Architecture

### Component Hierarchy

```
http-transaction (single exchange)
├── http-request
│   ├── request-line (METHOD URL HTTP/version)
│   ├── headers
│   └── body (syntax highlighted)
└── http-response
    ├── status-line (HTTP/version STATUS REASON)
    ├── headers
    └── body (syntax highlighted)

http-waterfall (multiple exchanges)
├── toolbar (view toggle, capture controls)
├── explorer-panel (request builder, collapsible)
├── view-container
│   ├── list-view (expandable rows → http-transaction)
│   ├── duration-view (horizontal bars)
│   └── waterfall-view (timeline with offsets)
```

### Data Schema

```javascript
// Single exchange (http-transaction)
{
  request: {
    method: 'GET',
    url: '/api/users',
    httpVersion: 'HTTP/1.1',
    headers: { 'Accept': 'application/json' },
    body: null
  },
  response: {
    status: 200,
    statusText: 'OK',
    httpVersion: 'HTTP/1.1',
    headers: { 'Content-Type': 'application/json' },
    body: '{"id": 1}'
  }
}

// Multiple exchanges (http-waterfall)
[{
  request: {...},
  response: {...},
  timing: { startTime: 0, endTime: 100, duration: 100 }
}]
```

### Key Features

- **Syntax Highlighting**: JSON, HTML, CSS, JavaScript
- **Theme Support**: Light/dark modes with auto-detection
- **Live Capture**: Intercept fetch() and XMLHttpRequest
- **Request Builder**: Built into http-waterfall (explorer attribute)
- **Highlighting/Boxing**: Emphasize specific sections via attributes

## Key Design Decisions

### Display Format
Show actual HTTP wire format:
```
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
```

### Styling
All styles are inline in component JS files (no external CSS). CSS custom properties enable theming.

### Backwards Compatibility
`<http-console>` is registered as an alias for `<http-transaction>`.

## Development Principles

- **Zero dependencies**: Vanilla JavaScript web components only
- **Educational focus**: Display data in formats that teach HTTP protocol details
- **Content type awareness**: Smart rendering based on Content-Type headers
- **Progressive enhancement**: Manual data display + live capture option
