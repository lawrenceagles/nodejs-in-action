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




/* Advanced chaining returning Promises */

// Wrapping HTTP GET in a Promise
function get(protocol, host, path) {

  function promiseHandler(fulfill, reject) {
    let body = "";
    https.get({
      protocol: protocol,
      host: host,
      path: path,
      headers: {"user-agent": "node.js"}
    }, (res) => {
      console.log(`Response received: STATUS: ${res.statusCode}`);
      if (res.statusCode != 200) {
        reject(new Error(`Response status not OK: ${res.statusCode}`));
      }
      res.on("data", function (chunk) {
        body += chunk.toString("utf8");
      });
      res.on("end", () => {
        fulfill(body);
        res.resume();
      });
    })
    .on("error", (e) => {
      console.error(`Got error: ${e}`);
      reject(new Error(`Error calling: ${protocol}://${host}/${path}: ${e}`));
    });
  }

  return new Promise(promiseHandler);
}

get("https:", "api.github.com", "/users")
  .catch(function (err) {
    console.log(`Call to retrieve users failed: ${err}`);
  })
  .then(function parseUsersResponse(res) {
    console.log("Received response: ", res);
    return JSON.parse(res);
  })
  .then(function getRepos(res) {
    return get("https:", "api.github.com", `/users/${res[0].login}/repos`)
            .catch(function (err) {
              console.log(`Call to retrieve repos failes: ${err}`);
            });
  })
  .then(JSON.parse)
  .then(function print(res) {
    console.log(`A repo: ${res[0].name}`);
  })
  .catch(function (err) {
    console.err(`Error in the process: ${err}`);
  });
