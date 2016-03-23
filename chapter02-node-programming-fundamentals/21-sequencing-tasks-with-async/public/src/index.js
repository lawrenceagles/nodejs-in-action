"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var async = require("async");
var exec = require("child_process").exec;

function downloadNodeVersion(version, destination, callback) {
  var url = "http://nodejs.org/dist/v" + version;
  url += "/node-v" + version + ".tar.gz";
  var filepath = destination + "/" + version + ".tgz";

  logger.debug("url for version `" + version + "`=`" + url + "`");
  logger.debug("destination for version `" + version + "`=`" + destination + "`");

  logger.debug("about to execute curl to download files...");
  exec("curl " + url + " >" + filepath, callback);
}

async.series([
  function (callback) {
    async.parallel([
      function (callback) {
        logger.info("Downloading Node v.0.11.13 into /tmp");
        downloadNodeVersion("0.11.13", "/tmp", callback);
      },
      function (callback) {
        logger.info("Downloading Node v.0.11.14 into /tmp");
        downloadNodeVersion("0.11.14", "/tmp", callback);
      }
    ], callback);
  },
  function (callback) {
    logger.info("Creating archive of downloaded files...");
    exec("tar cvf /tmp/node_distros.tar /tmp/0.11.13.tgz /tmp/0.11.14.tgz", function (error, stdout, stderr) { /* jshint ignore:line */
      if (error) {
        logger.error("Error tarring the downloaded files: ", error);
        throw error;
      }
      logger.info("Completed");
      callback();
    });
  }
]);
