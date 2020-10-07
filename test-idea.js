let nums = [1,2,4]

let asyncForEach = async function(array, cb ){
    for(let i = 0; i < array.length; i++){
        await cb(array[i])
    }
}






  var multi = num => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (num) {
          resolve(num * num)
        } else {
          reject(new Error('num not specified'))
        }
      }, 1000)
    })
  }


  asyncForEach(nums, async x => {
    var res = await multi(x)
    console.log(res)
  })
  