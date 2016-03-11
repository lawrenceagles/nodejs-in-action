# Chapter 1: Getting started &mdash; 08-echo-server
> registering an event handler on an TCP server

## Description
The example illustrates how to register an event handler for an event `data` emitted from a TCP server.

In the example, the *net* module is used to establish a TCP server on the local host. Whenever a client connects, a socket is created. The socket is an event emitter to which you can then register a listener to respond to those `data` events:
```javascript
  socket.on("data", (socket) => {})
```

To run the example you need to run this server using `node index.js` and then connect to it using telnet `telnet localhost 5000` and begin typing data in your telnet session.
