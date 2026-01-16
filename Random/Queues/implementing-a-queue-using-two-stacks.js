console.clear();

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

class QueueWithStacks {
  constructor() {
    this.stack1 = new Stack(); // Stack for enqueue
    this.stack2 = new Stack(); // Stack for dequeue
  }

  // O(1)
  enqueue(item) {
    if (item === null) {
      throw new Error("Cannot enqueue null value");
    }
    this.stack1.push(item);
  }

  // O(n) when stack2 is empty, otherwise O(1)
  dequeue() {
    if (this.stack2.isEmpty()) {
      while (!this.stack1.isEmpty()) {
        this.stack2.push(this.stack1.pop());
      }
    }

    if (this.stack2.isEmpty()) {
      throw new Error("Queue is empty");
    }

    return this.stack2.pop();
  }

  peek() {
    if (this.stack2.isEmpty()) {
      while (!this.stack1.isEmpty()) {
        this.stack2.push(this.stack1.pop());
      }
    }

    if (this.stack2.isEmpty()) {
      throw new Error("Queue is empty");
    }

    return this.stack2.peek();
  }

  isEmpty() {
    return this.stack1.isEmpty() && this.stack2.isEmpty();
  }
}

const queue = new QueueWithStacks();
queue.enqueue(1);
console.log(queue.dequeue()); // 1

queue.enqueue(2);
queue.enqueue(3);
console.log(queue.dequeue()); // 2
console.log(queue.dequeue()); // 3

queue.enqueue(4);
queue.enqueue(5);
console.log(queue.dequeue()); // 4
queue.enqueue(6);
console.log(queue.dequeue()); // 5
console.log(queue.dequeue()); // 6

queue.enqueue(7);
console.log(queue.dequeue()); // 7
