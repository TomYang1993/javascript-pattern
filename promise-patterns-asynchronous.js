
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function customizedPromise(cb) {
    let self = this
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFulfilledCallBack = [];
    self.onRejectedCallBack = [];

    function resolve(value) {
        // be careful about setTimeout's this
        if (self.status === PENDING)
            setTimeout(() => {
                //actually here setting status is for later use
                self.status = FULFILLED;
                self.value = value;
                console.log("im promise resolve")
                console.log(self.onFulfilledCallBack)
                self.onFulfilledCallBack.forEach(cb => cb(value))
            })
    }

    function reject(error) {
        if (self.status === PENDING)
            setTimeout(() => {
                //actually here setting status is for later use
                self.status = REJECTED;
                self.error = error;
                self.onRejectedCallBack.forEach(cb => cb(error))
            })
    }

    cb(resolve, reject)
}

// be careful about arrow function's this if you define then function as an arrow function
// it will point to the window
customizedPromise.prototype.then = function (onFulfilled, onRejected) {
    console.log("when it's all defined")
    
    let self = this;
    // console.log(self)
    let bridgePromise;

    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
    onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };

    // console.log(onFulfilled)
    // console.log(onRejected)

    if (self.status === FULFILLED) {
        return bridgePromise = new customizedPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onFulfilled(self.value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
    if (self.status === REJECTED) {
        return bridgePromise = new customizedPromise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let x = onRejected(self.error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    if (self.status === PENDING) {
        return bridgePromise = new customizedPromise((resolve, reject) => {
            console.log("when the bridge promise is defined")
            self.onFulfilledCallBack.push((value) => {
                try {
                    console.log("bridged value")
                    console.log(value)
                    // value passed from P's resolved value, pass into f1, and execute f1
                    // define another promise, and using .then method on it in the resolvePromise function etc
                    let x = onFulfilled(value);
                    
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallBack.push((error) => {
                try {
                    let x = onRejected(error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }
}

function resolvePromise(bridgePromise, x, resolve, reject) {
    //如果x是一个promise
    if (x instanceof customizedPromise) {
        //如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise解析它的结果，直到返回值不是一个pending状态的promise为止
        if (x.status === PENDING) {
            console.log("the real f functions")
            console.log(x)
            x.then(y => {
                console.log("why this is stopping to wait for value coming back, this should be the same as the next bridged value")
                console.log(y)
                resolvePromise(bridgePromise, y, resolve, reject);
            }, error => {
                reject(error);
            });
        } else {
            x.then(resolve, reject);
        }
        //如果x是一个普通值，就让bridgePromise的状态fulfilled，并把这个值传递下去
    } else {
        console.log("after whi is stopping")
        console.log("it resolves")
        resolve(x);
    }
}

customizedPromise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}




let p = new customizedPromise((resolve, reject) => {
    setTimeout(() => resolve('P1'), 5000)
});
let f1 = function (data) {
    console.log(data)
    return new customizedPromise((resolve, reject) => {
        setTimeout(() => resolve('F1'), 2000)
    });
}
let f2 = function (data) {
    console.log(data)
    return new customizedPromise((resolve, reject) => {
        setTimeout(() => resolve('F2'), 2000)
    });
}
let f3 = function (data) {
    console.log("in F3 synchronous")
    console.log(data);
}
let errorLog = function (error) {
    console.log(error)
}
p.then(f1).then(f2).then(f3).catch(errorLog)
