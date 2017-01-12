"use strict";

/* old style prototype classes */
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
    GuineaPig.numInstances++; /* static variable */
  }

  /*
    Setters and Getters allows for extra logic to be  added when giving or
    retrieving values to/from properties, but all properties will be exposed
    whether or not setters/getters are defined (i.e. teethSize will also be
    available from client code)
  */
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

GuineaPig.numInstances = 0; // this is ridiculous, but i don't seem to find a way to initialize the static var from inside the class

var myGuineaPig = new GuineaPig("yellow");
myGuineaPig.speak("woof, woof");

myGuineaPig.teeth = "teeny-weeny";
console.log(myGuineaPig.teeth);
console.log(myGuineaPig.type);
console.log(GuineaPig.numInstances);

