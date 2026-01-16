/* 
    When to use:
    - Finding missing numbers
    - Detecting duplicates in a specific range
    - Rearranging elements in-place

    Key concept: Utilize the fact that array elements are in a specific range to sort or identify anomalies efficiently.
*/

function cyclicSort(nums) {
  let i = 0;

  while (i < nums.length) {
    const correctPos = nums[i] - 1;

    if (nums[i] !== nums[correctPos]) {
      [nums[i], nums[correctPos]] = [nums[correctPos], nums[i]];
    } else {
      i++;
    }
  }

  return nums;
}

// Minimal inline version (more common in interviews)

const cyclicSort = (nums) => {
  let i = 0;

  while (i < nums.length) {
    const j = nums[i] - 1;
    nums[i] !== nums[j] ? ([nums[i], nums[j]] = [nums[j], nums[i]]) : i++;
  }

  return nums;
};
