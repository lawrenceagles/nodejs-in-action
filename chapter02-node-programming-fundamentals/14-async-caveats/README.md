# Chapter 2: Node Programming Fundamentals &mdash; 14-async-caveats
> illustrates how to freeze a global variable using closures

## Description
In the example, we define a variable that takes an initial value of *blue*, then use a closure to freeze that value, then change the value of the variable to *red* and then print the value of the variable.
The closure is defined as an async callback that prints on the screen the value of the variable after 2 seconds.

The caveat is that even when the async callback is executed 2 seconds after the value has changed, it prints *blue* because the closure froze the value.
