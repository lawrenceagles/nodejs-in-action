# Chapter 1: Getting started &mdash; 01-hello-node-modules
> implementing and using custom modules

## Description
The example illustrates how to implement and use the functionality exported from modules.

In the example, a module for currency conversion between Rupees and Euros is implemented, and two functions are exported using `exports`:
```javascript
exports.myFunctionA = function (arg) {
  ...  
};

exports.myFunctionB = function (arg) {
  ...  
};
```
Then, the module is leveraged from the main program using `require`:
```javascript
var exportedFunctionality = require("./my_module/module");

exportedFunctionality.myFunctionA(...);
...
exportedFunctionality.myFunctionB(...);
```
