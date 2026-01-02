console.clear();

// Node class representing each element in the linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Queue class implemented with a linked list
class Queue {
  constructor() {
    this.head = null; // Points to the front of the queue
    this.tail = null; // Points to the end of the queue
    this.size = 0; // Tracks the size of the queue
  }

  // Enqueue a new value at the end of the queue
  enqueue(value) {
    const newNode = new Node(value);

    if (this.is_empty()) {
      // If queue is empty, both head and tail point to the new node
      this.head = this.tail = newNode;
    } else {
      // Add the new node to the end of the queue and update the tail
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++; // Increment the size of the queue
  }

  // Dequeue the value from the front of the queue
  dequeue() {
    if (this.is_empty()) {
      return null; // Return None if the queue is empty
    }

    const dequeuedValue = this.head.value; // Get the front value
    this.head = this.head.next; // Move the head to the next node

    if (!this.head) {
      // If the queue is now empty, set the tail to null as well
      this.tail = null;
    }

    this.size--; // Decrement the size of the queue
    return dequeuedValue; // Return the dequeued value
  }

  // Checks if the queue is empty
  is_empty() {
    return this.head === null;
  }

  // Returns the size of the queue (not part of original constraints but useful for debugging)
  get_size() {
    return this.size;
  }
}

const queue = new Queue();
queue.enqueue(10);
console.log(queue.head.value); // Output: 10 (head points to first element)
console.log(queue.tail.value); // Output: 10 (tail also points to first element)
console.log(queue.get_size()); // Output: 1
queue.enqueue(20);
console.log(queue.head.value); // Output: 10 (head remains at first element)
console.log(queue.tail.value); // Output: 20 (tail points to newly added element)
console.log(queue.get_size()); // Output: 2

const singleQueue = new Queue();
singleQueue.enqueue(15);
console.log(singleQueue.dequeue()); // Output: 15 (dequeues the only element)
console.log(singleQueue.is_empty()); // Output: true (queue is now empty)

const multiQueue = new Queue();
multiQueue.enqueue(30);
multiQueue.enqueue(40);
multiQueue.enqueue(50);
console.log(multiQueue.dequeue()); // Output: 30 (dequeues the first element)
console.log(multiQueue.head.value); // Output: 40 (head points to next element)
console.log(multiQueue.tail.value); // Output: 50 (tail points to the last element)

const mixedQueue = new Queue();
mixedQueue.enqueue(5);
mixedQueue.enqueue(10);
console.log(mixedQueue.dequeue()); // Output: 5 (dequeue first element)
mixedQueue.enqueue(15);
console.log(mixedQueue.head.value); // Output: 10
console.log(mixedQueue.tail.value); // Output: 15
