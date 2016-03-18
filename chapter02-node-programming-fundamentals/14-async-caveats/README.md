# Chapter 1: Getting started &mdash; 14-async-caveats
> illustrates how to freeze a global variable using closures

## Description
In the example, a closure is defined to freeze the initial value of a global variable. Thus, we end up with two different values for a global variable (one for the async operations and one for the sync code).
