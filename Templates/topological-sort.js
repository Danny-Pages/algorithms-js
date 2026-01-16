/* 
    Kahn's Algorithm

    When to use:
    - Course scheduling problems
    - Build order dependencies
    - Task scheduling with prerequisites

    Key concept: Use DFS or BFS to find a valid ordering of nodes in a directed acyclic graph.
*/

function topologicalSort(numNodes, edges) {
  const graph = Array.from({ length: numNodes }, () => []);
  const inDegree = Array(numNodes).fill(0);

  for (const [src, dest] of edges) {
    graph[src].push(dest);
    inDegree[dest]++;
  }

  const queue = [];
  for (let i = 0; i < numNodes; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result = [];
  let idx = 0;

  while (idx < queue.length) {
    const node = queue[idx++];
    result.push(node);

    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result.length === numNodes ? result : [];
}

// Minimal inline version (more common in interviews)

const topoSort = (n, edges) => {
  const g = Array.from({ length: n }, () => []);
  const indeg = Array(n).fill(0);

  for (const [u, v] of edges) {
    g[u].push(v);
    indeg[v]++;
  }

  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);

  const res = [];
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    res.push(u);
    for (const v of g[u]) {
      if (--indeg[v] === 0) q.push(v);
    }
  }

  return res.length === n ? res : [];
};
