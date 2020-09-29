function customizedPromise(cb) {
    let self = this
    self.value = null;
    self.error = null;
    self.onFulfilled = null;
    self.onRejected = null;

    function resolve(value) {
        // be careful about setTimeout's this
        setTimeout(() => {
            self.value = value;
            self.onFulfilled(value)
        })
    }

    function reject(error) {
        self.error = error;
        self.onRejected(value)
    }

    cb(resolve, reject)
}

// be careful about arrow function's this
customizedPromise.prototype.then = function(onFulfilled, onRejected){
    this.onFulfilled = onFulfilled;
    this.onRejected = onRejected
}


let test = new customizedPromise((resolve, reject) => {

    if(true){
        resolve(1)
    }else{
        reject("error")
    }
})


function some(data){
    console.log(data)
}

test.then(some,(error) => {

})

