/* 
    When to use:
    - Finding shortest paths
    - Detecting cycles in a graph
    - Solving maze-related problems

    Key concept: Use DFS or BFS to traverse and analyze graph structures.
*/

function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  let idx = 0;

  while (idx < queue.length) {
    const node = queue[idx++];

    // Process node

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// Minimal inline version (more common in interviews)

const bfs = (g, s) => {
  const vis = new Set([s]);
  const q = [s];

  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    for (const v of g[u] || []) {
      if (!vis.has(v)) {
        vis.add(v);
        q.push(v);
      }
    }
  }
};

// DFS version (recursive)

function dfs(graph, start, visited = new Set()) {
  if (visited.has(start)) return;

  visited.add(start);
  // Process node

  for (const neighbor of graph[start] || []) {
    dfs(graph, neighbor, visited);
  }
}

// DFS version (iterative — stack-based)

function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);

    // Process node

    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
}
