console.clear();

// Using a Set  --- O(n) O(n)
const hasUniqueCharacters = (str) => {
  if (str === null) return false;
  if (str.length === 0) return true;

  let charSet = new Set();
  for (let char of str) {
    if (charSet.has(char)) {
      return false; // Duplicate character found
    }
    charSet.add(char);
  }
  return true; // All characters are unique
};

// Hash Map Lookup also works --- 0(n) O(n)

// Using an Array (ASCII Assumption) --- O(n) O(1)
function hasUniqueCharacters2(str) {
  if (str === null) return false;
  if (str.length === 0) return true;
  if (str.length > 128) return false; // More characters than possible unique ASCII chars

  let charArray = new Array(128).fill(false);
  for (let char of str) {
    let charCode = char.charCodeAt(0);
    if (charArray[charCode]) {
      return false; // Duplicate character found
    }
    charArray[charCode] = true;
  }
  return true; // All characters are unique
}

// Brute Force Comparison --- O(n^2) O(1)
function hasUniqueCharacters3(str) {
  if (str === null) return false;
  if (str.length === 0) return true;

  for (let i = 0; i < str.length; i++) {
    for (let j = i + 1; j < str.length; j++) {
      if (str[i] === str[j]) {
        return false; // Duplicate character found
      }
    }
  }
  return true; // All characters are unique
}

// Sorting Approach --- O(n log n) O(n)
function hasUniqueCharacters4(str) {
  if (str === null) return false;
  if (str.length === 0) return true;

  let sortedStr = str.split("").sort(); // Convert to array, sort it
  for (let i = 0; i < sortedStr.length - 1; i++) {
    if (sortedStr[i] === sortedStr[i + 1]) {
      return false; // Duplicate character found
    }
  }
  return true; // All characters are unique
}

// Test cases
console.log(hasUniqueCharacters(null)); // false
console.log(hasUniqueCharacters("")); // true
console.log(hasUniqueCharacters("foo")); // false
console.log(hasUniqueCharacters("bar")); // true
