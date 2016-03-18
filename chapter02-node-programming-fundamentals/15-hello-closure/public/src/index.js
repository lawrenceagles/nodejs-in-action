"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

function wrapValue(n) {
  var localVariable = n;
  return function () {
    return localVariable;
  };
}

var wrap1 = wrapValue(1);
var wrap5 = wrapValue(5);

console.log("wrap1():", wrap1());
console.log("wrap5():", wrap5());

// Another closure using an IIFE
var color = "blue";

var frozenColor = (function (color) {
  logger.debug("freezing color as", color);
  return function() {
    return color;
  };
})(color);

color = "green";

console.log("color:", color);
console.log("color:", frozenColor());
