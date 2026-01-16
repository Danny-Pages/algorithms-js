/* 
    When to use:
    - Finding the median in a stream of numbers
    - Scheduling problems
    - Priority queue-related problems

    Key concept: Maintain two heaps, one max-heap and one min-heap, to efficiently track extremes of a dataset.
*/

class Heap {
  constructor(compare) {
    this.data = [];
    this.compare = compare; // returns true if a should be above b
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(val) {
    this.data.push(val);
    this._bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.size() === 1) return this.data.pop();

    const top = this.data[0];
    this.data[0] = this.data.pop();
    this._bubbleDown(0);
    return top;
  }

  _bubbleUp(idx) {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.compare(this.data[idx], this.data[parent])) {
        [this.data[idx], this.data[parent]] = [
          this.data[parent],
          this.data[idx],
        ];
        idx = parent;
      } else break;
    }
  }

  _bubbleDown(idx) {
    const n = this.size();
    while (true) {
      let best = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;

      if (left < n && this.compare(this.data[left], this.data[best])) {
        best = left;
      }
      if (right < n && this.compare(this.data[right], this.data[best])) {
        best = right;
      }

      if (best !== idx) {
        [this.data[idx], this.data[best]] = [this.data[best], this.data[idx]];
        idx = best;
      } else break;
    }
  }
}

// MedianFinder (Two Heaps pattern)
class MedianFinder {
  constructor() {
    // Max heap for smaller half
    this.small = new Heap((a, b) => a > b);

    // Min heap for larger half
    this.large = new Heap((a, b) => a < b);
  }

  addNum(num) {
    if (this.small.size() === this.large.size()) {
      this.small.push(num);
      this.large.push(this.small.pop());
    } else {
      this.large.push(num);
      this.small.push(this.large.pop());
    }
  }

  findMedian() {
    if (this.small.size() === this.large.size()) {
      return (this.small.peek() + this.large.peek()) / 2;
    }
    return this.large.peek();
  }
}
