/* 
    When to use:
    - Searching in a sorted, rotated array
    - Finding a peak element
    - Searching in a 2D sorted matrix

    Key concept: Adapt the traditional binary search algorithm to handle more complex scenarios.
*/

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// Minimal inline version (more common in interviews)

const binarySearch = (arr, x) => {
  let l = 0,
    r = arr.length - 1;

  while (l <= r) {
    const m = l + ((r - l) >> 1);
    if (arr[m] === x) return m;
    arr[m] < x ? (l = m + 1) : (r = m - 1);
  }

  return -1;
};
