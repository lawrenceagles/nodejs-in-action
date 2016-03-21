# Chapter 1: Getting started &mdash; 20-custom-async-parallel-flow-control
> illustrates how to make a custom implementation of an async parallel flow control

## Description
Illustrates how to create *(a very simple)* parallel flow control engine.

In the code, an array is defined and the functions to perform in parallel are placed there (now the order is not important). This array will be used as a queue, removing elements from the head once completed. The elements of the array will be functions that must follow an specific protocol &mdash; the function should call a handler function `next` to indicate error status and results. Each time the handler function is called the engine will increment the number of completed tasks. When all tasks are complete, the handler function should perform some subsequent logic.

As in the series flow, the engine of the flow must halt execution if there's an error. Otherwise, the handler will pull the next function from the queue and execute it.

In the example, we'll implement a simple application that will read the contents of a number of text files and output the frequency of the words throughout the files.
