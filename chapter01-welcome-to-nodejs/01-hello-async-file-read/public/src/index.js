"use strict";


var fs = require("fs");

fs.readFile(__dirname + "/resources.json", function (readErr, readData) {
  if (readErr) {
    throw new Error("Could not read from file:" + readErr);
  }
  console.log("Read:\n", readData.toString());
});
