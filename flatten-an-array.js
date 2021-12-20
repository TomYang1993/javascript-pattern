let nested = [1, [2,[3,4]]];
// console.log(nested.toString())
// let test = [].concat(...nested)
// console.log(Object.prototype.toString.call(...nested));



// console.log(flatten(nested))

// normal recursive

function normalFlatten(nestedArray){
    let result = []
    for(let i = 0; i < nestedArray.length; i++){
        if(Array.isArray(nestedArray[i])){
            result = result.concat(normalFlatten(nestedArray[i]));
        }else{
            result.push(nestedArray[i])
        }
    }
    return result;
}

// console.log(normalFlatten(nested))

// reduce recursive
function reduceFlatten(nestedArray){
    return nestedArray.reduce((prev, cur) => {
        if(Array.isArray(cur)){
            return prev.concat(reduceFlatten(cur))
        }else{
            return prev.concat(cur)
        }
    },[])
}

console.log(reduceFlatten(nested))

// spread operatorß

function flatten(nestedArray){
    while(nestedArray.some((item) => Array.isArray(item))){
        nestedArray = [].concat(...nestedArray)
    }
    return nestedArray
}

// string flatten
function stringFlatten(nestedArray){
    return nestedArray.toString().split(',')
}

stringFlatten(nested)