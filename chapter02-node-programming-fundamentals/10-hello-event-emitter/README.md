# Chapter 1: Getting started &mdash; 10-hello-event-emitter
> emitting and registering custom events

## Description
The example illustrates how to emit and register listener to custom events.

In the example, we obtain the `EventEmitter` constructor from the `events` module and create an `EventEmitter`. Then, we register a couple of listeners using both `on` and `addListener` methods. After that, we use `emit` to generate a custom event and see how both the listeners are triggered. 
