# Chapter 1: Getting started &mdash; 04-hello-module-system-caveats
> caveats of the module system

## Description
The example illustrates the behavior of the Node's system when looking for *required* modules.

These are the general guidelines:
+ Modules hosted on directories not named `node_modules`:
  + should be referenced by its relative path `"./lib/module"`
  + can be individual files `module.js`
  + can be directories `./lib/module`:
    + if in directory and no `package.json` is provided, the module should be named `index.js`
    + otherwise, include a `package.json` with a property `"main": "module.js"`

+ Modules hosted on directories named `node_modules` (not necessarily `node_modules` used by `npm`):
  + should be referenced globally by name, like *npm modules* `"module"`
  + can be individual files `module.js`
  + can be directories `./lib/module`:
    + if in directory and no `package.json` is provided, the module should be named `index.js`
    + otherwise, include a `package.json` with a property `"main": "module.js"`
