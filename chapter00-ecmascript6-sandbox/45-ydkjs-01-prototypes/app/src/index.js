'use strict';

/* Object prototype linkage can be set through Object.create() */
const homework = {
  topic: 'JS'
};

// establishes `homework` as the prototype of `otherHomework`
const otherHomework = Object.create(homework);

console.log(otherHomework.topic);

/* shadowing */
otherHomework.topic = 'Maths';
console.log(otherHomework.topic);