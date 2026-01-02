console.clear();

// Using a Hashmap (Dictionary) --- O(n) O(n)
const findTwoSumIndices = (nums, target) => {
  if (nums === null) {
    throw new TypeError("Input cannot be null");
  }

  if (!Array.isArray(nums) || nums.length === 0) {
    throw new ValueError("Input array is invalid or empty");
  }

  const numIndices = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (numIndices.has(complement)) {
      return [numIndices.get(complement), i];
    }

    // Store the index of the current number
    numIndices.set(nums[i], i);
  }

  throw new Error(
    "No solution found, which contradicts the given assumptions."
  );
};

// Test cases
console.log(findTwoSumIndices([1, 3, 2, -7, 5], 7)); // [2, 4]
console.log(findTwoSumIndices(null, 7)); // Throws TypeError
console.log(findTwoSumIndices([], 7)); // Throws ValueError
