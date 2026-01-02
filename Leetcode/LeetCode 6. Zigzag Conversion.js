console.clear();

// O(n) O(n)
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

// O(n) O(1)
var convert2 = function (s, numRows) {
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

console.log(convert("PAYPALISHIRING", 3));
console.log(convert2("PAYPALISHIRING", 4));
