console.clear();

class PriorityQueue {
  constructor() {
    this.heap = []; // The array backing the priority queue (min-heap)
  }

  // Helper method to get the parent index
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // Helper method to get the left child index
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // Helper method to get the right child index
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // Helper method to swap two elements in the heap
  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  // Insert a new key into the priority queue (min-heap) --- O(logn)
  insert(key) {
    this.heap.push(key); // Add the key at the end of the array
    this.heapifyUp(this.heap.length - 1); // Heapify from the bottom up
  }

  // Extract the minimum element from the heap --- O(logn)
  extract_min() {
    if (this.heap.length === 0) return null;

    const min = this.heap[0]; // The root of the heap is the minimum
    const last = this.heap.pop(); // Remove the last element

    if (this.heap.length > 0) {
      this.heap[0] = last; // Replace root with the last element
      this.heapifyDown(0); // Heapify from the top down
    }

    return min;
  }

  // Decrease the key of a specific element (for simplicity, we assume the key exists) --- O(logn)
  decrease_key(oldKey, newKey) {
    const index = this.heap.indexOf(oldKey);
    if (index === -1 || newKey >= this.heap[index]) {
      return null; // If key doesn't exist or the new key is not smaller
    }

    this.heap[index] = newKey; // Update the key
    this.heapifyUp(index); // Heapify up to restore the heap property
  }

  // Heapify up (used after insertion or key decrease)
  heapifyUp(index) {
    let currentIndex = index;
    let parentIndex = this.getParentIndex(currentIndex);

    while (
      currentIndex > 0 &&
      this.heap[currentIndex] < this.heap[parentIndex]
    ) {
      this.swap(currentIndex, parentIndex); // Swap if current node is smaller than its parent
      currentIndex = parentIndex; // Move up to the parent's position
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  // Heapify down (used after extraction of the min)
  heapifyDown(index) {
    let currentIndex = index;
    let leftChildIndex = this.getLeftChildIndex(currentIndex);
    let rightChildIndex = this.getRightChildIndex(currentIndex);

    while (leftChildIndex < this.heap.length) {
      let smallerChildIndex = leftChildIndex;

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[leftChildIndex]
      ) {
        smallerChildIndex = rightChildIndex;
      }

      if (this.heap[currentIndex] <= this.heap[smallerChildIndex]) {
        break; // Heap property satisfied
      }

      this.swap(currentIndex, smallerChildIndex); // Swap with smaller child
      currentIndex = smallerChildIndex; // Move to the child's position
      leftChildIndex = this.getLeftChildIndex(currentIndex);
      rightChildIndex = this.getRightChildIndex(currentIndex);
    }
  }
}

// const pq = new PriorityQueue();
// pq.insert(10);
// pq.insert(20);
// pq.insert(5);
// pq.insert(7);
// console.log(pq.heap); // Output: [5, 7, 10, 20] (min-heap)

// const emptyPQ = new PriorityQueue();
// console.log(emptyPQ.extract_min()); // Output: null (no elements to extract)

// const pq = new PriorityQueue();
// pq.insert(10);
// pq.insert(20);
// pq.insert(5);
// console.log(pq.extract_min()); // Output: 5 (smallest element)
// console.log(pq.heap);          // Output: [10, 20]

const pq = new PriorityQueue();
pq.insert(15);
pq.insert(10);
pq.insert(25);
pq.insert(5);
pq.decrease_key(25, 2); // Decrease key of 25 to 2
console.log(pq.heap); // Output: [2, 5, 15, 10]

// const pq = new PriorityQueue();
// pq.insert(10);
// pq.insert(20);
// pq.decrease_key(15, 5);       // Invalid key (doesn't exist)
// console.log(pq.heap);         // Output: [10, 20] (no change)
