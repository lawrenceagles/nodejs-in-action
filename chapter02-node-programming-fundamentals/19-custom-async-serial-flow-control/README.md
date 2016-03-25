# Chapter 2: Node Programming Fundamentals &mdash; 19-custom-async-serial-flow-control
> illustrates how to make a custom implementation of an async serial flow control

## Description
Illustrates how to create *(a very simple)* serial flow control engine.

In the code, an array is defined and the functions to perform in series are placed there in the desired order of execution. This array will be used as a queue, removing elements from the head once completed. The elements of the array will be functions that must follow an specific protocol &mdash; the function should call a handler function `next` to indicate error status and results.

The engine of the flow must halt execution if there's an error. Otherwise, the handler will pull the next function from the queue and execute it.

The main example `index.js` implements a single application that will display a single article's and URL from a randomly chosen RSS feed. The list of possible RSS feeds will be specified in a text file.

Note that in the flow manager function we're not even using `setTimeout` because the functions that we call are async. If you have a look at `sync-serial.js`, which uses the same engine, you will see that tasks become sync and the message `Sync tasks done!!` only shows up when the rest of the tasks are done.

In the `async-serial.js`, we use the engine with sync tasks, but instead of bootstrapping the engine with `next()`, `setTimeout(next, 0)` is used instead. There you see that the sync tasks are executed in series, but in parallel to the main line of execution (the one in which `Sync tasks done!!` is printed).
