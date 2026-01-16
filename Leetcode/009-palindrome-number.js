console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Math / Digit Manipulation
  Secondary Pattern (conditional): Two Pointers (conceptual, digit-level)

  Immediate recognition triggers
  - “palindrome”
  - integer input
  - follow-up explicitly forbids string conversion

  This is not about strings by design.
*/

/* 
  ---- Brute Force Approach ----
  Idea
  - Convert the integer to a string
  - Compare the string with its reverse

  Time: O(d) (number of digits)
  Space: O(d)

  NB: O(d) = O(log10​∣x∣)

  Why this is weak
  - Uses extra memory
  - Avoids the follow-up
  - Acceptable for Easy, but not impressive
*/

function isPalindrome(x) {
  if (x < 0) return false;

  const s = x.toString();
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }

  return true;
}

/* 
  ---- Optimized Approach #1 — Reverse Half of the Number (Expected) ----
  Core Insight 
  - You do not need to reverse the entire number.
  - A palindrome mirrors around its center:
    - Reverse only half
    - Compare first half with reversed second half
  - This:
    - Avoids overflow
    - Uses constant space

  Key Observations
  - Negative numbers → always false
  - Numbers ending in 0 (except 0) → false
  - Stop when reversed half ≥ remaining half

  Algorithm
  - Reject negatives and numbers ending in 0 (except 0)
  - Build reversedHalf digit by digit
  - Stop when reversedHalf >= x
  - Compare:
    - even digits → x === reversedHalf
    - odd digits → x === Math.floor(reversedHalf / 10)

  Time: O(d)
  Space: O(1)

  Why this is optimal
  - No string conversion
  - No overflow risk
  - Minimal work
  - Exactly matches the follow-up

  This is the senior-level answer.
*/

const isPalindrome = function (x) {
  // ❌ Negative or trailing zero (but not zero itself)
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let reversedHalf = 0;

  // 🌀 Reverse half of the digits
  while (x > reversedHalf) {
    const digit = x % 10;
    reversedHalf = reversedHalf * 10 + digit;
    x = Math.floor(x / 10);
  }

  // ✅ Palindrome if equal (even or odd length)
  return x === reversedHalf || x === Math.floor(reversedHalf / 10);
};

// Convert to String (Simple & Direct) --- O(n) O(n) (still brute-force)
const isPalindrome2 = function (x) {
  const s = x.toString();
  return s === s.split("").reverse().join("");
};

console.log(isPalindrome(121));
console.log(isPalindrome2(10));
console.log(isPalindrome2(12321));
console.log(isPalindrome(-121));

/*
  Key Interview Insight
  - A palindrome only needs half of its digits reversed — reversing the full number is unnecessary work.
*/
