console.clear();

// Brute Force (Check All Substrings) --- O(n³) O(n)
function lengthOfLongestSubstringBrute(s) {
  let maxLen = 0;

  function allUnique(str) {
    let set = new Set(str);
    return set.size === str.length;
  }

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j <= s.length; j++) {
      if (allUnique(s.slice(i, j))) {
        maxLen = Math.max(maxLen, j - i);
      }
    }
  }

  return maxLen;
}

// Sliding Window with Set (Efficient) --- O(n) O(min(n, charset)) (at most 128–256 for ASCII/Unicode subset)
function lengthOfLongestSubstringSet(s) {
  let set = new Set();
  let left = 0,
    maxLen = 0;

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

// Sliding Window with Map (Index Tracking) --- O(n) O(min(n, charset))
// Best in practice – avoids unnecessary deletions.
function lengthOfLongestSubstringMap(s) {
  let map = new Map(); // char -> last index
  let left = 0,
    maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

console.log(lengthOfLongestSubstringBrute("abcabcbb")); // 3
console.log(lengthOfLongestSubstringSet("bbbbb")); // 1
console.log(lengthOfLongestSubstringMap("pwwkew")); // 3
console.log(lengthOfLongestSubstringMap("")); // 0
console.log(lengthOfLongestSubstringMap("dvdf")); // 3

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
