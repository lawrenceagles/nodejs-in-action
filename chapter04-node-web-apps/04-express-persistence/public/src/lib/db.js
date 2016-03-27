"use strict";

/* Connect to Database SQLite style */
var sqlite3 = require("sqlite3").verbose();
var dbName = "tldr.sqlite";
var db = new sqlite3.Database(dbName);

/*
  Make the db and the CRUD API represented by Article
  accessible for the outside world
*/
module.exports = db;
module.exports.Article = Article;


db.serialize(function() {
  var sql = "CREATE TABLE IF NOT EXISTS articles" +
            "( id INTEGER PRIMARY KEY,"           +
            "  title TEXT,"                       +
            "  content TEXT )";
  db.run(sql);
});

function Article() {
}

Article.all = function (cb) {
  db.all("SELECT id, title, content FROM articles", cb);
};

Article.find = function (id, cb) {
  db.get("SELECT id, title, content FROM articles WHERE id = ?", id, cb);
};

Article.create = function (data, cb) {
  var sql = "INSERT INTO articles (title, content) VALUES (?, ?)";
  db.run(sql, data.title, data.content, cb);
};

Article.delete = function (id, cb) {
  if (!id) {
    return cb(new Error("An id is required"));
  }
  db.run("DELETE FROM articles WHERE id = ?", id, cb);
};
