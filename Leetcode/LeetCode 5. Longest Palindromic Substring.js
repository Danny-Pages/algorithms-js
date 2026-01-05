console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Expand Around Center
  Secondary Pattern (conditional)
  - Dynamic Programming
  - Manacher’s Algorithm (advanced / niche)

  Immediate recognition triggers
  - “substring” (contiguous)
  - “palindromic”
  - max length constraint n ≤ 1000

  This constraint is the key.
  It allows O(n²), but not more.
*/

/* 
  ---- Brute Force Approach ---
  Idea: Generate all substrings and check if each is a palindrome.

  Time: O(n³) (O(n²) substrings × O(n) palindrome check)
  Space: O(1) (excluding substring creation)

  Why it fails
  - n = 1000
  - 10⁹ operations worst case
  - Clearly unacceptable
*/

function longestPalindrome(s) {
  let longest = "";

  function isPalindrome(str) {
    let l = 0,
      r = str.length - 1;
    while (l < r) {
      if (str[l++] !== str[r--]) return false;
    }
    return true;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      const substr = s.slice(i, j);
      if (isPalindrome(substr) && substr.length > longest.length) {
        longest = substr;
      }
    }
  }

  return longest;
}

/* 
  ---- Optimized Approach #1 — Expand Around Center (Expected) ---
  Core Insight 
  - Every palindrome: Has a center, Expands symmetrically
  - There are only: n odd-length centers, n - 1 even-length centers
  - Total centers = 2n - 1

  Algorithm
  - For each index i:
    - Expand for odd-length palindromes (i, i)
    - Expand for even-length palindromes (i, i + 1)
  - Track the longest substring found

  Time: O(n²)
  Space: O(1)
*/

function longestPalindrome(s) {
  if (s.length < 2) return s;

  let start = 0;
  let maxLen = 1;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const len = right - left + 1;
      if (len > maxLen) {
        maxLen = len;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i); // odd length
    expand(i, i + 1); // even length
  }

  return s.substring(start, start + maxLen);
}

/* 
  ---- Optimized Approach #2 — Dynamic Programming ---
  Idea 
  - Use a DP table where: dp[i][j] = true if s[i..j] is a palindrome

  Transition:
  - Characters match
  - Inner substring is palindrome

  Time: O(n²)
  Space: O(n²)
*/

function longestPalindrome(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(false));

  let start = 0;
  let maxLen = 1;

  for (let i = 0; i < n; i++) dp[i][i] = true;

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      if (s[i] === s[j] && (len === 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;

        if (len > maxLen) {
          start = i;
          maxLen = len;
        }
      }
    }
  }

  return s.substring(start, start + maxLen);
}

/* 
  ---- Optimized Approach #3 — Manacher’s Algorithm (Advanced) ---
  Very complex
  Almost never expected unless explicitly asked

  Mentioning it shows depth, not required to implement.

  Time: O(n)
  Space: O(n)
*/

function longestPalindrome(s) {
  if (s.length === 0) return "";

  // Transform: add separators (#) to handle even length
  let t = "^#" + s.split("").join("#") + "#$";
  let n = t.length;
  let p = Array(n).fill(0);
  let center = 0,
    right = 0;

  for (let i = 1; i < n - 1; i++) {
    let mirror = 2 * center - i;

    if (i < right) {
      p[i] = Math.min(right - i, p[mirror]);
    }

    // expand around i
    while (t[i + (1 + p[i])] === t[i - (1 + p[i])]) {
      p[i]++;
    }

    // update center and right
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }

  // Find longest palindrome
  let maxLen = 0,
    centerIndex = 0;
  for (let i = 1; i < n - 1; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      centerIndex = i;
    }
  }

  let start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}

console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd")); // "bb"
console.log(longestPalindrome("a")); // "a"
console.log(longestPalindrome("ac")); // "a" or "c"

/*
  Key Interview Insight
  - A palindrome is defined by its center, not its endpoints — expanding from each center avoids redundant checks.
*/
