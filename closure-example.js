const memorize = function(targetFn) {
    const cache = {}       // 存储缓存数据的对象, 缓存数据可能是数值，一个HTTP请求，关键在于缓存了目标方程的结果
    return function(...args) {        // 这里用到数组的扩展运算符
      const _args = JSON.stringify(args)    // 将参数作为cache的key
      console.log(cache)
      return cache[_args] || (cache[_args] = targetFn.apply(targetFn, args))  // 如果已经缓存过，直接取值。否则重新计算并且缓存
    }
  }
  const add = function(a, b) {
    console.log('开始缓存')
    return a + b
  }

  const adder = memorize(add)
  console.log(adder(1,2))
  console.log(adder(1,2))
  console.log(adder(4,5))