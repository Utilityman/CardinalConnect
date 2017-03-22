
(function () {
  'use strict';

  let Globals = function () {
    this.MONGO_URL = 'mongodb://localhost:27017/cardinal-connect';
  };

  /*
    takes json params in the form of an account
    expects a callback with params (err, user_result)
  */
  Globals.prototype.createUserObject = function (json, callback) {

    if(typeof json.email !== 'undefined' && typeof json.email === 'string') {
      if(json.email.length === 0) {
        callback({'INVALID_FORM': 'Invalid Email'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Email'}, null);
      return;
    }

    if(typeof json.firstName === 'string') {
      if(json.firstName.length === 0) {
        callback({'INVALID_FORM': 'Invalid First Name'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid First Name'}, null);
      return;
    }

    if(typeof json.lastName === 'string') {
      if(json.lastName.length === 0) {
        callback({'INVALID_FORM': 'Invalid Last Name'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Last Name'}, null);
      return;
    }

    if(typeof json.status === 'string') {
      // TODO: continue this if(json.status.l)
    } else {
      callback({'INVALID_FORM': 'Invalid Role'}, null);
      return;
    }

    let user = {
      'active': 0,
      'company': '',
      'email': json.email,
      'password': json.password,
      'firstName': json.firstName,
      'lastName': json.lastName,
      'role': json.status.toLowerCase()
    }
    callback(null, user);
  }

  module.exports = Globals;
})();
