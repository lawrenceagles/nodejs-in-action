# 05-hello-http-streaming
> streaming an image to the browser

## Description
Illustrates how to leverage the response object of an HTTP request as a Writable stream to stream an image to the browser.

In the example, a *readable stream* is created with the an image file, and then the `pipe` function is used to stream the contents of the file to the *HTTP response* object, which is a *writable stream*.

Thus, the image is streamed to the client without having to perform any explicit read/write operations on the source code.
