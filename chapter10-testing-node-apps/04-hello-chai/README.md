# 04-hello-chai
> an introduction to the popular `chai` assertion library.

## Description
*Chai* is a popular assertion library that comes with three interfaces: 
+ `assert`
+ `expect`
+ `should`

The `assert` interface is an enhancement of Node.js *assert* module with additional functions for comparing objects, arrays and their properties such as `typeOf`.

The following example shows how it is configured and how to use assert:
```javascript
const chai = require("chai");
const assert = chai.assert;

assert.typeOf(foo, "string");  
assert.equal(foo, "bar");
assert.lengthOf(foo, 3);
assert.property(tea, "flavors");
```

