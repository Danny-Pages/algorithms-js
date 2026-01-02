console.clear();

// Using a Set to Track Duplicates --- O(n) O(n)
class ListNode {
  constructor(value = 0, next = null) {
    this.value = value;
    this.next = next;
  }
}

function removeDuplicatesWithSet(head) {
  if (head === null) {
    return head;
  }

  const seen = new Set();
  let current = head;
  seen.add(current.value); // Add the first node's value

  while (current.next !== null) {
    if (seen.has(current.next.value)) {
      // Duplicate found, skip the next node
      current.next = current.next.next;
    } else {
      // Add the value to the set and move to the next node
      seen.add(current.next.value);
      current = current.next;
    }
  }

  return head;
}

// Without Using Extra Space (Brute Force) Two-pointer O(n^2) O(1)
function removeDuplicatesWithoutExtraSpace(head) {
  if (head === null) {
    return head;
  }

  let current = head;

  while (current !== null) {
    let runner = current;

    while (runner.next !== null) {
      if (runner.next.value === current.value) {
        // Duplicate found, remove the node
        runner.next = runner.next.next;
      } else {
        runner = runner.next;
      }
    }

    current = current.next;
  }

  return head;
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
  new ListNode(2, new ListNode(3, new ListNode(2, new ListNode(4))))
);
removeDuplicatesWithSet(head1); // Modifies the list to [1, 2, 3, 4]
printLinkedList(head1);

let head2 = new ListNode(1);
removeDuplicatesWithSet(head2); // List remains [1]
printLinkedList(head2);

let head3 = null;
removeDuplicatesWithSet(head3); // Remains null
printLinkedList(head3); // Prints []

let head4 = new ListNode(1, new ListNode(1, new ListNode(1)));
removeDuplicatesWithoutExtraSpace(head4); // Modifies the list to [1]
printLinkedList(head4);
