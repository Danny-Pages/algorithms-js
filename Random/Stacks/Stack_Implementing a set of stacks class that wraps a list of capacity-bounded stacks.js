console.clear();

class Stack {
  constructor(capacity) {
    this.capacity = capacity;
    this.stack = [];
  }

  // Push an element onto the stack
  push(value) {
    if (this.stack.length < this.capacity) {
      this.stack.push(value);
    } else {
      throw new Error("Stack is at full capacity");
    }
  }

  // Pop an element from the stack
  pop() {
    if (this.stack.length === 0) {
      return null; // Return null for empty stack
    }
    return this.stack.pop();
  }

  // Peek the top element of the stack
  peek() {
    if (this.stack.length === 0) {
      return null;
    }
    return this.stack[this.stack.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.length === 0;
  }

  // Check if the stack is full
  isFull() {
    return this.stack.length === this.capacity;
  }
}

class SetOfStacks {
  constructor(stackCapacity) {
    this.stackCapacity = stackCapacity;
    this.stacks = [];
  }

  // Push a value onto the SetOfStacks
  push(value) {
    // Create a new stack if no stacks exist or the last one is full
    if (
      this.stacks.length === 0 ||
      this.stacks[this.stacks.length - 1].isFull()
    ) {
      const newStack = new Stack(this.stackCapacity);
      newStack.push(value);
      this.stacks.push(newStack);
    } else {
      // Push onto the last stack
      this.stacks[this.stacks.length - 1].push(value);
    }
  }

  // Pop a value from the SetOfStacks
  pop() {
    if (this.stacks.length === 0) {
      return null; // Return null if no stacks exist
    }
    const lastStack = this.stacks[this.stacks.length - 1];
    const poppedValue = lastStack.pop();

    // If the last stack becomes empty, remove it
    if (lastStack.isEmpty()) {
      this.stacks.pop();
    }

    return poppedValue;
  }

  // Peek the top value of the SetOfStacks
  peek() {
    if (this.stacks.length === 0) {
      return null;
    }
    return this.stacks[this.stacks.length - 1].peek();
  }

  // Check if all stacks are empty
  isEmpty() {
    return this.stacks.length === 0;
  }

  // Get the total number of stacks
  getNumStacks() {
    return this.stacks.length;
  }
}

// Test Cases

const setOfStacks = new SetOfStacks(3);

// Push and pop on an empty stack
console.log(setOfStacks.pop()); // Expected: null

// Push on a non-full stack
setOfStacks.push(1);
setOfStacks.push(2);
setOfStacks.push(3);
console.log(setOfStacks.peek()); // Expected: 3

// Push on a full stack to create a new one
setOfStacks.push(4);
console.log(setOfStacks.getNumStacks()); // Expected: 2
// console.log(setOfStacks.stacks)

// Pop to destroy a stack
console.log(setOfStacks.pop()); // Expected: 4
console.log(setOfStacks.getNumStacks()); // Expected: 1 (stack removed)
console.log(setOfStacks.pop()); // Expected: 3
console.log(setOfStacks.pop()); // Expected: 2
console.log(setOfStacks.pop()); // Expected: 1
console.log(setOfStacks.pop()); // Expected: null (all stacks empty)
