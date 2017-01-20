# 02-restful-express
> creates the scaffolding for an Express based RESTful server

## Description
Illustrates how to create a simple RESTful layer to manage *articles*:

The following routes must are enabled:
+ `POST /articles` &mdash; Create a new article
+ `GET /articles/:id` &mdash; Retrieve the given article
+ `GET /articles` &mdash; Retrieve all the articles
+ `DELETE /articles/:id` &mdash; Delete an article

The data for the application is retrieved from a JSON file residing in `mock-data/` directory. The JSON file is *required* as if it were a module and then used in the application.

**NOTE**
The application responds to `POST` messages but does handle the message body.

### Additional info
The project can be used as a template for all *Express* based projects. It includes the `config` custom module and lists `express` and `log4js` as dependencies.
As the `config` module is not published in *NPM*, config dependencies `nconf` and `js-yaml` are also added in the `package.json`.
