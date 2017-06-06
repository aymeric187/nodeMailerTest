'use strict';


function Email(body) {
  this.from = body.from;
  this.to = body.to;
  this.subject = body.subject;
  this.text = body.text;
  this.html = body.html;
};

module.exports = Email;
