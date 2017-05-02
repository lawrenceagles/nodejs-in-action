# 07-full-express-app
> experimenting with the *Express* skeleton

## Description

In this project we build a complete Express application that supports both user interaction and programmatic access. The application allows users to post messages that will be displayed in a stream.

Messages are publicly visible, but only registered users can post messages. The application provides self-registration for new users.

The application will:
1. Allow users to register accounts, sign-in and sign-out
2. Users should be able to post messages (entries)
3. Site visitors should be able to paginate through entries
4. There should be a simple REST API supporting authentication

The endpoints will be:
+ API endpoints:
  + GET /api/entries &mdash; get a list of entries
  + GET /api/entries/page &mdash; get a single page of entries
  + POST /api/entry &mdash; creates a new message
+ Web UI routes:
  + GET /post &mdash; returns HTML form for a new entry
  + POST /post &mdash; sends the HTML form to the server
  + GET /register &mdash; returns the HTML registration form
  + POST /registers &mdash; sends the HTML registration form to the server
  + GET /login &mdash; returns the sign-in form
  + POST /login &mdash; sends the sign-in information to the server
  + GET /logout &mdash; sends the sign-out signal for the user


### Application details

The application will be explained through user interaction, so that you can debug 

User access the root path, he's not logged in and there are no posts, so nothing in shown. User is given the ability to sign-in or register.

User registers.
User posts
User logs-out

user tries to register with the same name

User tries to log in with incorrect password
User tries to log in with correct credentials

User tries to access inexistent route

### Errors
Empty user/password
Fails when redis go down!
Fails when page is an integer but to big! => it shows there are no entries available
user/password value fields are lost when a validation fails


### Express configuration

In addition to configuring environment-specific functionality such as `app.set("view engine", "ejs")`, Express also lets you define custom configuration key/value pairs:

+ `app.set(key, value)`
+ `app.get(key)`
+ `app.enable(key)`
+ `app.disable(key)`
+ `app.enabled(key)`
+ `app.disabled(key)`

You can use an *environment based configuration using `NODE_ENV` environment variable and `app.get("env")`:
+ `NODE_ENV` is an environment variable originated in *Express* but that has been widely adopted for many other Node frameworks. By using that variable you can provide a different behavior depending on the environment. The names for the environments are completely arbitrary, but *Express* sets the `env` variable to `development` if NODE_ENV is not set. Otherwise, Express uses the value of `NODE_ENV` for `app.get("env")`.
```bash
$ NODE_ENV=production npm start
index:server Application running with env = production +72ms
index:server Application running with NODE_ENV = production +0ms
```

### View Caching
The `view cache` setting is enabled in the production environment and disabled in other environments.
```bash
$ NODE_ENV=production npm start  # app.get("view cache") -> true
$ npm start  # app.get("view cache") -> undefined
```

When the *view cache* is enabled, subsequent render calls for a particular view will not re-read the view from disk, which will boost performance. However, if you enable this mechanism in *development* changing the view will require restarting the app to view the changes. 

### View Lookup
The process of looking up a view when invoking `res.render(name)` is similar to Node's require:
+ look for a file matching the name given exists with an absolute path
+ look for a file matching the name given relative to the configured `views`directory
+ look for and index file at the given directory


### Exposing Data to Views
You can use the following mechanisms to pass view variables to `res.render`, order by precedence:
+ pass local variables in the call `res.render(viewName, {key1: value1, key2: value2})`
+ `app.locals` &mdash; can be used for application-level variables
+ `res.locals` &mdash; can be used for request-level local variables

By default, Express exposes one application-level variable called `settings` to view, which is the object containing all of the values set with `app.set`.
For example, `app.set("title", "My Application")` would expose `settings.title` in the template so that you could use:
```html
<!DOCTYPE html>
<html>
  ...
  <body>
    <h1><%= settings.title %>
  </body>
</html>
```

