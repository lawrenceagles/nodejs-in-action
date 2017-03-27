"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/*
  No-op forwarding proxy: works as a pass-through to the target object
  By assigning a value to the proxy, you will be assigning a value 
  to the target
*/
function demoNoOpProxy() {
  const target = {};
  const handler = {};
  const proxy = new Proxy(target, handler);

  console.log(`(before) target.prop?=${ "prop" in target }`);
  proxy.prop = true;


  console.log(`(after)  target.prop?=${ "prop" in target }`);
  console.log(`target.exposed=${ target.prop }`);
  console.log("=============================");
}
demoNoOpProxy();

/*
  Adding traps to the proxy
  By adding traps you can intercept interactions with
  target object, as long as the interactions happen
  through the proxy object.
*/
function trappingGet() {
  const handler = {
    get(target, key) {
      console.log(`Get trapped for property "${ key }"`);
      return target[key];
    }
  };

  const target = {};
  const proxy = new Proxy(target, handler);
  proxy.num = 123;
  proxy.num;
  proxy.word;
  console.log("=============================");  
}
trappingGet();

/*
  Now we have Reflection in ES6
  Traps in ES6 are mapped one-to-one to the Reflect API: for every
  trap there is a matching reflection method in Reflect
*/
function reflect() {
  const handler = {
    get(target, key) {
      console.log(`Get trapped for property "${ key }"`);
      return Reflect.get(target, key);
    }
  };

  const target = {};
  const proxy = new Proxy(target, handler);
  proxy.word = "Hello to Jason Isaacs!";
  console.log(proxy.num);
  console.log(proxy.word);  
  console.log("=============================");    
}
reflect();

/*
  Trapping can become more interesting when adding logic in the handler
*/
function enhancedTrapping() {
  const handler = {
    get(target, key) {
      if (key.startsWith("_")) {
        throw new Error(`Property "${ key }" is inaccessible from the proxy`);
      }
      return Reflect.get(target, key);
    }
  };

  const target = {
    _hidden: "secret",
    exposed: "Hello"
  };
  const proxy = new Proxy(target, handler);

  try {
    console.log(proxy._hidden);
  } catch (e) {
    console.log(`Error accessing property: ${ e }`);
  }
  console.log(proxy.exposed);
  console.log("=============================");
}
enhancedTrapping();

/*
  Trapping set and get

  In the next example we use a proxy to prevent access to
  underscore properties.
*/
function setGetTraps() {
  const handler = {
    get(target, key) {
      invariant(key, "get");
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      invariant(key, "set");
      return Reflect.set(target, key, value);
    }
  };

  function invariant(key, action) {
    if (key.startsWith("_")) {
      throw new Error(`Invalid attempt to ${ action } private "${ key }" property`);
    }
  }
  const target = {};
  const proxy = new Proxy(target, handler);

  // consuming the proxy
  proxy.text = "hello to Jason Isaacs!";        // writing through the proxy
  console.log(`target.text=${ target.text }`);  // reading directly
  console.log(`proxy.text=${ proxy.text }`);    // reading through the proxy
  try {
    proxy._hidden = "hush!";
  } catch (e) {
    console.log(`Error while writing through the proxy: ${ e }`);
  }
  try {
    console.log(proxy._hidden);
  } catch (e) {
    console.log(`Error while reading through the proxy: ${ e }`);
  }
  console.log("=============================");
}
setGetTraps();

/*
  The desired pattern consist in completely
  hide the target object from consumers, so
  that clients have to work with it through
  the proxy
*/
function hidingTargetObjectBehindProxies() {
  
  function proxied() {
    function invariant(key, action) {
      if (key.startsWith("_")) {
        throw new Error(`Invalid attempt to ${ action } private "${ key }" property`);
      }
    }

    const target = {};
    const handler = {
      get(target, key) {
        invariant(key, "get");
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        invariant(key, "set");
        return Reflect.set(target, key, value);
      }
    };
    return new Proxy(target, handler);
  }
  
  // consuming the proxy
  const proxy = proxied();
  proxy.text = "hello to Jason Isaacs!";        // writing through the proxy
  console.log(`proxy.text=${ proxy.text }`);    // reading through the proxy
  try {
    proxy._hidden = "hush!";
  } catch (e) {
    console.log(`Error while writing through the proxy: ${ e }`);
  }
  try {
    console.log(proxy._hidden);
  } catch (e) {
    console.log(`Error while reading through the proxy: ${ e }`);
  }
  console.log("=============================");
}
hidingTargetObjectBehindProxies();