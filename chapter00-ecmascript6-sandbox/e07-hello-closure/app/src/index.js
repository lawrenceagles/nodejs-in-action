'use strict';

function outer() {
  const outerVar = 'Hello';

  function closure() {
    const innerVar = 'Jason Isaacs';
    console.log(`${ outerVar } to ${ innerVar }`);
  }

  closure();
}

outer();

/* The closure do not see `this` */
let person = {
  name: 'Jason Isaacs',
  greet: function() {
    return function() {
      return `Hello to ${ this.name }`;
    };
  }
};

try {
  person.greet()();
} catch (err) {
  console.log(`Error: ${ err.message }`);
}


/* so you either use self or bind */
let personSelf = {
  name: 'Jason Isaacs',
  greet: function() {
    const self = this;
    return function() {
      return `Hello to ${ self.name }`;
    };
  }
};

console.log(personSelf.greet()());


const personBind = {
  name: 'Jason Isaacs',
  greet: function() {
    const self = this;
    return function() {
      return `Hello to ${ self.name }`;
    }.bind(this);
  }
};

console.log(personBind.greet()());

/* this works better with anonymous arrow functions */

const personArrow = {
  name: 'Jason Isaacs',
  greet: function() {
    return () => {
      return `Hello to ${ this.name }`;
    };
  }
};

console.log(personArrow.greet()());