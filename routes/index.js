'use strict';

let express = require('express');
let router = express.Router();
let mongodb = require('mongodb');
let Globals = require('../config');
let globals = new Globals();

router.post('/Login', function (req, res, next) {
  let t0 = new Date().getTime();
  login(req.body, function(response) {
    let t1 = new Date().getTime();
    console.log('POST@/Login --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

router.post('/Register', function (req, res, next) {
  console.log(req.body);
  let t0 = new Date().getTime();
  register(req.body, function (response) {
    let t1 = new Date().getTime();
    console.log('POST@/Register --- Response:' + response + ' --- ' + (t1 - t0) + 'ms');
    res.send(response);
  });
});

function login(json, callback) {
  if(json.action !== 'login') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let username = json.username;
    let password = json.password;
    let MongoClient = mongodb.MongoClient;

    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log(err);
        callback('SERVER_FAILURE');
      } else {
        let collection = db.collection('users');

        collection.find({email: username}).toArray(function (err, result) {
          // if error, server failure
          if (err) {
            db.close();
            callback('SERVER_FAILURE');

          } else if (result.length) { // else if there are users in the database
            // if there is one result
            if (result.length === 1 && result[0].email === username) {
              if (result[0].active === 0) {
                // if the account is inactive, end login process
                callback('ACCOUNT_INACTIVE');
              } else if (result[0].password === password) {
                // if query user password is the password, login
                if (result[0].role === 'admin') {
                  // TODO: Set session as valid
                  callback('LOGIN_ADMIN');
                } else {
                  callback('LOGIN_SUCCESS');
                }
              } else {
                // else, invalid login
                callback('INVALID_LOGIN');
              }
            } else {
              console.log('err: found multiple users with the same email!');
              callback('SERVER_FAILURE');
            }
            db.close();
          } else {  // if the user is not the database (invalid id)
            callback('INVALID_LOGIN');
            db.close();
          }
        });
      }
    });
  } // end else
} // end login

function register(json, callback) {
  if(json.action !== 'register') {
    console.log(json.action);
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log(err);
        callback('SERVER_FAILURE');
      } else {
        let collection = db.collection('users');

        let user = globals.createUserObject(json, function(err) {
          if(err) {
            console.log('woa');
          }
        });
        //console.log(user);
        callback('TODO_SAVE_USER');
      }
      /*let collection = db.collection('users');

      let user = {email: json.email, firstName: json.firstName};

      collection.insert([user], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          db.close();
          res.send('you done good kid');
        }
      });*/
    });
  }
}

module.exports = router;
