# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational Design Patterns
> TBD

### Contents
+ TBD

### Intro
This chapter deals with a class of design pattern called *creational*. As the name suggests, these patterns address problems related to the creation of objects.

The term *pattern* is really broad in its definition and can span multiple domains of an application.
Traditionally, it is associated with a well-known set of object-oriented patterns that were popularized in the 90s by the book *Design Patterns: Elements of Reusable Object-Oriented Software*, by the almost legendary Gang of Four (GoF): Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides.

We can define them as:
> A design pattern is a reusable solution to a recurring problem.

JavaScript is a special language, as it has dynamic typing, and it is object-oriented prototype based, but also allows for functional programming. As a result, applying the *GoF* patterns is not as linear and formal as it would have been in classical OO languages. The versatility of JavaScript creates a lot of fragmentation about styles, conventions, techniques, and ultimately patterns.

We'll see that in some cases, the traditional implementation of the *GoF* patterns is not possible because JavaScript doesn't have *real* classes or *abstract interfaces*. However, that original scenario that the *GoF* pattern tries to solve will also be applicable to Node.js.

As a last note, the chapter will describe in detail the traditional patterns, but will also describe some *less traditional* design patterns born within JavaScript ecosystem itself.

We'll tackle:
+ *Factory* pattern &mdash; allows us to encapsulate the creation of an object within a function.
+ *Revealing Constructor* pattern &mdash; allows us to expose private object properties and methods only during the object's creation.
+ *Builder* pattern &mdash; simplifies the creation of complex objects.
+ *Singleton* pattern &mdash; TBD
+ *Dependency Injection* &mdash; helps us with the wiring of the modules of an application

### Factory
The **Factory** patterns allows you to encapsulate the creation of an object within a function.

It main advantages are:
+ It lets you decouple the creation of an object from one particular implementation &mdash; for example, it lets you create an object whose class is determined at runtime.
+ It lets you expose a surface area that is much smaller than that of a class &mdash; as the object creation is encapsulated in a function, there's no way to extend or manipulate the class and also provides a more straightforward developer experience.
+ It can be used to enforce encapsulation, by leveraging closures.


#### Decoupling object creation and implementation
In JavaScript, the functional paradigm is often preferred to a purely object-oriented design for its simplicity, usability and small surface area. This is one of the reasons why the *factory* pattern in JavaScript is so frequently used.

> A *factory* allows you to separate the creation of an object from its implementation.

Essentially, a factory wraps the creation of a new instance, giving us more flexibility and control in the way we create them. Inside the factory, we can choose to create a new instance of the class using `new`, leverage closures to dynamically build a stateful object literal, or even return a different object type based on a condition.

The consumer of the factory is totally agnostic about how the creation is carried out, which is much more flexible than using `new` or `Object.create()`, as we will not be binding our code to a particular way of creating the object.

Consider the following way of creating an `Image` object instance:

```javascript
function createImage(name) {
  return new Image(name);
}

const image = createImage(`photo.jpg`);
```

Encapsulating the creation of the image in `createImage(...)` gives us a lot of flexibility with respect to using `const image = new Image(name)`.

For example, we could do a little refactoring and create specialized classes for each type of image we support:

```javascript
function createImage(name) {
  if (name.match(/\.jpe?g$/)) {
    return new ImageJpeg(name);
  } else if (name.match(/\.gif$/)) {
    return new ImageGif(name);
  } else if (name.match(/.png$/)) {
    return new ImagePng(name);
  } else {
    throw new Error(`unsupported format`);
  }
}
```

Note that the consumer code will be totally unaffected by the change, while if we would have used `new Image(name)` we would need to update the consumer code. Also, when using the *factory*, the classes remain hidden and are not subject of being extended or modified by the consumer code. This can be easily achieved in JavaScript by exporting only the factory, while keeping the classes private.

#### A mechanism to enforce encapsulation
Thanks to closures, a *factory* can also be used as an encapsulation mechanism &mdash; access to the internal details of a component will be controlled, as component interaction will only happen through its public interface, isolating the external code from the changes in the implementation details of the component.

> Encapsulation is one of the fundamental principles of object-oriented design, along with polymorphism and abstraction.

Let's learn how to do that with a simple example:

```javascript
function createPerson(name) {
  const privateProperties = {};

  const person = {
    setName(name) {
      if (!name) {
        throw new Error(`A person must have a name`);
      }
      privateProperties.name = name;
    },
    getName() {
      return privateProperties.name;
    }
  }

  person.setName(name) {
    return person;
  }
}
```

The returned object `person` represents the public interface returned by the factory. The `privateProperties` are inaccesible from the outside and can be only manipulated through `person`'s interface.

