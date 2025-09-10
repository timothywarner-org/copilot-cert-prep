/**
 * Jest configuration object.
 *
 * @type {import('jest').Config}
 * @property {string} testEnvironment - The environment in which to run tests.
 * @property {string[]} collectCoverageFrom - Glob patterns for files to collect coverage from.
 * @property {Object} coverageThreshold - Coverage thresholds for the project.
 * @property {Object} coverageThreshold.global - Global coverage thresholds.
 * @property {number} coverageThreshold.global.branches - Minimum branch coverage percentage.
 * @property {number} coverageThreshold.global.functions - Minimum function coverage percentage.
 * @property {number} coverageThreshold.global.lines - Minimum line coverage percentage.
 * @property {number} coverageThreshold.global.statements - Minimum statement coverage percentage.
 * @property {string[]} testMatch - Glob patterns to detect test files.
 */
module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/coverage/**', '!jest.config.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: ['**/test/**/*.js', '**/?(*.)+(spec|test).js']
};
