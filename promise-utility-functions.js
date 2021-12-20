// allSettled

let resolved = Promise.resolve(20);

let rejected = Promise.reject(10);

let allSettledTest = Promise.allSettled([resolved, rejected]);

allSettledTest.then((result) => {
    console.log(result)
}).catch(e => console.log(e))