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


/* recursive way of deep clone */
function deepClone(obj) {

    let map = new WeakMap();
    function dc(obj){
        if(obj instanceof Date){
            return new Date(obj)
        }

        if(obj instanceof RegExp){
            return new RegExp(obj)
        }
        // do a shallow clone of object
        let newObj = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
        // check reference so it won't go into dc(clone) recursive again
        let existedObj = map.get(obj)
        if(existedObj){
            return existedObj
        }

        map.set(obj, newObj)

        let keys = Reflect.ownKeys(obj);
        for(let i = 0; i < keys.length; i++){
            let clone = obj[keys[i]]
            if(isObject(clone) && typeof test !== 'function'){
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
    return (typeof test === 'object' || typeof test === 'function' ) && test != null;
    // return Object.prototype.toString.call(test) === '[object Object]'
}

let newTest = deepClone(testObj)

console.log(newTest.sub.x === newTest.x)
testObj.c[0] = 100
console.log(newTest)