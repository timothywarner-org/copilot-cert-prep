const { fizzBuzz } = require('../fizzBuzz');

describe('FizzBuzz teaching contract', () => {
  test('returns the complete first cycle in order, including the combined rule', () => {
    // Literal expectations make a wrong rule visible instead of copying the algorithm.
    expect(fizzBuzz(15)).toEqual([
      '1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz',
      '11', 'Fizz', '13', '14', 'FizzBuzz',
    ]);
  });

  test('includes zero and one as explicit boundaries', () => {
    expect(fizzBuzz(0)).toEqual([]);
    expect(fizzBuzz(1)).toEqual(['1']);
  });

  test('defaults to exactly 100 results', () => {
    const values = fizzBuzz();
    expect(values).toHaveLength(100);
    expect(values[99]).toBe('Buzz');
    expect(fizzBuzz(undefined)).toEqual(values);
  });

  test('supports the maximum documented classroom input', () => {
    const values = fizzBuzz(10000);
    expect(values).toHaveLength(10000);
    expect(values[9999]).toBe('Buzz');
  });

  test.each(['15', null, true, 1.5, NaN, Infinity, -Infinity])(
    'rejects a non-integer-number input: %p',
    value => expect(() => fizzBuzz(value)).toThrow(TypeError),
  );

  test.each([-1, 10001])('rejects an out-of-range integer: %p', value => {
    expect(() => fizzBuzz(value)).toThrow(RangeError);
  });

  test('returns a fresh result and does not log during a function call', () => {
    // Independent calls let student tests run in any order without shared state.
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      const first = fizzBuzz(1);
      first[0] = 'changed by a caller';
      expect(fizzBuzz(1)).toEqual(['1']);
      expect(log).not.toHaveBeenCalled();
    } finally {
      log.mockRestore();
    }
  });
});
