console.clear();

/** 
 * Traversal Orders Recap

 * In-Order (Left → Root → Right)
 * → For BST, this gives sorted order.

 * Pre-Order (Root → Left → Right)
 * → Useful for copying or serializing a tree.

 * Post-Order (Left → Right → Root)
 * → Useful for deleting/freeing a tree.

 * Time: O(n) for all traversals (visit each node once).
 * Space: O(h) recursion stack, where h = tree height (O(log n) for balanced, O(n) for skewed). 
 */
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }

  insert(val) {
    if (val < this.val) {
      if (this.left) {
        this.left.insert(val);
      } else {
        this.left = new Node(val);
      }
    } else {
      if (this.right) {
        this.right.insert(val);
      } else {
        this.right = new Node(val);
      }
    }
  }
}

// In-Order Traversal (Left → Root → Right)
function inOrder(node, visit_func) {
  if (!node) return;
  inOrder(node.left, visit_func);
  visit_func(node.val);
  inOrder(node.right, visit_func);
}

// Pre-Order Traversal (Root → Left → Right)
function preOrder(node, visit_func) {
  if (!node) return;
  visit_func(node.val);
  preOrder(node.left, visit_func);
  preOrder(node.right, visit_func);
}

// Post-Order Traversal (Left → Right → Root)
function postOrder(node, visit_func) {
  if (!node) return;
  postOrder(node.left, visit_func);
  postOrder(node.right, visit_func);
  visit_func(node.val);
}

// Helper: collect traversal into an array
function collectTraversal(traversalFunc, root) {
  let result = [];
  traversalFunc(root, (val) => result.push(val));
  return result;
}

// Example 1
let root1 = new Node(5);
[2, 8, 1, 3].forEach((v) => root1.insert(v));

console.log("In-Order:", collectTraversal(inOrder, root1)); // [1, 2, 3, 5, 8]
console.log("Pre-Order:", collectTraversal(preOrder, root1)); // [5, 2, 1, 3, 8]
console.log("Post-Order:", collectTraversal(postOrder, root1)); // [1, 3, 2, 8, 5]

// Example 2
let root2 = new Node(1);
[2, 3, 4, 5].forEach((v) => root2.insert(v));

console.log("In-Order:", collectTraversal(inOrder, root2)); // [1, 2, 3, 4, 5]
console.log("Pre-Order:", collectTraversal(preOrder, root2)); // [1, 2, 3, 4, 5]
console.log("Post-Order:", collectTraversal(postOrder, root2)); // [5, 4, 3, 2, 1]
