/* 
    When to use:
    - Finding a missing number in a sequence
    - Detecting a single number in a set of pairs
    - Swapping numbers without using a temporary variable

    Key concept: Leverage the properties of XOR operation to solve problems efficiently.
*/

function findSingleNumber(nums) {
  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}

// Minimal inline version (more common in interviews)

const singleNumber = (nums) => nums.reduce((acc, n) => acc ^ n, 0);
