# Chapter 1: Getting started &mdash; 04-hello-stream-chunking
> streaming an input file and identifying chunks

## Description
Demonstrates with a very simple example how to create an input stream using `fs.createReadStream` and how to register event listeners for the `data` and `end` events. In particular, each time we receive the `data` event a *chunk* of information will be sent to the application for processing (about 64K).
