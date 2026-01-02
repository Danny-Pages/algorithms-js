console.clear();

class MinStack {
  constructor() {
    this.stack = []; // Main stack
    this.minStack = []; // Stack to track the minimum value
  }

  // Push a value onto the stack --- O(1)
  push(value) {
    this.stack.push(value);
    // If minStack is empty or value is smaller than or equal to the current min, push it to minStack
    if (this.minStack.length === 0 || value <= this.getMin()) {
      this.minStack.push(value);
    }
  }

  // Pop a value from the stack --- O(1)
  pop() {
    if (this.stack.length === 0) {
      throw new Error("Stack is empty");
    }
    const poppedValue = this.stack.pop();
    // If the popped value is the current minimum, pop it from the minStack as well
    if (poppedValue === this.getMin()) {
      this.minStack.pop();
    }
    return poppedValue;
  }

  // Get the minimum value in the stack --- O(1)
  getMin() {
    if (this.minStack.length === 0) {
      return Number.MAX_SAFE_INTEGER; // Mimics sys.maxsize for an empty stack
    }
    return this.minStack[this.minStack.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.stack.length === 0;
  }
}

// Test Cases

const minStack = new MinStack();

// Test: Push and Min on empty stack
console.log(minStack.getMin()); // Expected: Number.MAX_SAFE_INTEGER

// Push elements and check the minimum
minStack.push(5);
console.log(minStack.getMin()); // Expected: 5

minStack.push(3);
console.log(minStack.getMin()); // Expected: 3

minStack.push(7);
console.log(minStack.getMin()); // Expected: 3

minStack.push(2);
console.log(minStack.getMin()); // Expected: 2

// Pop elements and check the minimum
console.log(minStack.pop()); // Expected: 2 (pop the top element)
console.log(minStack.getMin()); // Expected: 3 (the next minimum)

console.log(minStack.pop()); // Expected: 7
console.log(minStack.getMin()); // Expected: 3

console.log(minStack.pop()); // Expected: 3
console.log(minStack.getMin()); // Expected: 5

console.log(minStack.pop()); // Expected: 5
console.log(minStack.getMin()); // Expected: Number.MAX_SAFE_INTEGER (empty stack)

// Test: Pop on an empty stack -> Error
try {
  minStack.pop(); // Expected: Error (Stack is empty)
} catch (e) {
  console.log(e.message); // Expected: Stack is empty
}
