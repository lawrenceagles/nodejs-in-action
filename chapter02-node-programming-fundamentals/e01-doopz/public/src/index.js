"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

//var async = require("async");

//var fileinfo = require("./lib/fileinfo");
var dups = require("./lib/dups");

var fileInfos = [
  { name: "file1", path: "path1", size: 10, md5: "aa"},
  { name: "file2", path: "path2", size: 0, md5: "aa"},
  { name: "file1", path: "path3", size: 10, md5: "ab"}
];



/*
dups.byFilename(fileInfos, function (err, byName) {
  if (err) {
    throw err;
  }
  console.log(byName);
});
*/
/*
dups.byFileSize(fileInfos, function (err, bySize) {
  if (err) {
    throw err;
  }
  console.log(bySize);
});
*/
dups.byFileMD5(fileInfos, function (err, byMD5) {
  if (err) {
    throw err;
  }
  console.log(byMD5);
});

/*
fileinfo("/tmp/test", function done(err, fileInfos) {
  if (err) {
    throw err;
  }
  console.log(fileInfos);
});
*/
