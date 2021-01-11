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
The **Builder** pattern is a creational pattern that simplifies the creation of complex objects by providing a fluent interface, which allows you to build the object step by step.

With a *builder*, you greatly improve the developer experience and overall readability of complex object creation.

The general motivation for a *builder* comes from a class constructor that requires a long list of arguments, many of them complex ones, that are are required to build a complete and consistent object instance.

For example, consider the following `Boat` class:

```javascript
class Boat {
  constructor(hasMotor, motorCount, motorBrand, motorModel, hasSails,
              sailsCount, sailsMaterial, sailsColor, hullColor, hasCabin) {
    /* ... */
  }
}
```

Invoking such constructor will be both hard to read and error-prone (which argument is what?).

A first step to try to fix this consists in aggregating all arguments in a single object literal:

```javascript
class Boat {
  constructor(allParameters) {
    /* ... */
  }
}

const myBoat = new Boat({
  hasMotor: true,
  motorCount: 2,
  motorBrand: 'Best Motor Co.',
  motorModel: 'OM123',
  hasSails: true,
  sailsCount: 1,
  sailsMaterial: 'fabric',
  sailsColor: 'white',
  hullColor: 'blue',
  hasCabin: false
});
```

This greatly improves the original approach, as now all the parameters are *labelled*. However, one drawback of this new approach is that the only way to to know what the actual inputs are is to look at the class documentation or class implementation, which is far from ideal. For example, there might be underlying rules such as: if you specify `hasMotor: true`, then you have to also specify `motorCount`, `motorBrand`, and `motorModel`.

The **Builder** pattern fixes these last few flaws providing a fluent interface that is simple to read, self-documenting, and that provides guidance towards the creation of a consistent object.

The following example illustrates how to create the *builder* class that implements the *builder* pattern, and how easy it is now to create the object:

```javascript
/* eslint-disable no-unused-vars */
class BoatBuilder {
  withMotors(count, brand, model) {
    this.hasMotor = true;
    this.motorCount = count;
    this.motorBrand = brand;
    this.motorModel = model;
    return this;
  }

  withSails(count, material, color) {
    this.hasSails = true;
    this.sailsCount = count;
    this.sailsMaterial = material;
    this.sailsColor = color;
    return this;
  }

  hullColor(color) {
    this.hullColor = color;
    return this;
  }

  withCabin() {
    this.hasCabin = true;
    return this;
  }

  build() {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin
    });
  }
}

class Boat {
  constructor(allParameters) {
    this.hasMotor = allParameters.hasMotor;
    this.motorCount = allParameters.motorCount;
    this.motorBrand = allParameters.motorBrand;
    this.motorModel = allParameters.motorModel;
    this.hasSails = allParameters.hasSails;
    this.sailsCount = allParameters.sailsCount;
    this.sailsMaterial = allParameters.sailsMaterial;
    this.sailsColor = allParameters.sailsColor;
    this.hullColor = allParameters.hullColor;
    this.hasCabin = allParameters.hasCabin;
  }
}

const myBoat = new BoatBuilder()
  .withMotors(2, 'Best Motor Co.', 'OM123')
  .withSails(1, 'fabric', 'white')
  .withCabin()
  .hullColor('blue')
  .build();
```

As you see, we create a new class `BoatBuilder` whose responsibility is to collect all the parameters needed to create a `Boat` using helper methods. These method are typically defined for each parameter or set of related parameters.

| EXAMPLE: |
| :------- |
| See [03 &mdash; *Builder* pattern: Complex object creation](03-builder-complex-object-creation) for a runnable example. |

The general rules for implementing the *builder* pattern are:
+ The main objective is to break down a complex constructor into multiple, more readable, and more manageable steps.
+ Try to create builder methods that can set multiple parameters at once
+ Deduce and implicitly set parameters based on the values received as input by a setter method, and in general, try to encapsulate as much parameter setting related logic into the setter methods so that the consumer of the builder interface is free from doing so.
+ If necessary, it's possible to further manipulate the parameters (for example, type casting, normalization, or extra validation) before passing them to the constructor of the class built to simplify the work left to do by the builder class consumer even more.

| NOTE: |
| :---- |
| In JavaScript, the *Builder* pattern can also be applied to invoke functions. Technically, both approaches will be just the same, but formally, when invoking functions you would typically define an `invoke()` method that triggers the call to the complex function with the parameters collected by the *builder*. |

#### Implementing a URL object builder

#### In the wild

### Revealing Constructor

### Singleton

### Wiring modules

### Summary

### You know you've mastered this chapter when...

+ TBD


### Code, Exercises and mini-projects

#### [01 &mdash; *Factory* pattern: Enforcing encapsulation with closures](01-factory-encapsulation-closure)
Illustrates how to use a *factory* and closures to enforce encapsulation and control object surface area.

#### [02 &mdash; *Factory* pattern: Simple code profiler](02-factory-code-profiler)
Illustrates how to define a *factory* and its advantages by building a simple code profiler that gets automatically deactivated when `NODE_ENV=production`.

#### [03 &mdash; *Builder* pattern: Complex object creation](03-builder-complex-object-creation)
Illustrates how to use the *builder* pattern to enable the creation of a complex object by the provision of a fluent interface that is simple to read, self-documenting, and that provides guidance toward the creation of a consistent object.

#### Example 1: [Data compression efficiency](./e01-data-compression-efficiency/)
Write a command-line script that takes a file as input and compresses it using the different algorithms available in the `zlib` module (Brotli, Deflate, Gzip). As an output, write a table that compares the algorithm's compression time and efficiency on the given file. Hint: this could be a good use case for the *fork pattern*, provided that you're aware of its performance considerations.

#### To Do

[ ] TBD
