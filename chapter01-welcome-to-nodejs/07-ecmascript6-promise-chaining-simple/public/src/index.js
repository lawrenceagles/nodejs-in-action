"use strict";

const https = require("https");

/* Creating a Promise */
var promise = new Promise(function logic(fulfill) {
  fulfill("{\"name\": \"sergio\"}");
});


/* Simple chaining retuning values */
promise
  .then(function (value) {
    return JSON.parse(value);
  })
  .then(function (value) {
    console.log(value.name);
  })
  .catch(function (err) {
    console.log("An error has occurred: ", err);
  });

