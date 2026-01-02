console.clear();

// Space complexity --- O(n * k)
class NStacks {
  constructor(stackCount, stackCapacity) {
    // --- O(n * k)
    this.stackCount = stackCount; // Number of stacks
    this.stackCapacity = stackCapacity; // Capacity per stack
    this.array = new Array(stackCount * stackCapacity).fill(null); // Single array for all stacks
    this.topPointers = new Array(stackCount).fill(-1); // Array to track top index for each stack
    this.stackBase = []; // Base index for each stack in the main array

    // Initialize base index for each stack
    for (let i = 0; i < stackCount; i++) {
      this.stackBase[i] = i * stackCapacity;
    }
  }

  // Push to a specific stack --- O(1)
  push(stackIndex, value) {
    if (stackIndex < 0 || stackIndex >= this.stackCount) {
      throw new Error("Invalid stack index");
    }
    if (this.isFull(stackIndex)) {
      throw new Error(`Stack ${stackIndex} is full`);
    }
    const currentTopIndex =
      this.stackBase[stackIndex] + this.topPointers[stackIndex] + 1;
    this.array[currentTopIndex] = value;
    this.topPointers[stackIndex]++;
  }

  // Pop from a specific stack --- O(1)
  pop(stackIndex) {
    if (stackIndex < 0 || stackIndex >= this.stackCount) {
      throw new Error("Invalid stack index");
    }
    if (this.isEmpty(stackIndex)) {
      throw new Error(`Stack ${stackIndex} is empty`);
    }
    const currentTopIndex =
      this.stackBase[stackIndex] + this.topPointers[stackIndex];
    const poppedValue = this.array[currentTopIndex];
    this.array[currentTopIndex] = null;
    this.topPointers[stackIndex]--;
    return poppedValue;
  }

  // Check if a stack is full --- O(1)
  isFull(stackIndex) {
    return this.topPointers[stackIndex] === this.stackCapacity - 1;
  }

  // Check if a stack is empty --- O(1)
  isEmpty(stackIndex) {
    return this.topPointers[stackIndex] === -1;
  }
}

// Test Cases

const stacks = new NStacks(3, 3); // 3 stacks, each with a capacity of 3

// Push to non-full stacks
stacks.push(0, 10); // Stack 0: [10]
stacks.push(1, 20); // Stack 1: [20]
stacks.push(2, 30); // Stack 2: [30]

console.log(stacks.array); // Expected: [10, null, null, 20, null, null, 30, null, null]

// Pop on non-empty stack
console.log(stacks.pop(0)); // Expected: 10 (Stack 0 becomes empty)

// Test pushing more elements
stacks.push(0, 40); // Stack 0: [40]
stacks.push(0, 50); // Stack 0: [40, 50]
stacks.push(0, 60); // Stack 0: [40, 50, 60]
console.log(stacks.array); // Expected: [40, 50, 60, 20, null, null, 30, null, null]

// Push to a full stack -> Exception
try {
  stacks.push(0, 70); // Stack 0 is already full
} catch (e) {
  console.log(e.message); // Expected: Stack 0 is full
}

// Pop on empty stack -> Exception
try {
  stacks.pop(1); // Pop from Stack 1, which has only one element (20)
  stacks.pop(1); // Now Stack 1 is empty, next pop should throw error
} catch (e) {
  console.log(e.message); // Expected: Stack 1 is empty
}
