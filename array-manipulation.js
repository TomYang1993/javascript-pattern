// Array constructor

let a = new Array(6); //[undefined, undefined ...]
let c = new Array(1, 5, 6, 7, 8);

let d = new Array(0); // []
let e = new Array("4"); // ["4"]

// Array.of only difference from new Array()
a = Array.of(8); // [8]

// Array.from
// create a new array from any object that's iterable, not only arrays
Array.from("abc")[("a", "b", "c")];

// Object literals
let b = [1, 2, 3];

// indexOf

// find

// filter

// some

// includes

//reduce

// push

Array.prototype.customPush = function (...args) {
  // cast back to object
  let obj = Object(this);

  // make sure len/addedLen is integer
  let len = this.length >>> 0;
  let addedLen = args.length >>> 0;

  if (len + addedLEn > 2 ** 53 - 1) {
    throw new TypeError("the number of array over max!");
  }

  for (let i = 0; i < addedLen; i++) {
    obj[i + len] = args[i];
  }

  let newLen = len + addedLen;
  // reset length field
  obj.length = newLen;
  // return new length
  return newLen;
};

// pop

Array.prototype.customPop = function () {
  // cast back to object
  let obj = Object(this);

  // make sure len/addedLen is integer
  let len = this.length >>> 0;

  if (len === 0) {
    return undefined;
  }
  let ele = obj[len - 1];
  delete obj[len - 1];
  len--;
  obj.length = len;
  return ele;
};
