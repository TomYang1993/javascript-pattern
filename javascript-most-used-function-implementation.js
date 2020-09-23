/* Object.assign() */
Object.defineProperty(Object, 'assign', {
    value: function assign(target, source) {

    }
})

/* Object.create()
 create a new object based on the parameter passed in */

// Object.defineProperty(Object, 'create', {
//     value: function create(obj) {
//     function F() {};
//     F.prototype = obj;
//     return new F();
// }})



// call


// apply



// bind





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


