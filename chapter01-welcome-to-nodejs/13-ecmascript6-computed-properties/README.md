# 13-ecmascript6-computed-properties
> introducing ES6 Computed Properties

## Description
Illustrates how to use *ES6 computed properties* which let you define object properties whose key is not fixed until runtime as if they were static using the syntax `[key]: value`

```javascript
const numbers = [1, 2, 3, 4, 5];
const names = ["uno", "dos", "tres", "catorce"];

const namesAndNumbers = { numbers, names };

/* this is effectively the same as */
const namesAndNumbers = { numbers: numbers, names: names };
```