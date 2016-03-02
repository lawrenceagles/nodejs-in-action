"use strict";

var test = require("tape");
var currencyConverter = require("../src/my_module/currency");

test("1 rupee is 0.014 euros rounded to 2 decimals", function (t) {
  // Arrange
  var rupeeAmount = 1;

  // Act
  var actualEurosAmount = currencyConverter.rupeeToEuro(rupeeAmount);

  // Assert
  t.equal(actualEurosAmount, 0.01);
  t.end();
});

test("1 euro is 73.50 rupees rounded to 2 decimals", function (t) {
  // Arrange
  var euroAmount = 1;

  // Act
  var actualRupeesAmount = currencyConverter.euroToRupee(euroAmount);

  // Assert
  t.equal(actualRupeesAmount, 73.50);
  t.end();
});
