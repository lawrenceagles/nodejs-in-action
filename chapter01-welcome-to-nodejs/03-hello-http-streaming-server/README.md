# Chapter 1: Getting started &mdash; 03-hello-http-streaming-server
> streaming an image file to an HTTP response

## Description
Illustrates how to create an HTTP server that streams a local GIF file to the HTTP response. Thus, instead of having to read the entire image in memory, and then write it to the response, the data is read and automatically sent to the response as it comes in:
```javascript
fs.createReadStream(__dirname + "/image.gif").pipe(response);
```
