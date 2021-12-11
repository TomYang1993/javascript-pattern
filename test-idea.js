// function Coin(){
//   this.type = "finance"
//   this.keywords = [1,4,7]
// }

// function BitCoin(){
//   this.name = "bitcoin"
// }

// BitCoin.prototype = new Coin();

// let b1 = new BitCoin();
// let b2 = new BitCoin();

// console.log(b1.keywords)
// console.log(b1.type)
// console.log(b2.keywords)
// console.log(b2.type)

// b1.keywords.push(10);

// console.log(b2.keywords)

// function MetalCoin(){
//   this.type = "centralized finance"
//   this.name = "metal coin"
// }

/*************************************** */

// function Coin(){
//   this.type = "finance"
//   this.keywords = [1,4,7]
// }

// Coin.prototype.trade = () => {console.log("coins for trade.")}

// function BitCoin(){
//   Coin.call(this);
//   this.name = "bitcoin"
// }

// BitCoin.prototype = new Coin();

// let b1 = new BitCoin();
// let b2 = new BitCoin();

// console.log(b1.keywords)
// console.log(b1.type)
// console.log(b2.keywords)
// console.log(b2.type)

// console.log(b1.trade())

// b1.keywords.push(10);

// console.log(b2.keywords)

/************************************************** */

// function Coin(){
//   this.type = "finance"
//   this.keywords = [1,4,7]
// }

// Coin.prototype.trade = () => {console.log("coins for trade.")}

// let coin = new Coin();

// let bitcoin = Object.create(coin);

// console.log(bitcoin.type)
// console.log(bitcoin.keywords)
// console.log(bitcoin.trade())

/**************************************************** */

// let parent = {
//   name:"Dave",
//   getName: function(){
//     console.log(this.name)
//   }
// }

// let child = Object.create(parent);

// console.log(child.getName());

/**************************************************** */


// Object.create() established prototype connection between the object returned and the parameter object

function Super(name){
  this.name = name;
  this.colors = ["red","blue"];
}

Super.prototype.sayHi = function(){
  console.log(this.name);
}

// inherit properties, and pass parameters, so Sub can have its own names input
function Sub(name, age){ 
  Super.call(this, name)
  this.age = age;
}

inherit(Sub, Super);

inherit(Human, Sub)

function Human(name, age){
  Sub.call(this, name, age)
  this.honk = 8;

}

var person5 = new Sub("TOM", 26);

// object.create creates a copy of Super.prototype(an object), which only has methods, no properties
// all the properties like colors needs to run the constructor
// this way of writing inheritance only makes one Super constructor call
function inherit(child, parent){
  child.prototype = Object.create(parent.prototype);
  // child.prototype.constructor = child;
}

var human = new Human("Jerry", 9);

console.log(human.honk)
console.log(human.age)
console.log(human.name)

console.log(Sub.prototype.colors)
console.log(person5.colors)
console.log(person5.age)
person5.sayHi()