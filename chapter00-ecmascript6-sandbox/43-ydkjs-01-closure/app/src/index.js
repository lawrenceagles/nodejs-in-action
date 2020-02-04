'use strict';

/* simple example: closing over msg */
function greeting(msg) {
  return function who(name) {
    console.log(`${ msg }, ${ name }!`);
  };
}

const hello = greeting('Hello'); // creating an instance of the closure
const howdy = greeting('Howdy'); // creating a different instance

hello('Stan');
howdy('neighbour');