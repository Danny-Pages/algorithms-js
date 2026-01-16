console.clear();

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

// Extra Array (Simple, O(n) space) --- O(n) O(n)
var isPalindrome = function (head) {
  let vals = [];
  while (head) {
    vals.push(head.val);
    head = head.next;
  }

  let left = 0,
    right = vals.length - 1;
  while (left < right) {
    if (vals[left] !== vals[right]) return false;
    left++;
    right--;
  }
  return true;
};

// Reverse Second Half (Optimal O(1) space) --- O(n) O(1)
var isPalindrome2 = function (head) {
  if (!head || !head.next) return true;

  // Step 1: Find middle
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null,
    curr = slow;
  while (curr) {
    let nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  // Step 3: Compare both halves
  let left = head,
    right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
};

// Recursive Check (Elegant but O(n) stack space) --- O(n) O(n)
var isPalindrome = function (head) {
  let frontPointer = head;

  function recursivelyCheck(currentNode) {
    if (currentNode !== null) {
      if (!recursivelyCheck(currentNode.next)) return false;
      if (currentNode.val !== frontPointer.val) return false;
      frontPointer = frontPointer.next;
    }
    return true;
  }

  return recursivelyCheck(head);
};

// Helper to build list
function buildList(arr) {
  let dummy = new ListNode(0);
  let curr = dummy;
  for (let num of arr) {
    curr.next = new ListNode(num);
    curr = curr.next;
  }
  return dummy.next;
}

console.log(isPalindrome(buildList([1, 2, 2, 1]))); // true
console.log(isPalindrome(buildList([1, 2]))); // false
