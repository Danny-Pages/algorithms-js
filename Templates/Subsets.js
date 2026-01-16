/* 
    When to use:
    - Generating all subsets of a set
    - Creating permutations of a string
    - Solving combination sum problems

    Key concept: Use recursion or bit manipulation to generate all possible combinations.
*/

function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// Minimal inline version (more common in interviews)

const subsets = (nums) => {
  const res = [];

  const dfs = (idx, path) => {
    res.push([...path]);

    for (let i = idx; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1, path);
      path.pop();
    }
  };

  dfs(0, []);
  return res;
};
