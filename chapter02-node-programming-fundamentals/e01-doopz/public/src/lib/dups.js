"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var async = require("async");

var byName = Object.create(null);
var bySize = Object.create(null);
var byMD5 = Object.create(null);

module.exports = {
  byFileName : function (fileInfos, cb) {
    logger.debug("Looking for duplicates by file name...");
    async.each(fileInfos, function (fileInfo, next) {
      if (fileInfo.name in byName) {
        byName[fileInfo.name].push(fileInfo);
      } else {
        byName[fileInfo.name] = [fileInfo];
      }
      next();
    }, function (err) {
      if (err) {
        return cb(err);
      }
      logger.debug("Completed duplicates by file name");
      cb(null, byName);
    });
  },
  byFileSize : function (fileInfos, cb) {
    logger.debug("Looking for duplicates by file size...");
    async.each(fileInfos, function (fileInfo, next) {
      if (fileInfo.size in bySize) {
        bySize[fileInfo.size].push(fileInfo);
      } else {
        bySize[fileInfo.size] = [fileInfo];
      }
      next();
    }, function (err) {
      if (err) {
        return cb(err);
      }
      logger.debug("Completed duplicates by file size");
      cb(null, bySize);
    });
  },
  byFileMD5 : function (fileInfos, cb) {
    logger.debug("Looking for duplicates by MD5");
    async.each(fileInfos, function (fileInfo, next) {
      if (fileInfo.md5 in byMD5) {
        byMD5[fileInfo.md5].push(fileInfo);
      } else {
        byMD5[fileInfo.md5] = [fileInfo];
      }
      next();
    }, function (err) {
      if (err) {
        return cb(err);
      }
      logger.debug("Completed duplicates by MD5");
      cb(null, byMD5);
    });
  }
};
