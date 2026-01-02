console.clear();

// Math (Pop & Push Digits) --- O(log |x|) O(1).
const reverse = function (x) {
  let rev = 0;
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;

  while (x !== 0) {
    let pop = x % 10;
    // JS keeps negatives correctly with %
    x = (x / 10) | 0; // truncate toward 0

    // Check overflow before pushing
    if (
      rev > Math.floor(INT_MAX / 10) ||
      (rev === Math.floor(INT_MAX / 10) && pop > 7)
    )
      return 0;
    if (
      rev < Math.ceil(INT_MIN / 10) ||
      (rev === Math.ceil(INT_MIN / 10) && pop < -8)
    )
      return 0;

    rev = rev * 10 + pop;
  }

  return rev;
};

// String Reversal --- O(n) O(n)
var reverse2 = function (x) {
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;

  let sign = x < 0 ? -1 : 1;
  let revStr = Math.abs(x).toString().split("").reverse().join("");
  let rev = sign * parseInt(revStr);

  return rev < INT_MIN || rev > INT_MAX ? 0 : rev;
};

// Recursive Digit Reversal --- O(log |x|) O(log |x|)
var reverse3 = function (x) {
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;

  function helper(num, rev) {
    if (num === 0) return rev;
    let pop = num % 10;
    num = (num / 10) | 0;

    if (
      rev > Math.floor(INT_MAX / 10) ||
      (rev === Math.floor(INT_MAX / 10) && pop > 7)
    )
      return 0;
    if (
      rev < Math.ceil(INT_MIN / 10) ||
      (rev === Math.ceil(INT_MIN / 10) && pop < -8)
    )
      return 0;

    return helper(num, rev * 10 + pop);
  }

  return helper(x, 0);
};

console.log(reverse(123)); // 321
console.log(reverse2(-123)); // -321
console.log(reverse3(120)); // 21
console.log(reverse(1534236469)); // 0 (overflow)
