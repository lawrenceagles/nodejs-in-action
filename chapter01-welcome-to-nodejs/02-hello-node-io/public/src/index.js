"use strict";

var fs = require("fs");

fs.readFile(__dirname + "/resource.json", function (err, data) {
  console.log("err:" + err + ", data:", data.toString());
});

console.log("Async I/O: This will be probably displayed before the readFile operation");
