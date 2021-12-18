/*call 的运用，拓展foreach function 用法 */

function expandForEach() {
  // 检测arguments是否为Array的实例
  console.log(
    arguments instanceof Array, //false
    Array.isArray(arguments) //false
  );
  // 判断arguments是否有forEach方法
  console.log(arguments.forEach);
  // undefined
  // 将数组中的forEach应用到arguments上，源码中arguments会强制转化为object
  // 不用担心foreach必须作用于一个数组
  Array.prototype.forEach.call(arguments, function (item) {
    console.log(item); // 1 2 3 4
  });
}
expandForEach(1, 2, 3, 4);

/* call used in inheritance  */

function Animal(name, weight) {
  this.name = name;
  this.weight = weight;
}
function Cat() {
  // 在call中将this作为thisArgs参数传递
  // Animal方法中的this就指向了Cat中的this
  // 所以Animal中的this指向的就是cat对象
  // remember because there is a new keyword
  // 'this'  points to Cat
  // 在Animal中定义了name和weight属性，就相当于在cat中定义了这些属性
  // cat对象便拥有了Animal中定义的属性，从而达到了继承的目的
  Animal.call(this, "cat", "50");
  //Animal.apply(this,['cat','50']);
  this.say = function () {
    console.log("I am " + this.name + ",my weight is " + this.weight);
  };
}
//当通过new运算符产生了cat时，Cat中的this就指向了cat对象
var cat = new Cat();
cat.say();

/* Math.min/max expansion
 Math.min(a,b,c,d,e,....)
 in source code, thisArgs will be spreaded as ...thisArgs
  so [1,4,7] becomes 1,4,7  */

Math.min.apply(null, [1, 4, 7]);

/* call  */
Function.prototype.customizedCall = function (obj) {
  if (typeof this !== "function") {
    throw new Error(this + "is not callable");
  }

  // to judge if a variable is undefined using typeof
  // because undefined can be assigned a new value as undefined = 3
  if (typeof obj === "undefined" || obj === null) {
    obj = global || window;
  }

  let args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  // ES3 change
  obj = new Object(obj);

  // func may not be the unique on the obj
  // Symbol may be the way, but essentially symbol means unique
  // Date.getTime() might do the effects
  const func = Symbol();
  obj[func] = this;
  // spread operator is good ES6
  // you can try new Function() to create the same effects
  let resolve = obj.func(...args);
  delete obj.func;
  // if the master function returns
  return resolve;
};

/*  apply  */
Function.prototype.customizedApply = function (obj, argsArray) {
  if (typeof this !== "function") {
    throw new Error(this + "is not callable");
  }

  // to judge if a variable is undefined using typeof
  // because undefined can be assigned a new value as undefined = 3
  if (typeof obj === "undefined" || obj === null) {
    obj = global || window;
  }

  // ES3 change
  obj = new Object(obj);

  // func may not be the unique on the obj
  // Symbol may be the way, but essentially symbol means unique
  // Date.getTime() might do the effects
  const func = generateUUID();
  obj[func] = this;
  // spread operator is good ES6
  // you can try new Function() to create the same effects
  let funcString = generateFunc(argsArray.length);
  let resolve = new Function(funcString)(obj, func, argsArray);
  delete obj.func;
  // if the master function returns
  return resolve;
};

function generateUUID() {
  return "_" + Date.getTime();
}

// function generateUUID(){
//     var i, random;
//     var uuid = '';
//     for (i = 0; i < 32; i++) {
//         random = Math.random() * 16 | 0;
//         if (i === 8 || i === 12 || i === 16 || i === 20) {
//             uuid += '-';
//         }
//         uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
//             .toString(16);
//     }
//     return uuid;
// }

function generateFunc(length) {
  let str = "return arguments[0][arguments[1]](";
  for (let i = 0; i < length; i++) {
    str += "arguments[2][" + i + "],";
  }
  str = str.substr(0, str.length - 1);
  str += ")";
  return str;
}

/* bind  
  you need to concat arguments, will be mentioned in function curry , when you bind and when you executes the function, arguments can be added
  you need to return a function
  */
Function.prototype.customizedBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;

  var fbound = function () {
    self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  };

  fbound.prototype = Object.create(this.prototype);

  return fbound;
};
