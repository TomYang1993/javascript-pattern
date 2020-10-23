// TODO:

function sum2(x, y){
    return x + y;
  }
  
  
  // console.log(sum2(1, 2) === 3);
  
  // TODO:
  
  const sum = (...args) => args.reduce((ele, current) => ele + current, 0);
  
  
  // console.log(sum() === 0);
  // console.log(sum(1) === 1);
  // console.log(sum(1, 2) === 3);
  // console.log(sum(1, 2, 3, 4) === 10);
  /**
  mhncvhgchain(1, 2, 3, 4) => obj (default sums the values)
  
    .add(...args) => obj
    .subtract(...args) => obj
    .negate() => obj
    .value => number
  
  */
  
  // interface ChainResult {
  //   add: ... => ChainResult;
  //   subtract: ... => ChainResult;
  //   negate: ... => ChainResult;
  //   value: number;
  // }
  // type ChainFcn = ... => ChainResult;
  
  const chain = (...args) => {
    // TODO
  
    let initialValue = sum(...args)
    
    let add = (...args) => { 
      
      let value = initialValue + sum(...args)
      return chain(value);
    }
    
    let subtract = (...args) => { let value = initialValue - sum(...args)
      return chain(value);
    }
    
    let negate = (...args) => { let value = 0 - initialValue
      return chain(value);
    }
    
  
    return {
      add,
      subtract,
      negate,
      value: initialValue
    }
  }
  
  
  const c1 = chain(1, 2, 3, 4);
  const c2 = c1.add(5, 6);
  const c3 = c2.subtract(1, 7);
  const c4 = c3.negate();
  const c5 = c4.negate();
  const c6 = c5.negate();
  
  const expected = [10, 21, 13, -13, 13, -13];
  const actual = [c1, c2, c3, c4, c5, c6].map(c => c.value);
  
  console.log([c1, c2, c3, c4, c5, c6]);
  
  console.log(actual);
  
  console.log(expected === actual);
  
  _.isEqual(expected, actual);
  
  
  function test(expected, actual){
  for(let i = 0; i < expected.length; i++){
    if(expected[i] !== actual[i]){
      return false
    }
    return true
  }
  }
  
  console.log(test(expected, actual))