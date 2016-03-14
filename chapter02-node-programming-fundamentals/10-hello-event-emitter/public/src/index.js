"use strict";

var log4js = require("log4js");
var logger = log4js.getLogger("main");
logger.setLevel("DEBUG");

/* Create a new EventEmitter that will allow us to generate custom events */
var EventEmitter = require("events").EventEmitter;
var channel = new EventEmitter();

/* Subscribe to join event and provide callback */
channel.on("join", () => console.log("Welcome! you've just joined the channel"));

/*
  You can register as many event listeners as you wish.
  `addEventListener` is a synonym for `on`
*/
channel.addListener("join", () => console.log("The second listener has also been triggered"));

/* Emit a join event */
channel.emit("join");
