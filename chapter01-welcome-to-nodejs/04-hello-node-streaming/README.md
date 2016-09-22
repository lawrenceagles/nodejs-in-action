# 04-hello-node-streaming
> streaming the contents of a file to the console

## Description
Illustrates the basics of Node.js streaming that allows you to consume data as it's being read instead of waiting for the complete contents to be available.

In the example, a read stream is created on an existing file, and then a processing callback function is registered for handling the `data` event (that will be triggered whenever data is available to be consumed) and the `end` event that is triggered when there is no more data to process.
