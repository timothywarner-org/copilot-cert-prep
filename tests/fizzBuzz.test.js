const fizzBuzz = require('../fizzBuzz');

describe('FizzBuzz Function', () => {
  test('should return correct FizzBuzz sequence for n=15', () => {
    const expected = [
      1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz",
      11, "Fizz", 13, 14, "FizzBuzz"
    ];
    expect(fizzBuzz(15)).toEqual(expected);
  });

  test('should return empty array for n=0', () => {
    expect(fizzBuzz(0)).toEqual([]);
  });

  test('should return [1] for n=1', () => {
    expect(fizzBuzz(1)).toEqual([1]);
  });

  test('should return ["Fizz"] for n=3', () => {
    expect(fizzBuzz(3)).toEqual([1, 2, "Fizz"]);
  });

  test('should return ["Buzz"] for n=5', () => {
    expect(fizzBuzz(5)).toEqual([1, 2, "Fizz", 4, "Buzz"]);
  });

  test('should handle FizzBuzz correctly for multiples of 15', () => {
    const result = fizzBuzz(30);
    expect(result[14]).toBe("FizzBuzz"); // 15
    expect(result[29]).toBe("FizzBuzz"); // 30
  });
});