'use strict';


function Email(body) {
  this.from = body.from;
  this.name = body.name;
  this.recipients = body.recipients;
  this.subject = body.subject;
  this.text = body.text;
  this.html = body.html;
  this.id = "undefined";
  this.status = "unsent";
};


module.exports = Email;
