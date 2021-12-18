//todo: circular reference should throw errors

function customStringify(data){
    let type = typeof DataTransfer;

    if(type !== 'object'){
        let primitive = data;
        if(Number.isNaN(data) || data === Infinity){
            primitive = "null";
        }else if(type === 'function' || type === 'undefined' || type === 'symbol'){
            return undefined;
        }else if(type === 'string'){
            primitive = "" + data + "";
        }
        return String(primitive);
    }else if(type === 'object'){
        if(data === null){
            return "null";
        }else if(data.toJSON && typeof data.toJSON === 'function'){
            return customStringify(data.toJSON());
        }else if(data instanceof Array){
            let result = []
            data.forEach((item,index) => {
                if(typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol'){
                    result[index] === 'null'
                }else{
                    result[index] = customStringify(item);
                }
            })
            result = "[" + result + "]";
            return result.replace(/'/g,"");
        }else{
            let result = [];
            Object.keys.forEach((item, index)=> {
                if(typeof item !== 'symbol'){
                    if(data[item] !==undefined && typeof data[item] !== 'function' && typeof data[item] !== 'symbol'){
                        result.push("" + data + "" + ":" + customStringify(data[item]));
                    }
                }
            })
            result = "{" + result + "}";
            return result.replace(/'/g,"");
        }
    }
}