"use strict";

var fs = require("fs");

var stream = fs.createReadStream(__dirname + "/index.js");

stream.on("data", function (dataChunk) {
  console.log("data chunk:", dataChunk);
  console.log("data chunk (as string):", dataChunk.toString());
});

stream.on("end", function () {
  console.log("stream exhausted: all data has been processed");
});
