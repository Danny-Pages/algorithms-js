console.clear();

/* 
  --- Pattern Identification ---
  Primary Pattern: Simulation / State Machine
  Secondary Pattern (conditional): Math-based Index Jumping (optimized variant)

  Immediate recognition triggers
  - “written in a zigzag pattern”
  - “read line by line”
  - no sorting, no searching, no optimization constraint beyond correctness

  This is not sliding window, not DP, not greedy.
*/

/* 
  ---- Brute Force Approach ----
  Idea
  - Build the actual zigzag grid (rows × columns)
  - Place characters diagonally
  - Read row by row

  Why This Is Brute Force: You are explicitly modeling a 2D grid you don’t actually need.

  Time: O(n) 
  Space: O(n * numRows) (wasted)

  This passes but is overkill and messy.
  Interviewers don’t like it.
*/

var convert = function (s, numRows) {
  if (numRows === 1) return s;

  const n = s.length;

  // Worst-case column count (safe upper bound)
  const cols = n;

  // Create grid filled with empty strings
  const grid = Array.from({ length: numRows }, () => Array(cols).fill(""));

  let row = 0;
  let col = 0;
  let goingDown = true;

  for (let ch of s) {
    grid[row][col] = ch;

    if (goingDown) {
      // moving straight down
      if (row === numRows - 1) {
        goingDown = false;
        row--;
        col++;
      } else {
        row++;
      }
    } else {
      // moving diagonally up
      if (row === 0) {
        goingDown = true;
        row++;
      } else {
        row--;
        col++;
      }
    }
  }

  // Read row by row
  let result = "";
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== "") {
        result += grid[r][c];
      }
    }
  }

  return result;
};

/* 
  ---- Optimized Approach #1 — Row-by-Row Simulation (Expected) ----
  Core Insight 
  You do not need a grid.

  You only need: 
  - numRows buckets (arrays or strings)
  - A pointer that moves down then up

  This is effectively a directional state machine.

  Algorithm
  - if numRows === 1, return s
  - Create numRows empty arrays
  - Track:
    - currentRow
    - direction (+1 or -1)
  - Append each character to the correct row
  - Flip direction at top and bottom
  - Concatenate rows

  Why this is optimal
  - Single pass
  - Minimal memory
  - Easy to explain
  - Matches constraints perfectly

  This is the canonical interview solution.

  Time: O(n)
  Space: O(n)
*/

var convert = function (s, numRows) {
  if (numRows === 1 || s.length <= numRows) return s;

  let rows = new Array(numRows).fill("").map(() => []);
  let curRow = 0;
  let goingDown = false;

  for (let char of s) {
    rows[curRow].push(char);

    // flip direction at first/last row
    if (curRow === 0 || curRow === numRows - 1) {
      goingDown = !goingDown;
    }

    curRow += goingDown ? 1 : -1;
  }

  return rows.map((r) => r.join("")).join("");
};

/* 
  ---- Optimized Approach #2 — Mathematical Index Jumping (Advanced) ----
  Core Insight 
  - The zigzag repeats every: cycleLen = 2 * numRows - 2
  - Each row pulls characters at predictable intervals.

  Algorithm
  - For each row r:
    - Take characters at indices:
      - i + r
      - i + cycleLen - r (except first & last row)

  Time: O(n)
  Space: O(1) (excluding output)
*/

var convert = function (s, numRows) {
  if (numRows === 1 || s.length <= numRows) return s;

  let res = [];
  let cycleLen = 2 * numRows - 2;

  for (let row = 0; row < numRows; row++) {
    for (let i = row; i < s.length; i += cycleLen) {
      res.push(s[i]);
      // vertical char

      // diagonal char (only for middle rows)
      let diag = i + cycleLen - 2 * row;
      if (row !== 0 && row !== numRows - 1 && diag < s.length) {
        res.push(s[diag]);
      }
    }
  }

  return res.join("");
};

/* 
  Trade-off

  Row Simulation	              Math-Based

  Easier to reason	            Harder to derive
  Safer in interviews	          Risky if rushed
  Preferred	                    Bonus
*/

/*
  Key Interview Insight
  - This is a simulation problem, not a grid problem — we only need to track row movement, not positions.
*/

console.log(convert("PAYPALISHIRING", 3));
console.log(convert("PAYPALISHIRING", 4));
