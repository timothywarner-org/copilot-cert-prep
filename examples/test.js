const { add, subtract, multiply, divide, fetchUserData, capitalize } = require('../demos/04/copilot-enterprise-demo/index');

describe('Calculator Functions', () => {
  test('add should return the sum of two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('subtract should return the difference of two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test('multiply should return the product of two numbers', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test('divide should return the quotient of two numbers', () => {
    expect(divide(6, 2)).toBe(3);
  });

  test('divide should throw an error when dividing by zero', () => {
    expect(() => divide(6, 0)).toThrow('Cannot divide by zero');
  });
});

describe('fetchUserData', () => {
  test('should return user data for a given userId', async () => {
    const userData = await fetchUserData(1);
    expect(userData).toEqual({ id: 1, name: 'John Doe' });
  });
});

describe('capitalize', () => {
  test('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('should throw an error if input is not a string', () => {
    expect(() => capitalize(123)).toThrow('Input must be a string');
  });
});
