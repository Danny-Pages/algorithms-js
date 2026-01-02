console.clear();

// Node class representing each element in the linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Stack class implemented with a linked list
class Stack {
  constructor() {
    this.head = null; // Represents the top of the stack
    this.size = 0; // Tracks the size of the stack
  }

  // Pushes a new value onto the stack
  push(value) {
    const newNode = new Node(value); // Create a new node
    newNode.next = this.head; // Point the new node to the current head (top)
    this.head = newNode; // Update the head to be the new node (new top)
    this.size++; // Increment size
  }

  // Pops the top value off the stack and returns it
  pop() {
    if (this.is_empty()) {
      return null; // Return None if the stack is empty
    }
    const poppedValue = this.head.value; // Get the value of the current top
    this.head = this.head.next; // Move the head to the next node
    this.size--; // Decrement size
    return poppedValue; // Return the popped value
  }

  // Returns the top value of the stack without removing it
  peek() {
    if (this.is_empty()) {
      return null; // Return None if the stack is empty
    }
    return this.head.value; // Return the top value
  }

  // Checks if the stack is empty
  is_empty() {
    return this.head === null; // True if head is null, indicating an empty stack
  }

  // Returns the size of the stack (not part of original constraints but useful for debugging)
  get_size() {
    return this.size;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.peek()); // Output: 2 (top of stack)
console.log(stack.get_size()); // Output: 2

const emptyStack = new Stack();
console.log(emptyStack.pop()); // Output: null

const singleStack = new Stack();
singleStack.push(1);
console.log(singleStack.pop()); // Output: 1 (popped value)
console.log(singleStack.is_empty()); // Output: true

const multiStack = new Stack();
multiStack.push(1);
multiStack.push(2);
multiStack.push(3);
console.log(multiStack.pop()); // Output: 3 (popped value)
console.log(multiStack.peek()); // Output: 2 (new top value)

const emptyPeekStack = new Stack();
console.log(emptyPeekStack.peek()); // Output: null

const peekStack = new Stack();
peekStack.push(5);
console.log(peekStack.peek()); // Output: 5

const checkEmptyStack = new Stack();
console.log(checkEmptyStack.is_empty()); // Output: true

const nonEmptyStack = new Stack();
nonEmptyStack.push(10);
console.log(nonEmptyStack.is_empty()); // Output: false