| EXAMPLE: |
| :------- |
| See [01 &mdash; *Factory* pattern: Enforcing encapsulation with closures](1-factory-encapsulation-closure) for a runnable example. |


| NOTE: |
| :---- |
| There are other ways to enforce encapsulation besides using a *factory*:
+ Using private class fields (using the hashbang `#` prefix), although this is experimental.
+ Using weakmaps https://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html
+ Using symbols https://2ality.com/2016/01/private-data-classes.html#using-symbols-as-keys-for-private-properties
+ Defining private variables in a constructor https://www.crockford.com/javascript/private.html (this is considered legacy, but it is also the best known approach)
+ Using conventions, like prefixing the property name with `_` to indicate it is private. |

#### Building a simple code profiler
This section illustrates the *factory* pattern by building a simple *code profiler*.

We will build a *code profiler* as an object with the following methods:
+ `start()` &mdash; triggers the start of a profiling session.
+ `end()` &mdash; finalizes the session and logs its execution time to the console.

Also, we want the *profiler* to be automatically deactivated without affecting the consumer code, so that if `NODE_ENV=production` the profiler should do nothing.

The implementation is very simple:

```javascript
class Profiler {
  constructor(label) {
    this.label = label;
    this.lastTime = null;
  }

  start() {
    this.lastTime = process.hrtime.bigint();
  }

  end() {
    const diff = process.hrtime.bigint() - this.lastTime;
    console.log(`Timer '${ this.label }' took ${ diff } nanos`);
  }
}

/* duck typing! */
const noopProfiler = {
  start() {},
  end() {}
};

export function createProfiler(label) {
  if (process.env.NODE_ENV === 'production') {
    return noopProfiler;
  }

  return new Profiler(label);
}
```

Note that instead of exporting `Profiler`, we export the *factory* `createProfiler(...)`. That let us inject logic to return a different type of object (actually, an object literal that has the exact same interface but does nothing).

That simple idea allows you to insulate the consumer code from undesired changes if you want to disable the profiler:

```javascript
import { createProfiler } from './lib/profiler.js';

function getAllFactors(intNumber) {
  const profiler = createProfiler(`getAllFactors(${ intNumber })`);

  profiler.start();
  const factors = [];
  for (let factor = 2; factor <= intNumber; factor++) {
    while ((intNumber % factor) === 0) {
      factors.push(factor);
      intNumber = intNumber / factor;
    }
  }
  profiler.end();

  return factors;
}

const myNumber = process.argv[2];
const myFactors = getAllFactors(myNumber);
console.log(`Factors of ${ myNumber } are: `, myFactors);
```

Thus, by using `createProfiler(...)`, the consumer code will get an implementation that depends on the value of `NODE_ENV` when it is executed.

| EXAMPLE: |
| :------- |
| See [02 &mdash; *Factory* pattern: Simple code profiler](02-factory-code-profiler) for a runnable example. |

#### In the wild
*Factories* are very common in Node.js. For example, the [Knex](https://www.npmjs.com/package/knex) module is a query builder that supports multiple databases. The module exports a *factory* function that returns the right implementation for the database of choice.

#### Object-oriented roots
The *factory* pattern has its roots in object oriented development. The problem it tries to solve is the coupling problem associated to the use of the `new` operator.

One of the *mantras* of object-oriented design is:
> Classes must be opened for extension, but closed for modification

The `new` operator clearly breaks that design principle, as a small change in a class hierarchy represents changes in the consumer code. The set of object-oriented *factory* patterns (*simple factory*, *factory method*, *abstract factory*) solves this problem using interfaces and inheritance.

What we have used in this section is known as the *simple factory idiom*: defining a function that encapsulates object creation, so that clients of that object will use the *factory* function instead of using `new`.


### Builder
270

#### Implementing a URL object

#### In the wild

### Revealing Constructor

### Singleton

### Wiring modules

### Summary

### You know you've mastered this chapter when...

+ TBD


### Code, Exercises and mini-projects

### [01 &mdash; *Factory* pattern: Enforcing encapsulation with closures](01-factory-encapsulation-closure)
Illustrates how to use a *factory* and closures to enforce encapsulation and control object surface area.

### [02 &mdash; *Factory* pattern: Simple code profiler](02-factory-code-profiler)
Illustrates how to define a *factory* and its advantages by building a simple code profiler that gets automatically deactivated when `NODE_ENV=production`.

#### Example 1: [Data compression efficiency](./e01-data-compression-efficiency/)
Write a command-line script that takes a file as input and compresses it using the different algorithms available in the `zlib` module (Brotli, Deflate, Gzip). As an output, write a table that compares the algorithm's compression time and efficiency on the given file. Hint: this could be a good use case for the *fork pattern*, provided that you're aware of its performance considerations.

#### To Do

[ ] TBD
