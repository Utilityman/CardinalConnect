'use strict';

let express = require('express');
let router = express.Router();
let mongodb = require('mongodb');
let Config = require('../config');
let globals = new Config();

router.post('/Login', function (req, res, next) {
  let json = req.body;

  let action = json.action;
  let username = json.username;
  let password = json.password;

  //res.send('hello');
  login(action, username, password, res);
});

function login(reqAction, username, password, res) {
  if(reqAction !== 'login') {
    return 'INCORRECT_ACTION_TYPE';
  } else {
    let MongoClient = mongodb.MongoClient;

    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log(err);
      } else {
        let collection = db.collection('users');

        collection.find({}).toArray(function (err, result) {
          if (err) {
            db.close();
            res.send('DB_ERROR');
          } else if (result.length) {

            for(let i = 0; i < result.length; i++) {
              if(result[i].email === username &&
                 result[i].password === password) {
              db.close();
              res.send('LOGIN_SUCCESS');
              }
            }
            db.close();
            res.send('INVALID_LOGIN');
          } else {
            db.close();
            res.send( 'NO_USERS');
          }
        });
      }
    });
  }
}

/*function register(json) {
  MongClient.connect(ur, function(err, db) {
    let collection = db.collection('users');

    let user = {email: json.email, firstName: json.firstName};

    collection.insert([user], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        db.close();
        res.send('you done good kid');
      }
    });
  })
}*/

module.exports = router;
