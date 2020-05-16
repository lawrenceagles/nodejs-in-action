# Functional Programming for Java (yes, Java) &mdash; 02: What is functional Programming
## 01 &mdash; Intro
> defining the fundamental principles and concepts of Functional Programming

### Intro

The theoretical underpinnings of computation were developed by Mathematicians like Alonzo Church and Haskell Curry. In the 1930s, Alonzo developed the *Lambda Calculus*, a formalistm for defining and invoking functions (or in his terms *applying* them). Those concepts along with the Combinatory Logic and Category Theory have been a fruitful source of ideas for functional programming.

### The Basic Principles of Functional Programmins

Functional languages share a few basic principles:
+ [Avoiding Mutable State](#avoiding-mutable-state)
+ [Functions as First-Class Values](#functions-as-first-class-values)
+ [Lambdas and Closures](#lambdas-and-closures)
+ [Higher-Order Functions](#higher-order-functions)
+ [Side-Effect-Free Functions](#side-effect-free-functions)
+ [Recursion](#recursion)
+ [Lazy vs. Eager Evaluation](#lazy-vs-eager-evaluation)
+ [Declarative vs. Imperative Programming](#declarative-vs-imperative-programming)

#### Avoiding Mutable State
The first principle is the use of *immutable* values. Allowing mutable values complicate multi-threaded programming, as multiple threads can modify the same shared value. Also, a mutable value makes it very difficult to understand where a given variable value can be changed.

It must be noted that some mutability is unavoidable. Functional Programming will help you encapsulate those mutations in well-defined areas and keep the rest of the code free of mutations.

#### Functions as First-Class Values
Having functions as first-class values means functions can be passed around as other types of variables, assigned to variables, etc.

#### Lambdas and Closures
Lambdas are anonymous functions. Their syntax is more concise than the one used for *named functions*.

A closure is formed when the body of a function refers to one or more *free variables*. That is, variables that aren't passed in as arguments or defined locally, but that are defined in the enclosing scope where the function is defined. The runtime has to *close over* those variables so that they are available when the function references them.

#### Higher-Order Functions
A higher-order function is a function that take other functions as arguments, or that returns them. These functions are great for building abstractions and composing behavior.

#### Side-Effect-Free Functions
A side-effect-free function is a function that do not mutate state. In Mathematics, functions never have side-effects. Side-effect free functions will let you replace a function call with the return value for a given set of input parameters &mdash; this is called referential transparency.
As a consequence, you can represent calling a function by the value it returns, and conversely, you can represent a value by a function call.

Another consequence is that side-effect free functions make excellent building blocks for reuse, since they don't depend or alter the context in which they are run.

#### Recursion
In its purest form, functional programming does not allow mutable values. Therefor, mutable loop counters are not allowed.

The classic functional alternative to an iterative loop is to use *recursion*, where each pass through the function operates on the next item in the collection until a termination point is reached.

#### Lazy vs. Eager Evaluation
We call *lazy evaluation* when we compute a value on demand, rather than before it is being requested. For example, in Mathematics, we represent any subset of natural numbers on demand, as the whole set is infinte. *Eager* evaluation would force us to represent all the infinite values.

Lazy evaluation is useful for deferring expensive operations until needed.

#### Declarative vs. Imperative Programming
Function Programming is *declarative* &mdash; properties and relationships are defined rather than given the specific steps to compute them.

For example, the definition of the *factorial* function is declarative:

```
factorial(n) =  1                     if n = 1
                n * factorial(n - 1)  if n > 1
```

### Designing Types
Function Programming emphasizes the use of core container types such as *lists*, *maps*, *trees* and *sets* for capturing and transforming data, but it also has some useful lessons for good type design.

#### What About Nulls?
Functional Programming fosters the use of an *option* type so that null is never used or checked against it:

```javascript
class Option {
  hasValue() {
    throw new Error('unimplemented');
  }

  get() {
    throw new Error('unimplemented');
  }

  getOrElse(alternative) {
    return this.hasValue() ? get() : alternative;
  }
}
```

Note that `Option` is what we would call an *abstract* class as neither `hasValue` or `get` has implementations.

Now, we can define a subclass of this one called `Some` to represent instances of `Option` that contain a value, and `None` to represent instances of `Option` that are empty.

```javascript
class Some extends Option {
  constructor(value) {
    super();
    this.value = value;
  }

  hasValue() {
    return true;
  }

  get() {
    return this.value;
  }

  toString() {
    return `Some(${ this.value })`;
  }
}

class None extends Option {
  hasValue() {
    return false;
  }

  get() {
    throw new Error('Option instance is empty');
  }

  toString() {
    return `None`;
  }
}
```

You can also create a `wrap(...)` function that returns either a `Some` or `None` instance depending on the argument:

```javascript
function wrap(optionalValue) {
  return optionalValue ? new Some(optionalValue) : new None();
}
```

#### Algebric Data Types and Abstract Data Types
The `Option` type defined above is an *algebraic data type*, which means that there can only be a few well-defined types that implement the abstraction.

Another interesting concept is the *abstract data type*. You typically define an *interface* for an abstraction and give it well-defined semantics. The abstraction can then be implemented by one or more types with relatively little *polymorphic* behavior. Instead, subtypes for an *abstract data type* revolve around different implementation goals, such as performance.
Unlike *algebraic data types*, *abstract data types* typically hide behind a *factory*, which could decide what concrete class to instantiate based on the arguments.

#### A few simple notes on ECMAScript Modules support in Node.js
At the time of writing, Node.js v14.1.0 provides experimental support for ECMAScript modules, but it is enabled by default.

Despite being able to use ECMAScript modules right away in browser-based JavaScript, ECMAScript modules require special treatment in Node.js projects. Namely, in order to use ECMAScript modules in Node.js you will have to:
+ Use module files ending in `.mjs`.
+ Use module files ending in `.js` but have the nearest `package.json` file contains a top-level field `"type": "module"`.

Node.js will treat as CommonJS all other forms of input such as `.js` files when the nearest `package.json`file contains no top-level `"type": "module"`.

It is recommended (in sake of visibility) to make explicit whether CommonJS or ECMAScript modules are being used by:
+ Specifying `.mjs` for ECMAScript modules, and `.cjs` for CommonJS modules.
+ Use explicit `"type": "module"` for ECMAScript modules and `"type": "commonjs"` for CommonJS.

### Exporting from ECMAScript Modules
The `defineStudent` module used in previous examples, can be accommodated as an ECMAScript module as follows:

```javascript
export { getName };

var records = [
  { id: 14, name: 'Jason', grade: 86 },
  { id: 73, name: 'Ellen', grade: 87 },
  { id: 112, name: 'Idris', grade: 75 },
  { id: 6, name: 'Selma', grade: 91 }
];

function getName(studentID) {
  var student = records.find(student => student.id == studentID);
  return student.name;
}
```

Note how the statement `export { getName }` statement is used to export the module's public API. That statement can appear anywhere throughout the file, but it must be used at the top-level scope (not allowed inside any other block or function).

ECMAScript offers a fair bit of variation on how the `export` statement can be used:

```javascript
/* this fails in Node.js with the requested module does not provide an export named 'default' */
export function getName(studentID) {
//...
}
```

The previous statement declares a function that also happens to be exported.

Another allowed variation is:

```javascript
export default function getName(studentID) {
  //...
}
```
This is a so-called *default export*, which has different semantics from other exports. In essence, a *default export* is a shorthand for consumers of the module when they `import`. By contrast, non-default exports are referred as *named exports*.

### Importing from ECMAScript Modules
The `import` keyword must be used only at the top level of an ECMAScript module, outside of any blocks or functions.

The first variant is called *named import*:

```javascript
import { getName } from './lib/define-student.mjs'; // exported as `export { getName };`
getName(73); // Ellen
```

This variant imports only the specifically named public API members from the given module, and it adds those to the top-level scope of the current module.

Note that several members can be imported in the same statement:

```javascript
import { m1, m2 } from './path/to/module.mjs';
```

A named import can be renamed with the as keyword:

```javascript
import { m1 as member1, m2 as member2 } from './path/to/module.mjs';
```

If a given member is a *default export* you can drop the `{}` around the import binding:

```javascript
import member from './path/to/module.mjs'; // exported as export default m;
```

You can import both default and non-default members in one shot:
```javascript
import { default as member1, m2 as member2 } from './path/to/module.mjs';
```

By contrast, the other major variation is the *namespace import*:
```javascript
import * as Student from './path/to/module.mjs';
```

That will import the default and all the named exports, and will store everything under the single namespace identifier `Student`.




## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md#chapter-7-using-closures) section.