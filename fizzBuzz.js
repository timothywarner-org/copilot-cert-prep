/**
 * Build a deterministic sequence so the testing lab can assert values without
 * coupling its unit tests to console output.
 *
 * @param {number} [limit=100] Integer from 0 through 10,000, inclusive.
 * @returns {string[]} One value for each integer from 1 through limit.
 * @throws {TypeError} If limit is not a finite integer number.
 * @throws {RangeError} If limit is outside the supported classroom range.
 */
function fizzBuzz(limit = 100) {
  if (!Number.isInteger(limit)) {
    throw new TypeError('limit must be a finite integer number.');
  }

  // Bound allocations for a short classroom exercise, including generated tests.
  if (limit < 0 || limit > 10000) {
    throw new RangeError('limit must be between 0 and 10000, inclusive.');
  }

  return Array.from({ length: limit }, (_, index) => {
    const value = index + 1;
    // Check the combined rule first so multiples of 15 satisfy both conditions.
    if (value % 15 === 0) return 'FizzBuzz';
    if (value % 3 === 0) return 'Fizz';
    if (value % 5 === 0) return 'Buzz';
    return String(value);
  });
}

module.exports = { fizzBuzz };

// Importing the utility stays silent; direct execution provides a visible demo.
if (require.main === module) {
  console.log(fizzBuzz().join('\n'));
}
