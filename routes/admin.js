'use strict';

var express = require('express');
var router = express.Router();

router.post('/Admin', function (req, res, next) {
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

module.exports = router;
