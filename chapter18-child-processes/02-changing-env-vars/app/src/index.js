"use strict";

function displayPath() {
  process.env.PATH.split(":").forEach(path => {
    console.log(path);
  });
}

console.log("=== BEFORE: ");
displayPath();

process.env.PATH += ":~/Development";

console.log("=== AFTER: ");
displayPath();
