# Chapter 1: Getting started &mdash; 11-chat-server-v1
> the second installment of the chat server with enhanced functionality

## Description
On top of the v0 functionality, the following capabilities has been added:
+ Awareness of clients leaving the chat
+ Shutdown the chat (without closing the TCP server)
+ Messages notifying the recently joined client of how many clients are online
+ Basic error handler that generates a custom error

To run the example, you will have to start the application using `node index.js` and then open *telnet* sessions on port 5000.

Note that Node emits a warning when more than 10 listeners are registered:
```
(node) warning: possible EventEmitter memory leak detected. 11 broadcast listeners added. Use emitter.setMaxListeners() to increase limit.
Trace
    at EventEmitter.addListener (events.js:239:17)
    at EventEmitter.<anonymous> (/home/ubuntu/Development/git-repos/nodejs-in-action/chapter02-node-programming-fundamentals/12-chat-server-v1/build/index.js:34:11)
    at emitTwo (events.js:87:13)
    at EventEmitter.emit (events.js:172:7)
    at Server.<anonymous> (/home/ubuntu/Development/git-repos/nodejs-in-action/chapter02-node-programming-fundamentals/12-chat-server-v1/build/index.js:70:11)
    at emitOne (events.js:77:13)
    at Server.emit (events.js:169:7)
    at TCP.onconnection (net.js:1428:8)
```

You can increase the number of listeners an event emitter has using:
```javascript
channel.setMaxListeners(50);
```
