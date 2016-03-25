# Chapter 2: Node Programming Fundamentals &mdash; 21-sequencing-tasks-with-async
> illustrates how to leverage async module for a complex flow

## Description
In this example, *async* module is used to sequence tasks in a script. In particular, we intend to download two files simultaneously and when those are complete, create a tar archive with those files &mdash; therefore both parallel and series flows are used.

Note that the invocation of the *async* callback that signals the completion of each of the subtasks is handled implicitly, which simplifies the implementation of the flow.
