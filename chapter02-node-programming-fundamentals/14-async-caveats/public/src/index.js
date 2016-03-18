"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

function asyncFunction(cb) {
  setTimeout(cb, 2000);
}

var color = "blue";

(function (color) {
  asyncFunction(() => console.log("async: color is", color));  // -> blue
})(color);

color = "red";

console.log("sync: color is", color); // -> red
