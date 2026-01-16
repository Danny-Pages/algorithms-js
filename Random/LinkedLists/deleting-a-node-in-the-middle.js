console.clear();

/**
 * NB: given only access to that node not access
 * to the head of the list or the previous node.
 */

// Copy and Paste --- O(1) O(1)
class ListNode {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

function deleteMiddleNode(node) {
  if (node === null || node.next === null) {
    // If the node is the last or the only node, make it a dummy node
    node.value = null;
    node.next = null;
    return;
  }

  // Copy the next node's value into the current node
  node.value = node.next.value;

  // Link to the next-next node
  node.next = node.next.next;
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
let head1 = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
let nodeToDelete1 = head1.next.next; // Node with value 3
deleteMiddleNode(nodeToDelete1);
printLinkedList(head1); // Output: [1, 2, 4, 5]

let head2 = new ListNode(1);
deleteMiddleNode(head2); // Single node should become [None]
printLinkedList(head2); // Output: [None]

let head3 = new ListNode(1, new ListNode(2, new ListNode(3)));
let nodeToDelete2 = head3.next.next; // Node with value 3 (last node)
deleteMiddleNode(nodeToDelete2); // Last node should become dummy
printLinkedList(head3); // Output: [1, 2, None]

let head4 = null;
deleteMiddleNode(head4); // Empty list remains None
printLinkedList(head4); // Output: []
