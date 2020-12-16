# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
> TBD

### Contents (TBD)
+ How promises work and how to use them effectively to implement the main control flow constructs.
+ The async/await syntax, which is the main tool for dealing with asynchronous code in Node.js.

### Intro
The previous chapter demonstrated how needlessly complicated and error-prone are the code constructs used to implement even the simplest scenarios such as the serial execution flow.
Also, error managemen in callback-based code is very weak:
+ If we forget to forward an error, it will just get lost.
+ If we don't catch an exception thrown by a piece of some synchronous code, the program will crash.

In order to mitigate these weaknesses, Node.js and JavaScript have implemented native solutions. The first step toward a better developer experience (DX) when working with asynchronous code is the *promise* &mdash; an object that carries the status and the eventual result of an asynchronous operation. A promise can be easily chained to implement serial execution flows, and can be passed around like any other object. The second step, and the one that definitely creates a difference in terms of *DX* is the async/await construct, which finally makes asynchronous code look like synchronous code.

In today's Node.js programming, *async/await* is the recommended construct to deal with asynchronous code. However, async/await is built on top of promises, as much as promises are built on top of callbacks. That is why it is important to master all these concepts, no matter whether they are the current trend or not.

### Promises
*Promises* are part of the *ECMAScript 2015* standard (or ES6), and they've been available in Node.js for quite some time already (since v4). The standard settled on an implementation known as *Promises/A+*

#### What is a promise?
A `Promise` is an object that embodies the eventual result (or error) of an asynchronous operation. In promises jargon we say a `Promise` is:
+ *pending* &mdash; when the asynchronous operation is not yet complete
+ *fulfilled* &mdash; when the operation succesfully completed
+ *rejected* &mdash; when the operation terminates with an error
+ *settled* &mdash; when the promise is either fulfilled or rejected.

To receive the *fulfillment value* or the *error reason* associated with the rejection we can use the `then()` method of a `Promise` instance:

```javascript
promise.then(onFulfilled, onRejected)
```

where `onFulfilled` is a callback that will eventually receive the fulfillment value of the `Promise`, an `onRejected` is another callback that will received the reason for the rejection (if any). Both callbacks are optional.

Let's see how promises can transform our callback-based code with the following simple example involving an asynchronous operation handled with a callback.

```javascript
asyncOperation(arg, (err, result) => {
  if (err) {
    /* error handling here */
  }
  /* result processing here */
});
```

With promises, it would be written as:

```javascript
asyncOperationPromise(arg)
  .then(result => {
    /* result processing here */
  }, err => {
    /* error handling here */
  });
```

There does not seem to be much of change. However, we might have missed one crucial property of the `then()` method &mdash; it *synchronously* returns another `Promise`.

Moreover, if any of the `onFulfilled` or `onRejected` functions return a value `x`, the `Promise` returned by the `then()` will:
+ Fulfill with `x` if `x` is a value
+ Fulfill with the fulfillment value of `x` if `x` is a `Promise`
+ Reject with the eventual rejection reason of `x` if `x` is a `Promise`

That behavior allows us to build *chains of promises*, allowing easy aggregation and arrangement of asynchronous operations into several configurations. Additionally, if we don't specify an `onFulfilled` or `onRejected` handler, the fulfillment value or rejection reason will be forwarded to the next promise in the chain, which will help with error propagation.

As a result, the sequential execution of asynchronous tasks becomes a trivial operation:

```javascript
asyncOperationPromise(arg)
  .then(result1 => {
    // return another promise
    return asyncOperationPromise(arg2);
  })
  .then(result2 => {
    // return a value
    return 'done';
  })
  .then(undefined, err=> {
    /* error handling for the chain of promises here */
  });
```

![Promise Chain diagram](images/promise-chain.png)

The diagram above shows how the program flows when we use a chain of promises. When we invoke `then(...)` on *Promise A*, we synchronously receive *Promise B* as a result, and when we invoke `then(...)` on *Promise B* we synchronously receive *Promise C*.
That is, the whole chain of promises is *materialized synchronously* as soon as we declare it.

Eventually, when *Promise A* settles, it will either fulfill or reject, which will automatically trigger the execution of the `onFulfilled(...)` or `onRejected(...)` on *Promise B*, which in turn will trigger the execution of the corresponding handler on *Promise C* once settled.

