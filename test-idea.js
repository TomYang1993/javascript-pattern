let p = new Promise((resolve, reject) => {
    setTimeout(() => resolve('P1'), 1000)
});
let f1 = function (data) {
    console.log(data)
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('F1'), 2000)
    });
}

// p.then(f1).then((data) => console.log(data)).then(data => console.log(data))




function some(data) {
    console.log(data)
}

// p.then(some, (error) => {

// }).then(some).then(some)

// p.then(5, (error) => {

// }).then(5).then(some)


const promise = Promise.resolve()
  .then(() => {
    return promise
  })
promise.catch(console.error)