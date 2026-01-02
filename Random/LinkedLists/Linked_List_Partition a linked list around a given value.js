console.clear();

// Two-List Partitioning --- O(n) O(1)
class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

function partitionList(head, x) {
  if (head === null) {
    return null; // Handle empty list
  }

  // Create two dummy nodes for the left and right partitions
  let leftDummy = new ListNode(0);
  let rightDummy = new ListNode(0);

  // Pointers to the current end of the left and right partitions
  let left = leftDummy;
  let right = rightDummy;

  // Traverse the original list
  let current = head;
  while (current !== null) {
    if (current.value < x) {
      left.next = current; // Append to the left partition
      left = left.next;
    } else {
      right.next = current; // Append to the right partition
      right = right.next;
    }
    current = current.next;
  }

  // Connect the end of the left partition to the beginning of the right partition
  right.next = null; // End the right partition
  left.next = rightDummy.next; // Merge

  return leftDummy.next; // Return the head of the new list
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
  4,
  new ListNode(
    3,
    new ListNode(
      7,
      new ListNode(
        8,
        new ListNode(10, new ListNode(1, new ListNode(10, new ListNode(12))))
      )
    )
  )
);
printLinkedList(partitionList(head1, 10)); // Output: [4, 3, 7, 8, 1, 10, 10, 12]

let head2 = new ListNode(1);
printLinkedList(partitionList(head2, 2)); // Output: [1]

let head3 = new ListNode(2);
printLinkedList(partitionList(head3, 1)); // Output: [2] (right list only)

let head4 = null;
printLinkedList(partitionList(head4, 5)); // Output: [] (empty list)
