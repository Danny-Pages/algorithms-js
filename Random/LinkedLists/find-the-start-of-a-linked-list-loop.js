console.clear();

// Floyd's Cycle Detection Algorithm --- O(n) O(1)
// also called Tortoise and Hare Algorithm
class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

function findLoopStart(head) {
  if (head === null || head.next === null) {
    return null; // No loop if list is empty or has only one element
  }

  let slow = head;
  let fast = head;

  // Phase 1: Detect if there is a loop using two pointers
  while (fast !== null && fast.next !== null) {
    slow = slow.next; // Move slow pointer by 1 step
    fast = fast.next.next; // Move fast pointer by 2 steps

    if (slow === fast) {
      // A loop is detected
      break;
    }
  }

  // Check if there was no loop
  if (fast === null || fast.next === null) {
    return null;
  }

  // Phase 2: Find the start of the loop
  slow = head; // Reset slow to the head of the list
  while (slow !== fast) {
    slow = slow.next; // Move slow pointer by 1 step
    fast = fast.next; // Move fast pointer by 1 step
  }

  // Both pointers now meet at the start of the loop
  return slow;
}

// Helper function to create a loop in the list for testing
function createLoop(head, position) {
  if (position === -1) {
    return head;
  }

  let loopStartNode = head;
  let current = head;

  while (position > 0) {
    loopStartNode = loopStartNode.next;
    position--;
  }

  while (current.next !== null) {
    current = current.next;
  }

  current.next = loopStartNode;
  return head;
}

// Helper function to print linked list up to a certain number of nodes to avoid infinite loops
function printLinkedList(head, limit = 20) {
  let current = head;
  let count = 0;
  while (current !== null && count < limit) {
    process.stdout.write(current.value + " -> ");
    current = current.next;
    count++;
  }
  console.log(current ? "..." : "null");
}

// Test Cases
let head1 = new ListNode(3, new ListNode(2, new ListNode(0, new ListNode(-4))));
createLoop(head1, 1); // Creates a loop back to the second node
console.log(findLoopStart(head1)); // Output: Node with value 2

let head2 = new ListNode(1, new ListNode(2));
createLoop(head2, 0); // Creates a loop back to the first node
console.log(findLoopStart(head2)); // Output: Node with value 1

let head3 = new ListNode(1);
console.log(findLoopStart(head3)); // Output: null (no loop)

let head4 = null;
console.log(findLoopStart(head4)); // Output: null (empty list)

let head5 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(findLoopStart(head5)); // Output: null (no loop)
