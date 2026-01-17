# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-01-17

### Added
- **New Components**
  - `<http-message>` - Base component for shared header/body rendering
  - `<http-request>` - Standalone request display with method coloring
  - `<http-response>` - Standalone response display with status coloring

- **Explorer/Request Builder**
  - Integrated request builder into `<http-waterfall>` (via `explorer` attribute)
  - Build and send HTTP requests interactively
  - Add/remove custom headers
  - Request body editor
  - Status feedback for sent requests

- **Documentation Site**
  - New `/docs` directory with home, demos, and API reference pages
  - Consolidated all demos into single interactive page
  - Responsive design with dark/light theme support

- **Testing Infrastructure**
  - Playwright test configuration
  - Component tests for http-transaction and http-waterfall
  - Test page harness

- **Build System**
  - Vite-based build configuration
  - ES module output to `/dist`
  - TypeScript definitions at root level

### Changed
- **Renamed Components**
  - `http-console` → `http-transaction` (http-console still works for backwards compatibility)

- **Component Architecture**
  - `<http-transaction>` now composes `<http-request>` and `<http-response>` sub-components
  - `<http-waterfall>` uses `<http-transaction>` for expanded row details

- **Directory Structure**
  - `/demo` → `/docs` (consolidated documentation site)
  - Removed `/css` directory (styles are inline in components)
  - Added `/dist` for built output
  - Added `/test` for Playwright tests

- **Package Configuration**
  - Entry point changed to `dist/http-component.js`
  - Updated exports for bundled import
  - Scripts updated for Vite and Playwright

### Removed
- `<http-explorer>` standalone component (merged into `<http-waterfall>`)
- External CSS files (styles now inline)
- web-test-runner configuration (replaced by Playwright)
- jsdoc configuration (replaced by CEM analyzer)

### Fixed
- Theme propagation to child components in waterfall view
- Consistent styling across all components

## [0.1.0] - 2024-11-24

### Added
- Initial release
- `<http-console>` component for single request/response display
- `<http-waterfall>` component for multiple requests
- `<http-explorer>` component for request building
- HTTP interceptor utility for live capture
- Syntax highlighting for JSON, HTML, CSS, JavaScript
- Dark/light theme support
- List, Duration, and Waterfall view modes
