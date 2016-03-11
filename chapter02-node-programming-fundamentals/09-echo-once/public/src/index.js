"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var net = require("net");
var server = net.createServer(socket  => {
  socket.once("data", data => {
    socket.write("Data event received:" + data);
  });
});

logger.info("Establishing TCP server on port 5000");
server.listen(5000);
logger.info("Open a telnet session on port 5000 and type something (e.g. $ telnet localhost 5000)");
