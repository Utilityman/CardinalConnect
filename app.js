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
var accounts = require('./routes/accounts');
var internships = require('./routes/internships');
var mentorships = require('./routes/mentorships');

// finally the actual app that will be used
var app = express();

// for JSON POST parsing
app.use(bodyParser.json());

// allow serving of static files
app.use('/', express.static(path.join(__dirname, 'public')));

// map public routes to the '/'
/* TODO: eventually app.use('/Index', index) to access more specific /Index/Register */
app.use('/', index);
app.use('/', admin);
app.use('/', accounts);
app.use('/', internships);
app.use('/', mentorships);

module.exports = app;
