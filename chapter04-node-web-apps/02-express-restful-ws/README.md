# Chapter 4: What is a Node web application? &mdash; 02-express-restful-ws
> RESTful web services using Express

## Description
Illustrates how to define different route handlers that defines the following endpoints to manage articles as a RESTful resource:
+ POST /articles &mdash; Create a new article
+ GET /articles/id &mdash; Get a single article
+ GET /articles &mdash; Get all articles
+ DELETE /articles/id &mdash; Deletes an article

Each of the route handler defines a function that is activated when such request is received. *Express* makes it easy to handle request parameters (such as the article *id*).
