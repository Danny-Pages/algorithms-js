/* 
    When to use:
    - Merging overlapping intervals
    - Finding conflicts in schedules
    - Optimizing resource allocation

    Key concept: Sort intervals by start time and then merge or process them sequentially.
*/

function mergeIntervals(intervals) {
  if (!intervals || intervals.length === 0) return [];

  // Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];

  for (const interval of intervals) {
    if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        interval[1]
      );
    }
  }

  return merged;
}

// Minimal inline version (more common in interviews)

const merge = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];

  for (const [start, end] of intervals) {
    if (!res.length || res[res.length - 1][1] < start) {
      res.push([start, end]);
    } else {
      res[res.length - 1][1] = Math.max(res[res.length - 1][1], end);
    }
  }

  return res;
};
