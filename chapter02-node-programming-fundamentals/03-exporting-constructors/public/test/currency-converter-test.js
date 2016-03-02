"use strict";

var test = require("tape");
var CurrencyConverter = require("../src/lib/currency-converter");



test("if change is 1, one euro should be one rupee, and one rupee should be one euro ", function (t) {
  // Arrange
  var convOne = new CurrencyConverter(1);

  // Act and assert
  t.equal(convOne.rupeeToEuro(1), 1);
  t.equal(convOne.euroToRupee(1), 1);
  t.end();
});

test("if change is 0.5, one euro should be two rupees, and one rupee should be .5 euros ", function (t) {
  // Arrange
  var convOne = new CurrencyConverter(0.5);

  // Act and assert
  t.equal(convOne.rupeeToEuro(1), 0.5);
  t.equal(convOne.euroToRupee(1), 2);
  t.end();
});
