"use strict";

/* Case 1: lib file in current dir, referenced globally
var lib0 = require("lib0"); ERR: cannot find module 'lib0'
console.log("lib0.greetings:", lib0.greetings);
*/

/* Case 2: lib file in current dir, referenced locally */
var lib0 = require("./lib0");
console.log("lib0.greetings:", lib0.greetings);

/* Case 3: lib in dir, named index.js, no package.json
var lib1 = require("lib1"); ERR: cannot find module 'lib1'
console.log("lib1.greetings:", lib1.greetings);
*/

/* Case 4: lib in dir, named index.js, no package.json */
var lib1 = require("./lib1");
console.log("lib1.greetings:", lib1.greetings);

/* Case 5: lib in dir, NOT named index.js, no package.json
var lib2 = require("./lib2"); ERR: cannot find module './lib2'
console.log("lib2.greetings:", lib2.greetings);
*/

/* Case 6: lib in dir, NOT named index.js, WITH package.json with main element,  */
var lib3 = require("./lib3");
console.log("lib3.greetings:", lib3.greetings);

/* Case 7: lib in dir, NOT named index.js, WITH package.json with main element,
var lib3 = require("lib3"); ERR: cannot find module 'lib3'
console.log("lib3.greetings:", lib3.greetings);
*/

/* Case 8: lib file in node_modules dir, a subdir, referenced globally */
var lib4 = require("lib4");
console.log("lib4.greetings:", lib4.greetings);

/* Case 9: lib dir in node_modules dir with index.js, no package.json a subdir, referenced globally */
var lib5 = require("lib5");
console.log("lib5.greetings:", lib5.greetings);

/* Case 10: lib dir in node_modules dir with app.js, no package.json, a subdir, referenced globally
var lib6 = require("lib6"); ERR: cannot find module 'lib6'
console.log("lib6.greetings:", lib6.greetings);
*/

/* Case 11: lib dir in node_modules dir with app.js, with package.json, a subdir, referenced globally */
var lib7 = require("lib7");
console.log("lib7.greetings:", lib7.greetings);
