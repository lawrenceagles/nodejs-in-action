# Chapter 1: Getting started &mdash; 11-chat-server-v0
> a simple chat server that illustrates how to emit and consume events

## Description
The example illustrates a very simple, but complete, chat server that leverages events to provide the functionality.

It works like this:
+ The application establishes a TCP server on port 5000 waiting for connections.
+ When a connection is received:
  + a custom `join` event will be triggered triggered &mdash; the subscribers of this event will be given an *id* consisting in the concatenation of the client's address and port.
  + a handler for the `data` event will be registered &mdash; this event, that is received whenever the client sends some information, will be transformed into a custom `broadcast` event, thus providing decoupling from the TCP server internals. The subscribers of the `broadcast` event will be given the client's id (remote address and port) and the message that was received.
+ The handler for the `join` event is established. The handler will consists in updating local maps of clients and subscriptions with the newly received client, and also establishing the handler for the `broadcast` event, which will consist in sending the data received to all the clients except to the one that originated the message.

To run the example, you will have to start the application using `node index.js` and then open *telnet* sessions on port 5000.
