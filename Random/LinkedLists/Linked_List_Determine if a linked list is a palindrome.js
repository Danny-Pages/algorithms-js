console.clear();

class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Two-Pointer and Reversal Method --- O(n) O(1)
function isPalindrome(head) {
  if (head === null || head.next === null) {
    return false; // A single element or empty list isn't considered a palindrome
  }

  let slow = head;
  let fast = head;

  // Find the midpoint (slow will be at the midpoint)
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse the second half of the list
  let reversedSecondHalf = reverseList(slow);

  // Compare the first half and the reversed second half
  let firstHalfPointer = head;
  let secondHalfPointer = reversedSecondHalf;

  while (secondHalfPointer !== null) {
    if (firstHalfPointer.value !== secondHalfPointer.value) {
      return false;
    }
    firstHalfPointer = firstHalfPointer.next;
    secondHalfPointer = secondHalfPointer.next;
  }

  // Optionally restore the original list by reversing the second half back
  reverseList(reversedSecondHalf);

  return true;
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    let nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }

  return prev;
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Test Cases
let list1 = createLinkedList([]); // Empty list
console.log(isPalindrome(list1)); // Output: false

let list2 = createLinkedList([1]); // Single element list
console.log(isPalindrome(list2)); // Output: false

let list3 = createLinkedList([1, 2]); // Not a palindrome
console.log(isPalindrome(list3)); // Output: false

let list4 = createLinkedList([1, 2, 2, 1]); // Even length palindrome
console.log(isPalindrome(list4)); // Output: true

let list5 = createLinkedList([1, 2, 3, 2, 1]); // Odd length palindrome
console.log(isPalindrome(list5)); // Output: true

let list6 = createLinkedList([1, 2, 3]); // Not a palindrome
console.log(isPalindrome(list6)); // Output: false

/*
Approach 2: Stack-Based Approach

Using a stack, we can store the first half of the linked list 
and then compare it with the second half.

1. Traverse the linked list with a slow and fast pointer.

2. Push elements encountered by the slow pointer onto the stack until the fast pointer reaches the end.

3. Continue moving the slow pointer, popping from the stack, and comparing values for a palindrome check.

This approach uses O(n) additional space due to the stack but is simpler to implement.
*/
