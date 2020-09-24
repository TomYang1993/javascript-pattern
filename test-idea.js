
/* call function must satisfy 
when obj is null, points to the global/window object
takes in multiple parameters
*/

Function.prototype.customizedCall = function (obj) {

    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    obj = obj || global || window;
    let args = []
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    obj.func = this;
    // if a function returns
    let resolve = obj.func(...args);
    delete obj.func
    return resolve;
}


let testObj = { a: 1 }

function test(name, age) {
    console.log(this.a)
    console.log(name)
    console.log(age)
    return 1
}

let result = test.customizedCall(null, 'TOM', 18)

console.log(result)