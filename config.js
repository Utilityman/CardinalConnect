
(function () {
  'use strict';

  let Globals = function () {
    this.MONGO_URL = 'mongodb://localhost:27017/cardinal-connect';
    this.USER_TABLE = 'users';
    this.INTERNSHIP_TABLE = 'internships';
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
      if(json.status.length === 0) {
        callback({'INVALID_FORM': 'Invalid User Status'}, null);
        return;
      }
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
  };

  Globals.prototype.createInternshipObject = function (json, callback) {
    if(typeof json.title !== 'undefined' && typeof json.title === 'string') {
      if(json.title.length === 0) {
        callback({'INVALID_FORM': 'Invalid Title'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Title'}, null);
      return;
    }

    if(typeof json.location === 'string') {
      if(json.location.length === 0) {
        callback({'INVALID_FORM': 'Invalid Location'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Location'}, null);
      return;
    }

    if(typeof json.company === 'string') {
      if(json.company.length === 0) {
        callback({'INVALID_FORM': 'Invalid Company'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Company'}, null);
      return;
    }

    if(typeof json.contact === 'string') {
      if(json.contact.length === 0) {
        callback({'INVALID_FORM': 'Invalid Contact'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Contact'}, null);
      return;
    }

    if(typeof json.description === 'string') {
      if(json.description.length === 0) {
        callback({'INVALID_FORM': 'Invalid Description'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Description'}, null);
      return;
    }

    if(typeof json.focus === 'string') {
      if(json.focus.length === 0) {
        callback({'INVALID_FORM': 'Invalid Focus'}, null);
        return;
      }
    } else {
      callback({'INVALID_FORM': 'Invalid Focus'}, null);
      return;
    }

    let internship = {
      'active': 0,
      'title': json.title,
      'location': json.location,
      'company': json.company,
      'contact': json.contact,
      'description': json.description,
      'focus': json.focus,
    }
    callback(null, internship);
  };

  module.exports = Globals;
})();
