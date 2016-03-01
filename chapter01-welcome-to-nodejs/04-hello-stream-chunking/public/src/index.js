"use strict";


var fs = require("fs");

var stream = fs.createReadStream(__dirname + "/resources.json");

stream.on("data", function (chunk) {
  console.log("chunk (" + chunk.length + " byte(s)):\n" + chunk + "\n========================================\n");
});

stream.on("end", function () {
  console.log("finished!");
});
