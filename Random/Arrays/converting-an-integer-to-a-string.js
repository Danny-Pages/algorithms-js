console.clear();

/**
 * without using built-in methods like toString(), you can manually handle the
 * conversion by processing each digit of the number, taking care of signs, and
 * building the string representation of the integer.
 */

// O(log n) O(log n)
const integerToString = (num) => {
  if (typeof num !== "number" || !Number.isInteger(num)) {
    throw new TypeError("Input must be an integer");
  }

  // Handle the zero case
  if (num === 0) {
    return "0";
  }

  let isNegative = num < 0;
  let absNum = Math.abs(num);
  let result = "";

  // Extract digits from the number
  while (absNum > 0) {
    let digit = absNum % 10; // Get the last digit
    result = String.fromCharCode(digit + 48) + result; // Convert digit to corresponding char and prepend
    absNum = Math.floor(absNum / 10); // Remove the last digit
  }

  // Add the negative sign if needed
  if (isNegative) {
    result = "-" + result;
  }

  return result;
};

// Test cases
console.log(integerToString(123)); // Output: "123"
console.log(integerToString(-456)); // Output: "-456"
console.log(integerToString(0)); // Output: "0"
console.log(integerToString(7890)); // Output: "7890"
try {
  console.log(integerToString(12.34)); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be an integer"
}
try {
  console.log(integerToString("123")); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be an integer"
}
