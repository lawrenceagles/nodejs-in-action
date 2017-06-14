"use strict";

const { Readable } = require("stream");
const util = require("util");
const express = require("express");

const app = express();

class StatStream extends Readable {
  constructor(limit) {
    super();
    this.limit = limit;
  }

  _read() {
    if (this.limit === 0) {
      console.log("limit exhausted!");
      this.push();
    } else {
      console.log("this.limit:", this.limit);
      this.push(util.inspect(process.memoryUsage()));
      this.push("\n");
      this.limit--;
    }
  }
}

app.get("/", (req, res) => {
  console.log("request received!");
  const statStream = new StatStream(10);
  statStream.pipe(res);
});

app.listen(5000);
