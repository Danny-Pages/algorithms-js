console.clear();

// Reverse Half the Number (Optimal, No Strings) --- O(log n) O(1)
const isPalindrome = function (x) {
  // ❌ Negative or trailing zero (but not zero itself)
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let reversedHalf = 0;

  // 🌀 Reverse half of the digits
  while (x > reversedHalf) {
    reversedHalf = reversedHalf * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  // ✅ Palindrome if equal (even or odd length)
  return x === reversedHalf || x === Math.floor(reversedHalf / 10);
};

// Convert to String (Simple & Direct) --- O(n) O(n)
const isPalindrome2 = function (x) {
  const s = x.toString();
  return s === s.split("").reverse().join("");
};

console.log(isPalindrome(121));
console.log(isPalindrome2(10));
console.log(isPalindrome2(12321));
console.log(isPalindrome(-121));
