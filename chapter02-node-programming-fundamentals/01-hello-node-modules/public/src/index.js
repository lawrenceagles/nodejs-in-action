"use strict";

/* require is a sync I/O operation, so it's a bets practice to place all requires on top */
var currencyConverter = require("./my_module/currency");

console.log("100 rupees equals to " + currencyConverter.rupeeToEuro(100) + " euros");
console.log("1000 rupees equals to " + currencyConverter.rupeeToEuro(1000) + " euros");
console.log("1,000,000 rupees equals to " + currencyConverter.rupeeToEuro(1000000) + " euros");

console.log("10 euros equals to " + currencyConverter.euroToRupee(100) + " rupees");
console.log("100 euros equals to " + currencyConverter.euroToRupee(1000) + "  rupees");
console.log("1000 euros equals to " + currencyConverter.euroToRupee(1000000) + "  rupees");
