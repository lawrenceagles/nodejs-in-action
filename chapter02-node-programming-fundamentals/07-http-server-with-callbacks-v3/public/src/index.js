"use strict";

var http = require("http");
var fs = require("fs");
var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

http.createServer((request, response) => {
  logger.debug("Request received for URL: ", request.url);
  if (request.url === "/") {
    getPosts(response);
  } else if (request.url === "/favicon.png") {
    getIcon(response);
  }
}).listen(5000);

console.log("HTTP server established on http://localhost:5000");

function getPosts(response) {
  fs.readFile(__dirname + "/rsrc/posts.json", (readDataErr, readDataBuffer) => {
    if (readDataErr) {
      logger.error("Error retrieving posts data:", readDataErr);
      return hadError(response);
    }

    getTemplate(JSON.parse(readDataBuffer.toString()), response);
  });
}

function getTemplate(posts, response) {
  fs.readFile(__dirname + "/rsrc/template.html", function (readTemplateErr, readTemplateBuffer) {
    if (readTemplateErr) {
      logger.error("Error retrieving template:", readTemplateErr);
      return hadError(response);
    }

    fillTemplate(posts, readTemplateBuffer.toString(), response);
  });
}

function fillTemplate(posts, htmlTemplate, response) {
  var html = htmlTemplate.replace("%", posts.join("</li><li>"));
  response.writeHead(200, {"Content-Type": "text/html"});
  response.end(html);
}

function hadError(response) {
  response.writeHead(500, {"Content-Type": "text/plain"});
  response.end("Server Error");
}

function getIcon(response) {
  fs.readFile(__dirname + "/rsrc/favicon.png", (err, icon) => {
    if (err) {
      logger.error("Could not read favicon:", err);
      return hadError(response);
    }
    response.writeHead(200, {"Content-Type": "image/png"});
    response.end(icon);
  });
}