An important property of promises is that the `onFulfilled()` and `onRejected()` callbacks are guaranteed to be invoked asynchronously, and at most once, even if we resolve the `Promise` synchronously with a value as we do in the example above with the `return 'done'`.

Not only that, the `onFulfilled()` and `onRejected()` callbacks will be invoked asynchronously even if the `Promise` object is already settled at the moment in which `then()` is called. This is a safeguard against situations where we could inadvertently mixing asynchronous and synchronous code (*Zalgo*).

Finally, if an exception is thrown in the `onFulfilled()` or `onRejected()` handlers, the `Promise` returned by the `then()` method will automatically reject with the exception that was thrown as the *rejection reason*. As a result, exceptions will propagate automatically across the chain and the `throw` statement becomes usable (as opposed to what happens with *CPS*, on which only synchronous code could throw).

#### Promises/A+ and *thenables*
Before promises were standardized, there were many incompatible implementations. The JavaScript community led the efforts to come up with the *Promises/A+* specification. This specification details the behavior of the `then()` method. Today, the majority of `Promise` implementations use this standards, including the native `Promise` object of JavaScript and Node.js but you have to be aware that if you are dealing with old code using a non-core library, you might make sure that library complies with the *Promises/A+* specification if you want to mix core and non-core promises in a chain with `then()`.

As a result of the adoption of *Promises/A+*, many `Promise` implementations, including the native JavaScript `Promise` API will consider any object with a `then()` method a *promise-like* object, also called a *thenable*.

| NOTE: |
| :---- |
| The technique of recognizing (or typing) objects based on their external behavior, rather than their actual type, is called **duck typing** (if it walks like a duck and it quacks like a duck, then it must be a duck) and is widely used in JavaScript. |

#### The Promise API
The `Promise` constructor creates a new `Promise` instance that fulfills or rejects based on the behavior of the function provided as an argument. The constructor expects a function that will receive two arguments:
+ `resolve(obj)` &mdash; a function that when invoked, with fulfill the `Promise` with the provided fulfillment value, which will be `obj` if `obj` is a value. It will be the fulfillment value of `obj` if `obj` is a *promise* or a *thenable*.
+ `reject(err)` &mdash; a function that when invoked, will reject the `Promise`the reason `err`. It is a convention for `err`to be an instance of `Error`.

```javascript
new Promise((resolve, reject) => {
  /*
    function whose logic will lead whether it is resolved/rejected.

    The function will use:
    + resolve(obj) to resolve the promise
    + reject(err) to reject the promise
  */
});
```

Apart from the constructor, the `Promise` object also features several important static methods:

+ `Promise.resolve(obj)` &mdash; creates a new `Promise` from another `Promise`, *thenable* or value. If a `Promise` is passed, then that `Promise` is returned as it is. If a *thenable* is provided, then it's converted to a `Promise`. If a value is provided, then the `Promise` will be fulfilled with that value.
+ `Promise.reject(err)` &mdash; creates a `Promise` that rejects with `err` as the reason.
+ `Promise.all(iterable)` &mdash; creates a `Promise` that fulfills with an array of fulfillment values when every item in the input iterable object (typically an array) fulfills. If any of the promises returned by `Promise.all()` rejects, then the `Promise` returned by `Promise.all()` will reject with the first rejection reason. Each item in the iterable argument can be a `Promise`, a *thenable* or a value.
+ `Promise.allSettles(iterable)` &mdash; waits for all the input promises to fulfill or reject, and then returns an array of objects containing the fulfillment value or the rejection reason for each input `Promise`. Each output object has a `status` property which can be either `'fulfilled'` or `'rejected'` and a `value` property containing the fulfillment value or error reason. The difference with `Promise.all()` is that `Promise.allSettled()` will wait for each and every promise to either fulfill or reject, instead of immediately rejecting when one of the promises rejects.
+ `Promise.race(iterable)` &mdash; This method returns a `Promise` that is equivalent to the first `Promise` in the iterable that settles.

The following instance methods of the `Promise` class are also relevant:

