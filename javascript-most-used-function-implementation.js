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
