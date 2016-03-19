# Chapter 1: Getting started &mdash; 18-hello-async-serial
> illustrates how to leverage the `async` module for serial control

## Description
Illustrates how to implement a function that executes asynchronously three calls sequentially. This is performed using the *async* module.

Note that we're using the simplest approach possible:
+ We're not interested in getting the results from the async execution (the optional final callback is missing).
+ We're not either returning errors or results from inside the functions executed in the series (we're using `callback()` not notify that we're done)

Therefore, the control flow is as simple as:
```javascript
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
```
