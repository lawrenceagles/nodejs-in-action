"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.send("Hello Express!!!");
});

logger.debug("Server established on port 5000");
app.listen(5000);
