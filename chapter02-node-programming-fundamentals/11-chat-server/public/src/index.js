"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var events = require("events");
var net = require("net");

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

/*
  Handler for the join event: This will be executed each time someone establishes
  a connection to the TCP server.
  The handler receives and id consisting of the remote address and port, and the
  socket object representing the client who connects.
*/
channel.on("join", (id, client) => {
  // add the client to the channel.clients map.
  channel.clients[id] = client;

  // Define the subscription function for this client, which consists in sending
  // message to all clients that previously joined the channel except to the
  // one that originated the channel
  channel.subscriptions[id] = (senderId, message) => {
    if (id !== senderId) {
      channel.clients[id].write(message);
    }
  };

  // Establish the handler for the broadcast event, as the function previously defined.
  channel.on("broadcast", channel.subscriptions[id]);

  // Notify the client of its id (for tagging purposes)
  client.write("Congratulations! You've joined the chat server. Your id is: " + id + "\n");
});

/* when a new socket is established the associated handler will be executed */
logger.info("Establishing TCP server...");
var server = net.createServer(client => {
  var id = client.remoteAddress + ":" + client.remotePort;
  logger.debug("New connection received: socket; id=" + id);

  // emit the join event
  channel.emit("join", id, client);


  // Establish the handler for the data event, it will be transformed into a
  // broadcast event.
  client.on("data", data => {
    data = data.toString();
    channel.emit("broadcast", id, data);
  });
});

logger.debug("Listening on port 5000");
server.listen(5000);
