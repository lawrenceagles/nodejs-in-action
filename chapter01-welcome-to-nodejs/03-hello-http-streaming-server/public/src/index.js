"use strict";


var http = require("http");
var fs = require("fs");

http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "image/gif"});
  fs.createReadStream(__dirname + "/image.gif").pipe(response);
}).listen(5000);

console.log("Server running at http://localhost:5000");
