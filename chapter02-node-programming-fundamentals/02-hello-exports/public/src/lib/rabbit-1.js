"use strict";

function Rabbit(type) {
  this.type = type;
}

Rabbit.prototype.speak = function() {
  console.log("Hi, I'm a " + this.type + " rabbit");
};

module.exports = Rabbit;
