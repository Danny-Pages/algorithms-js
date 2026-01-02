console.clear();

/**
 * Time: O(n) (visit each node once)
 * Space: O(w), where w = max width of tree (worst case O(n))
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

// Breadth-First Traversal (Level Order)
function breadthFirst(root, visit_func) {
  if (!root) return;
  let queue = [root];

  while (queue.length > 0) {
    let node = queue.shift(); // dequeue
    visit_func(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}

// Helper to collect traversal
function collectTraversal(traversalFunc, root) {
  let result = [];
  traversalFunc(root, (val) => result.push(val));
  return result;
}

// Example: Insert 5, 2, 8, 1, 3
let root = new Node(5);
[2, 8, 1, 3].forEach((v) => root.insert(v));

console.log("Breadth-First:", collectTraversal(breadthFirst, root));
// Output: [5, 2, 8, 1, 3]
