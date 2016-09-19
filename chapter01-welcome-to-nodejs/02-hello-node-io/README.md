# 02-hello-node-io
> Demonstrates non-blocking nature of Node.js I/O

## Description
Illustrates how the `fs.readFile` operation is non-blocking. In the example, a callback is registered to be executed after the `readFile` operation has completed.

**Note**
Note that `fs.readFile` requires an absolute path, so `__dirname` variable has to be prepended to the name of the file that is read. Note also that in order to see the file contents as readable characters in the console, you have to use `toString` (otherwise, you'll only see a stream of bytes). 
