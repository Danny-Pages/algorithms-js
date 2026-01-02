console.clear();

/**
 * Time: O(n) → visit each node once.
 * Space: O(h) recursion stack → h is height of tree (O(log n) for balanced, O(n) for skewed).
 */
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }

  insert(val) {
    if (val < this.val) {
      if (this.left) this.left.insert(val);
      else this.left = new Node(val);
    } else {
      if (this.right) this.right.insert(val);
      else this.right = new Node(val);
    }
  }
}

// Compute height of a tree
function treeHeight(root) {
  if (!root) return 0;
  return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
}

// Case 1: Single node tree
let root1 = new Node(5);
console.log(treeHeight(root1)); // 1

// Case 2: 5, 2, 8, 1, 3
let root2 = new Node(5);
[2, 8, 1, 3].forEach((v) => root2.insert(v));
console.log(treeHeight(root2)); // 3
