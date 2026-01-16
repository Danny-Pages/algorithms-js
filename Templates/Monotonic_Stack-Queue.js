/* 
    When to use:
    - Finding the next greater/smaller element
    - Solving histogram-related problems
    - Optimizing time complexity in certain array problems

    Key concept: Maintain a stack or queue in monotonic order to efficiently solve problems involving comparisons.
*/

// Monotonic Increasing Stack
function monotonicStack(nums) {
  const stack = []; // stores indices
  const result = Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] > nums[i]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }

  return result;
}

// Monotonic Decreasing Stack (most common)
function nextGreaterElement(nums) {
  const stack = [];
  const res = Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop();
      res[idx] = nums[i];
    }
    stack.push(i);
  }

  return res;
}

// Monotonic Queue --- Used for sliding window min/max.
function maxSlidingWindow(nums, k) {
  const deque = []; // stores indices
  const res = [];

  for (let i = 0; i < nums.length; i++) {
    // remove out-of-window
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // maintain decreasing order
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      res.push(nums[deque[0]]);
    }
  }

  return res;
}
