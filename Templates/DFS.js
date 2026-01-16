/* 
    When to use:
    - Path sum problems
    - Tree diameter calculation
    - Validating binary search trees

    Key concept: Use recursion or a stack to explore branches to their full depth before backtracking.
*/

// Pre-order (Node → Left → Right)
function preorder(root, result = []) {
  if (!root) return result;

  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);

  return result;
}

// In-order (Left → Node → Right)
function inorder(root, result = []) {
  if (!root) return result;

  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);

  return result;
}

// Post-order (Left → Right → Node)
function postorder(root, result = []) {
  if (!root) return result;

  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);

  return result;
}

// Iterative DFS (stack-based)
function dfsIterative(root) {
  if (!root) return [];

  const result = [];
  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);

    // Push right first so left is processed first
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}

// NB: Deep skewed trees can crash recursion
// → Prefer iterative DFS if depth is unbounded.
