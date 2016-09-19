"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("fileinfo");
logger.setLevel("DEBUG");

var fs = require("fs");
var path = require("path");
var async = require("async");
var crypto = require("crypto");


var files = [];

module.exports = function getFileInfos(fromDir, cb) {
  logger.debug("Obtaining files from ", fromDir);
  fs.readdir(fromDir, function (err, filenames) {
    async.map(filenames, function (filename, next) {
      let filePath = path.join(fromDir, filename);
      fs.stat(filePath, function (err, stats) {
        if (stats.isFile()) {
          let stream = fs.createReadStream(filePath);
          let md5Hash = crypto.createHash("md5");
          stream.on("data", function (data) {
            md5Hash.update(data, "utf8");
          });

          stream.on("end", function () {
            let md5 = md5Hash.digest("hex");
            files.push({ name: filename, path: filePath, size: stats.size, md5: md5 });
            next();
          });

        } else if (stats.isDirectory()) {
          getFileInfos(filePath, next);
        }
      });
    }, function (err) {
      if (err) {
        return cb(err);
      }
      logger.debug("Completed file retrieval for", fromDir);
      cb(null, files);
    });
  });
};
