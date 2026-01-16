console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Math / Digit Manipulation
  Secondary Pattern (conditional): Overflow Checking

  Immediate recognition triggers
  - “reverse digits”
  - “32-bit signed integer”
  - “return 0 on overflow”
  - “no 64-bit integers”

  This is not string-heavy by intent. It is arithmetic.
*/

/* 
  ---- Brute Force Approach ----
  Idea
  - Convert integer to string
  - Reverse string
  - Convert back to number
  - Check bounds

  Time: O(d) where d = number of digits
  Space: O(d)

  NB: O(d) = O(log10​∣x∣)

  Why interviewers don’t love this
  - Avoids the real problem
  - Uses extra memory
  - Still acceptable, but not senior-level
*/

function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  const reversed = parseInt(
    Math.abs(x).toString().split("").reverse().join("")
  );

  const result = sign * reversed;
  if (result < -(2 ** 31) || result > 2 ** 31 - 1) return 0;

  return result;
}

/* 
  ---- Optimized Approach #1 — Pure Math (Expected) ----
  Core Insight 
  - Repeatedly:
    - Pop the last digit
    - Push it onto the reversed number
    - Check overflow before pushing

  Key Overflow Rule (CRITICAL)
  - Before: rev = rev * 10 + digit
  - We must ensure:
    - rev <= (INT_MAX - digit) / 10
    - rev >= (INT_MIN - digit) / 10

  This prevents overflow before it happens.

  Why this is the expected solution
  - No string conversion
  - No extra memory
  - Correct overflow handling
  - Works in constrained environments

  This is what interviewers want to see.

  Time: O(d)
  Space: O(1)

  Why interviewers prefer O(d) here
  - Because the loop is not doing: n → n/2 → n/4 → ...
  - It is doing: remove 1 digit per iteration
  - That’s digit-processing, not value-halving.

  So:
  - Correct but vague: O(log n)
  - Correct and precise: O(d)
*/

function reverse(x) {
  let rev = 0;
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  while (x !== 0) {
    const digit = x % 10;
    x = (x / 10) | 0; // truncate toward zero

    if (
      rev > Math.floor(INT_MAX / 10) ||
      (rev === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return 0;
    }

    if (
      rev < Math.ceil(INT_MIN / 10) ||
      (rev === Math.ceil(INT_MIN / 10) && digit < -8)
    ) {
      return 0;
    }

    rev = rev * 10 + digit;
  }

  return rev;
}

// Recursive Digit Reversal --- O(log |x|) O(log |x|)
var reverse = function (x) {
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;

  function helper(num, rev) {
    if (num === 0) return rev;
    let pop = num % 10;
    num = (num / 10) | 0;

    if (
      rev > Math.floor(INT_MAX / 10) ||
      (rev === Math.floor(INT_MAX / 10) && pop > 7)
    )
      return 0;
    if (
      rev < Math.ceil(INT_MIN / 10) ||
      (rev === Math.ceil(INT_MIN / 10) && pop < -8)
    )
      return 0;

    return helper(num, rev * 10 + pop);
  }

  return helper(x, 0);
};

/*
  Key Interview Insight
  - Reversing digits is easy; preventing overflow before it occurs is the real problem.
*/

console.log(reverse(123)); // 321
console.log(reverse(-123)); // -321
console.log(reverse(120)); // 21
console.log(reverse(1534236469)); // 0 (overflow)
