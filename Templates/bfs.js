/* 
    When to use:
    - Level-order traversal of a tree
    - Finding the minimum depth of a tree
    - Connecting nodes at the same level

    Key concept: Use a queue to process nodes level by level.
*/

function bfs(root) {
  if (root === null) return [];

  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // dequeue
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// Minimal inline version (more common in interviews)

function bfs(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let idx = 0;

  while (idx < queue.length) {
    const levelSize = queue.length - idx;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[idx++];
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
