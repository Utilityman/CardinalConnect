'use strict';

var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let Globals = require('../config');
let globals = new Globals();

router.post('/GetInternships', function (req, res, next) {
  let t0 = new Date().getTime();
  getInternships(req.body, function(response) {
    let t1 = new Date().getTime();
    console.log('POST@/GetInternships --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

router.post('/SubmitInternship', function (req, res, next) {
  let t0 = new Date().getTime();
  submitInternship(req.body, function(response) {
    let t1 = new Date().getTime();
    console.log('POST@/SubmitInternship --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

function getInternships(json, callback) {
  if(json.action !== 'getInternships') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@internships.js.getAccounts().MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        let collection = db.collection(globals.INTERNSHIP_TABLE);
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

function submitInternship(json, callback) {
  if(json.action !== 'submitInternship') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log(err);
        callback('SERVER_ERROR');
      } else {
        globals.createInternshipObject(json, function(err, internship) {
          if(err) {
            console.log('err@internships.js:submitInternship() - ' + err);
            callback(err);
          } else {
            let collection = db.collection(globals.INTERNSHIP_TABLE);
            collection.insert([internship], function (err, done) {
              if (err) {
                console.log('err@internships.js:submitInternship() - ' + err);
                callback('SERVER_ERROR');
              } else {
                callback('INTERNSHIP_CREATED');
              }
              db.close();
            });
          }
        }); // end createUserObject callback
      } // end MongoClient else branch
    }); // end MongoClient.connect
  } // end register else branch
}

module.exports = router;
