console.clear();

// Binary Search Partitioning (Optimal ✅) --- O(log(min(m,n))) O(1)
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

// Merge Like MergeSort (Brute Force) --- O(m+n) O(m+n)
const findMedianSortedArrays2 = function (nums1, nums2) {
  let merged = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) merged.push(nums1[i++]);
    else merged.push(nums2[j++]);
  }
  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);

  let mid = Math.floor(merged.length / 2);
  if (merged.length % 2 === 0) {
    return (merged[mid - 1] + merged[mid]) / 2;
  } else {
    return merged[mid];
  }
};

// Two-Pointer Walk (Without Extra Space) --- O(m+n) O(1)
const findMedianSortedArrays3 = function (nums1, nums2) {
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

console.log(findMedianSortedArrays([1, 3], [2, 5, 8])); // 2
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5
console.log(findMedianSortedArrays([0, 0], [0, 0])); // 0
console.log(findMedianSortedArrays([], [1])); // 1
console.log(findMedianSortedArrays([2], [])); // 2
