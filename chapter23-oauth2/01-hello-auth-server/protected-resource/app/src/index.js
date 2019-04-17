'use strict';

/*
  General requires
*/
const debug = require('debug')('protected-resource:index');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const requestLogger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const config = require('./lib/config');
const util = require('util');
const messages = require('./middleware/messages');
const cors = require('cors');
const getAccessToken = require('./middleware/get-access-token');
// const nosql = require('nosql').load('file.nosql');
// const loki = require('lokijs');
// const db = new loki('../authorization-server/tokens.db', { autoload: true, autoloadCallback: databaseInitialize, autosave: false, autosaveInterval: 5000 } );

// let items;
// function databaseInitialize() {
//   items = db.getCollection('tokens');
//   if (items === null) {
//     items = db.addCollection('tokens');
//   }

//   runProgramLogic();
// }

/*
  Routes
*/
const routes = require('./routes/index');
const errRoutes = require('./routes/error-routes');


util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


const app = express();
debug(`Express application started with env=${ app.get('env')}; NODE_ENV=${ config(`NODE_ENV`) }; View Caching: ${ app.get('view cache') }`);


/*
  View engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/*
  Middleware setup
*/

/* 3rd party middleware */
app.use(favicon(path.join(__dirname, config('server:public'), 'favicon.ico')));
app.use(requestLogger(config('logger:format') || 'tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'a237b783c4', resave: false, saveUninitialized: true }));
app.use(helmet());
app.use(express.static(path.join(__dirname, config('server:public'))));
app.use(cors());

/* custom middleware */
app.use(messages);
// app.use(getAccessToken);

/*
  Routes setup
*/

// Interactive requests
app.get('/', routes.home);
app.options('/resource', cors());
app.post('/resource', cors(), getAccessToken, routes.resource);



/*
  Error handling setup
*/
app.use(errRoutes.notFound);
app.use(errRoutes.error);


debug(`Express application started with env=${ app.get('env')}; NODE_ENV=${ config(`NODE_ENV`) }; View Caching: ${ app.get('view cache') }; Views directory: ${ app.get('views') }`);


// OAuth related information


// const codes = {};
// const requests = {};

// function runProgramLogic() {
//   if (items.count() > 0) {
//     const adri = items.findOne({ 'access_token': 'UEj1qx7t1JKeY2yfW2cCC9EuUOOK7Nv7' });
//     console.log(adri);
  
//   }
// }




module.exports = app;