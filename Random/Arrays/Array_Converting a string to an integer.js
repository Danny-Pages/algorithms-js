console.clear();

/**
 * similar to how parseInt works, but with custom handling for edge cases
 * such as non-numeric characters, signs, and overflow conditions.
 */

// O(n) O(1)
const stringToInteger = (str) => {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }

  // Remove leading and trailing whitespaces
  str = str.trim();

  if (str.length === 0) {
    throw new Error("Invalid input: empty string");
  }

  let isNegative = false;
  let startIndex = 0;
  let result = 0;

  // Check for sign
  if (str[0] === "-") {
    isNegative = true;
    startIndex = 1;
  } else if (str[0] === "+") {
    startIndex = 1;
  }

  for (let i = startIndex; i < str.length; i++) {
    const char = str[i];

    // Check if the character is a digit
    if (char < "0" || char > "9") {
      throw new Error("Invalid input: contains non-numeric characters");
    }

    // Convert character to number and build the result
    result = result * 10 + (char - "0");

    // Check for overflow (beyond JavaScript safe integer limits)
    if (result > Number.MAX_SAFE_INTEGER) {
      throw new Error("Overflow: number exceeds safe limits");
    }
  }

  // Apply sign if negative
  return isNegative ? -result : result;
};

// Test cases
console.log(stringToInteger("42")); // Output: 42
console.log(stringToInteger("   -42")); // Output: -42
console.log(stringToInteger("+123")); // Output: 123
console.log(stringToInteger("4193 with words")); // Throws Error
console.log(stringToInteger("words and 987")); // Throws Error
console.log(stringToInteger("")); // Throws Error: empty string
try {
  console.log(stringToInteger(null)); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be a string"
}
