/**
 * Custom Elements Manifest configuration
 * Generates metadata for IDE autocomplete and documentation
 */
export default {
  globs: ['src/**/*.js'],
  exclude: ['test/**/*'],
  outdir: '.',
  litelement: false,
  dependencies: false,
  packagejson: true,
};
