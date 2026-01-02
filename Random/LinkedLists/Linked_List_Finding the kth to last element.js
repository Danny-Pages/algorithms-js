console.clear();

// Two-Pointer Technique --- O(n) O(1)
class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

function findKthToLast(head, k) {
  if (head === null || k < 0) {
    return null; // Handle invalid inputs
  }

  let first = head;
  let second = head;

  // Move the first pointer k steps ahead
  for (let i = 0; i < k; i++) {
    if (first === null) {
      return null; // k is greater than or equal to the length of the list
    }
    first = first.next;
  }

  // Move both pointers until the first reaches the end
  while (first !== null && first.next !== null) {
    first = first.next;
    second = second.next;
  }

  // If first pointer has reached the end, second pointer is at the k-th to last element
  return second;
}

// Helper function to print the k-th to last element value
function printKthToLastElement(head, k) {
  const node = findKthToLast(head, k);
  if (node) {
    console.log(node.value);
  } else {
    console.log("None");
  }
}

// Test cases
let head1 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
printKthToLastElement(head1, 0); // Output: 5 (last element)
printKthToLastElement(head1, 2); // Output: 3 (3rd from last)

let head2 = new ListNode(1);
printKthToLastElement(head2, 0); // Output: 1 (only element)

let head3 = null;
printKthToLastElement(head3, 0); // Output: None (empty list)

let head4 = new ListNode(1, new ListNode(2));
printKthToLastElement(head4, 3); // Output: None (k >= length of list)
