# HTTP Component

A dependency-free vanilla web component system for displaying HTTP request/response data in educational formats.

## Components

- `<http-transaction>`: Complete request/response pair (also available as `<http-console>`)
- `<http-request>`: Standalone request display
- `<http-response>`: Standalone response display
- `<http-waterfall>`: Multiple requests with list/timeline views and built-in request builder

## Installation

```bash
npm install @profpowell/http-component
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/@profpowell/http-component"></script>
```

## Quick Start

### Single Transaction

```html
<http-transaction id="demo"></http-transaction>

<script type="module">
  import '@profpowell/http-component';

  document.getElementById('demo').data = {
    request: {
      method: 'GET',
      url: '/api/users/123',
      headers: { 'Accept': 'application/json' }
    },
    response: {
      status: 200,
      statusText: 'OK',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 123, name: 'John' }, null, 2)
    }
  };
</script>
```

### Multiple Requests (Waterfall)

```html
<http-waterfall id="viewer" view="waterfall"></http-waterfall>

<script type="module">
  import '@profpowell/http-component';

  document.getElementById('viewer').exchanges = [
    {
      request: { method: 'GET', url: '/api/users' },
      response: { status: 200, statusText: 'OK' },
      timing: { startTime: 0, endTime: 100, duration: 100 }
    },
    {
      request: { method: 'POST', url: '/api/users' },
      response: { status: 201, statusText: 'Created' },
      timing: { startTime: 50, endTime: 150, duration: 100 }
    }
  ];
</script>
```

### Live Capture

```html
<http-waterfall capture="true" max-entries="50"></http-waterfall>
```

The component will automatically capture all `fetch()` and `XMLHttpRequest` calls made by the page.

### Request Builder

```html
<http-waterfall explorer></http-waterfall>
```

Add the `explorer` attribute to show a built-in request builder panel.

## Features

- **Wire Format Display**: Shows HTTP in actual protocol format
- **Syntax Highlighting**: Automatic highlighting for JSON, HTML, CSS, and JavaScript
- **Three View Modes**: List, Duration, and Waterfall views
- **Live Capture**: Intercept and display real HTTP traffic
- **Request Builder**: Build and send HTTP requests interactively
- **Theme Support**: Light and dark modes with auto-detection
- **Section Highlighting**: Emphasize specific parts with `highlight` and `box` attributes

## Attributes

### Common Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `theme` | `light`, `dark`, `auto` | Color theme |
| `highlight` | section names | Highlight specific sections |
| `box` | section names | Add labeled borders |

### http-waterfall Specific

| Attribute | Values | Description |
|-----------|--------|-------------|
| `view` | `list`, `duration`, `waterfall` | Display mode |
| `capture` | `true`, `false` | Enable live capture |
| `filter` | URL pattern | Filter captured requests |
| `max-entries` | number | Maximum entries (default: 100) |
| `explorer` | boolean | Show request builder |

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint and format
npm run lint
npm run format
```

## Documentation

See the [documentation site](https://profpowell.github.io/http-component/) for:
- [Interactive Demos](https://profpowell.github.io/http-component/demos.html)
- [API Reference](https://profpowell.github.io/http-component/api.html)

## License

MIT
