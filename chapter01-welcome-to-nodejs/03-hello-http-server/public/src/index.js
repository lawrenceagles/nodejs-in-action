"use strict";

var http = require("http");

http.createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello to Jason Isaacs");
}).listen(3000);

console.log("Server running at http://localhost:3000");
