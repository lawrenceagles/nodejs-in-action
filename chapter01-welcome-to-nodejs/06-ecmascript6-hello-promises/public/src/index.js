"use strict";

/* Creating a Promise */
var promise = new Promise(function logic(fulfill, reject) {
  if (Math.random() < 0.5) {
    fulfill("Good!");
  } else {
    reject(new Error("Unexpected random result"));
  }
});

/*
 *  Adding callbacks to handle Promises continuation
 *  syntax a) .then(onFullfilled, onRejected)
 */
promise
  .then(function onFullfilled(result) {
    console.log("Promise successfully fulfilled: result=", result);
  }, function onRejected(err) {
    console.log("Promise was rejected: err=", err);
  });

  /*
   *  syntax b) .then(onFullfilled, onRejected)
   */
promise
  .then(function onFullfilled(result) {
    console.log("Promise successfully fulfilled: result=", result);
  })
  .catch(function onRejected(err) {
    console.log("Promise was rejected: err=", err);
  });
