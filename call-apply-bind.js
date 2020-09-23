/*call 的运用，拓展foreach function 用法 */

function expandForEach() {
    // 检测arguments是否为Array的实例
    console.log(
        arguments instanceof Array, //false
        Array.isArray(arguments)  //false
    );
    // 判断arguments是否有forEach方法
    console.log(arguments.forEach);
    // undefined
    // 将数组中的forEach应用到arguments上，源码中arguments会强制转化为object
    // 不用担心foreach必须作用于一个数组
    Array.prototype.forEach.call(arguments, function (item) {
        console.log(item); // 1 2 3 4
    });
}
expandForEach(1, 2, 3, 4);

/* call used in inheritance  */

function Animal(name, weight) {
    this.name = name;
    this.weight = weight;
}
function Cat() {
    // 在call中将this作为thisArgs参数传递
    // Animal方法中的this就指向了Cat中的this
    // 所以Animal中的this指向的就是cat对象
    // remember because there is a new keyword
    // 'this'  points to Cat
    // 在Animal中定义了name和weight属性，就相当于在cat中定义了这些属性
    // cat对象便拥有了Animal中定义的属性，从而达到了继承的目的
    Animal.call(this, 'cat', '50');
    //Animal.apply(this,['cat','50']);
    this.say = function () {
        console.log("I am " + this.name + ",my weight is " + this.weight);
    }
}
//当通过new运算符产生了cat时，Cat中的this就指向了cat对象
var cat = new Cat();
cat.say();


 /* Math.min/max expansion
 Math.min(a,b,c,d,e,....)
 in source code, thisArgs will be spreaded as ...thisArgs
  so [1,4,7] becomes 1,4,7  */

 Math.min.apply(null, [1,4,7])
