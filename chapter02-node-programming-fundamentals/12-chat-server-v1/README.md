# Chapter 1: Getting started &mdash; 11-chat-server-v1
> the second installment of the chat server with enhanced functionality

## Description
On top of the v0 functionality, the following capabilities has been added:
+ Awareness of clients leaving the chat
+ Shutdown the chat (without closing the TCP server)
+ Messages notifying the recently joined client of how many clients are online
+ Basic error handler that generates a custom error

To run the example, you will have to start the application using `node index.js` and then open *telnet* sessions on port 5000.
