# Chapter 4: What is a Node web application? &mdash; 04-express-persistence
> using a database to persist information in a Express application

## Description
Typically, when you want to add a database to a *Node.js* application you will:
1. Decide what database you want to use
2. Look at the available modules that implement a driver or *ORM* for that database
3. Add the module to your project
4. Create the *models* that will wrap the database access with a JavaScript API
5. Add the models to your *Express* routes

For the database we'll use the SQLite with the *sqlite3* module.

For the persistence service layer, we'll use:
+ Article.all(cb) &mdash; Return all articles
+ Article.find(id, cb) &mdash; Given the id, find the corresponding article
+ Article.create({}, cb) &mdash; Create an article with a title and content
+ Article.delete(id, cb) &mdash; Delete an article
