'use strict';

var express = require('express');
var router = express.Router();

router.post('/ToggleMentorship', function (req, res, next) {
  var json = req.body;

  res.send(json);
});

function login(reqAction, username, password) {
  if(reqAction !== 'login') {
    return 'INCORRECT_ACTION_TYPE';
  } else {
    return 'TODO_PROCESSING';
  }
}

router.post('/AcceptIntership', function (req, res, next) {
	  let t0 = new Date().getTime();
	  acceptInternship(req.body, function(response) {
	    let t1 = new Date().getTime();
	    console.log('POST@/AcceptIntership --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
	    res.send(response);
	  });
	});

router.post('/AcceptMentoship', function (req, res, next) {
	  let t0 = new Date().getTime();
	  acceptMentorship(req.body, function(response) {
	    let t1 = new Date().getTime();
	    console.log('POST@/AcceptMentorship --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
	    res.send(response);
	  });
	});



function AcceptInternship(json, callback) {
	  if(json.action !== 'acceptInternship') {
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
	            console.log('err@internships.js:acceptInternship() - ' + err);
	            callback(err);
	          } else {
	            let collection = db.collection(globals.INTERNSHIP_TABLE);
	            collection.insert([internship], function (err, done) {
	              if (err) {
	                console.log('err@internships.js:acceptInternship() - ' + err);
	                callback('SERVER_ERROR');
	              } else {
	                callback('INTERNSHIP_ACCEPTED');
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
