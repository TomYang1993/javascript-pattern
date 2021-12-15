/* Object.assign() */
Object.defineProperty(Object, "assign", {
  value: function assign(target, source) {
    if (target == null) {
      throw TypeError("can not convert null to object you know");
    }

    let to = Object(target); // to do find out why
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      if (source !== null) {
        // for in go through enumerable properties including inherited ones
        for (let property in source) {
          /* object assign only copy enumerable and own properties from a source object
                    call on object prototype here is because hasOwnProperty might be shadowed */
          if (Object.prototype.hasOwnProperty.call(source, property)) {
            to[property] = source[property];
          }
        }
      }
    }

    return to;
  },
  writable: true,
  configurable: true,
});

let testObj = Object.assign({}, { a: 5 }, { B: 4, c: 89 });
console.log(testObj);

/* Object.create() easy version, not actual implementation
 create a new object based on the parameter passed in 
 create a temp F as a proxy, so child can only inherit reusable method, but will not
 inherit anything from the new Parent() instance which is normally set up as properties of this,
 because child's prototype is new F() and then Parent.prototype instead of new Parent() then Parent.prototype */

Object.defineProperty(Object, "create", {
  value: function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  },
});

/* 
Object.create(proto, propertiesObject)
propertiesObject Optional
If specified and not undefined, an object whose enumerable own properties 
(that is, those properties defined upon itself and not enumerable properties along its prototype chain)
 specify property descriptors to be added to the newly-created object, with the corresponding property names.
  These properties correspond to the second argument of Object.defineProperties().*/
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

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

// customized new function

function customizedNew(ctor, ...args) {
  if (typeof ctor !== "function") {
    return "constructor must be a function!";
  } 
  let obj = new Object();

  // instance can access properties on prototype
  obj.__proto__ = ctor.prototype;
  // 1. instance can access private properties
  let result = ctor.call(obj, ...args);
  // it always return an object
  let isObject = typeof result === "object" && result !== null;
  let isFunction = typeof result === "function";
  return isObject || isFunction ? result : obj;
}

/* create your own constructor 
enable the new constructor to construct object using arguments list */

Function.prototype.construct = function (args) {
  let oldFunc = this;
  function newFunc() {
    // apply for an array, call for a variable
    oldFunc.apply(this, args);
  }
  newFunc.prototype = oldFunc.prototype;
  return new newFunc();
};

// Function.prototype.construct = function(args){
//     let newF = Object.create(this.prototype);
//     this.call(newF,args)
//     return newF
// }

function MyConstructor() {
  for (let nProp = 0; nProp < arguments.length; nProp++) {
    this["property" + nProp] = arguments[nProp];
  }
}

var myArray = [4, "Hello world!", false];
var myInstance = MyConstructor.construct(myArray); //Fix MyConstructor.construct is not a function

console.log(myInstance.property0);
console.log(myInstance.property1);
console.log(myInstance.property2);
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor);

/* find properties through the prototype chain  */

function lookupProperty(obj, propertyName) {
  let current = obj;
  if (current == null) {
    throw new Error("can not read property " + propertyName + " of null");
  }

  while (current) {
    if (current.hasOwnProperty(propertyName)) {
      return current[propertyName];
    }
    current = Object.getPrototypeOf(current);
  }
  return undefined;
}
