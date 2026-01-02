console.clear();

// Two Stacks (Main + Min Stack) --- O(1) O(n)
var MinStack = function () {
  this.stack = [];
  this.minStack = [];
};

MinStack.prototype.push = function (val) {
  this.stack.push(val);
  if (this.minStack.length === 0 || val <= this.getMin()) {
    this.minStack.push(val);
  }
};

MinStack.prototype.pop = function () {
  let removed = this.stack.pop();
  if (removed === this.getMin()) {
    this.minStack.pop();
  }
};

MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

// Single Stack with Pair Storage --- O(1) O(n)
var MinStack2 = function () {
  this.stack = [];
};

MinStack2.prototype.push = function (val) {
  if (this.stack.length === 0) {
    this.stack.push([val, val]);
  } else {
    let currentMin = this.getMin();
    this.stack.push([val, Math.min(val, currentMin)]);
  }
};

MinStack2.prototype.pop = function () {
  this.stack.pop();
};

MinStack2.prototype.top = function () {
  return this.stack[this.stack.length - 1][0];
};

MinStack2.prototype.getMin = function () {
  return this.stack[this.stack.length - 1][1];
};

// Linked List with Min Tracking (Space Efficient) --- O(1) O(n)
var MinStack3 = function () {
  this.head = null;
};

MinStack3.prototype.push = function (val) {
  if (!this.head) {
    this.head = { val, min: val, next: null };
  } else {
    this.head = {
      val,
      min: Math.min(val, this.head.min),
      next: this.head,
    };
  }
};

MinStack3.prototype.pop = function () {
  if (this.head) this.head = this.head.next;
};

MinStack3.prototype.top = function () {
  return this.head.val;
};

MinStack3.prototype.getMin = function () {
  return this.head.min;
};

let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top()); // 0
console.log(minStack.getMin()); // -2
