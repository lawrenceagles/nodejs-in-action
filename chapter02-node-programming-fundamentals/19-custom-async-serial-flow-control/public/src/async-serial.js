"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");


function firstFunction() {
  console.log("This is the first function");
  next(null, 1);
}

function secondFunction(prevValue) {
  console.log("This is the second function. Prev value=", prevValue);
  next(null, 2);
}

function thirdFunction(prevValue) {
  console.log("This is the third function. Prev value=", prevValue);
}


var tasks = [
  firstFunction,
  secondFunction,
  thirdFunction
];

function next(err, result) {
  if (err) {
    throw err;
  }
  var currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

setTimeout(next, 0);

console.log("Sync tasks done!!");
