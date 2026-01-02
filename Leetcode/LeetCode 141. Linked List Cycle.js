console.clear();

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// Hash Set (Extra Space) --- O(n) O(n)
let hasCycle = function (head) {
  let visited = new Set();

  while (head !== null) {
    if (visited.has(head)) return true;
    visited.add(head);
    head = head.next;
  }
  return false;
};

// Floyd’s Cycle Detection (Tortoise & Hare) --- O(n) O(1)
let hasCycle2 = function (head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // cycle detected
  }
  return false;
};

// Modify Nodes (Marking Trick) --- O(n) O(1)
let hasCycle3 = function (head) {
  while (head !== null) {
    if (head.visited) return true;
    head.visited = true;
    head = head.next;
  }
  return false;
};

// Create cycle list: 3 -> 2 -> 0 -> -4 -> (back to 2)
let head = new ListNode(3);
head.next = new ListNode(2);
head.next.next = new ListNode(0);
head.next.next.next = new ListNode(-4);
head.next.next.next.next = head.next; // cycle

console.log(hasCycle2(head)); // true

// Non-cycle list
let single = new ListNode(1);
console.log(hasCycle2(single)); // false
