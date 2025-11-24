/**
 * Tests for HTTPInterceptor class
 * Using Node.js built-in test runner (Node 18+)
 */
import { describe, it } from 'node:test';
import assert from 'node:assert';
import { HTTPInterceptor } from '../src/http-interceptor.js';

describe('HTTPInterceptor', () => {
  describe('constructor', () => {
    it('should create instance with default values', () => {
      const interceptor = new HTTPInterceptor();

      assert.strictEqual(interceptor.isActive, false);
      assert.strictEqual(interceptor.isPaused, false);
      assert.strictEqual(interceptor.filter, null);
      assert.strictEqual(interceptor.maxBodySize, 1024 * 1024);
      assert.ok(interceptor.listeners instanceof Set);
      assert.strictEqual(interceptor.listeners.size, 0);
    });
  });

  describe('addListener / removeListener', () => {
    it('should add listener to the set', () => {
      const interceptor = new HTTPInterceptor();
      const callback = () => {};

      interceptor.addListener(callback);

      assert.strictEqual(interceptor.listeners.size, 1);
      assert.ok(interceptor.listeners.has(callback));
    });

    it('should remove listener from the set', () => {
      const interceptor = new HTTPInterceptor();
      const callback = () => {};

      interceptor.addListener(callback);
      interceptor.removeListener(callback);

      assert.strictEqual(interceptor.listeners.size, 0);
      assert.strictEqual(interceptor.listeners.has(callback), false);
    });
  });

  describe('pause / resume', () => {
    it('should set isPaused to true when paused', () => {
      const interceptor = new HTTPInterceptor();

      interceptor.pause();

      assert.strictEqual(interceptor.isPaused, true);
    });

    it('should set isPaused to false when resumed', () => {
      const interceptor = new HTTPInterceptor();

      interceptor.pause();
      interceptor.resume();

      assert.strictEqual(interceptor.isPaused, false);
    });
  });

  describe('matchesFilter', () => {
    it('should return true when no filter is set', () => {
      const interceptor = new HTTPInterceptor();

      const result = interceptor.matchesFilter('/api/users');

      assert.strictEqual(result, true);
    });

    it('should match exact URL', () => {
      const interceptor = new HTTPInterceptor();
      interceptor.filter = '/api/users';

      assert.strictEqual(interceptor.matchesFilter('/api/users'), true);
      assert.strictEqual(interceptor.matchesFilter('/api/posts'), false);
    });

    it('should match wildcard patterns', () => {
      const interceptor = new HTTPInterceptor();
      interceptor.filter = '/api/*';

      assert.strictEqual(interceptor.matchesFilter('/api/users'), true);
      assert.strictEqual(interceptor.matchesFilter('/api/posts'), true);
      assert.strictEqual(interceptor.matchesFilter('/public/file'), false);
    });

    it('should match complex wildcard patterns', () => {
      const interceptor = new HTTPInterceptor();
      interceptor.filter = '*/users';

      assert.strictEqual(interceptor.matchesFilter('/api/users'), true);
      assert.strictEqual(interceptor.matchesFilter('/v2/users'), true);
      assert.strictEqual(interceptor.matchesFilter('/api/posts'), false);
    });
  });

  describe('extractHeaders', () => {
    it('should return empty object for null headers', () => {
      const interceptor = new HTTPInterceptor();

      const result = interceptor.extractHeaders(null);

      assert.deepStrictEqual(result, {});
    });

    it('should convert Headers object to plain object', () => {
      const interceptor = new HTTPInterceptor();
      const headers = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer token');

      const result = interceptor.extractHeaders(headers);

      assert.strictEqual(result['content-type'], 'application/json');
      assert.strictEqual(result['authorization'], 'Bearer token');
    });

    it('should return plain object as-is', () => {
      const interceptor = new HTTPInterceptor();
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      };

      const result = interceptor.extractHeaders(headers);

      assert.deepStrictEqual(result, headers);
    });
  });

  describe('truncateBody', () => {
    it('should return null for empty body', () => {
      const interceptor = new HTTPInterceptor();

      const result = interceptor.truncateBody(null, 'text/plain');

      assert.strictEqual(result, null);
    });

    it('should return body as-is if under max size', () => {
      const interceptor = new HTTPInterceptor();
      const body = 'Small body content';

      const result = interceptor.truncateBody(body, 'text/plain');

      assert.strictEqual(result, body);
    });

    it('should truncate body exceeding max size', () => {
      const interceptor = new HTTPInterceptor();
      interceptor.maxBodySize = 100;
      const body = 'x'.repeat(200);

      const result = interceptor.truncateBody(body, 'text/plain');

      assert.ok(result.includes('[Body too large:'));
      assert.ok(result.length < body.length);
    });
  });
});
