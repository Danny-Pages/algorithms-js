console.clear();

// Sorting  --- O(n log n) O(n)
const arePermutations = (str1, str2) => {
  if (str1 === null || str2 === null) return false;
  if (str1.length === 0 || str2.length === 0) return false;
  if (str1.length !== str2.length) return false; // Different lengths can't be permutations

  // Sort both strings and compare
  let sortedStr1 = str1.split("").sort().join("");
  let sortedStr2 = str2.split("").sort().join("");

  return sortedStr1 === sortedStr2;
};

// Character Count Using a Hash Map --- O(n) O(n)
function arePermutations2(str1, str2) {
  if (str1 === null || str2 === null) return false;
  if (str1.length === 0 || str2.length === 0) return false;
  if (str1.length !== str2.length) return false; // Different lengths can't be permutations

  let charCount = {};

  // Count characters in the first string
  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Check characters against the second string
  for (let char of str2) {
    if (!charCount[char]) {
      return false; // Character count mismatch
    }
    charCount[char]--;
  }

  return true; // All character counts matched
}

// Character Count Using Arrays (Optimized for ASCII) --- O(n) O(1)
function arePermutations3(str1, str2) {
  if (str1 === null || str2 === null) return false;
  if (str1.length === 0 || str2.length === 0) return false;
  if (str1.length !== str2.length) return false; // Different lengths can't be permutations

  let charCount = new Array(128).fill(0); // ASCII character set

  // Count characters in the first string
  for (let char of str1) {
    charCount[char.charCodeAt(0)]++;
  }

  // Decrease count for the second string
  for (let char of str2) {
    charCount[char.charCodeAt(0)]--;
    if (charCount[char.charCodeAt(0)] < 0) {
      return false; // Character count mismatch
    }
  }

  return true; // All counts match up correctly
}

// Test cases
console.log(arePermutations(null, "bin")); // false
console.log(arePermutations("", "")); // false
console.log(arePermutations("Nib", "bin")); // false
console.log(arePermutations("act", "cat")); // true
console.log(arePermutations("a ct", "ca t")); // true
