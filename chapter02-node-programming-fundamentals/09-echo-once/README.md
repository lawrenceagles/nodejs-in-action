# Chapter 1: Getting started &mdash; 09-echo-once
> registering an event handler for the first event on an TCP server

## Description
The example illustrates how to register an event handler for the first `data` event emitted from a TCP server.

In the example, the *net* module is used to establish a TCP server on the local host. Whenever a client connects, a socket is created. The socket is an event emitter to which you can then register a listener to respond to those `data` events:
```javascript
  socket.once("data", (socket) => {})
```

As `once` is used instead on `on`, only the first message received will be echoed. Note however that the server itself will keep running on the background.

To run the example you need to run this server using `node index.js` and then connect to it using telnet `telnet localhost 5000` and begin typing data in your telnet session.
