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

function Coin(){
  this.type = "finance"
  this.keywords = [1,4,7]
}

Coin.prototype.trade = () => {console.log("coins for trade.")}

function BitCoin(){
  Coin.call(this);
  this.name = "bitcoin"
}

BitCoin.prototype = new Coin();

let b1 = new BitCoin();
let b2 = new BitCoin();

console.log(b1.keywords)
console.log(b1.type)
console.log(b2.keywords)
console.log(b2.type)

console.log(b1.trade())

b1.keywords.push(10);

console.log(b2.keywords)



