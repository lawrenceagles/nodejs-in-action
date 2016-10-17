"use strict";

function Rabbit(type) {
  this.type = type;
}

Rabbit.prototype.speak = function (line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
};

Rabbit.prototype.teeth = "small";

var killerRabbit = new Rabbit("killer");
killerRabbit.teeth = "long, sharp and bloody";


var blackRabbit = new Rabbit("black");

killerRabbit.speak("kill, kill, kill");
blackRabbit.speak("Hello, world!");

console.log(killerRabbit.teeth);

// Using EcmaScript 6 classes

class GuineaPig {

  constructor(type) {
    this.type = type;
    this.teethSize = "medium";
    GuineaPig.numInstances++;
  }

  get teeth() {
    return this.teethSize;
  }

  set teeth(size) {
    this.teethSize = size;
  }

  speak(line) {
    console.log("The " + this.type + " guinea pig says '" + line + "'");
  }
}

var myGuineaPig = new GuineaPig("yellow");
myGuineaPig.speak("woof, woof");

myGuineaPig.teeth = "teeny-weeny";
console.log(myGuineaPig.teeth);
