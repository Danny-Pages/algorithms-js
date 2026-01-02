console.clear();

// Lazy Transfer (Amortized O(1)) --- O(1) O(n)
var MyQueue = function () {
  this.inStack = [];
  this.outStack = [];
};

MyQueue.prototype.push = function (x) {
  this.inStack.push(x);
};

MyQueue.prototype.pop = function () {
  if (this.outStack.length === 0) {
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
  return this.outStack.pop();
};

MyQueue.prototype.peek = function () {
  if (this.outStack.length === 0) {
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
  return this.outStack[this.outStack.length - 1];
};

MyQueue.prototype.empty = function () {
  return this.inStack.length === 0 && this.outStack.length === 0;
};

// Eager Transfer (O(n) push, O(1) pop/peek) --- O(n) O(n)
var MyQueue2 = function () {
  this.inStack = [];
  this.outStack = [];
};

MyQueue2.prototype.push = function (x) {
  while (this.inStack.length > 0) {
    this.outStack.push(this.inStack.pop());
  }
  this.inStack.push(x);
  while (this.outStack.length > 0) {
    this.inStack.push(this.outStack.pop());
  }
};

MyQueue2.prototype.pop = function () {
  return this.inStack.pop();
};

MyQueue2.prototype.peek = function () {
  return this.inStack[this.inStack.length - 1];
};

MyQueue2.prototype.empty = function () {
  return this.inStack.length === 0;
};

// Single Stack + Recursion --- O(n) O(n)
var MyQueue3 = function () {
  this.stack = [];
};

MyQueue3.prototype.push = function (x) {
  this.stack.push(x);
};

MyQueue3.prototype.pop = function () {
  if (this.stack.length === 0) return null;
  let x = this.stack.pop();
  if (this.stack.length === 0) {
    return x;
  } else {
    let res = this.pop();
    this.stack.push(x);
    return res;
  }
};

MyQueue3.prototype.peek = function () {
  let val = this.pop();
  this.stack.push(val);
  return val;
};

MyQueue3.prototype.empty = function () {
  return this.stack.length === 0;
};

let myQueue = new MyQueue();
myQueue.push(1);
myQueue.push(2);
console.log(myQueue.peek()); // 1
console.log(myQueue.pop()); // 1
console.log(myQueue.empty()); // false
