"use strict";

var CurrencyConverter = require("./lib/currency-converter");

var todaysChangeCurrencyConverter = new CurrencyConverter(0.01360544217687074829931972789116);

console.log("100 rupees are " + todaysChangeCurrencyConverter.rupeeToEuro(100) + " euros");
console.log("100 euros  are " + todaysChangeCurrencyConverter.euroToRupee(100) + " rupees");
