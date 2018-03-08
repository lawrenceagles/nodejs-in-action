# Chapter 18 &mdash; Child Processes in Node.js
> multi-processing concepts in Node.js

## [01-hello-exec-file](./01-hello-exec-file/)
Illustrates how to invoke external applications obtaining a materialized buffer with the result of the execution once completed using `execFile`.

## [02-changing-env-vars](./02-changing-env-vars/)
Illustrates how to query and change environment variables using `process.env.ENV_VAR`.

## [03-hello-spawn](./03-hello-spawn/)
Illustrates how to invoke external applications and using events and streams to manage the results of the execution while it is executing using `spawn`.

## [04-piping-spawn-invocations](./04-piping-spawn-invocations/)
Illustrates how to pipe several `spawn` invocations together streaming stdout and stdin.

## [05-hello-exec](./05-hello-exec/)
Illustrates how to invoke external applications inside a subshell, obtaining a buffer wth the results of the execution once completed using `exec`.

## [06-hello-detached-process](./06-hello-detached-process/)
Illustrates how to use `spawn` to invoke external applications in detached mode, so that the child process can continue executing even when the parent process dies. Note that the parent process will remain active even when finished because of the I/O connection between parent and child processes and because the parent still maintains a reference to the child).

## [07-detached-process-and-stdio-configuration](./07-detached-process-and-stdio-configuration/)
Illustrates the techniques to sever the child reference and I/O connection that exist between the parent and child processes when using `spawn` so that the parent process can terminate successfully and the child can remain active on its own.

## [08-hello-executable-node-scripts](./08-hello-executable-node-scripts/)
Demonstrates how to create an executable *Unix* script written on Node.js, and then how to call it using `execFile`.

