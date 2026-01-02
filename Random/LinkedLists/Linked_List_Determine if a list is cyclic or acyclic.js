console.clear();

class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add a new value at the end of the list
  append(value) {
    const newNode = new ListNode(value);
    if (this.head === null) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Floyd's Cycle Detection Algorithm --- O(n) O(1)
  // also called Tortoise and Hare Algorithm
  // Check if the list is cyclic
  isCyclic() {
    if (this.head === null) return false;

    let slow = this.head;
    let fast = this.head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next;
      // Move slow pointer one step
      fast = fast.next.next;
      // Move fast pointer two steps

      if (slow === fast) {
        return true;
        // Cycle detected
      }
    }
    return false;
    // No cycle
  }
}

// Test Cases
const list = new LinkedList();

// Acyclic List Test
list.append(1);
list.append(2);
list.append(3);
console.log("Is the list cyclic? (Expected: false):", list.isCyclic());
// Expected: false

// Creating a cycle for testing
list.head.next.next.next = list.head.next;
// Making the last node point to the second node

// Cyclic List Test
console.log("Is the list cyclic? (Expected: true):", list.isCyclic());
// Expected: true

// Additional test with an empty list
const emptyList = new LinkedList();
console.log(
  "Is the empty list cyclic? (Expected: false):",
  emptyList.isCyclic()
);
// Expected: false

// Single Node List
const singleNodeList = new LinkedList();
singleNodeList.append(1);
console.log(
  "Is single node list cyclic? (Expected: false):",
  singleNodeList.isCyclic()
);
// Expected: false

// Single Node with Cycle
singleNodeList.head.next = singleNodeList.head;
console.log(
  "Is single node cyclic? (Expected: true):",
  singleNodeList.isCyclic()
);
// Expected: true
