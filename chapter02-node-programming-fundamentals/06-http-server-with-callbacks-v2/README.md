# Chapter 2: Node Programming Fundamentals &mdash; 06-http-server-with-callbacks-v2
> refactoring and naming functions to improve readability in async programming with callbacks

## Description
The example illustrates the use of callbacks in an elaborate (yet simple to understand) application, an HTTP server that dynamically builds a response by:
+ Asynchronously reading the contents of a JSON file which contains items that should be returned in the response page.
+ Asynchronously pulling an HTML template
+ Assembling the data from the JSON file into the template
+ Sending the HTML page to the user

The code has been refactored to create functions that identify the tasks performed by the program.

Pay special attention to the fact that event when refactoring, you have to honor the asynchronicity, that is, you will not get rid of the nesting nature of the program simply by using named functions, as those functions should be called from the outer callbacks:

Originally:
```JavaScript
http.createServer((request, response) => {
  if (request.url === "/") {
    fs.readFile(__dirname + "/rsrc/posts.json", (readDataErr, readDataBuffer) => {
      if (readDataErr) {
        console.log("Error reading posts data:", readDataErr);
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.end("Server Error");
      } else {
        var posts = JSON.parse(readDataBuffer.toString());
...
```

will be transformed in something more readable such as:
```JavaScript
http.createServer((request, response) => {
  logger.debug("Request received for URL: ", request.url);
  if (request.url === "/") {
    getPosts(response);
...

function getPosts(response) {
  fs.readFile(__dirname + "/rsrc/posts.json", (readDataErr, readDataBuffer) => {
    if (readDataErr) {
      logger.error("Error retrieving posts data:", readDataErr);
      hadError(response);
    } else {
      getTemplate(JSON.parse(readDataBuffer.toString()), response);
    }
  });
}
```

but the `getTemplate` actions will still have to be embedded in `getPosts` success callback actions.
