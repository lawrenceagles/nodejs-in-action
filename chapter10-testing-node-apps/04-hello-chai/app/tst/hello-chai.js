"use strict";

const chai = require("chai");
const assert = chai.assert;

const foo = "bar";
const tea = { flavors: ["chai", "earl grey", "darjeeling"] };

assert.typeOf(foo, "string");

assert.equal(foo, "bar");
assert.lengthOf(foo, 3);

assert.property(tea, "flavors");
assert.lengthOf(tea.flavors, 3);