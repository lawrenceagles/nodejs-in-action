# Chapter 2: Node Programming Fundamentals &mdash; 17-hello-nimble-serial
> illustrates how to leverage the `nimble` module for serial control

## Description
Illustrates how to implement a function that executes asynchronously three calls sequentially. This is performed using the *nimble* module &mdash; a minimalist flow control module by the same developer as *async*.

Note that we're using the simplest approach possible:
+ We're not interested in getting the results from the async execution.
+ We're not either returning errors or results from inside the functions executed in the series.
