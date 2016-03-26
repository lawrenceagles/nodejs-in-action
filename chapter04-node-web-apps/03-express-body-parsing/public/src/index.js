"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

/* Enable support for request bodies encoded as JSON */
app.use(bodyParser.json());

/* Enable support for form encoded bodies */
app.use(bodyParser.urlencoded({ extended: true}));

var articles = [{ title: "Example" }];


app.get("/articles", function (req, res) {
  logger.debug("Listing all available articles");
  res.send(articles);
});

app.post("/articles", function (req, res, next) { /* jshint ignore:line */
  logger.debug("Adding a new article");
  var article = { title: req.body.title };
  articles.push(article);
  res.send(article);
});

app.get("/articles/:id", function (req, res, next) { /* jshint ignore:line */
  var id = req.params.id;
  logger.debug("Fetching article:", id);
  res.send(articles[id]);
});

app.delete("/articles/:id", function (req, res, next) { /* jshint ignore:line */
  var id = req.params.id;
  logger.debug("About to delete article:", id);
  delete articles[id];
  res.send({ message: "Deleted" });
});

var port = process.env.PORT || 5000;
logger.debug("Server established on port", port);

app.listen(port);

module.exports = app;
