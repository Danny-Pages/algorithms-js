console.clear();

// Using a Hashmap (Frequency Count) --- O(n) 0(1)/O(n) (Dependent hash map size/larger character sets)
const firstNonRepeatedCharacter = (str) => {
  if (str === null || typeof str !== "string") {
    throw new TypeError("Input must be a valid string");
  }

  const charCount = {};

  // First pass: Count occurrences of each character
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Second pass: Find the first character with count 1
  for (let char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }

  return null; // Return null if no non-repeated character is found
};

// Test cases
console.log(firstNonRepeatedCharacter("swiss")); // Output: 'w'
console.log(firstNonRepeatedCharacter("releveler")); // Output: 'v'
console.log(firstNonRepeatedCharacter("aabbcc")); // Output: null (no unique character)
console.log(firstNonRepeatedCharacter("")); // Output: null (empty string)
try {
  console.log(firstNonRepeatedCharacter(null)); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be a valid string"
}
