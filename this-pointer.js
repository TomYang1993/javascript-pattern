function a() {
    console.log(this)
}

function b() {

}

let obj = {name: 'Tom'}

a.call(b);


a.call(obj);

a.call(1);