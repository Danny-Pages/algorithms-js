console.clear();

// O(n) O(n)
const reverseWordsInString = (str) => {
  if (str === null || typeof str !== "string") {
    throw new TypeError("Input must be a valid string");
  }

  // Split the string into words, reverse the array of words, and join back into a string
  return str.split(" ").reverse().join(" ");
};

// Test cases
console.log(reverseWordsInString("hello world")); // Output: "world hello"
console.log(reverseWordsInString("The quick brown fox")); // Output: "fox brown quick The"
console.log(reverseWordsInString("a b c")); // Output: "c b a"
console.log(reverseWordsInString("")); // Output: "" (empty string remains empty)
console.log(reverseWordsInString("  leading and trailing spaces  ")); // Output: "spaces trailing and leading  "

try {
  console.log(reverseWordsInString(null)); // Throws TypeError
} catch (e) {
  console.log(e.message); // "Input must be a valid string"
}
