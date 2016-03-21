"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var fs = require("fs");

var completedTasks = 0;
var tasks = [];
var wordCounts = [];

var filesDir = "./rsrc";
var pathToFilesDir = __dirname + "/" + filesDir;

function checkIfComplete() {
  completedTasks++;
  if (completedTasks === tasks.length) {
    for (var index in wordCounts) {
      console.log(index + ": " + wordCounts[index]);
    }
  }
}

function countWordsInText(text) {
  var words = text
                .toString()
                .toLowerCase()
                .split(/\W+/)
                .sort();
  for (var index in words) {
    var word = words[index];
    if (word) {
      wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
    }
  }
}

fs.readdir(pathToFilesDir, function(err, files) {
  if (err) {
    throw err;
  }
  for (var index in files) {
    var task = processFile(pathToFilesDir + "/" + files[index]);
    tasks.push(task);
  }

  for (let taskFn in tasks) {
    tasks[taskFn]();
  }
});


function processFile(file) {
  return function () {
    fs.readFile(file, function (err, text) {
      if (err) {
        throw err;
      }
      countWordsInText(text);
      checkIfComplete();
    });
  };
}
