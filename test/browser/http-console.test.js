/**
 * Browser tests for http-console component
 */
import { expect } from '@esm-bundle/chai';
import '../../src/http-console.js';

describe('HTTPConsoleElement', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('http-console');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined as a custom element', () => {
    expect(customElements.get('http-console')).to.not.be.undefined;
  });

  it('should have shadow DOM', () => {
    expect(element.shadowRoot).to.not.be.null;
  });

  it('should accept data via property', async () => {
    element.data = {
      request: {
        method: 'GET',
        url: '/api/test',
        headers: { Accept: 'application/json' },
      },
      response: {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: '{"test": true}',
      },
    };

    await element.updateComplete;

    expect(element.data).to.not.be.null;
    expect(element.data.request.method).to.equal('GET');
  });

  it('should render request method', async () => {
    element.data = {
      request: {
        method: 'POST',
        url: '/api/create',
        headers: {},
      },
      response: {
        status: 201,
        statusText: 'Created',
        headers: {},
      },
    };

    await new Promise(resolve => setTimeout(resolve, 50));

    const shadowText = element.shadowRoot.textContent;
    expect(shadowText).to.include('POST');
  });

  it('should render status code', async () => {
    element.data = {
      request: {
        method: 'GET',
        url: '/test',
        headers: {},
      },
      response: {
        status: 404,
        statusText: 'Not Found',
        headers: {},
      },
    };

    await new Promise(resolve => setTimeout(resolve, 50));

    const shadowText = element.shadowRoot.textContent;
    expect(shadowText).to.include('404');
  });

  it('should support theme attribute', () => {
    element.setAttribute('theme', 'dark');
    expect(element.getAttribute('theme')).to.equal('dark');
  });

  it('should render JSON body with highlighting', async () => {
    element.data = {
      request: {
        method: 'GET',
        url: '/api/data',
        headers: {},
      },
      response: {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', value: 123 }),
      },
    };

    await new Promise(resolve => setTimeout(resolve, 50));

    const shadowRoot = element.shadowRoot;
    const jsonKeyElements = shadowRoot.querySelectorAll('.json-key');
    expect(jsonKeyElements.length).to.be.greaterThan(0);
  });
});
