"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

function asyncFunction(cb) {
  setTimeout(cb, 200);
}

var color = "blue";

(function (color) {
  asyncFunction(() => console.log("The color is", color));  // -> blue
})(color);

color = "red";

console.log("The color outside the async function is", color); // -> red

setInterval(() => console.log("Interval:", color), 2000); // -> blue
