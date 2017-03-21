
(function () {
  'use strict';

  let Globals = function () {
    this.MONGO_URL = 'mongodb://localhost:27017/cardinal-connect';
  };

  Globals.prototype.createUserObject = function (json, callback) {

    // TODO: data validation
    let user = {
      'active': 0,
      'company': '',
      'email': json.email,
      'password': json.password,
      'firstName': json.firstName,
      'lastName': json.lastName,
      'role': json.status.toLowerCase()
    }
    return user;
  }

  module.exports = Globals;
})();
