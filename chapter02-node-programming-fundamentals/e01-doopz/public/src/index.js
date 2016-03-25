"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var async = require("async");

var fileinfo = require("./lib/fileinfo");

var dups = require("./lib/dups");
var report = require("./lib/report");

var fromDir = "/tmp/test";

async.waterfall([
  function readDirectory(cb) {
    logger.debug("reading files from directory", fromDir);
    fileinfo(fromDir, cb);
  },
  function getDups(fileInfos, cb) {
    logger.debug("Looking for duplicates on files retrieved");
    async.parallel([
      async.apply(function dupsByName(fileInfos, cb) {
        logger.debug("Looking for duplicates by file name");
        dups.byFileName(fileInfos, cb);
      }, fileInfos),
      async.apply(function dupsBySize(fileInfos, cb) {
        logger.debug("Looking for duplicates by file size");
        dups.byFileSize(fileInfos, cb);
      }, fileInfos),
      async.apply(function dupsByMD5(fileInfos, cb) {
        logger.debug("Looking for duplicates by file hash (MD5)");
        dups.byFileMD5(fileInfos, cb);
      }, fileInfos)
    ], cb);
  }
], function done(err, duplicates) {
  if (err) {
    logger.error("Error looking for duplicates in `" + fromDir + "`: " + err);
    throw err;
  }
  logger.debug("Results completed, printing report");

  report(duplicates[0], "Duplicates by Name", "path");
  report(duplicates[1], "Duplicates by Size", "path");
  report(duplicates[2], "Duplicates by MD5", "path");
});
