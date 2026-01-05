console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Hashmap / Complement Lookup
  Secondary Pattern (conditional): Two Pointers (NB: only if the array is sorted or sorting is allowed)

  Immediate recognition triggers
  - “add up to target”
  - “return indices”
  - “exactly one solution”
  - “cannot reuse same element”

  This immediately rules out greedy and DP and points to lookup optimization.
*/

/* 
  ---- Brute Force Approach ---
  Idea: Check every pair of indices (i, j) and see if nums[i] + nums[j] === target.
  
  Algorithm: Two nested loops (Ensure i !== j)

  Time: O(n²)
  Space: O(1)
*/

function twoSum(nums, target) {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

/* 
  ---- Optimized Approach #1 — Hash Map (Expected Solution) ---
  Core Insight: Instead of checking all pairs, remember what you’ve already seen and look for the complement.

  For each number x, you need: (target - x)
  If it already exists, you’re done.

  Algorithm
  - Create a hash map: value → index
  - Loop through array once
  - For each number:
    - Compute needed = target - nums[i]
    - If needed exists in map → return indices
    - Else, store current number and index

  Time: O(n)
  Space: O(n)

  Why this is optimal
  - Single pass
  - No sorting
  - Preserves original indices
  - Matches follow-up requirement

  This is the canonical interview answer.
*/

function twoSum(nums, target) {
  const map = new Map(); // value -> index

  for (let i = 0; i < nums.length; i++) {
    const needed = target - nums[i];

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(nums[i], i);
  }
}

/* 
  ---- Optimized Approach #2 — Sorting + Two Pointers (Conditional) ---
  This is not acceptable unless:
  - Sorting is explicitly allowed
  - Or indices are not required

  Idea
  - Sort array with original indices
  - Use two pointers (left, right)
  - Move pointers based on sum

  Time: O(n log n) (sorting dominates)
  Space: O(n) (index preservation)

  Trade-off
  - Slower than hash map
  - More complex
  - Only useful if hash maps are disallowed
*/

function twoSum(nums, target) {
  const arr = nums.map((val, idx) => [val, idx]);
  arr.sort((a, b) => a[0] - b[0]);

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left][0] + arr[right][0];

    if (sum === target) {
      return [arr[left][1], arr[right][1]];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}

// Test cases
console.log(twoSum([1, 3, 2, -7, 5], 7)); // [2, 4]
console.log(twoSum(null, 7)); // Throws TypeError
console.log(twoSum([], 7)); // Throws ValueError

/*
  Key Interview Insight
  - The brute force fails because it repeats pair checks.
  - The hash map solution is inevitable because the problem is fundamentally about complement lookup.
*/
