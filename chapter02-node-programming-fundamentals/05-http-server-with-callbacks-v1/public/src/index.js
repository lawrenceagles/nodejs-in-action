"use strict";

var http = require("http");
var fs = require("fs");

http.createServer((request, response) => {
  if (request.url === "/") {
    fs.readFile(__dirname + "/rsrc/posts.json", (readDataErr, readDataBuffer) => {
      if (readDataErr) {
        console.log("Error reading posts data:", readDataErr);
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.end("Server Error");
      } else {
        var posts = JSON.parse(readDataBuffer.toString());
        fs.readFile(__dirname + "/rsrc/template.html", (readTemplateErr, readTemplateBuffer) => {
          if (readTemplateErr) {
            console.log("Error reading template:", readTemplateErr);
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.end("Server Error");
          } else {
            var template = readTemplateBuffer.toString();
            var html = template.replace("%", posts.join("</li><li>"));
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(html);
          }
        });
      }
    });
  }
}).listen("5000");

console.log("HTTP server established on http://localhost:5000");
