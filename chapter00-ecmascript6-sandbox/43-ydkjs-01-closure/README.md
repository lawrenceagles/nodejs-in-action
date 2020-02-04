# You don't Know JavaScript &mdash; 01: Get Started
## 43 &mdash; Closure
> A refresher on closures

### Closures
*Closure* is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.

Thus:
+ a closure is part of the nature of a function &mdash; objects don't get closures
+ to observe a closure, you must execute a function in a different scope than where that function was originally defined.

In the following example:

```javascript
function greeting(msg) {
  return function who(name) {
    console.log(`${ msg }, ${ name }!`);
  };
}

let hello = greeting('hello');
```

When the `greeting()` function is executed, an instance of the inner function `who()` is created, and that function *closes over* the `msg` variable. No matter when we execute the `hello()` function, it will always remember that originally it *closed over* `'hello'`.

Note that closures don't make copies of the values over which the function has closed over &mdash; rather, they keep a link to the original variable. Therefore, you can actually observe or make updates to these variables over time.

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Closure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md#closure) section.
