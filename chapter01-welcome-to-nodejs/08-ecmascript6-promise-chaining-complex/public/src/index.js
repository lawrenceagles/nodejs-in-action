"use strict";

var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    if (Math.random() > 0.5) {
      resolve("random success");
    } else {
      reject(new Error("random failure"));
    }
  }, 2500);
});


/* 
  This is similar to simple chaining.
  The second success handler will get the result from the first one:
    + it is strictly waterfall
*/
promise
  .then(data => { console.log(`Success: ${data}`); return data; })
  .then(data2 => console.log(`Another success handler: ${data2}`))
  .catch(err => console.log(`An error has been caught: ${err}`));


/* A more convoluted example in which the first handler return a promise */
Promise
  .resolve("Resolved")
  .then(res => new Promise(function (resolve) {
    setTimeout(() => resolve(`Resolved2 after ${res}`), 1500);
  }))
  .then(res => console.log(`final result after chaining: ${res}`));

/* 
   A promise will be rejected when the resolver calls explicitly reject or when
   it throws an exception
*/

new Promise((resolve, reject) => { throw new Error("oops!");}) // eslint-disable-line no-unused-vars
  .catch(err => console.log(`exception caught: promise has been rejected: ${err}`));

/* this is the same as */

new Promise((resolve, reject) => reject("Ooops!")) // eslint-disable-line no-unused-vars
  .catch(err => console.log(`exception caught: promise has been rejected: ${err}`));


/*
  Try to guess what happens... yes, it's never caught
*/
Promise
  .resolve("Resolved!")
  .then(data => { throw new Error(`failed`); }) // eslint-disable-line no-unused-vars
  .catch(err => console.error(err));


// Decomposing the previous block of code tells us why: we were doing p4 and not p3
// A good mental model is to think of Promises as tree-like structures rather than linear flows
const p1 = Promise.resolve("Resolved!");
const p2 = p1.then(data => { throw new Error(`failed`); }); // eslint-disable-line no-unused-vars
const p3 = p2.catch(err => console.error(`Error caught from p2 resolution: ${err}`)); // eslint-disable-line no-unused-vars
const p4 = p1.catch(err => console.error(`Error caught from p1 resolution: ${err}`)); // eslint-disable-line no-unused-vars
