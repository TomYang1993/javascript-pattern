/* Object.assign() */
Object.defineProperty(Object, 'assign', {
    value: function assign(target, source) {

        if(target == null){
            throw TypeError("can not convert null to object you know");
        }

        let to = Object(target);   // to do find out why
        for(let i = 1; i < arguments.length; i++){
            let source = arguments[i];
            if(source !== null){
                for(let property in source){
                    to[property] = source[property]
                }
            }
        }
    
        return to
    },
    writable: true,
    configurable: true
})

let testObj = Object.assign({}, {a:5}, {B:4,c:89});
console.log(testObj)

/* Object.create() easy version
 create a new object based on the parameter passed in */

// Object.defineProperty(Object, 'create', {
//     value: function create(obj) {
//     function F() {};
//     F.prototype = obj;
//     return new F();
// }})



// call
Function.prototype.myCall = function(...args) {
    // 参数检查
    if(typeof this !== "function") {
      throw new Error('Must call with a function');
    }
  
    const realThis = args[0] || window;
    const realArgs = args.slice(1);
    const funcSymbol = Symbol('func');
    realThis[funcSymbol] = this;   // 这里的this是原方法，保存到传入的第一个参数上
  
    //用传入的参数来调方法，方法里面的this就是传入的参数了
    const res = realThis[funcSymbol](...realArgs); 
  
    delete realThis[funcSymbol];  // 最后删掉临时存储的原方法
  
    return res;  // 将执行的返回值返回
  }


// apply
Function.prototype.myApply = function(...args) {
    if(typeof this !== "function") {
      throw new Error('Must call with a function');
    }
  
    const realThis = args[0] || window;
    // 直接取第二个参数，是一个数组
    const realArgs = args[1];        
    const funcSymbol = Symbol('func');
    realThis[funcSymbol] = this;   
  
    const res = realThis[funcSymbol](...realArgs); 
  
    delete realThis[funcSymbol]; 
  
    return res; 
  }
  

// bind
Function.prototype.myBind = function(...args) {
    if(typeof this !== "function") {
      throw new Error('Must call with a function');
    }
  
    const _func = this;    // 原方法
    const realThis = args[0] || window;   // 绑定的this
    const otherArgs = args.slice(1);    // 取出后面的参数作为新函数的默认参数
  
    return function(...args2) {   // 返回一个方法
      return _func.apply(realThis, [...otherArgs,...args2]);  // 拼接存储参数和新参数，然后用apply执行
    }
  }


  Function.prototype.bind = function (oThis) {
    var aArgs = Array.prototype.slice.call(arguments, 1)；
    var fToBind = this；
    var fNOP = function () {}；
    var fBound = function () {
      fBound.prototype = this instanceof fNOP ? new fNOP() : fBound.prototype；
      return fToBind.apply(this instanceof fNOP ? this : oThis || this, aArgs )
    }   
    if( this.prototype ) {
      fNOP.prototype = this.prototype；
    }
    return fBound；
  }
  

// new


/* create your own constructor */

Function.prototype.construct = function (args) {
    let oldFunc = this;
    function newFunc() {
        // apply for an array, call for a variable
        oldFunc.apply(this, args)
    }
    newFunc.prototype = oldFunc.prototype
    return new newFunc()
}

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


