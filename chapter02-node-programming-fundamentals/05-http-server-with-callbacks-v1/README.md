# Chapter 1: Getting started &mdash; 05-http-server-with-callbacks-v1
> callbacks in an ellaborate application

## Description
The example illustrates the use of callbacks in an elaborate (yet simple to understand) application, an HTTP server that dynamically builds a response by:
+ Asynchronously reading the contents of a JSON file which contains items that should be returned in the response page.
+ Asynchronously pulling an HTML template
+ Assembling the data from the JSON file into the template
+ Sending the HTML page to the user

Note that even for this case, with only three levels of callbacks, the source code looks cluttered, and difficult to refactor and test.

Next example reuses the same concept and code, but refactors the tasks into named function for a clearer picture of what the program does.
