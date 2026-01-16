console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Linked List Traversal (Simulation)
  Secondary Pattern: Elementary Math (carry handling)

  Immediate recognition triggers
  - “digits stored in reverse order
  - “each node contains a single digit”
  - “add the two numbers”
  - output must also be a linked list

  This is not DP, not recursion-heavy, not two pointers in the usual sense.
  It is digit-by-digit simulation with carry.
*/

/* 
  ---- Brute Force Approach ----
  Idea
  - Convert both linked lists to integers
  - Add the integers
  - Convert the sum back to a linked list

  Why This Is Conceptually Brute Force
  - You are ignoring the structure of the input and forcing a numeric conversion.

  Pseudo-Implementation (Conceptual)
  - Traverse l1, build number
  - Traverse l2, build number
  - Add them
  - Convert result to linked list

  Time: O(n + m)
  Space: O(n + m)

  Why It’s NOT acceptable
  - Numbers can exceed safe integer range
  - JavaScript cannot safely represent large integers here
  - Interviewers explicitly expect list-based addition

  This approach is usually mentioned briefly and discarded.
*/

/* 
  ---- Optimized Approach — Digit-by-Digit Linked List Addition (Expected) ----
  Core Insight
  - This is exactly how manual addition works:
    Add digits
    Carry over when sum ≥ 10
    Move to next node

  The reversed order makes this easier, not harder.

  Algorithm
  - Create a dummy head node
  - Maintain a carry
  - Traverse both lists simultaneously
  - At each step:
    sum = val1 + val2 + carry
    new digit = sum % 10
    carry = Math.floor(sum / 10)
  - Continue until:
    both lists are exhausted
    and carry is zero

  Time: O(max(n, m))
  Space: O(max(n, m))
  (output list; auxiliary space is O(1))
*/

function ListNode(val, next = null) {
  this.val = val;
  this.next = next;
}

function addTwoNumbers(l1, l2) {
  let dummy = new ListNode(0);
  let current = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry !== 0) {
    const x = l1 ? l1.val : 0;
    const y = l2 ? l2.val : 0;

    const sum = x + y + carry;
    carry = Math.floor(sum / 10);

    current.next = new ListNode(sum % 10);
    current = current.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}

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

/*
  Key Interview Insight
  - This problem is not about numbers.
  - It is about simulating elementary addition while traversing two linked lists.

  NB: “We avoid numeric conversion and instead propagate carry node by node”
*/
