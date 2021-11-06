let a = {d:"str", e:{f:1}}
let c = [1,2,3]
let b;

const shallowCopy = (target) => {
    if(typeof target === 'object' && target != null){
        let result = Array.isArray(target) ? []:{};

        //Object.keys() will have the same effect as (for...in hasOwn... combined)
        for(let prop in target){
            if(target.hasOwnProperty(prop)){
                result[prop] = target[prop]
            }
        }
        return result
    }else{
        return target
    }
}

b= shallowCopy(c);
console.log(b.length)