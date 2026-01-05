/* 
    When to use:
    - Searching pairs in a sorted array
    - Comparing elements from both ends of an array
    - Removing duplicates or filtering elements

    Key concept: Utilize two pointers, often at opposite ends of the array, moving them based on specific conditions.
*/

function twoPointers(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Process elements at arr[left] and arr[right]

    if (conditionMet(arr[left], arr[right])) {
      // Do something
      left++;
      right--;
    } else if (needToMoveLeft(arr[left], arr[right])) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}

// Minimal inline version (more common in interviews)

// function twoPointers(arr) {
//   let left = 0;
//   let right = arr.length - 1;
//   let result;

//   while (left < right) {
//     if (/* condition met */) {
//       // update result
//       left++;
//       right--;
//     } else if (/* move left */) {
//       left++;
//     } else {
//       right--;
//     }
//   }

//   return result;
// }
