console.clear();

// Using XOR (Bit Manipulation) --- O(n) O(1)
const findSingleDifferentChar = (str1, str2) => {
  if (str1 === null || str2 === null) {
    throw new TypeError("Input cannot be null");
  }

  let result = 0;

  // XOR all characters in both strings
  for (let char of str1) {
    result ^= char.charCodeAt(0);
  }

  for (let char of str2) {
    result ^= char.charCodeAt(0);
  }

  // Convert result back to character
  return String.fromCharCode(result);
};

// Using a Hashmap (Frequency Count) --- O(n) O(n)
function findSingleDifferentChar2(str1, str2) {
  if (str1 === null || str2 === null) {
    throw new TypeError("Input cannot be null");
  }

  const charCount = {};

  // Count characters in the first string
  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Subtract counts using the second string
  for (let char of str2) {
    charCount[char] = (charCount[char] || 0) - 1;
  }

  // Find the character with count not zero
  for (let char in charCount) {
    if (charCount[char] !== 0) {
      return char;
    }
  }

  return null; // Just in case, though the problem assumes there is always one differing char
}

// Test cases
console.log(findSingleDifferentChar("ab", "aab")); // 'a'
console.log(findSingleDifferentChar("aab", "ab")); // 'a'
console.log(findSingleDifferentChar("abcd", "abcde")); // 'e'
console.log(findSingleDifferentChar("aaabbcdd", "abdbacade")); // 'e'
