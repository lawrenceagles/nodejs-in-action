# Chapter 18 &mdash; Child Processes in Node.js
> multi-processing concepts in Node.js

## [01-hello-exec-file](./01-hello-exec-file/)
Illustrates how to invoke external applications obtaining a buffer with the result of the execution once completed using `execFile`.

## [02-changing-env-vars](./02-changing-env-vars/)
Illustrates how to query and change environment variables using `process.env.ENV_VAR`.

## [03-hello-spawn](./03-hello-spawn/)
Illustrates how to invoke external applications and using events and streams to manage the results of the execution while it is executing using `spawn`.

## [04-piping-spawn-invocations](./04-piping-spawn-invocations/)
Illustrates how to pipe several `spawn` invocations together streaming stdout and stdin.

## [05-hello-exec](./05-hello-exec/)
Illustrates how to invoke external applications inside a subshell, obtaining a buffer wth the results of the execution once completed using `exec`.