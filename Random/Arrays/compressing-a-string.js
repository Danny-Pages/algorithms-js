console.clear();

// Iterative Compression --- O(n) O(n)
function compressString(str) {
  if (str === null) return null; // Handling null input
  if (str.length === 0) return ""; // Handling empty string

  let compressed = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (i + 1 < str.length && str[i] === str[i + 1]) {
      count++;
    } else {
      compressed += str[i];
      if (count > 1) {
        compressed += count;
      }
      count = 1; // Reset count for the next character
    }
  }

  // Return the original string if compression does not save space
  return compressed.length < str.length ? compressed : str;
}

// Using Regular Expressions
function compressString2(str) {
  if (str === null) return null;
  if (str.length === 0) return "";

  // Regular expression to match repeated characters
  let compressed = str.replace(/(.)\1+/g, (match, char) => char + match.length);

  return compressed.length < str.length ? compressed : str;
}

// Using Two Pointers
function compressString3(str) {
  if (str === null) return null;
  if (str.length === 0) return "";

  let compressed = [];
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (i + 1 < str.length && str[i] === str[i + 1]) {
      count++;
    } else {
      compressed.push(str[i]);
      if (count > 1) {
        compressed.push(count);
      }
      count = 1;
    }
  }

  compressed = compressed.join("");
  return compressed.length < str.length ? compressed : str;
}

// Test cases
console.log(compressString(null)); // null
console.log(compressString("")); // ''
console.log(compressString("AABBCC")); // 'AABBCC' (compression does not save space)
console.log(compressString("AAABCCDDDD")); // 'A3BC2D4'
