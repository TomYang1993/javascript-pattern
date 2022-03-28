console.log("Hello World!");

function add(a, b, c, d, e) {
  console.log(arguments);
  if (arguments.length == 0) return 0;
  return [...arguments].reduce((prev, cur) => prev + cur);
}

// console.log(add(1, 2, 3, 4, 5));

function curryCustom(fn) {
  // args.length can be 1,2,3
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return (...moreArgs) => curried(...args, ...moreArgs);
    }
  };
}

// function curryCustom(func) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args);
//     } else {
//       return function (...args2) {
//         return curried.apply(this, args.concat(args2));
//       };
//     }
//   };
// }

// let newSum = curryCustom(add);
// console.log(newSum);

// let test = newSum(1)(2, 4)(3)(5);
// console.log(test);

// function curry(fn) {
//     return function inner(...args){
//         if([...args].length > 0){
//             return inner(...args)
//         }else{
//             return fn.apply()
//         }
//     }
// }

function infiniteCurry(fn) {
  // args.length can be 1,2,3
  const curried = (...args) => {
    return (...params) => {
      console.log(params)
      if (params.length === 0) {
        console.log("empty array is true", params)
        return args.reduce((acc, a) => {
          return fn.call(fn, acc, a)
        }, 0);
      } else {
        return curried(...args, ...params);
      }
    }
  };
  return curried();
}

// const infiniteCurry = fn => {
//   const next = (...args) => {
//     console.log("arguments avl",args);
//     return z => {
//       console.log("x value",z);
//       if (!z) {
//         return args.reduce((acc, a) => {
//           return fn.call(fn, acc, a)
//         }, 0);
//       }
//       return next(...args, z);
//     };
//   };
//   return next();
// };

const iSum = infiniteCurry((x, y) => x + y);
console.log(iSum(1)(3)(4,8)(2)());
