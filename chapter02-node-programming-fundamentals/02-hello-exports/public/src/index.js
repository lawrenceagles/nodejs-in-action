"use strict";

/* require is a sync I/O operation, so it's a bets practice to place all requires on top */
var greeting0 = require("./lib/greeting-0");
var greeting1 = require("./lib/greeting-1");
var Rabbit0 = require("./lib/rabbit-0");
var Rabbit1 = require("./lib/rabbit-1");

console.log(greeting0);
console.log(greeting1);

/*
var whiteRabbit = new Rabbit0("white"); // Rabbit0 is not a function
whiteRabbit.speak();
*/

// what are you?
console.log(Rabbit0);


console.log(Rabbit1);

var whiteRabbit = new Rabbit1("white");
whiteRabbit.speak();
