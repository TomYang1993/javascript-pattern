// 计时器 let构成了块作用域，所以function内取到了I的值

// for(let i = 0; i < 5; i++) {
//     setTimeout(function(){
//         console.log(i)
//     },1000)
// }


// 改写一个， 两种写法差不多，关键在于I变量的reference指向，reference没变，I的值在变化
// 所以同步执行结束后，异步执行取回的是I的current value
// for循环仍在全球，定义X仍然是在global execution context， 每次会被新的X替代而已

// let i = 0;
// for(;i<5;i++){
//     var x =i;
//     setTimeout(function(){
//         var y = 9;
//         console.log(x)
//     },1000)
// }
// console.log("out copy", x)
// console.log("out", i)

// for(var i = 0;i<5;i++){
//     setTimeout(function(){
//         console.log(i)
//     },1000)
// }
// console.log("out 555555", i)


//常见的IIFE 方式解决scope的问题， 闭包
// inner function在自己context找不到I，而去寻求上一层context，
// 与之前不同，现在上层context是IIFE，有J这个变量copyI的值，每次不同的I有不同的J


// for(var i = 0;i<5;i++){
//     (function(j){
//         setTimeout(function(){
//             console.log(j)
//         },1000 * j)
//     })(i)
// }
// console.log("out 0 1 2 3 4", i)


// 进一步改进是最后输出 最后一行，等待setTimeout结束后在输出
// 使用promise all处理并发， 然后再延后一秒输出


// let results = []

// const timer = (i) => new Promise((resolve, reject) => {
//     setTimeout(function () {
//         console.log("number", i)
//         resolve()
//     }, 1000 * i)
// })

// for (var i = 0; i < 5; i++) {
//     results.push(timer(i))
// }

// Promise.all(results).then((results) => {
//     if (results) {
//         console.log(results)
//         setTimeout(function () {
//             console.log("Final", i)
//         }, 1000)
//     }
// })


// async await , different thoughts, treat it always like synchronous 
// so it does not have the promises problems, you can do it in a for loop like any other synchronous code
// 0,1,2,3,4 step by step and then finally 5
// no need to follow above styles, await every promise in the results array
// timer(i) had triggered the timeout, so it can print step by step
// imagine await timer(i), every step will plus one
// decouple the resolve and console.log()


const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve()
        }, time)
    })
}

async function outputFinal() {
    for (var i = 0; i < 5; i++) {
        if (i > 0) {
            await sleep(1000)
        }
        console.log("output", i)
    }
    await sleep(1000)
    console.log("Final", i)
}

outputFinal()

// asynchronous way we can do the promise.then(()=> return promise)
// but if you want 10 steps, 100 steps, no way
// so you need to plan out the time length between every step

// const promiseReturn = (num) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(function () {
//             console.log(num)
//             resolve()
//         }, 1000)
//     })
// }

// promiseReturn(1).then(() => {
//     return promiseReturn(2)
// }
// ).then(() => {
//     return promiseReturn(3)
// })