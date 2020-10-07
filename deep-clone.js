let testObj = {
    x: {
        y: {
            z:6
        },
        r: Symbol("Tom")
    }, 
    a: function(){
        console.log("something")
    },
    b: undefined,
    c: [1,3,6,3,6],
    d: "we",
    e: true,
    f: {
        g: "hello",
        h: {
            i: "world",
            j:{
                k:{
                    l: "test"
                }
            }
        }
    },
    sub:{}
}

testObj.circle = testObj
testObj.sub.x = testObj.x


function deepClone(obj) {

    let map = new Map();
    function dc(obj){


        if (!isObject(obj)) return obj; // 非对象返回自身

        let newObj = Array.isArray(obj)? [] : {};
        // check reference so it won't go into dc(clone) recursive again
        let existedObj = map.get(obj)
        if(existedObj){
            return existedObj
        }

        map.set(obj, newObj)

        let keys = Object.keys(obj);
        for(let i = 0; i < keys.length; i++){
            let clone = obj[keys[i]]
            if(isObject(clone)){
                newObj[keys[i]] = dc(clone)
            }else{
                newObj[keys[i]] = clone
            }
        }
    
        return newObj
    }
    return dc(obj)
}

function isObject(test) {

    return typeof test === 'object' && test != null;
    // return Object.prototype.toString.call(test) === '[object Object]'
}

let newTest = deepClone(testObj)

console.log(newTest.sub.x === newTest.x)
testObj.c[0] = 100
console.log(newTest)