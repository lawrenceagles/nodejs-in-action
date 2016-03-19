"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var flow = require("async");

flow.series([
  function first(callback) {
    console.log("I execute first");
    callback();
  },
  function second(callback) {
    console.log("I execute second");
    callback();
  },
  function third(callback) {
    console.log("I execute last");
    callback();
  }
]);

console.log("sync flow done!");
