# Chapter 2 &mdash; Node Programming Fundamentals
> Node.js examples from 2nd edition

## 01-hello-node-modules
Illustrates how to create modules in Node.js and how to expose functions to consumers using `exports`. The example creates a module that converts from Euros to Rupees and vice versa and exposes both functions using `exports.fnName = function()`. The application demonstrate how to require and use that module.

## 02-hello-module-exports
Illustrates how to use `module.exports` to export a single object. In the example, a class is created inside a module and the constructor is exported using `module.exports`. The application using the module demonstrates how to grab a reference to the constructor using require, how to create different instances of the class exported by the module and how to use the exported functions.

## 03-hello-module-directory
Illustrates how to create modules in directories. In the example, a module is created in the directory, and the directory code is written in a file different from the default one (`index.js`).
