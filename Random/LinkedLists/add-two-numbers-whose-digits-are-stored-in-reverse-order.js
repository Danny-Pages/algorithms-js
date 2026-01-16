console.clear();

class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

// Reverse Order Addition --- O(max(m, n)) O(max(m, n))
function addTwoNumbers(l1, l2) {
  if (!l1 || !l2) {
    return null; // Return None if any input is None
  }

  let dummyHead = new ListNode(0); // Initialize a dummy head for the result list
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null) {
    // Extract values from the current nodes of l1 and l2, or use 0 if one list is shorter
    let val1 = l1 !== null ? l1.value : 0;
    let val2 = l2 !== null ? l2.value : 0;

    // Calculate the sum and the carry for the next position
    let sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10); // Carry for next addition
    current.next = new ListNode(sum % 10); // Add new node to the result list with the current digit
    current = current.next;

    // Move to the next nodes
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  // If there's still a carry left, add a new node
  if (carry > 0) {
    current.next = new ListNode(carry);
  }

  return dummyHead.next; // Return the next of dummy, which is the actual start of the result list
}

// Helper function to print linked list
function printLinkedList(head) {
  let current = head;
  const result = [];
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  console.log(result);
}

// Test cases
let l1 = new ListNode(6, new ListNode(5)); // 56 in reverse
let l2 = new ListNode(9, new ListNode(8, new ListNode(7))); // 789 in reverse
printLinkedList(addTwoNumbers(l1, l2)); // Output: [5, 4, 8] -> 845 in reverse

let l3 = new ListNode(2, new ListNode(4, new ListNode(3))); // 342 in reverse
let l4 = new ListNode(5, new ListNode(6, new ListNode(4))); // 465 in reverse
printLinkedList(addTwoNumbers(l3, l4)); // Output: [7, 0, 8] -> 807 in reverse

let l5 = null;
let l6 = new ListNode(1, new ListNode(8)); // 81 in reverse
printLinkedList(addTwoNumbers(l5, l6)); // Output: null

let l7 = new ListNode(0);
let l8 = new ListNode(0);
printLinkedList(addTwoNumbers(l7, l8)); // Output: [0]
