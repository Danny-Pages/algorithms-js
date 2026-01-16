/* 
    When to use:
    - Finding subarrays or substrings that meet certain conditions
    - Calculating a running average or sum
    - Solving string problems with constraints on characters

    Key concept: Maintain a window of elements, expanding or contracting it based on problem conditions.
*/

function slidingWindow(arr) {
  let left = 0;
  let windowSum = 0;
  let result = 0;

  for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right];

    while (conditionNotMet(windowSum, left, right)) {
      windowSum -= arr[left];
      left++;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

// Minimal inline version (more common in interviews)

// function slidingWindow(arr) {
//   let left = 0;
//   let sum = 0;
//   let maxLen = 0;

//   for (let right = 0; right < arr.length; right++) {
//     sum += arr[right];

//     while (/* window invalid */) {
//       sum -= arr[left];
//       left++;
//     }

//     maxLen = Math.max(maxLen, right - left + 1);
//   }

//   return maxLen;
// }

// Fixed-size window (no while)

function fixedWindow(arr, k) {
  let sum = 0;
  let max = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];

    if (i >= k - 1) {
      max = Math.max(max, sum);
      sum -= arr[i - k + 1];
    }
  }

  return max;
}

// Frequency-based window (strings / chars)

// function slidingWindowFreq(s) {
//   let left = 0;
//   let freq = new Map();
//   let maxLen = 0;

//   for (let right = 0; right < s.length; right++) {
//     freq.set(s[right], (freq.get(s[right]) || 0) + 1);

//     while (/* invalid */) {
//       freq.set(s[left], freq.get(s[left]) - 1);
//       if (freq.get(s[left]) === 0) freq.delete(s[left]);
//       left++;
//     }

//     maxLen = Math.max(maxLen, right - left + 1);
//   }

//   return maxLen;
// }
