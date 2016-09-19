"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

var express = require("express");
var bodyParser = require("body-parser");
var Article = require("./lib/db").Article;

var app = express();

/* Enable support for request bodies encoded as JSON */
app.use(bodyParser.json());

/* Enable support for form encoded bodies */
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/articles", function (req, res, next) {
  logger.debug("Listing all available articles");
  Article.all(function (err, articles) {
    if (err) {
      return next(err);
    }
    res.send(articles);
  });
});

app.get("/articles/:id", function (req, res, next) {
  logger.debug("Fetching article:", id);
  var id = req.params.id;
  Article.find(id, function (err, article) {
    if (err) {
      return next(err);
    }
    res.send(article);
  });

});

app.post("/articles", function (req, res, next) {
  logger.debug("Adding a new article");
  var article = { title: req.body.title, content: req.body.content };
  Article.create(article, function (err, savedArticle) {
    if (err) {
      return next(err);
    }
    res.send(savedArticle);
  });
});

app.delete("/articles/:id", function (req, res, next) { /* jshint ignore:line */
  var id = req.params.id;
  logger.debug("About to delete article:", id);

  Article.delete(id, function (err) {
    if (err) {
      return next(err);
    }
    res.send({ message: "Deleted" });
  });
});


var port = process.env.PORT || 5000;
logger.debug("Server established on port", port);

app.listen(port);

module.exports = app;