+ `promise.then(onFulfilled, onRejected)` &mdash; returns a *chainable promise* and will invoke the `onFulfilled()` or `onRejected` callbacks depending on how `promise` is settled.
+ `promise.catch(onRejected)` &mdash; *syntactic sugar* for `then(undefined, onRejected)`.
+ `promise.finally(onFinally)` &mdash; allows you to set up an `onFinally()` callback which will be invoked when `promise` is settled. Unlike `onFulfilled()` and `onRejected()`, the `onFinally()` callback will not receive any arguments and any value returned from it will be ignored. The `Promise` returned by `finally()` will be settled with the same fulfillment value or rejected reason as `promise`.

#### Creating a Promise

Creating a `Promise` from scratch is quite a low-level operation, and it is not typically done unless you're converting a callback-based API into promises.

Nonetheless, this is the way to create a `Promise` using its constructor:

```javascript
function delay(millis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date())
    }, millis);
  });
}
```

Note how the entire body of the `delay(...)` function is wrapped by the `Promise` constructor: this is a frequent code pattern you will see when creating a `Promise` from scratch.

The newly created function can then be used as follows:

```javascript
console.log(`Delaying... ${ new Date().getSeconds() }`);
delay(1000)
  .then(newDate => {
    console.log(`Done: ${ new Date().getSeconds() });
  })
```

| EXAMPLE: |
| :------- |
| You can find a runnable example in [01 &mdash; Creating a `Promise` from scratch using its constructor](01-creating-a-promise-using-constructor). |

#### Promisification
When some characteristics of a callback-based function are known in advance, it's possible to create a function that transforms such function into an equivalent function returning a `Promise`. This transformation is called *promisification*.

For example, for the Node.js-style callback-based functions we know that:
+ the callback is the last argument to the function
+ the error (if any) is the first argument passed to the callback
+ any return value is passed after the error to the callback

The following code snippet is a simple implementation of this idea:

```javascript
function promisify(callbackBasedApi) {
  function promisified(...args) {
    return new Promise((resolve, reject) => {
      const newArgs = [
        ...args,
        function (err, result) {
          if (err) {
            return reject(err);
          }
          resolve(result);
        }
      ];
      callbackBasedApi(...newArgs);
    });
  }
  return promisified;
}
```

The preceding function returns another function which represents the *promisified* version of the `callbackBasedApi` function that receives as a parameter.

When the *promisified* version of the function is called, a promise is returned, and the logic that settles the promise is delegated to the callback-based function. That function is given the parameters passed to the *promisified* version, enhanced with a callback that rejects in case of error, or fulfills with the result otherwise.

You can use that function very easily:

```javascript
import { randomBytes } from 'crypto';

const randomBytesP = promisify(randomBytes);

randomBytesP(32)
  .then(buffer => {
    console.log(`Random bytes: ${ buffer.toString('hex') }`);
  });
```

| EXAMPLE: |
| :------- |
| You can find a runnable example in [02 &mdash; Promisification](02-promisification). |

It must be noted that our implementation of the `promisify()` function is quite naive and has some missing features. The `util` package of Node.js provides a more robust version of `promisify()`.

#### Sequential execution and iteration
162
#### Parallel execution

#### Limited Parallel execution

##### Implementing the `TaskQueue`

##### Updating the web spider

### Async/Await

### The problem with infinite recursion

### Summary


### You know you've mastered this chapter when...
+ You understand the difficulties of asynchronous code and CPS programming:

### Code, Exercises and mini-projects

#### [01 &mdash; Creating a `Promise` from scratch using its constructor](01-creating-a-promise-using-constructor)
Illustrates how to create a `Promise` using its constructor.

#### [02 &mdash; Promisification](02-promisification)
Illustrates how create a generic function that converts a Node.js callback style function into an equivalent function returning a `Promise`.

#### Exercise 1: [File Concatenation](./e01-file-concatenation/)
Write the implementation of `concatFiles(...)`, a callback-style function that takes two or more paths to text files in the file system and a destination file.


#### Example 4: [Hello, `TaskQueue`](./e04-hello-task-queue)
A very simple example demonstrating the usage pattern for our `TaskQueue` class. In the example, we use the `TaskQueue` to classify a large number of numbers into even and odd.
