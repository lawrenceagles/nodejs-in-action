"use strict";

const child_process = require("child_process");
const util = require("util");
const execFile = util.promisify(child_process.execFile);

/* execFile: non-Node, buffered output, without subshell */

/* simple */
child_process.execFile("echo", ["hello", "world", "$TERM"], (err, stdout, stderr) => {
  if (err) {
    return console.error("Error executing command", err.message);
  }
  console.log("execFile: successful execution");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
});


/* error handling: ENOENT - not found */
child_process.execFile("hecho", ["hello", "world", "$TERM"], (err, stdout, stderr) => {
  if (err) {
    return console.error("Error executing command", err.message);
  }
  console.log("execFile: successful execution");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
});


/* error handling: Command failed - not found */
child_process.execFile("cat", ["non-existing"], (err, stdout, stderr) => {
  if (err) {
    return console.error("Error executing command", err.message);
  }
  console.log("execFile: successful execution");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
});

/* error handling: Command failed - not found */
child_process.execFile("git", ["flushy"], (err, stdout, stderr) => {
  if (err) {
    return console.error("Error executing command", err.message);
  }
  console.log("execFile: successful execution");
  console.log("stdout:", stdout);
  console.log("stderr:", stderr);
});

(async () => {
  const {stdout, stderr} = await execFile("node", ["--version"]);
  console.log("stdout:", stdout);
  console.log("stderr:", stderr); 
})();