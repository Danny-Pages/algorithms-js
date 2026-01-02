console.clear();

// O(n) O(n)
const fizzBuzz = (n) => {
  if (typeof n !== "number" || n <= 0 || !Number.isInteger(n)) {
    throw new TypeError("Input must be a positive integer");
  }

  const result = [];

  for (let i = 1; i <= n; i++) {
    // Check for multiples of both 3 and 5 first
    if (i % 3 === 0 && i % 5 === 0) {
      result.push("FizzBuzz");
    }
    // Check for multiples of 3
    else if (i % 3 === 0) {
      result.push("Fizz");
    }
    // Check for multiples of 5
    else if (i % 5 === 0) {
      result.push("Buzz");
    }
    // For all other numbers
    else {
      result.push(i.toString());
    }
  }

  return result;
};

// Test cases
console.log(fizzBuzz(15));
// Output: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']

try {
  console.log(fizzBuzz(-1)); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be a positive integer"
}

try {
  console.log(fizzBuzz(0)); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be a positive integer"
}

try {
  console.log(fizzBuzz("15")); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be a positive integer"
}
