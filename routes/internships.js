'use strict';

var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let Globals = require('../config');
let globals = new Globals();
let internships = require('../objects/internship-objects');

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
  submitInternship(req.body, req.session, function(response) {
    let t1 = new Date().getTime();
    console.log('POST@/SubmitInternship --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

router.post('/SubscribeToInternship', function (req, res, next) {
  let t0 = new Date().getTime();
  subscribeToInternship(req.body, req.session, function (response) {
    let t1 = new Date().getTime();
    console.log('POST@/SubscribeToInternship --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

function getInternships (json, callback) {
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

function submitInternship (json, session, callback) {
  if(json.action !== 'submitInternship') {
    callback('INCORRECT_ACTION_TYPE');
  } else if (typeof session.user === 'undefined' || session.user.role === 'student') {
    callback({'INVALID_FORM': 'Invalid Account Type'});
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log(err);
        callback('SERVER_ERROR');
      } else {
        internships.createInternshipObject(json, session, function(err, internship) {
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

function subscribeToInternship (json, user, callback) {
  if (json.action !== 'subscribeToInternship') {
    callback('INCORRECT_ACTION_TYPE');
  } else if (typeof user === 'undefined') {
    callback('SESSION_UNDEFINED');
  }else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@internship.js.subscribeToInternship().MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      }
      let collection = db.collection(globals.INTERNSHIP_TABLE);
      collection.find({'_id': new ObjectId(json.internshipID)}).toArray(function (err, result) {
        if (err) {
          callback('SERVER_ERROR');
        } else if (result.length && result.length === 1) {
          let subscribedInternship = result[0];
          let userID = new ObjectId(user._id);
          let subscribed = false;

          if (typeof subscribedInternship.subscriberIDs !== 'undefined') {
            for (let i = 0; i < subscribedInternship.subscriberIDs.length; i++) {
              if (subscribedInternship.subscriberIDs[i].equals(userID)) subscribed = true;
            }
            if (!subscribed) subscribedInternship.subscriberIDs.push(userID);
          } else {
            subscribedInternship.subscriberIDs = [userID];
          }
          if (!subscribed) {
            collection.save(subscribedInternship, function (err, done) {
              if (err) {
                console.log('err@internship.js.subscribeToInternship()' +  err);
                callback('SERVER_ERROR');
              } else {
                callback('SUBSCRIBED');
              }
            });
          } else {
            callback('ALREADY_SUBSCRIBED');
          }
        } else {
          callback('SERVER_ERROR');
        }
        db.close();
      });
    });
  }
}

module.exports = router;
