"use strict";

function delay(t) {
  function wait(fulfill) {
    setTimeout(function delayedPrint() {
      console.log(`Resolving after ${t}`);
      fulfill(t);
    }, t);
  }
  return new Promise(wait);
}


console.log("Calling delay(2000)");
delay(2000);
