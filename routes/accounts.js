'use strict';

var express = require('express');
var router = express.Router();
let mongodb = require('mongodb');
let Globals = require('../config');
let globals = new Globals();
let nodemailer = require('nodemailer');


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


router.post('/GetInterests', function (req, res, next) {
  let t0 = new Date().getTime();
  getInterests(req.body, function (response) {
    let t1 = new Date().getTime();
    res.send(response);
    console.log('POST@/getInterests --- Response: '+ response + ' --- ' + (t1 - t0) + 'ms');
  });
});

router.post('/SaveUser', function (req, res, next) {
  let t0 = new Date().getTime();
  saveUser(req.body, req.session.user, function (response) {
    let t1 = new Date().getTime();
    res.send(response);
    console.log('POST@/saveUser --- Response: '+ response + ' --- ' + (t1 - t0) + 'ms');
  });
});

router.post('/SendAlerts', function (req, res, next) {
  let t0 = new Date().getTime();
  sendAlerts(req.body, req.session.user, function (response) {
    let t1 = new Date().getTime();
    res.send(response);
    console.log('POST@/sendAlerts --- Response: '+ response + ' --- ' + (t1 - t0) + 'ms');
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

function getInterests (json, callback) {
  if(json.action !== 'getInterests') {
    callback('INCORRECT_ACTION_TYPE');
  } else {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@accounts.js.getInterests().MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        let collection = db.collection('interests');
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

function saveUser(json, user, callback) {
  if(json.action == 'saveUserInterests') {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@accounts.js.saveUser()).MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        let collection = db.collection('users');
        let email = json.email;
        let interests = json.interests;
        collection.update({'email':email},{$set:{'interests':interests}});
        user.interests = interests;
        callback('UPDATED USER');
      }
        });
  } else if(json.action == 'saveUserPreferences') {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@accounts.js.saveUser()).MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        let collection = db.collection('users');
        let email = json.email;
        let QuestionAndAnswer = json.questionAndAnswer;
        collection.update({'email':email},{$set:{'questionAndAnswer':QuestionAndAnswer}});
        user.questionAndAnswer = QuestionAndAnswer;
        console.log("USER = ",user);
        callback('UPDATED USER');
      }
        });
  } else callback('INCORRECT_ACTION_TYPE');
}

function sendAlerts(json, user, callback) {
  console.log("ABOUT TO SEND ALERTS");
  if(json.action == 'updatedQuestionAndAnswer') {
    let MongoClient = mongodb.MongoClient;
    MongoClient.connect(globals.MONGO_URL, function (err, db) {
      if (err) {
        console.log('err@accounts.js.sendAlerts()).MongoClient.connect - ' + err);
        callback('SERVER_ERROR');
      } else {
        let collection = db.collection('users');
        let advisor = json.account;
        let interests = advisor.interests;
        if(interests.length != 0){

          let interest_collection = db.collection('interests');
          collection.find().toArray(function (err, results) {
            if (err) {
              callback('SERVER_ERROR');
              db.close();
            } else {
              let userToBeAlerted, interestsInCommon, match;
              for(var i = 0;i < results.length; i++){
                userToBeAlerted = results[i];
                interestsInCommon = new Array();
                match = false;

                if(results[i].interests && results[i].role == "student"){
                //  console.log("RES I = ", results[i]);
                  for(var q = 0;q < results[i].interests.length; q++){
                  //  console.log("RES INTERs = ", results[i].interests[q]);
                    for(var k = 0;k < interests.length; k++){
                      //  console.log("INTERS ", interests[k]);
                      if(interests[k] == results[i].interests[q]){
                      //  console.log("RES-INT-NAME ", results[i].interests[q]);
                      let str = interests[k].toString();

                      interest_collection.find({"interest_id":str}).toArray().then(function(result){

                        let tmp = JSON.stringify(result);
                        let interest = JSON.parse(tmp);
                        console.log(interest.name);
                        interestsInCommon.push(interest.name);
                      });
                      //let name = interest;
                      //  let name = interest.name;
                        //console.log("NAME = ", name);
                      //  console.log("INTER = ", name);
                      //  interestsInCommon.push(name);
                        match = true;
                      }
                    }
                  }

                }
                console.log("MATCH = ", match);
                if(match == true) sendQuestionAndAnswerAlert(userToBeAlerted.email, advisor, interestsInCommon);

              }
              db.close();

            }
          });
        }

        callback('SENT ALERTS');
      }
        });
  } else callback('INCORRECT_ACTION_TYPE');
}

function sendQuestionAndAnswerAlert(recipient, advisor, commonInterests){

     console.log("ABOUT TO SEND ALERTS FOR Q/A");
      var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'cardinalconnectalerts@gmail.com',
        pass: 'Mets71615215'
      }
    });

    var mailOptions = {
      from: 'cardinalconnectalerts@gmail.com',
      to: recipient,
      subject: 'Interest Match!',
      text: 'An advisor with similar interests to you has signed up for Cardinal Connect !\n' +
            'Advisor Name: ' + advisor.firstName + " " + advisor.lastName + "\n" +
            'Advisor Email: ' + advisor.email +"\n" +
            "Common Interests: "

    };


    for(var i = 0; i < commonInterests.length; i++){
      console.log("COMMON ",commonInterests[i]);
       mailOptions.text += commonInterests[i];
      if(i != commonInterests.length - 1) mailOptions.text += ", ";
    }
  //  console.log("MAIL: ", mailOptions.text);
/*
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    */

}



module.exports = router;
