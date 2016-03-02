# Chapter 1: Getting started &mdash; 02-hello-exports
> `exports` and `module.exports` explained

## Description
The example illustrates when to use `exports` and `module.exports` by creating several modules in which those statements are used both correctly and incorrectly.

As a reminder:
+ what ultimately gets exported in your application is `module.exports` &mdash; `exports` is a global reference to `module.exports` created for your convenience.
+ you should use `exports.function` or `exports.value` to export a function or a value from your module.
+ you shouldn't use `exports = function` when your module exports a single function, because you will be breaking the reference between `exports` and `module.exports`.
+ however, you can do `module.exports = function` when your module exports a single function, and you won't be breaking anything.
