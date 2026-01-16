/* 
    When to use:
    - Reversing a linked list or its subparts
    - Reordering linked list elements
    - Detecting palindromes in a linked list

    Key concept: Use multiple pointers to reverse links in-place.
*/

function reverseLinkedList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  return prev;
}

// Minimal inline version (more common in interviews)

const reverseList = (head) => {
  let prev = null,
    curr = head;

  while (curr) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }

  return prev;
};
