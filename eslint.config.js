/**
 * ESLint configuration
 * Minimal, focused on catching real issues without being overly strict
 */
export default [
  {
    files: ['src/**/*.js', 'test/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        customElements: 'readonly',
        HTMLElement: 'readonly',
        Headers: 'readonly',
        fetch: 'readonly',
        XMLHttpRequest: 'readonly',
        performance: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        confirm: 'readonly',
        alert: 'readonly',
        // Node test globals
        describe: 'readonly',
        it: 'readonly',
      },
    },
    rules: {
      // Possible Errors
      'no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],
      'no-undef': 'error',
      'no-unreachable': 'error',
      'no-constant-condition': 'warn',

      // Best Practices
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-with': 'error',
      'eqeqeq': ['warn', 'always', { null: 'ignore' }],
      'no-var': 'warn',
      'prefer-const': 'warn',

      // Style (minimal, just obvious issues)
      'no-multiple-empty-lines': ['warn', { max: 2 }],
      'no-trailing-spaces': 'warn',
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
    },
  },
];
