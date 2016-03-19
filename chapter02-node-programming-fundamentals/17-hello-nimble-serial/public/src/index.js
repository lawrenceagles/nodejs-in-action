"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var flow = require("nimble");

flow.series([
  function first(callback) {
    setTimeout(function () {
      console.log("I execute first");
      callback();
    }, 1000);
  },
  function second(callback) {
    setTimeout(function () {
      console.log("I execute second");
      callback();
    }, 2000);
  },
  function third(callback) {
    setTimeout(function () {
      console.log("I execute last");
      callback();
    }, 3000);
  }
]);

console.log("sync flow done!");
