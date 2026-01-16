/* 
    When to use:
    - Optimization problems (e.g., maximum/minimum path sum)
    - Counting problems (e.g., number of ways to reach a target)
    - String manipulation problems (e.g., longest common subsequence)

    Key concept: Break down complex problems into simpler subproblems and store their solutions to avoid redundant calculations.
*/

function dynamicProgramming(n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// Minimal inline version (more common in interviews)

const fib = (n) => {
  if (n <= 1) return 1;

  const dp = Array(n + 1);
  dp[0] = dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};
