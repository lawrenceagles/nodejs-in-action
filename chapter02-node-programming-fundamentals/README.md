# Chapter 2 &mdash; Node programming fundamentals
>  (MEAPv7)

## 01-hello-node-modules
Implementing and using custom Node.js modules. Illustrates the use of `exports` and `require`.

## 02-hello-exports
Illustrates how to correctly use `exports` and `module.exports`.

## 03-exporting-constructors
Illustrates how to export a constructor from a custom module, and how to use it from another module.

## 04-hello-module-system-caveats
Explores the caveats of Node's module system.

## 05-http-server-with-callbacks-v1
Illustrates the use of callbacks in a more elaborate example (an HTTP server that builds a dynamic page).

## 06-http-server-with-callbacks-v2
Same example as [05-http-server-with-callbacks-v1](# 05-http-server-with-callbacks-v1) but with cleaner source code resulting from refactoring and naming functions.

## 07-http-server-with-callbacks-v3
Illustrates in the same example, the *return early pattern* that prevents further nesting in async programming.

## 08-echo-server
Illustrates how to establish a handler to respond to events. In the example, a server that prints whatever is received is implemented.

## 09-echo-once
Illustrates how to establish a handler to respond to the first event it receives. In the example, a server that prints the first chunk of data it receives is used.

## 10-hello-event-emitter
Illustrates how to use `EventEmitter` to publish your own custom events, and how to subscribe to those custom events.

## 11-chat-server
