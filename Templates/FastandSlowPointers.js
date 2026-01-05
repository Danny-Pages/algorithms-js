/* 
    Floyd’s Tortoise–Hare Template
    
    When to use:
    - Detecting cycles in a linked list
    - Finding the middle element of a linked list
    - Determining the length of a cycle

    Key concept: Use two pointers moving at different speeds to detect patterns or anomalies.
*/

function fastSlowPointers(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true; // cycle detected
    }
  }

  return false;
}

// Minimal inline version (more common in interviews)

const hasCycle = (head) => {
  let slow = head,
    fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
};
