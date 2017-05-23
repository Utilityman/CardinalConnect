'use strict';

var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let Globals = require('../config');
let globals = new Globals();

router.post('/GetMentorships', function (req, res, next) {
  let t0 = new Date().getTime();
  getMentorships(req.body, function(response) {
    let t1 = new Date().getTime();
    console.log('POST@/GetMentorships --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});


router.post('/SubmitMentorship', function (req, res, next) {
  let t0 = new Date().getTime();
  submitMentorship(req.body, function(response) {
    let t1 = new Date().getTime();
    console.log('POST@/SubmitMentorship --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

router.post('/SubscribeToMentorship', function (req, res, next) {
  let t0 = new Date().getTime();
  subscribeToMentorship(req.body, req.session.user, function (response) {
    let t1 = new Date().getTime();
    console.log('POST@/SubscribeToMentorship --- Response: ' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

function getMentorships(json, callback) {
  if(json.action !== 'getMentorships') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@mentorships.js.getAccounts().MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        let collection = db.collection(globals.MENTORSHIP_TABLE);
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

function submitMentorship(json, callback) {
  if(json.action !== 'submitMentorship') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@mentorships.js.submitMentorship().MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        globals.createMentorshipObject(json, function (err, mentorship) {
          if (err) {
            console.log('mentorship creation error : fix this message');
            callback(err);
          } else {
            let collection = db.collection(globals.MENTORSHIP_TABLE);
            collection.insert([mentorship], function (err, done) {
              if (err) {
                console.log('err inserting mentorship: fix this message');
                callback('SERVER_ERROR');
              } else {
                callback('MENTORSHIP_CREATED');
              }
              db.close();
            });
          }
        });
      }
    });
  }
}

function subscribeToMentorship (json, user, callback) {
  if (json.action !== 'subscribeToMentorship') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    callback('SUBSCRIBED');
  }
}


module.exports = router;
