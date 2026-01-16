console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Binary Search on Partition (Binary Search on Answer / Indices)
  Secondary Pattern: Divide and Conquer

  Immediate recognition triggers
  - “two sorted arrays”
  - “median”
  - explicit requirement: O(log(m+n))

  The moment you see that complexity requirement, merging is illegal.
*/

/* 
  ---- Brute Force Approach ----
  Idea: Merge the two arrays into one sorted array, then compute the median.

  Time: O(m + n)
  Space: O(m + n)

  Why it fails
  - Problem explicitly forbids this via the time constraint
  - This solution is correct but not acceptable
*/

function findMedianSortedArrays(nums1, nums2) {
  const merged = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) merged.push(nums1[i++]);
    else merged.push(nums2[j++]);
  }

  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);

  const mid = Math.floor(merged.length / 2);
  return merged.length % 2 === 0
    ? (merged[mid - 1] + merged[mid]) / 2
    : merged[mid];
}

/* 
  ---- Optimized Approach — Binary Search on Partition (Expected) ----
  Core Insight
    - You do not need the full merged array.
    - You only need to split both arrays into left and right halves such that:
      Left half has (m + n + 1) / 2 elements
      All elements in left ≤ all elements in right

  This guarantees the median is at the boundary.

  Time: O(log(min(m, n)))
  Space: O(1)
*/

/* 
  Explanation with this examples (Better understanding)

  “Partition both arrays with a knife cut so the left side has half the elements.
  Only four border values matter.
  If maxLeftX ≤ minRightY and maxLeftY ≤ minRightX, the cut is correct.
  The median is then taken from the border values.”

  odd                                         even
  [1, 3], [2, 5, 8]                           [1,2] [3, 4]

  1 | 3                                       1 | 2
  2 5 | 8                                     3 | 4

  L - [1, 2, 5]                               L - [1, 3]
  R - [3, 8]                                  R - [2, 4]

  1 3 | Infinity                              1 2 | Infinity
  2 | 5 8                                     -Infinity | 3 4

  L - [1, 2, 3]                               L - [1, 2]
  R - [5, 8]                                  R - [3, 4]

  Median = 3 (last number on L)               Median = 2.5 ((last number on L + first number on R) / 2) ((2+3)/2)

  NB: Once the cut is correct, the median is obvious.
*/

const findMedianSortedArrays = (nums1, nums2) => {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1); // always binary search on smaller array
  }

  let m = nums1.length,
    n = nums2.length;
  let low = 0,
    high = m;

  while (low <= high) {
    let partitionX = Math.floor((low + high) / 2);
    let partitionY = Math.floor((m + n + 1) / 2) - partitionX;

    let maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    let minRightX = partitionX === m ? Infinity : nums1[partitionX];

    let maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    let minRightY = partitionY === n ? Infinity : nums2[partitionY];

    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((m + n) % 2 === 0) {
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }
};

// Two-Pointer Walk (Without Extra Space) --- O(m+n) O(1)
const findMedianSortedArrays = function (nums1, nums2) {
  let total = nums1.length + nums2.length;
  let mid1 = Math.floor((total - 1) / 2);
  let mid2 = Math.floor(total / 2);

  let i = 0,
    j = 0,
    count = 0,
    curr,
    prev;

  while (count <= mid2) {
    prev = curr;
    if (i < nums1.length && (j >= nums2.length || nums1[i] < nums2[j])) {
      curr = nums1[i++];
    } else {
      curr = nums2[j++];
    }
    count++;
  }

  return total % 2 === 0 ? (prev + curr) / 2 : curr;
};

console.log(findMedianSortedArrays([1, 3], [2, 5, 8])); // 3
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0])); // 0
console.log(findMedianSortedArrays([], [1])); // 1
console.log(findMedianSortedArrays([2], [])); // 2

/*
  Key Interview Insight
  - We binary search the smaller array to find a partition where the left halves contain exactly 
    half the elements and all left values are less than or equal to all right values.
*/
