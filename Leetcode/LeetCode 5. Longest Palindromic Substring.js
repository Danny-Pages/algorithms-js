console.clear();

// Expand Around Center (Optimal Practical) --- O(n²) O(1)
const longestPalindrome = function (s) {
  if (s.length <= 1) return s;

  let start = 0,
    maxLen = 1;

  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > maxLen) {
        maxLen = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i); // Odd length
    expandAroundCenter(i, i + 1); // Even length
  }

  return s.substring(start, start + maxLen);
};

// Dynamic Programming --- O(n²) O(n²)
const longestPalindrome2 = function (s) {
  let n = s.length;
  if (n <= 1) return s;

  let dp = Array.from({ length: n }, () => Array(n).fill(false));
  let start = 0,
    maxLen = 1;

  for (let i = 0; i < n; i++) dp[i][i] = true; // single char

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      let j = i + len - 1;
      if (s[i] === s[j]) {
        if (len === 2 || dp[i + 1][j - 1]) {
          dp[i][j] = true;
          if (len > maxLen) {
            start = i;
            maxLen = len;
          }
        }
      }
    }
  }

  return s.substring(start, start + maxLen);
};

// Manacher’s Algorithm (Optimal O(n)) --- O(n) O(n)
const longestPalindrome3 = function (s) {
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

  console.log(p);

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
};

console.log(longestPalindrome3("babad")); // "bab" or "aba"
// console.log(longestPalindrome("cbbd"));  // "bb"
// console.log(longestPalindrome("a"));     // "a"
// console.log(longestPalindrome("ac"));    // "a" or "c"
