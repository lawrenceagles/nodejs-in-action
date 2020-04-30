# You don't Know JavaScript &mdash; 02: Scope and Closures
## 58 &mdash; Using Closures
> practising closures

### Intro
*Closures* has traditionally been a daunting topic in JavaScript. In the previous section, the *principle of least exposure* was introduced, as a way to properly apply scoping rules to limit the exposure of variables.

*Closures* build on this approach: for variables we need to use over time, instead of placing them in larger outer scopes, we can encapsulate them while still preserving access to them from inside the functions. Functions *remember* these referenced scoped variable via *closure*.

*Closures* are one of the most important language characteristics ever invented in programming &mdash; it underlies major programming paradigms, including Function Programming, modules and Object-Oriented design. Getting comfortable with closures is fundamental for mastering JavaScript and leveraging many important design patterns.

### See the Closure
Closure comes originally from lambda calculus. It is a behavior intrinsically bound to functions &mdash; if you're not dealing with functions, closure does not apply. For examples, objects cannot have closure, nor does a class. A class function or method migh have closure.

In order to understand the behavior associated to a closure, a function needs to be invoked in a different branch of the scope chain where it was originally defined. That is, a function executing in the same scope it was defined will not exhibit any observable different behavior with or without closure.

Consider the following pice of code, annotated according to our *bubble mental model* for scopes:
```javascript
// outer/global scope: RED(1)

function lookupStudent(studentID) {
  // function scope: BLUE(2)

  var students = [
    { id: 14, name: 'Jason' },
    { id: 73, name: 'Elizabeth' },
    { id: 112, name: 'Tom' },
    { id: 6, name: 'Ingrid' }
  ];

  return function greetStudent(greeting) {
    // function scope: GREEN(3)
    var student = students.find(student =>
      // function scope: ORANGE(4)
      student.id == studentID);

    return `${ greeting }, ${ student.name }!`;
  };
}

var chosenStudents = [
  lookupStudent(6),
  lookupStudent(73)
];
chosenStudents[0].name; // greetStudent (function name)

chosenStudents[0]('Hello');   // Hello, Ingrid!
chosenStudents[1]('Howdy');   // Howdy, Elizabeth!
```

The function `lookupStudent()` creates and returns an inner function called `greetStudent()`. This outer function is called twice in the program and the results are stored in an array.
Then, we check that the name of the function returned by `lookupStudent()` and stored in the array, and we also call the function for the two elements of the array with different parameters.

The relevant facts here are:
> `greetStudent()` received a single argument, however, the function is able to successfully resolve its references to both `students` and `studentID` which come from the scope of `lookupStudent()` rather than from the scope on which `chosenStudents[0]('Hello')` is invoked.

If JavaScript functions would not have closure, after the completion of each `lookupStudent()` call, the *garbage collector* would reclaim both `students`and `studentID` and the invocations on the array elements would fail with a *reference error*.

Note that even the arrow function passed to the `find()` method works as expected, holding the closure over `studentID`.

Let's examine another classic example used to introduce closures:

```javascript
function adder(num1) {
  return function addTo(num2) {
    return num1 + num2;
  };
}

var add10To = adder(10);
var add42To = adder(42);

add10To(15); // 25
add42To(9);  // 51
```

Each instance of the inner function is closing over its own `num1` variable, so it's not only that `num1` doesn't go away when adder finishes, but also that each of the *instantiation* of the function remember its own number. In short, everytime that the outer function is called, a new inner function instance is created, and for each new instance a new closure.

### Live Link, Not a Snapshot
A closure maintains a live link to the variable it closes over, not a snapshot of it. That lets the function to update the closed over variable as required.


In this example, a `makeCounter()` function is defined. This function returns an inner function that closes over `count` which gets updated everytime it is called.
```javascript
function makeCounter() {
  var count = 0;
  return function getCurrent() {
    count = count + 1;
    return count;
  };
}

const hits = makeCounter();

hits(); // 1
hits(); // 2
hits(); // 3
```

It must be noted that a closure does not require an inner function returned from an outer function &mdash; it is enough to have a function that closes over an outer scope:

Also, as the closure maintains a live-link to the variable, it cannot be used to *freeze* the value of a variable.
```javascript
var keeps = [];
for (var i = 0; i < 3; i++) {
  keeps[i] = function freezeIndexValue() {
    return i;
  };
}

console.log(`keeps[0]() = ${ keeps[0]() }`);
console.log(`keeps[1]() = ${ keeps[1]() }`);
console.log(`keeps[2]() = ${ keeps[2]() }`);
```

You might have expected the `keeps[0]()` to return `0`, `keeps[1]()` to return `1`, etc. but that's not the case because `freezeIndexValue()` closes over `i` as a variable, instead of creating an snapshot of its value.

That could be achieved by making the inner function to close over a different variable on each iteration:

```javascript
var keeps = [];
for (var i = 0; i < 3; i++) {
  let j = i;
  keeps[i] = function freezeIndexValue() {
    return j;
  };
}

console.log(`keeps[0]() = ${ keeps[0]() }`);  // 0
console.log(`keeps[1]() = ${ keeps[1]() }`);  // 1
console.log(`keeps[2]() = ${ keeps[2]() }`);  // 2
```

Also, as `let` creates a new variable on each iteration, you could do:
```javascript
var keeps = [];
for (let i = 0; i < 3; i++) {
  keeps[i] = function freezeIndexValue() {
    return j;
  };
}

console.log(`keeps[0]() = ${ keeps[0]() }`);  // 0
console.log(`keeps[1]() = ${ keeps[1]() }`);  // 1
console.log(`keeps[2]() = ${ keeps[2]() }`);  // 2
```

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Function Declarations in Blocks](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md#function-declarations-in-blocks-fib) section.