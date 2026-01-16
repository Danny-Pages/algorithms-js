console.clear();

// Two-Pointer Technique --- O(n) O(1)
const reverseInPlace = (charList) => {
  if (charList === null) return null; // Handle null input

  let left = 0;
  let right = charList.length - 1;

  while (left < right) {
    // Swap the elements at left and right pointers
    [charList[left], charList[right]] = [charList[right], charList[left]];
    // Move the pointers towards each other
    left++;
    right--;
  }

  return charList;
};

// Test cases
console.log(reverseInPlace(null)); // null
console.log(reverseInPlace([""])); // ['']
console.log(reverseInPlace(["f", "o", "o", " ", "b", "a", "r"])); // ['r', 'a', 'b', ' ', 'o', 'o', 'f']
