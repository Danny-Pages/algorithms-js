console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: String Parsing / Finite State Machine
  Secondary Pattern (conditional): Math + Overflow Handling

  Immediate recognition triggers
  - “ignore whitespace”
  - “optional sign”
  - “stop at first non-digit”
  - “clamp to 32-bit range”

  This is not regex, not DP, not greedy.
  It is a step-by-step parser.
*/

/* 
  ---- Brute Force Approach ----
  Idea
  - Trim string
  - Use parseInt
  - Clamp result

  Time: O(n)
  Space: O(1)

  Why this is not acceptable
  - Violates the spirit of the problem
  - Ignores step-by-step rules
  - Fails edge cases in strict interview environments
  - This solution gets rejected in serious interviews.
*/

function myAtoi(s) {
  const num = parseInt(s, 10);
  if (isNaN(num)) return 0;

  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  return Math.min(Math.max(num, INT_MIN), INT_MAX);
}

/* 
  ---- Optimized Approach #1 — Manual Parsing (Expected) ----
  Core Insight 
  - This problem is a controlled character stream:
    - Skip whitespace
    - Read sign
    - Read digits
    - Stop early
    - Clamp on overflow

  You must build the number digit by digit.

  Overflow Rule (Critical)
  - Before doing: num = num * 10 + digit
  - Check: num > (INT_MAX - digit) / 10
  
  This prevents overflow before it happens.

  Time: O(n)
  Space: O(1)

  Why This Is the Correct Mental Model
  - This problem is not about converting strings.
  - It is about building a deterministic parser that:
    - follows strict rules
    - stops early
    - defends against overflow
*/

const myAtoi = function (s) {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  let i = 0,
    sign = 1,
    num = 0;

  // 1️⃣ Skip leading whitespace
  while (i < s.length && s[i] === " ") i++;

  // 2️⃣ Check for sign
  if ((i < s.length && s[i] === "+") || s[i] === "-") {
    sign = s[i] === "-" ? -1 : 1;
    i++;
  }

  // 3️⃣ Parse digits
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    const digit = s[i].charCodeAt(0) - "0".charCodeAt(0);

    // Overflow control before adding digit
    if (
      num > Math.floor(INT_MAX / 10) ||
      (num === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    num = num * 10 + digit;
    i++;
  }

  return num * sign;
};

// Using Regular Expressions (Concise but less educational) --- O(n) O(1)
const myAtoi = function (s) {
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  const match = s.trim().match(/^([+-]?\d+)/);
  if (!match) return 0;

  const num = Number(match[1]);

  if (num > INT_MAX) return INT_MAX;
  if (num < INT_MIN) return INT_MIN;

  return num;
};

// Manual Character Code Handling (For deeper control) --- O(n) O(1)
const myAtoi = function (s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  let i = 0,
    sign = 1,
    res = 0;
  const n = s.length;

  // Skip whitespace
  while (i < n && s.charCodeAt(i) === 32) i++;

  // Sign check
  if (i < n && (s[i] === "-" || s[i] === "+")) {
    sign = s[i] === "-" ? -1 : 1;
    i++;
  }

  // Build number from digits
  while (i < n) {
    const code = s.charCodeAt(i) - 48; // '0' = 48
    if (code < 0 || code > 9) break;

    // Check overflow
    if (
      res > Math.floor(INT_MAX / 10) ||
      (res === Math.floor(INT_MAX / 10) && code > 7)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    res = res * 10 + code;
    i++;
  }

  return res * sign;
};

/*
  Key Interview Insight
  - Treat the input as a character stream and move through clearly defined states: 
    whitespace → sign → digits → stop.
*/

console.log(myAtoi("42")); // 42
console.log(myAtoi("   -042")); // -42
console.log(myAtoi("1337c0d3")); // 1337
console.log(myAtoi("0-1")); // 0
console.log(myAtoi("words and 987")); // 0
console.log(myAtoi("91283472332")); // 2147483647 (overflow)
