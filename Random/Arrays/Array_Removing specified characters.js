console.clear();

// Iterative (character lookups) --- O(n + m) O(n)
function removeSpecifiedCharacters(str, charsToRemove) {
  if (
    str === null ||
    charsToRemove === null ||
    typeof str !== "string" ||
    typeof charsToRemove !== "string"
  ) {
    throw new TypeError("Both inputs must be valid strings");
  }

  // Convert charsToRemove into a Set for O(1) lookup times
  const charsSet = new Set(charsToRemove);

  // Build the result string excluding specified characters
  let result = "";
  for (let char of str) {
    if (!charsSet.has(char)) {
      result += char;
    }
  }

  return result;
}

// Test cases
console.log(removeSpecifiedCharacters("hello world", "lo")); // Output: "he wrd"
console.log(removeSpecifiedCharacters("fizzbuzz", "bz")); // Output: "fiu"
console.log(removeSpecifiedCharacters("abcdefg", "x")); // Output: "abcdefg" (no chars removed)
console.log(removeSpecifiedCharacters("aaabbb", "ab")); // Output: "" (all chars removed)
try {
  console.log(removeSpecifiedCharacters(null, "a")); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Both inputs must be valid strings"
}
