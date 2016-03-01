"use strict";


var http = require("http");
var server = http.createServer();

server.on("request", function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello, world!\n");
});

server.listen(5000);

console.log("Server running at http://localhost:5000");
