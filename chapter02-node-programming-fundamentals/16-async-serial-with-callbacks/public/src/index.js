"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");


function first() {
  console.log("I execute first");
}

function middle() {
  console.log("I execute in the middle");
}

function last() {
  console.log("I execute last");
}

function asyncSeries(cbFirst, cbSecond, cbThird) {
  setTimeout(function () {
    cbFirst();
    setTimeout(function () {
      cbSecond();
        setTimeout(function () {
          cbThird();
        }, 1000);
    }, 500);
  }, 100);
}

asyncSeries(first, middle, last);
