'use strict';


function Email(body) {
  this._id = body._id;
  this.idMailjet = undefined;
  this.from = body.from;
  this.name = body.name;
  this.recipients = body.recipients;
  this.subject = body.subject;
  this.text = body.text;
  this.status = "unsent";
  this.datePOST = body.post;
  this.dateMailjet = "tadada";
};


module.exports = Email;
