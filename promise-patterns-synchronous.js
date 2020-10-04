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

// be careful about arrow function's this if you define then fucniton as an arrow function
// it will point to the window
customizedPromise.prototype.then = function (onFulfilled, onRejected) {

    if (this.status === PENDING) {
        console.log("first time in pending")
        this.onFulfilledCallBack.push(onFulfilled);
        this.onRejectedCallBack.push(onRejected);
    } else if (this.status === FULFILLED) {
        console.log("second time in Fulfilled and from now on")

        // this promise will keep the state of fulfilled from now on
        // next time it get value don't need to assign onFulfilled,onRejected to the instance anymore
        // just directly call 
        onFulfilled(this.value)
    }else{
        onRejected(this.error)
    }
    return this;
}


let test = new customizedPromise((resolve, reject) => {

    if (true) {
        resolve(1)
    } else {
        reject("error")
    }
})


function some(data) {
    console.log(data)
}

// the ultimate right behaviour should be the last two console.log logs out undefined instead of the data
 
test.then(some, (error) => {

}).then(some).then(some)

setTimeout(() => { test.then(some) }, 1000)

