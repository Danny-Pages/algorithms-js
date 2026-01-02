console.clear();

// Two Dummy Lists --- O(n) O(1)
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function partition(head, x) {
  let beforeHead = new ListNode(0);
  let before = beforeHead;
  let afterHead = new ListNode(0);
  let after = afterHead;

  while (head !== null) {
    if (head.val < x) {
      before.next = head;
      before = before.next;
    } else {
      after.next = head;
      after = after.next;
    }
    head = head.next;
  }

  after.next = null; // important: terminate list
  before.next = afterHead.next;

  return beforeHead.next;
}

// In-Place Rearrangement with Two Pointers --- O(n) O(1)
function partitionInPlace(head, x) {
  let beforeStart = null,
    beforeEnd = null;
  let afterStart = null,
    afterEnd = null;

  while (head !== null) {
    // [1,4,3,2,5,2]
    let next = head.next;
    head.next = null;

    if (head.val < x) {
      if (!beforeStart) {
        beforeStart = head;
        beforeEnd = head;
      } else {
        beforeEnd.next = head;
        beforeEnd = head;
      }
    } else {
      if (!afterStart) {
        afterStart = head;
        afterEnd = head;
      } else {
        afterEnd.next = head;
        afterEnd = head;
      }
    }

    head = next;
  }

  if (!beforeStart) return afterStart;

  beforeEnd.next = afterStart;
  return beforeStart;
}

// Helper to build list
function buildList(arr) {
  let dummy = new ListNode(0),
    curr = dummy;
  for (let num of arr) {
    curr.next = new ListNode(num);
    curr = curr.next;
  }
  return dummy.next;
}

// Helper to print list
function printList(head) {
  let res = [];
  while (head) {
    res.push(head.val);
    head = head.next;
  }
  return res;
}

// Example
let head = buildList([1, 4, 3, 2, 5, 2]);
let result = partitionInPlace(head, 3);
console.log(printList(result)); // [1,2,2,4,3,5]
