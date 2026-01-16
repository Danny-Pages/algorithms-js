console.clear();

class ListNode {
  constructor(value) {
    if (value === null || value === undefined) {
      throw new Error("Cannot insert None/null values into the list.");
    }

    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert a value at the front of the list
  insert(value) {
    if (value === null || value === undefined) {
      throw new Error("Cannot insert None/null values into the list.");
    }
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Append a value at the end of the list
  append(value) {
    if (value === null || value === undefined) {
      throw new Error("Cannot append None/null values into the list.");
    }
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

  // Find a value in the list
  find(value) {
    if (value === null || value === undefined) {
      throw new Error("Cannot find None/null values in the list.");
    }
    let current = this.head;
    while (current !== null) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return null; // If not found
  }

  // Delete a node with a specific value
  delete(value) {
    if (value === null || value === undefined) {
      throw new Error("Cannot delete None/null values from the list.");
    }
    if (this.head === null) {
      return;
    }
    if (this.head.value === value) {
      this.head = this.head.next; // Delete the head node
      return;
    }
    let current = this.head;
    while (current.next !== null) {
      if (current.next.value === value) {
        current.next = current.next.next; // Skip the node to delete it
        return;
      }
      current = current.next;
    }
  }

  // Get the length of the list
  length() {
    let count = 0;
    let current = this.head;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  // Print the list
  print() {
    if (this.head === null) {
      console.log("Empty list");
      return;
    }
    let current = this.head;
    const values = [];
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(" -> "));
  }
}

// Test Cases
const list = new LinkedList();

// Test insert
list.insert(10);
list.insert(20);
list.insert(30);
console.log("After Insert:");
list.print(); // Expected: 30 -> 20 -> 10

// Test append
list.append(40);
list.append(50);
console.log("After Append:");
list.print(); // Expected: 30 -> 20 -> 10 -> 40 -> 50

// Test find
console.log("Find 20:", list.find(20)); // Expected: Node with value 20
console.log("Find 60:", list.find(60)); // Expected: null

// Test delete
list.delete(20);
console.log("After Deleting 20:");
list.print(); // Expected: 30 -> 10 -> 40 -> 50

list.delete(30); // Deleting head
console.log("After Deleting 30 (Head):");
list.print(); // Expected: 10 -> 40 -> 50

list.delete(60); // Trying to delete non-existing element
console.log("After Deleting 60 (Non-existent):");
list.print(); // Expected: 10 -> 40 -> 50

// Test length
console.log("Length of the list:", list.length()); // Expected: 3

// Test printing an empty list
const emptyList = new LinkedList();
emptyList.print(); // Expected: Empty list
