'use strict';

/*
 base dependencies
*/
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var mongo = require('mongodb');

/*
  application routes -- abstracted away to routes
*/

var index = require('./routes/index');
var admin = require('./routes/admin');

// finally the actual app that will be used
var app = express();

// for JSON POST parsing
app.use(bodyParser.json());

// allow serving of static files
app.use('/', express.static(path.join(__dirname, 'public')));

// map public routes to the '/'
app.use('/', index);
app.use('/', admin);

module.exports = app;
