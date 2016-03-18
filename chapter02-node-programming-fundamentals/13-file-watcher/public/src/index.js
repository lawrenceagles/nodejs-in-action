"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var fs = require("fs");
var events = require("events");
var util = require("util");

/*
  Make Watcher inherit from events.EventEmitter:
    this is the same as doing:
    `Watcher.prototype = new events.Emitter();`
*/
util.inherits(Watcher, events.EventEmitter);

/*
  The definition of the Watcher object
*/
function Watcher(watchDir, processedDir) {
  this.watchDir = watchDir;
  this.processedDir = processedDir;
}

/*
  the Watcher.watch method reads the contents of the watchDir retrieving all files
  found on it and emitting a `process` event for each of the files found.
*/
Watcher.prototype.watch = function() {
  var watcher = this;
  fs.readdir(this.watchDir, function (err, files) {
    if (err) {
      logger.error("An error was found reading the directory:", err);
      throw err;
    }
    files.forEach(function (file) {
      logger.debug("Emitting `process` event for file: ", file);
      watcher.emit("process", file);
    });
  });
};

/*
  The Watcher.start method bootstraps the application.
  To do that, we leverage the fs.watch method, which
  generates a `change` event when something changes in
  the given directory.
*/
Watcher.prototype.start = function () {
  var watcher = this;
  fs.watch(watchDir, function (event, filename) {
    logger.debug("Received an event " + event + " on the file " + filename);
    if (event === "change") {
      logger.debug("Triggering the watch event");
      watcher.watch();
    }
  });
};


/*
  Creating the watcher for the given watchDir and processedDir
    watchDir: the directory that will be watched
    processedDir: the directory that will host the output
*/
var watchDir = "./watch";
var processedDir = "./done";
var watcher = new Watcher(watchDir, processedDir);


/*
  The event handler for the `process` event emitted by our Watcher
  Processing consist in moving the file to the done directory appending
  the prefix `-done` to the filename.
*/
watcher.on("process", function process(file) {
  logger.debug("Received `process` event for file=", file);
  var watchFile = this.watchDir + "/" + file;
  var processedFile = this.processedDir + "/" + file + "-done";
  logger.debug("watchFile:", watchFile);
  logger.debug("processedFile:", processedFile);

  fs.rename(watchFile, processedFile, function (err) {
    if (err) {
      throw err;
    }
  });
});

/* Establish the watcher */
watcher.start();
