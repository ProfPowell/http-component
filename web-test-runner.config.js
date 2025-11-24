/**
 * Web Test Runner configuration
 * Runs tests in real browsers (Chrome, Firefox, Safari)
 */
export default {
  files: 'test/browser/**/*.test.js',
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.js'],
  },
  testFramework: {
    config: {
      timeout: 3000,
    },
  },
};
