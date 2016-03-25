# Chapter 2: Node Programming Fundamentals &mdash; 07-http-server-with-callbacks-v3
> returning early to prevent further nesting

## Description
The example illustrates the use of the return early pattern, that helps reduce the nesting associated to async callbacks.

For example, by returning early from the error, we can avoid having to indent the happy path:

```javascript
function getPosts(response) {
  fs.readFile(__dirname + "/rsrc/posts.json", (readDataErr, readDataBuffer) => {
    if (readDataErr) {
      logger.error("Error retrieving posts data:", readDataErr);
      return hadError(response);
    }

    getTemplate(JSON.parse(readDataBuffer.toString()), response);
  });
}
```
