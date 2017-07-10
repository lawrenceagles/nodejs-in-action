"use strict";

const child_process = require("child_process");

/* spawn: non-Node, evented, without subshell */

/* spawn child process and pipe child process out/err to stdout/stderr */
const childProcess = child_process.spawn("echo", ["hello", "world", "$TERM"]);
childProcess.on("error", console.error);
childProcess.stdout.pipe(process.stdout);
childProcess.stderr.pipe(process.stderr);

