console.clear();

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Iterative with Carry --- O(max(m, n)) O(max(m, n))
function addTwoNumbers(l1, l2) {
  let dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry > 0) {
    let sum = carry;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }

    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
  }

  return dummy.next;
}

// Recursive --- O(max(m, n)) O(max(m, n))
function addTwoNumbersRecursive(l1, l2, carry = 0) {
  if (!l1 && !l2 && carry === 0) return null;

  let sum = carry;
  if (l1) sum += l1.val;
  if (l2) sum += l2.val;

  let node = new ListNode(sum % 10);
  node.next = addTwoNumbersRecursive(
    l1 ? l1.next : null,
    l2 ? l2.next : null,
    Math.floor(sum / 10)
  );
  return node;
}

// Convert to Numbers (BigInt Hack) --- O(max(m, n)) O(max(m, n))
function linkedListToNumber(l) {
  let num = "";
  while (l) {
    num = l.val + num; // prepend since list is reversed
    l = l.next;
  }
  return BigInt(num);
}

function numberToLinkedList(num) {
  if (num === 0n) return new ListNode(0);

  let head = null,
    current = null;
  let str = num.toString().split("").reverse();

  for (let digit of str) {
    let node = new ListNode(Number(digit));
    if (!head) {
      head = node;
      current = head;
    } else {
      current.next = node;
      current = current.next;
    }
  }
  return head;
}

function addTwoNumbersBigInt(l1, l2) {
  let n1 = linkedListToNumber(l1);
  let n2 = linkedListToNumber(l2);
  return numberToLinkedList(n1 + n2);
}

// Build input lists [2,4,3] and [5,6,4]
let l1 = new ListNode(2, new ListNode(4, new ListNode(3)));
let l2 = new ListNode(5, new ListNode(6, new ListNode(4)));

// Approach 1
let result1 = addTwoNumbers(l1, l2);
printList(result1); // 7 -> 0 -> 8

// Approach 2
let result2 = addTwoNumbersRecursive(l1, l2);
printList(result2); // 7 -> 0 -> 8

// Approach 3 (BigInt)
let result3 = addTwoNumbersBigInt(l1, l2);
printList(result3); // 7 -> 0 -> 8

// Helper printer
function printList(head) {
  let arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  console.log(arr.join(" -> "));
}
