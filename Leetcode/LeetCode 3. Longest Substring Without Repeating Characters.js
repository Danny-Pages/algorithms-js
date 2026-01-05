console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Sliding Window (Dynamic / Variable Size)
  Secondary Pattern: Hash Set / Hash Map for frequency or last-seen index

  Immediate recognition triggers
  - “substring” (contiguous)
  - “without repeating”
  - “longest”
  - large input size (s.length ≤ 5 * 10⁴)

  This cannot be brute-forced beyond O(n²) and pass.
*/

/* 
  ---- Brute Force Approach ---
  Idea: Check every possible substring and verify if it contains all unique characters.

  Algorithm
  - Generate all substrings
  - For each substring, check if all characters are unique (using a set)

  Time: O(n²) (worst case: all unique characters)
  Space: O(min(n, charset))

  Why it fails
  - n = 50,000
  - n² = 2.5 * 10⁹ operations → impossible
  - This forces a linear-time solution
*/

function lengthOfLongestSubstring(s) {
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    const set = new Set();
    for (let j = i; j < s.length; j++) {
      if (set.has(s[j])) break;
      set.add(s[j]);
      maxLen = Math.max(maxLen, j - i + 1);
    }
  }

  return maxLen;
}

/* 
  ---- Optimized Approach #1 — Sliding Window + Hash Set (Most Intuitive) ---
  Core Insight
    - Maintain a window where:
      All characters are unique
      Expand right pointer
      Shrink left pointer only when duplicates appear

  Algorithm
  - Use two pointers: left, right
  - Use a Set to track current window characters
  - Move right forward
  - If duplicate: Remove characters from left until duplicate is gone
  - Track max window size

  Time: O(n)
  Space: O(min(n, charset))

  Why this works: Each character enters and leaves the set at most once.
*/

function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLen = 0;
  const set = new Set();

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }

    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

/* 
  ---- Optimized Approach #2 — Sliding Window + Hash Map (Last Seen Index) ---
  Core Insight : Instead of shrinking one step at a time, jump the left pointer 
  past the last occurrence of a duplicate.

  Algorithm
  - Maintain a map: char → lastIndex
  - If current character was seen inside current window: Move left to lastIndex + 1
  - Update max length

  Time: O(n)
  Space: O(min(n, charset))
*/

function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLen = 0;
  const map = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    if (map.has(char) && map.get(char) >= left) {
      left = map.get(char) + 1;
    }

    map.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("")); // 0
console.log(lengthOfLongestSubstring("dvdf")); // 3

/* 
  Trade-off vs Set-based approach

  Set Version	              Map Version
  
  Easier to explain	        More optimal jumps
  Shrinks step-by-step	    Shrinks in one move
  Slightly slower	          Preferred in interviews
*/

// Extra
// Actually return the longest substring itself, not just its length.

// Sliding Window with Set (Track Substring) --- O(n) O(min(n, charset))
function longestSubstringSet(s) {
  let set = new Set();
  let left = 0,
    maxLen = 0,
    start = 0;

  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);

    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
      start = left; // remember start of max window
    }
  }

  return s.substring(start, start + maxLen);
}

// Sliding Window with Map (Efficient Jump) --- O(n) O(min(n, charset))
function longestSubstringMap(s) {
  let map = new Map();
  let left = 0,
    maxLen = 0,
    start = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);

    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1;
      start = left;
    }
  }

  return s.substring(start, start + maxLen);
}

console.log(longestSubstringSet("abcabcbb")); // "abc"
console.log(longestSubstringSet("bbbbb")); // "b"
console.log(longestSubstringMap("pwwkew")); // "wke"
console.log(longestSubstringMap("dvdf")); // "vdf"

/*
  Key Interview Insight
  - This problem is a sliding window because we are optimizing a contiguous range 
    under a dynamic constraint (no duplicates).
*/
