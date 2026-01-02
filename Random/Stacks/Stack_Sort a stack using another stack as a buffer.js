console.clear();

// O(n²) O(n)
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

function sortStack(stack) {
  const bufferStack = new Stack(); // Used as a buffer for sorting

  // Continue until all elements from the input stack are sorted into the buffer stack
  while (!stack.isEmpty()) {
    const temp = stack.pop(); // Pop an element from the original stack

    // While bufferStack is not empty and the top of bufferStack is greater than temp
    while (!bufferStack.isEmpty() && bufferStack.peek() > temp) {
      stack.push(bufferStack.pop()); // Move elements back to the original stack
    }

    // Push the temp element in its correct position in bufferStack
    bufferStack.push(temp);
  }

  // Transfer sorted elements from bufferStack back to the original stack if needed
  while (!bufferStack.isEmpty()) {
    stack.push(bufferStack.pop());
  }

  return stack;
}

const stack = new Stack();
// console.log(sortStack(stack)); // Output: Empty stack
stack.push(1);
// console.log(sortStack(stack)); // Output: [1]
stack.push(3);
stack.push(1);
stack.push(2);
stack.push(5);
stack.push(4);
// console.log(sortStack(stack)); // Output: [1, 2, 3, 4, 5] with 5 at the top
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log(sortStack(stack)); // Output: [1, 2, 3, 4] unchanged with 4 at the top
