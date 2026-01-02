console.clear();

// Concatenation and Substring Check --- O(n) O(n)
const isRotation = (s1, s2) => {
  if (s1 === null || s2 === null) return false; // Handling null inputs
  if (s1.length !== s2.length) return false; // Different lengths can't be rotations

  // Concatenate s1 with itself
  let concatenated = s1 + s1;

  // Check if s2 is a substring of the concatenated string
  return isSubstring(concatenated, s2);
};

// Mock implementation of isSubstring function, assuming this function is provided
const isSubstring = (str, sub) => {
  return str.includes(sub);
};

// Test cases
console.log(isRotation(null, "foo")); // false
console.log(isRotation(" ", "foo")); // false
console.log(isRotation(" ", " ")); // true
console.log(isRotation("foobarbaz", "barbazfoo")); // true
console.log(isRotation("foobarbaz", "bazfoobar")); // true
console.log(isRotation("foobarbaz", "bazbarfoo")); // false
