"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var fs = require("fs");
var request = require("request");
var htmlparser = require("htmlparser");

var configFilename = "rss_feeds.txt";
var pathToConfigFile = __dirname + "/" + configFilename;


function checkForRSSFile() {
  fs.exists(pathToConfigFile, function (exists) {
    if (!exists) {
      return next(new Error("Missing RSS file: " + configFilename));
    }
    next(null, pathToConfigFile);
  });
}

function readRSSFile(pathToConfigFile) {
  fs.readFile(pathToConfigFile, function (err, feedList) {
    if (err) {
      return next(err);
    }
    feedList = feedList
                .toString()
                .replace(/^\s+|\s+$/g, "")
                .split("\n");
    var random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed(feedUrl) {
  request({uri: feedUrl}, function (err, res, body) {
    if (err) {
      return next(err);
    }
    if (res.statusCode !== 200) {
      return next(new Error("Abnormal response status code: " + res.statusCode));
    }
    next(null, body);
  });
}

function parseRSSFeed(rss) {
  var handler = new htmlparser.RssHandler();
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) {
    return next(new Error("No RSS items found"));
  }
  var item = handler.dom.items.shift();
  console.log(item.title + " - " + item.description);
  console.log(item.link);
}

var tasks = [
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed
];

function next(err, result) {
  if (err) {
    throw err;
  }
  var currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}

next();

console.log("Sync tasks done!!");
