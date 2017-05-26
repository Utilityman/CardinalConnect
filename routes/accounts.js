'use strict';

var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let Globals = require('../config');
let globals = new Globals();

router.post('/GetAccounts', function (req, res, next) {
  globals.verifyAdmin(req.session.user, function (valid) {
    if (valid) {
      let t0 = new Date().getTime();
      getAccounts(req.body, function(response) {
        let t1 = new Date().getTime();
        res.send(response);
        console.log('POST@/GetAccounts --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
      });
    } else {
      res.send('NOT_ADMIN_USER');
      console.log('POST@/GetAccounts --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    }
  });
});

router.post('/GetUser', function (req, res, next) {
  let t0 = new Date().getTime();
  getUser(req.body, req.session.user, function (response) {
    let t1 = new Date().getTime();
    res.send(response);
    console.log('POST@/GetUser --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
  });
});

function getAccounts(json, callback) {
  if(json.action !== 'getAccounts') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@accounts.js.getAccounts().MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        let collection = db.collection('users');
        collection.find().toArray(function (err, results) {
          if (err) {
            callback('SERVER_ERROR');
            db.close();
          } else {
            callback(results);
            db.close();
          }
        });
      }
    });
  }
}

function getUser (json, user, callback) {
  if (json.action !== 'getUserAccount') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    callback(user);
  }
}

module.exports = router;
